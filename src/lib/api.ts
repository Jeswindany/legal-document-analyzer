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

export interface Clause {
  clause_type: string;
  label: string;
  confidence: number;
  text: string;
}

export interface ClauseGroups {
  termination: Clause[];
  confidentiality: Clause[];
  liability: Clause[];
  governance: Clause[];
  finance: Clause[];
}

export interface ClauseExtractionResult {
  groups: ClauseGroups;
  total_clauses_found: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function analyzeDocument(
  _file: File,
): Promise<{ documentId: string }> {
  // POST /api/analyze-document  multipart/form-data { file }
  await delay(3000);
  return { documentId: "doc_" + Math.random().toString(36).slice(2, 10) };
}

export async function classifyClauses(
  file: File,
): Promise<ClauseExtractionResult> {
  const formData = new FormData();
  formData.append("file", file);

  // const res = await fetch("http://localhost:3000/classify/clauses", {
  //   method: "POST",
  //   body: formData,
  // });

  // Mock data for testing UI
  const res = {
    groups: {
      termination: [
        {
          clause_type: "termination",
          label: "Terminations",
          confidence: 0.8539,
          text: "On termination of the tenancy or earlier, the Tenant shall restore the changes made, if any, to the original state.",
        },
        {
          clause_type: "termination",
          label: "Terminations",
          confidence: 0.6822,
          text: "The Tenant shall hand over the vacant and peaceful possession of the Leased Premises on termination of the lease period, in the same condition subject to natural wear and tear.",
        },
        {
          clause_type: "termination",
          label: "Terminations",
          confidence: 0.9986,
          text: "Notice Period - The lease shall terminate at the end of the lease period as referred above or by a prior notice of 1 month by either parties, after the lock-in period, if any.",
        },
        {
          clause_type: "termination",
          label: "Terminations",
          confidence: 0.6314,
          text: "Percentage increase in Rent - The lease may be extended further on termination by both parties on mutual consent with 5% increase in the monthly rent.",
        },
        {
          clause_type: "termination",
          label: "Terminations",
          confidence: 0.9945,
          text: "Non-Payment of Rent - If the Tenant fails to pay the monthly rent for a continuous period of two months, or if the Tenant fails to abide by any of the covenants above, the Landlord may terminate the lease.",
        },
        {
          clause_type: "termination",
          label: "Terminations",
          confidence: 0.9977,
          text: "If the Tenant cannot use the premises or any part thereof for residential purposes because of natural calamities or any commotions, or is acquired by any Government authority, the Tenant shall have the right to terminate the lease forthwith and vacate the premises and the Landlord shall refund the deposits and advance payments to the Tenant.",
        },
        {
          clause_type: "termination",
          label: "Forfeitures",
          confidence: 0.584,
          text: "Refund of Security Deposit - The Security deposit shall be refunded by the Landlord to the Tenant at the time of handing over possession of the Leased Premises by the Tenant upon expiry or sooner termination of this lease after adjusting the dues (if any) or cost towards damages caused by the negligence of the Tenant or the person he is responsible for.",
        },
        {
          clause_type: "termination",
          label: "Terminations",
          confidence: 0.7286,
          text: "Non-refund by Landlord - In case the Landlord fails to refund the security deposit to the Tenant on early termination or expiry of the lease agreement, the Tenant is entitled to hold possession of the leased premises, without payment of rent and/or any other charges whatsoever, till such time the Landlord refunds the security deposit to the Tenant.",
        },
        {
          clause_type: "termination",
          label: "Terminations",
          confidence: 0.9928,
          text: "Lock in Period - The lease shall have a lock-in period of 2 months before which termination is not possible by either parties.",
        },
        {
          clause_type: "termination",
          label: "Terminations",
          confidence: 0.9821,
          text: "If either party terminates the lease during the lock-in period, then they shall pay a sum equal to two months rent to the other party.",
        },
      ],
      confidentiality: [],
      liability: [
        {
          clause_type: "liability",
          label: "Waivers",
          confidence: 0.582,
          text: "If during these 3 weeks any defect in the same is identified & duly notified, the Landlord shall be responsible to repair/ replace the same at his own cost.",
        },
        {
          clause_type: "liability",
          label: "Warranties",
          confidence: 0.8988,
          text: "The Landlord represents that the Leased Premises is free from all construction defects such as leakage, cracks in house walls including that of compound walls, breakage of floor tiles, etc.",
        },
        {
          clause_type: "liability",
          label: "Remedies",
          confidence: 0.8395,
          text: "Late Payment Fine - If the Tenant fails to pay the rent on the fixed date of payment, he shall be liable to pay a fine at the rate of 50/- (Rupees Fifty only) per day till the date of payment.",
        },
        {
          clause_type: "liability",
          label: "Indemnity",
          confidence: 0.9221,
          text: "The Landlord shall indemnify the Tenant against all damages, costs and expenses incurred by the Tenant as a result of any defect in the title of the Landlord which disturbs the possession and enjoyment of the Leased Premises by the Tenant under the covenants herein before contained.",
        },
        {
          clause_type: "liability",
          label: "Remedies",
          confidence: 0.9974,
          text: "This is in addition to the other legal remedies available to the Tenant to recover the amount from the Landlord.",
        },
        {
          clause_type: "liability",
          label: "Remedies",
          confidence: 0.9619,
          text: "Overstay - In case, where the premises are not vacated by the Tenant, on the termination of the lease period, the Tenant will pay damages calculated twice the rent for any period of occupation commencing from the expiry of the lease period.",
        },
        {
          clause_type: "liability",
          label: "No Waivers",
          confidence: 0.8626,
          text: "The payment of damages as aforesaid will not preclude the Landlord from initiating legal proceedings against the Tenant for the same.",
        },
      ],
      governance: [
        {
          clause_type: "governance",
          label: "Assignments",
          confidence: 0.9984,
          text: "The Tenant shall not sublet, assign or part with the Leased Premises in whole or part thereof to any person under any circumstance whatsoever and the same shall be used for the bonafide residential purposes of the Tenant and his family and guests.",
        },
        {
          clause_type: "governance",
          label: "Assignments",
          confidence: 0.9861,
          text: "In the event the Landlord sells, transfers or alienates the leased premises or any part thereof or its right, title and interest, then the Landlord shall terminate the lease after giving two months notice to the Tenant.",
        },
        {
          clause_type: "governance",
          label: "Authority",
          confidence: 0.9915,
          text: "The Tenant and the Landlord represent and warrant that they are fully empowered and competent to make this lease.",
        },
      ],
      finance: [
        {
          clause_type: "finance",
          label: "Fees",
          confidence: 0.583,
          text: "The Tenant shall pay the Landlord a monthly rent of 15,000/(Rupees Fifteen Thousand only).",
        },
        {
          clause_type: "finance",
          label: "Payments",
          confidence: 0.9989,
          text: "The rent shall be paid on or before day 7 of each English Calendar Month.",
        },
        {
          clause_type: "finance",
          label: "Interests",
          confidence: 0.9974,
          text: "The Tenant shall pay the Landlord an interest-free, refundable, security deposit of 30,000/- (Rupees Thirty Thousand only).",
        },
        {
          clause_type: "finance",
          label: "Payments",
          confidence: 0.9986,
          text: "The deposit amount is paid as an advance booking amount of 10,000/- (Rupees Ten Thousand Only) by Online Transfer No.",
        },
        {
          clause_type: "finance",
          label: "Expenses",
          confidence: 0.9367,
          text: "The Tenant shall pay to the Landlord a monthly maintenance charge of 200/- (Rupees Two Hundred only) towards Maintenance of the “Leased Premises”.",
        },
        {
          clause_type: "finance",
          label: "Fees",
          confidence: 0.8657,
          text: "And it is the responsibility of the Tenant to pay the same up to the date of vacating the property at the time of handing over possession of the premises back to the Landlord.",
        },
        {
          clause_type: "finance",
          label: "Expenses",
          confidence: 0.9926,
          text: "will be the responsibility of the Tenant at his own expense.",
        },
        {
          clause_type: "finance",
          label: "Payments",
          confidence: 0.9964,
          text: "The Landlord shall acknowledge and give valid receipts for each and every payment made by the Tenant to the Landlord.",
        },
        {
          clause_type: "finance",
          label: "Taxes",
          confidence: 0.9527,
          text: "The Landlord represents that he has complied with all the statutory payments of the property including that of taxes, penalties, electric charges, water charges etc if any.",
        },
        {
          clause_type: "finance",
          label: "Taxes",
          confidence: 0.8816,
          text: "The Landlord also represents that there is no Charge including mortgage due existing on the Leased Premises which would affect the peaceful possession by the Tenant of the Leased Premises.",
        },
        {
          clause_type: "finance",
          label: "Interests",
          confidence: 0.9981,
          text: "No interest shall be paid on the deposit amount.",
        },
      ],
    },
    total_clauses_found: 38,
  };

  // if (!res.ok) {
  //   throw new Error("Clause classification failed");
  // }

  // return res.json();

  return res;
}

export async function fetchResults(
  _documentId: string,
): Promise<AnalysisResult> {
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
  _message: string,
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
