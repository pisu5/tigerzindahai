import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa"; // Importing icons for toggle

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "You can return items within 30 days of receipt for a full refund. Please ensure items are in their original condition.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping. Shipping costs will be calculated at checkout based on your location.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has shipped, you will receive a tracking number via email. You can use this number to track your order on our website.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and Google Pay.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact our customer support team via email at Anejasarees@gmail.com or by calling +91 9111123331.",
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-md shadow-sm">
              <button
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-100 text-left text-gray-900 font-semibold focus:outline-none"
                onClick={() => handleToggle(index)}
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <FaMinus className="text-gray-600" />
                ) : (
                  <FaPlus className="text-gray-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white text-gray-700 border-t border-gray-200">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
