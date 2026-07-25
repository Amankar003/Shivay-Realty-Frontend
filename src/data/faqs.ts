export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  display_order: number;
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What makes Shivaay Realty different?",
    answer: "We carefully curate premium residential and commercial projects from India's most trusted developers, helping buyers invest confidently.",
    category: "general",
    display_order: 0
  },
  {
    id: "2",
    question: "Do you charge buyers any brokerage?",
    answer: "Our pricing depends on the project and builder. Many projects are available with zero brokerage for buyers.",
    category: "buying",
    display_order: 1
  },
  {
    id: "3",
    question: "Which cities do you operate in?",
    answer: "We currently showcase luxury properties across Gurgaon, Noida, Greater Noida, Delhi NCR, Mumbai, Pune, Hyderabad and Bangalore.",
    category: "general",
    display_order: 2
  },
  {
    id: "4",
    question: "Can I schedule a site visit?",
    answer: "Yes. Click \"Book a Visit\" and our team will arrange a personalized property tour.",
    category: "buying",
    display_order: 3
  },
  {
    id: "5",
    question: "Are all projects RERA approved?",
    answer: "We primarily feature projects from reputed builders and recommend verifying RERA registration before final purchase.",
    category: "legal",
    display_order: 4
  },
  {
    id: "6",
    question: "Do you help with home loans?",
    answer: "Yes. We can connect buyers with leading banking partners for home loan assistance.",
    category: "loans",
    display_order: 5
  },
  {
    id: "7",
    question: "Can NRIs invest through Shivaay Realty?",
    answer: "Absolutely. We assist NRI clients throughout the property buying process.",
    category: "investment",
    display_order: 6
  },
  {
    id: "8",
    question: "How do I contact your team?",
    answer: "Use the Contact Form, WhatsApp button or Book a Visit.",
    category: "general",
    display_order: 7
  }
];
