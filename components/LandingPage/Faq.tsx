import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How do I upload files?",
    answer:
      "To upload files, Login first and click on the Upload File button located on the dashboard or within your organization's space. You can then select the file you wish to upload from your device and confirm the action.",
    value: "item-1",
  },
  {
    question: "Is there a limit to file size?",
    answer:
      "Yes, there is a limit to the size of the files you can upload. Currently, the maximum file size allowed is 100MB per upload. If you need to upload larger files, consider using a file compression tool.",
    value: "item-2",
  },
  {
    question: "How can I invite others to my organization?",
    answer:
      "To invite others to your organization, go to the organization's settings and navigate to the Members section. From there, you can click on the Invite Members button and enter the email addresses of the individuals you wish to invite. They will receive an email invitation to join your organization.",
    value: "item-3",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take the security and privacy of your data very seriously. All files uploaded to our platform are encrypted both in transit and at rest. Additionally, we employ industry-standard security measures to protect your information from unauthorized access or breaches.",
    value: "item-4",
  },
  {
    question: "Can I access my files from any device?",
    answer:
      "Yes, our platform is accessible from any device with an internet connection. Whether you're using a computer, tablet, or smartphone, you can log in to your account and access your files securely from anywhere, anytime.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="container py-32 mb-10 sm:py-32 ">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="w-full AccordionRoot">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  );
};
