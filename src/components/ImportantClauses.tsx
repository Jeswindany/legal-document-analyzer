import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollText, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { ClauseExtractionResult } from "@/lib/api";

export default function ImportantClauses({ clauses }: { clauses: ClauseExtractionResult | null }) {
  if (!clauses) return null;

  const groups = clauses.groups;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card className="card-shadow hover:card-shadow-hover transition-shadow duration-300 h-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 font-display text-xl">
            <ScrollText className="w-5 h-5 text-primary" />
            Important Clauses
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Accordion for groups — allow multiple groups open at once */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {Object.entries(groups).map(([groupName, groupClauses]) => {
              // don't render empty groups (optional)
              if (!groupClauses || groupClauses.length === 0) return null;

              return (
                <AccordionItem key={groupName} value={groupName} className="border-border">
                  <AccordionTrigger className="font-body font-semibold text-sm text-left hover:no-underline hover:text-primary transition-colors">
                    {groupName.charAt(0).toUpperCase() + groupName.slice(1)}
                  </AccordionTrigger>

                  <AccordionContent>
                    {/* scrollable list of clauses for this group */}
                    <div className="max-h-48 overflow-y-auto space-y-3 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {groupClauses.map((clause, i) => (
                        <div key={`${groupName}-${i}`} className="bg-legal-highlight rounded-md p-3 flex gap-3">
                          <Quote className="w-4 h-4 text-legal-slate shrink-0 mt-1" />
                          <div>
                            <p className="text-xs italic text-foreground/80 font-body leading-relaxed">"{clause.text}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
}