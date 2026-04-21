import { motion } from "framer-motion";
import { Download, FileText, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BREED_DATABASE } from "@/lib/breedData";
import type { PredictionResponse } from "@/lib/breeds";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Props {
  result: PredictionResponse;
  imageUrl: string;
}

function downloadCSV(result: PredictionResponse) {
  const info = BREED_DATABASE[result.predicted_breed];
  const lines = [
    "Field,Value",
    `Predicted Breed,${result.predicted_breed}`,
    `Confidence,${result.confidence}%`,
    `Processing Time,${result.processing_time}s`,
    `Date,${new Date().toLocaleString()}`,
    `Origin,${info?.origin || "N/A"}`,
    `Use,${info?.use || "N/A"}`,
    `Milk Yield,${info?.milk_yield || "N/A"}`,
    "",
    "Rank,Breed,Confidence",
    ...result.top_predictions.map((p, i) => `${i + 1},${p.breed},${p.confidence}%`),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `breed-report-${result.predicted_breed.toLowerCase().replace(/\s+/g, "-")}.csv`;
  a.click();
}

function downloadPDF(result: PredictionResponse) {
  const doc = new jsPDF();
  const info = BREED_DATABASE[result.predicted_breed];
  const now = new Date().toLocaleString();

  // Title
  doc.setFontSize(22);
  doc.setTextColor(30, 100, 60);
  doc.text("AI Cattle Breed Report", 14, 22);

  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text(`Generated: ${now}`, 14, 30);

  // Prediction summary
  doc.setFontSize(14);
  doc.setTextColor(30, 30, 30);
  doc.text("Prediction Summary", 14, 44);

  autoTable(doc, {
    startY: 48,
    head: [["Field", "Value"]],
    body: [
      ["Predicted Breed", result.predicted_breed],
      ["Confidence", `${result.confidence}%`],
      ["Processing Time", `${result.processing_time}s`],
      ["Origin State", info?.origin || "N/A"],
      ["Primary Use", info?.use || "N/A"],
      ["Milk Yield", info?.milk_yield || "N/A"],
      ["Coat Color", info?.coat_color || "N/A"],
      ["Horn Type", info?.horn_type || "N/A"],
    ],
    theme: "striped",
    headStyles: { fillColor: [30, 100, 60] },
  });

  // Top predictions
  const finalY = (doc as any).lastAutoTable?.finalY || 120;
  doc.setFontSize(14);
  doc.text("Top Predictions", 14, finalY + 12);

  autoTable(doc, {
    startY: finalY + 16,
    head: [["Rank", "Breed", "Confidence"]],
    body: result.top_predictions.map((p, i) => [
      `${i + 1}`,
      p.breed,
      `${p.confidence}%`,
    ]),
    theme: "striped",
    headStyles: { fillColor: [30, 100, 60] },
  });

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("CattleAI — AI-powered cattle breed recognition platform", 14, 285);

  doc.save(`breed-report-${result.predicted_breed.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}

export function DownloadReport({ result, imageUrl }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="py-8"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass">
            <CardContent className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Download className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-display font-semibold">Download Prediction Report</p>
                  <p className="text-sm text-muted-foreground">
                    Export results with breed details and confidence scores.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => downloadPDF(result)}
                  className="gradient-primary text-primary-foreground"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  PDF Report
                </Button>
                <Button variant="outline" onClick={() => downloadCSV(result)}>
                  <Table className="h-4 w-4 mr-2" />
                  CSV Export
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}
