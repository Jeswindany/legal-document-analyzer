import { useCallback, useState, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { validateFile } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  selectedFile: File | null;
  onClear: () => void;
}

export default function FileUpload({ onFileSelected, onAnalyze, isAnalyzing, selectedFile, onClear }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const err = validateFile(file);
      if (err) {
        setError(err);
        return;
      }
      setError(null);
      onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => !selectedFile && inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-10 text-center transition-all duration-200 cursor-pointer ${
          dragActive
            ? "border-accent bg-legal-highlight"
            : selectedFile
            ? "border-border bg-card"
            : "border-border hover:border-legal-slate bg-card"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) handleFile(e.target.files[0]);
            e.target.value = "";
          }}
        />

        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-body font-semibold text-foreground truncate max-w-[280px]">{selectedFile.name}</p>
                <p className="text-sm text-muted-foreground">{formatSize(selectedFile.size)}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); onClear(); setError(null); }}
                className="ml-2 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-legal-slate" />
              </div>
              <p className="font-body font-medium text-foreground mb-1">
                Drag & drop your document here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse — PDF, DOC, DOCX up to 20 MB
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-destructive text-sm mt-3 text-center font-body"
        >
          {error}
        </motion.p>
      )}

      <div className="mt-6 flex justify-center">
        <Button
          onClick={onAnalyze}
          disabled={!selectedFile || isAnalyzing}
          className="px-8 py-3 font-body font-semibold text-base"
          size="lg"
        >
          {isAnalyzing ? "Analyzing…" : "Analyze Document"}
        </Button>
      </div>
    </div>
  );
}
