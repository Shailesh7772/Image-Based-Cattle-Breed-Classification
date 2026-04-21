import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PredictionResponse } from "@/lib/breeds";
import type { BharatPashudhanSubmission, FarmerDetails } from "@/lib/bharathPashudhan";
import {
  buildBharathPashudhanSubmission,
  downloadTextFile,
  getBharathDeepLink,
  getBharathApiConfig,
  loadSubmissionHistory,
  saveSubmissionToHistory,
  submitToBharathPashudhan,
  BHARATH_PASHUDHAN_STORAGE_KEY,
} from "@/lib/bharathPashudhan";
import { toast } from "@/hooks/use-toast";

type StoredPayload = {
  prediction?: PredictionResponse;
};

function loadStoredPayload(): StoredPayload {
  try {
    const raw = localStorage.getItem(BHARATH_PASHUDHAN_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as StoredPayload;
  } catch {
    return {};
  }
}

export default function BharatPashudhan() {
  const stored = useMemo(() => loadStoredPayload(), []);

  const [farmer, setFarmer] = useState<FarmerDetails>(
    {
      farmerName: "",
      village: "",
      district: "",
      phone: "",
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSubmission, setActiveSubmission] = useState<BharatPashudhanSubmission | null>(null);
  const [historyTick, setHistoryTick] = useState(0);

  const submission = useMemo(() => {
    if (stored.prediction) {
      return buildBharathPashudhanSubmission(stored.prediction, farmer);
    }

    return undefined;
  }, [farmer, stored.prediction]);

  const resolvedSubmission = activeSubmission ?? submission;
  const deepLink = useMemo(() => {
    if (!resolvedSubmission) return "";
    return getBharathDeepLink(resolvedSubmission);
  }, [resolvedSubmission]);
  const { apiUrl } = getBharathApiConfig();
  const historyItems = useMemo(() => loadSubmissionHistory(), [historyTick]);

  if (!submission) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6">
              <Button variant="ghost" asChild>
                <Link to="/classify">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Classify
                </Link>
              </Button>
            </div>
            <Card className="glass">
              <CardContent className="p-6">
                <h1 className="font-display text-2xl font-bold mb-2">Bharath Pashudhan Submission</h1>
                <p className="text-muted-foreground leading-relaxed">
                  No latest prediction found. Go to <Link className="underline" to="/classify">Classify</Link>, run prediction, then open this page again.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const payloadString = JSON.stringify(resolvedSubmission, null, 2);

  const copyPayload = async () => {
    try {
      await navigator.clipboard.writeText(payloadString);
    } catch {
      // ignore
    }
  };

  const openDeepLink = () => {
    if (!deepLink) return;
    window.open(deepLink, "_blank", "noopener,noreferrer");
  };

  const canSubmit = Boolean(
    resolvedSubmission?.farmer.farmerName.trim() &&
    resolvedSubmission?.farmer.village.trim() &&
    resolvedSubmission?.farmer.district.trim() &&
    resolvedSubmission?.farmer.phone.trim()
  );

  const submitPayload = async () => {
    if (!canSubmit) {
      toast({
        title: "Missing farmer details",
        description: "Please fill farmer name, village, district, and phone before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      if (!resolvedSubmission) return;
      await submitToBharathPashudhan(resolvedSubmission);
      toast({
        title: "Submitted successfully",
        description: "Payload sent to Bharath Pashudhan endpoint.",
      });
    } catch (err) {
      toast({
        title: "Submission failed",
        description: err instanceof Error ? err.message : "Could not submit payload.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveCurrentToHistory = () => {
    if (!resolvedSubmission) return;
    saveSubmissionToHistory(resolvedSubmission);
    setHistoryTick((n) => n + 1);
    toast({
      title: "Saved to history",
      description: "You can reopen this payload later from Submission History.",
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/breeds">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Breeds
              </Link>
            </Button>
          </div>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Bharath Pashudhan Integration</h1>
            <p className="text-muted-foreground">
              Submit the latest cattle prediction as a structured payload (JSON) and open Bharat Pashudhan using a deep link.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Predicted Breed</p>
                    <p className="font-display text-xl font-bold">{resolvedSubmission?.prediction.predictedBreed}</p>
                  </div>
                  <Badge className="gradient-warm">{resolvedSubmission?.prediction.confidence}%</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Origin</p>
                    <p className="text-sm font-semibold">{resolvedSubmission?.breedMeta.origin}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Use</p>
                    <p className="text-sm font-semibold">{resolvedSubmission?.breedMeta.use}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Milk Yield</p>
                    <p className="text-sm font-semibold">{resolvedSubmission?.breedMeta.milkYield}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Horn Type</p>
                    <p className="text-sm font-semibold">{resolvedSubmission?.breedMeta.hornType}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-1">Submission ID</p>
                  <p className="text-sm font-semibold break-all">{resolvedSubmission?.submissionId}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-xs text-muted-foreground">Farmer Details</p>
                </div>

                <div className="space-y-3">
                  <label className="block">
                    <span className="text-xs text-muted-foreground">Farmer Name</span>
                    <input
                      value={farmer.farmerName}
                      onChange={(e) => setFarmer({ ...farmer, farmerName: e.target.value })}
                      className="mt-1 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground">Village</span>
                    <input
                      value={farmer.village}
                      onChange={(e) => setFarmer({ ...farmer, village: e.target.value })}
                      className="mt-1 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground">District</span>
                    <input
                      value={farmer.district}
                      onChange={(e) => setFarmer({ ...farmer, district: e.target.value })}
                      className="mt-1 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-muted-foreground">Phone</span>
                    <input
                      value={farmer.phone}
                      onChange={(e) => setFarmer({ ...farmer, phone: e.target.value })}
                      className="mt-1 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm"
                    />
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass glow-primary">
            <CardContent className="p-6">
              <h2 className="font-display text-xl font-bold mb-3">Submission Actions</h2>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div className="text-sm">
                  <p className="text-muted-foreground">Download or copy the structured submission payload.</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <Button
                    onClick={() =>
                      downloadTextFile(
                        `bharath-pashudhan-submission-${resolvedSubmission?.submissionId}.json`,
                        payloadString
                      )
                    }
                    className="gradient-primary text-primary-foreground"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download JSON
                  </Button>
                  <Button variant="outline" onClick={copyPayload}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Payload
                  </Button>
                  <Button variant="outline" onClick={openDeepLink} disabled={!deepLink}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Deep Link
                  </Button>
                  <Button onClick={submitPayload} disabled={!apiUrl || isSubmitting || !canSubmit}>
                    {isSubmitting ? "Submitting..." : "Submit to API"}
                  </Button>
                  <Button variant="outline" onClick={saveCurrentToHistory}>
                    Save to History
                  </Button>
                </div>
              </div>

              {!deepLink && (
                <p className="text-xs text-muted-foreground">
                  Deep link not configured. Set <code>VITE_BHARATH_PASHUDHAN_DEEP_LINK</code> in your <code>.env</code>.
                </p>
              )}
              {!apiUrl && (
                <p className="text-xs text-muted-foreground mt-1">
                  API submit not configured. Set <code>VITE_BHARATH_PASHUDHAN_API_URL</code> in your <code>.env</code>.
                </p>
              )}

              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">Payload Preview</p>
                <pre className="text-[11px] leading-4 bg-background/50 border border-border rounded-md p-4 overflow-auto">
                  {payloadString}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card className="glass mt-6">
            <CardContent className="p-6">
              <h2 className="font-display text-xl font-bold mb-3">Submission History</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Last 20 payloads saved locally in your browser. Select one to reuse.
              </p>

              {historyItems.length === 0 ? (
                <p className="text-xs text-muted-foreground">No saved submissions yet.</p>
              ) : (
                <div className="space-y-2">
                  {historyItems.map((item) => {
                    const isActive = resolvedSubmission?.submissionId === item.submissionId;
                    return (
                      <div
                        key={item.submissionId}
                        className="border border-border rounded-md p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
                      >
                        <div>
                          <p className="text-sm font-semibold">
                            {item.prediction.predictedBreed} ({item.prediction.confidence}%)
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(item.createdAt).toLocaleString()} - {item.submissionId}
                          </p>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            variant={isActive ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveSubmission(item)}
                          >
                            Use
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              downloadTextFile(
                                `bharath-pashudhan-submission-${item.submissionId}.json`,
                                JSON.stringify(item, null, 2)
                              )
                            }
                          >
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(JSON.stringify(item, null, 2));
                                toast({ title: "Copied", description: "History payload copied." });
                              } catch {
                                toast({
                                  title: "Copy failed",
                                  description: "Could not copy payload.",
                                  variant: "destructive",
                                });
                              }
                            }}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

