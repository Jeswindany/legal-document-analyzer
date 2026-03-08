import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";

interface DocumentSummaryProps {
  summary: string;
}

export default function DocumentSummary({ summary }: DocumentSummaryProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card className="card-shadow hover:card-shadow-hover transition-shadow duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 font-display text-xl">
            <FileText className="w-5 h-5 text-primary" />
            Document Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none font-body text-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
