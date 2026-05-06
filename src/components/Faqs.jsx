import { Container } from "./Container";

const faqs = [
  [
    {
      question: "What is Predictaf?",
      answer:
        "Predictaf brings digital transparency to all stakeholders in your property management business. With Predictaf, you can define user roles and permissions, ensuring that each user can only perform tasks relevant to their role. This role-based access allows facility owners to have a view-only overview of their properties and subsystems, offering a comprehensive snapshot at a glance. With role-based authorization, you have complete control over who can do what, putting the power in your hands.",
    },
  ],
  [
    {
      question:
        "How does Predictaf differ from other property management software?",
      answer:
        "Most property management software focuses on business financials, tenant relationships, and work orders. Predictaf, however, is purpose-built for mechanical systems. It automates the maintenance of these systems, enabling property management companies to enhance property upkeep and instantly access maintenance information.",
    },
  ],
];

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-borderPrimary dark:border-borderPrimary-dark py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium font-['Funnel_Display'] tracking-normal leading-normal text-textPrimary dark:text-textPrimary-dark"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg font-['Roboto'] tracking-normal leading-normal text-textSecondary dark:text-textSecondary-dark">
            If you have anything else you want to ask,{" "}
            <a
              href="mailto:info@predictaf.com"
              className="text-brandPrimary dark:text-brandPrimary-dark underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold font-['Funnel_Display'] tracking-normal leading-normal leading-6 text-textPrimary dark:text-textPrimary-dark">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm font-['Roboto'] tracking-normal leading-normal text-textSecondary dark:text-textSecondary-dark">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
