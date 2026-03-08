import { useState, useCallback } from "react";
import { Scale, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import FileUpload from "@/components/FileUpload";
import ProcessingScreen from "@/components/ProcessingScreen";
import DocumentSummary from "@/components/DocumentSummary";
import ImportantClauses from "@/components/ImportantClauses";
import DocumentChat from "@/components/DocumentChat";
import { analyzeDocument, fetchResults, AnalysisResult } from "@/lib/api";
import { motion } from "framer-motion";

type AppState = "upload" | "processing" | "results";

const Index = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [state, setState] = useState<AppState>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!file) return;
    setState("processing");
    setError(null);
    try {
      const { documentId } = await analyzeDocument(file);
      const data = await fetchResults(documentId);
      setResult(data);
      setState("results");
    } catch {
      setError("Analysis failed. Please try again.");
      setState("upload");
    }
  }, [file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResult(null);
    setError(null);
    setState("upload");
  }, []);

  return (
    <div className="min-h-screen legal-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg legal-gradient flex items-center justify-center">
            <Scale className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground leading-tight">AI Legal Document Analyzer</h1>
          </div>
          <div className="ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {state === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto pt-12"
          >
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Analyze Legal Documents with AI
              </h2>
              <p className="text-muted-foreground font-body text-lg max-w-lg mx-auto">
                Upload a legal document to extract insights, summarize clauses, and ask questions.
              </p>
            </div>
            <FileUpload
              onFileSelected={setFile}
              onAnalyze={handleAnalyze}
              isAnalyzing={false}
              selectedFile={file}
              onClear={() => setFile(null)}
            />
            {error && (
              <p className="text-destructive text-center mt-4 font-body">{error}</p>
            )}
          </motion.div>
        )}

        {state === "processing" && <ProcessingScreen />}

        {state === "results" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <DocumentSummary summary={result.summary} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ImportantClauses clauses={result.clauses} />
              <DocumentChat documentId={result.documentId} />
            </div>

            {/* Upload new */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-4 text-center"
            >
              <Button onClick={handleReset} size="lg" className="font-body font-semibold">
                Analyze Another Document
              </Button>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;
