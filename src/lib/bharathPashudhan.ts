import type { PredictionResponse } from "@/lib/breeds";
import { BREED_DATABASE } from "@/lib/breedData";

export interface FarmerDetails {
  farmerName: string;
  village: string;
  district: string;
  phone: string;
}

export const BHARATH_PASHUDHAN_STORAGE_KEY = "bharath_pashudhan_prediction";

export interface BharatPashudhanSubmission {
  submissionId: string;
  createdAt: string;
  source: "CattleAI";

  farmer: FarmerDetails;

  prediction: {
    predictedBreed: string;
    confidence: number;
    topPredictions: PredictionResponse["top_predictions"];
    modelUsed: PredictionResponse["model_used"];
    processingTimeSeconds: number;
  };

  breedMeta: {
    origin: string;
    use: string;
    milkYield: string;
    coatColor: string;
    hornType: string;
    features: string;
  };
}

export const BHARATH_PASHUDHAN_HISTORY_KEY = "bharath_pashudhan_history";

function safeNowIso(): string {
  return new Date().toISOString();
}

function makeSubmissionId(): string {
  // randomUUID is supported in modern browsers; fall back to a timestamp string.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (crypto as any).randomUUID();
  }
  return `bp-${Date.now()}`;
}

export function buildBharathPashudhanSubmission(
  result: PredictionResponse,
  farmer: FarmerDetails
): BharatPashudhanSubmission {
  const info = BREED_DATABASE[result.predicted_breed];

  return {
    submissionId: makeSubmissionId(),
    createdAt: safeNowIso(),
    source: "CattleAI",
    farmer,
    prediction: {
      predictedBreed: result.predicted_breed,
      confidence: result.confidence,
      topPredictions: result.top_predictions,
      modelUsed: result.model_used,
      processingTimeSeconds: result.processing_time,
    },
    breedMeta: {
      origin: info?.origin || "N/A",
      use: info?.use || "N/A",
      milkYield: info?.milk_yield || "N/A",
      coatColor: info?.coat_color || "N/A",
      hornType: info?.horn_type || "N/A",
      features: info?.features || "N/A",
    },
  };
}

export function getBharathDeepLink(submission: BharatPashudhanSubmission): string {
  // Configure this in `.env` like:
  // VITE_BHARATH_PASHUDHAN_DEEP_LINK=https://bharathpashudhan.example.com/submit
  const base = import.meta.env.VITE_BHARATH_PASHUDHAN_DEEP_LINK as string | undefined;

  const qs = new URLSearchParams({
    source: submission.source,
    submissionId: submission.submissionId,
    predictedBreed: submission.prediction.predictedBreed,
    confidence: String(submission.prediction.confidence),
  });

  if (!base) return "";
  const joiner = base.includes("?") ? "&" : "?";
  return `${base}${joiner}${qs.toString()}`;
}

export function getBharathApiConfig() {
  const apiUrl = import.meta.env.VITE_BHARATH_PASHUDHAN_API_URL as string | undefined;
  const apiKey = import.meta.env.VITE_BHARATH_PASHUDHAN_API_KEY as string | undefined;

  return {
    apiUrl: apiUrl?.trim() || "",
    apiKey: apiKey?.trim() || "",
  };
}

export async function submitToBharathPashudhan(submission: BharatPashudhanSubmission) {
  const { apiUrl, apiKey } = getBharathApiConfig();
  if (!apiUrl) {
    throw new Error("Bharath API URL is not configured.");
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify(submission),
  });

  const raw = await response.text();
  let parsed: unknown = null;
  try {
    parsed = raw ? JSON.parse(raw) : null;
  } catch {
    parsed = raw;
  }

  if (!response.ok) {
    const message =
      typeof parsed === "object" && parsed !== null && "message" in parsed
        ? String((parsed as { message?: unknown }).message)
        : raw || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return parsed;
}

export function downloadTextFile(fileName: string, content: string, mime = "application/json") {
  const blob = new Blob([content], { type: mime });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function loadSubmissionHistory(): BharatPashudhanSubmission[] {
  try {
    const raw = localStorage.getItem(BHARATH_PASHUDHAN_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BharatPashudhanSubmission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSubmissionToHistory(submission: BharatPashudhanSubmission) {
  const current = loadSubmissionHistory();
  const deduped = current.filter((item) => item.submissionId !== submission.submissionId);
  const next = [submission, ...deduped].slice(0, 20);
  localStorage.setItem(BHARATH_PASHUDHAN_HISTORY_KEY, JSON.stringify(next));
}

