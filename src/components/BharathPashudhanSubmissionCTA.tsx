import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { buildBharathPashudhanSubmission, BHARATH_PASHUDHAN_STORAGE_KEY } from "@/lib/bharathPashudhan";
import type { PredictionResponse } from "@/lib/breeds";
import { Download } from "lucide-react";

interface Props {
  result: PredictionResponse;
}

export function BharathPashudhanSubmissionCTA({ result }: Props) {
  const navigate = useNavigate();

  const openSubmissionPage = () => {
    // Store the latest prediction so the integration page can build the submission payload.
    localStorage.setItem(
      BHARATH_PASHUDHAN_STORAGE_KEY,
      JSON.stringify({
        prediction: result,
      })
    );

    navigate("/bharath-pashudhan");
  };

  const quickDownloadJson = () => {
    const payload = buildBharathPashudhanSubmission(result, {
      farmerName: "",
      village: "",
      district: "",
      phone: "",
    });

    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `bharath-pashudhan-submission-${payload.submissionId}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-2">
      <div className="space-y-1">
        <p className="font-display font-semibold">Bharath Pashudhan</p>
        <p className="text-sm text-muted-foreground">Generate a submission payload from your latest prediction.</p>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button onClick={openSubmissionPage} className="gradient-primary text-primary-foreground">
          Open Submission
        </Button>
        <Button variant="outline" onClick={quickDownloadJson}>
          <Download className="h-4 w-4 mr-2" />
          Download JSON
        </Button>
      </div>
    </div>
  );
}

