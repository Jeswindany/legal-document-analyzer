import { motion } from "framer-motion";
import { Scale } from "lucide-react";

export default function ProcessingScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 rounded-full border-[3px] border-secondary border-t-primary mb-8"
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Scale className="w-5 h-5 text-primary" />
          <h2 className="font-display text-xl font-semibold text-foreground">Analyzing Your Document</h2>
        </div>
        <p className="text-muted-foreground font-body max-w-sm">
          Extracting clauses, summarizing content, and preparing insights. This may take a few moments.
        </p>
      </motion.div>
      <div className="mt-10 w-64 h-1.5 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        />
      </div>
    </div>
  );
}
