// API placeholder functions — replace with real endpoints

export interface AnalysisResult {
  documentId: string;
  summary: string;
  clauses: {
    title: string;
    description: string;
    excerpt: string;
  }[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function analyzeDocument(_file: File): Promise<{ documentId: string }> {
  // POST /api/analyze-document  multipart/form-data { file }
  await delay(3000);
  return { documentId: "doc_" + Math.random().toString(36).slice(2, 10) };
}

export async function fetchResults(_documentId: string): Promise<AnalysisResult> {
  // GET /api/document-result/{documentId}
  await delay(1500);
  return {
    documentId: _documentId,
    summary:
      "This agreement is a **Master Services Agreement (MSA)** between two corporate entities, effective January 1, 2025. It outlines the terms governing professional services, intellectual property rights, and liability limitations.\n\n**Key Points:**\n- The agreement has a 24-month initial term with automatic renewal\n- Either party may terminate with 90 days written notice\n- Intellectual property created during the engagement belongs to the client\n- Liability is capped at the total fees paid in the preceding 12 months\n- Governing law is the State of Delaware, United States",
    clauses: [
      {
        title: "Termination Clause (§7.2)",
        description:
          "Defines the conditions under which either party can terminate the agreement, including breach, insolvency, and convenience.",
        excerpt:
          '"Either party may terminate this Agreement for convenience upon ninety (90) days prior written notice to the other party. Upon termination, all outstanding invoices shall become immediately due and payable."',
      },
      {
        title: "Limitation of Liability (§9.1)",
        description:
          "Caps the total aggregate liability and excludes consequential damages for both parties.",
        excerpt:
          '"In no event shall either party\'s aggregate liability exceed the total amounts paid or payable under this Agreement during the twelve (12) month period immediately preceding the claim."',
      },
      {
        title: "Intellectual Property (§5.3)",
        description:
          "Assigns ownership of work product and pre-existing IP, with license grants for background technology.",
        excerpt:
          '"All Work Product created by Provider in the performance of Services shall be the sole and exclusive property of Client, and Provider hereby assigns all right, title, and interest therein."',
      },
      {
        title: "Confidentiality (§6.1)",
        description:
          "Establishes mutual obligations to protect proprietary and confidential information for 3 years post-termination.",
        excerpt:
          '"Each party agrees to hold in strict confidence all Confidential Information received from the other party and shall not disclose such information to any third party without prior written consent."',
      },
      {
        title: "Indemnification (§8.2)",
        description:
          "Mutual indemnification for third-party claims arising from breach or negligence.",
        excerpt:
          '"Each party shall indemnify, defend, and hold harmless the other party from and against any claims, damages, or expenses arising from the indemnifying party\'s breach of this Agreement."',
      },
    ],
  };
}

export async function chatWithDocument(
  _documentId: string,
  _message: string
): Promise<string> {
  // POST /api/chat-with-document { documentId, message }
  await delay(1500);
  const responses = [
    "Based on my analysis of the document, the termination clause allows either party to end the agreement with 90 days written notice. For termination due to breach, a 30-day cure period applies.",
    "The liability cap is set at the total fees paid in the preceding 12-month period. Consequential, incidental, and punitive damages are explicitly excluded under §9.2.",
    "The confidentiality obligations survive for 3 years after termination of the agreement. This covers all proprietary information, trade secrets, and business data shared between the parties.",
    "The governing law is the State of Delaware, with disputes subject to binding arbitration under the AAA Commercial Arbitration Rules. The venue is Wilmington, Delaware.",
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Please upload a PDF or Word document (.pdf, .doc, .docx)";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "File size must be under 20 MB";
  }
  return null;
}
