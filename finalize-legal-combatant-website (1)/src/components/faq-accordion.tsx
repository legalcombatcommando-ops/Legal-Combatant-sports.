"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div className={`faq-item${isOpen ? " is-open" : ""}`} key={faq.question}>
            <h3>
              <button
                id={`faq-question-${index}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="faq-number">0{index + 1}</span>
                <span className="faq-question">{faq.question}</span>
                <span className="faq-icon"><Plus size={21} strokeWidth={1.7} aria-hidden="true" /></span>
              </button>
            </h3>
            {isOpen && (
              <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
