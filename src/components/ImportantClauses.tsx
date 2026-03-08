import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollText, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface Clause {
  title: string;
  description: string;
  excerpt: string;
}

interface ImportantClausesProps {
  clauses: Clause[];
}

export default function ImportantClauses({ clauses }: ImportantClausesProps) {
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
          <Accordion type="single" collapsible className="w-full">
            {clauses.map((clause, i) => (
              <AccordionItem key={i} value={`clause-${i}`} className="border-border">
                <AccordionTrigger className="font-body font-semibold text-sm text-left hover:no-underline hover:text-primary transition-colors">
                  {clause.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground font-body mb-3">{clause.description}</p>
                  {clause.excerpt && (
                    <div className="bg-legal-highlight rounded-md p-3 flex gap-2">
                      <Quote className="w-4 h-4 text-legal-slate shrink-0 mt-0.5" />
                      <p className="text-xs italic text-foreground/80 font-body leading-relaxed">{clause.excerpt}</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );
}
