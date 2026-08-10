import React, { useState } from "react";
import Wrapper from "@/layout/wrapper";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import Image from "next/image";

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What products are available on ShizzB.in?",
      answer:
        "We offer a wide range of beauty and cosmetic products including skincare, makeup, haircare, personal care, and beauty essentials.",
    },
    {
      question: "Are all products on ShizzB.in genuine?",
      answer:
        "Yes, all products listed on ShizzB.in are sourced from trusted suppliers and brands to ensure quality and authenticity.",
    },
    {
      question: "How can I place an order?",
      answer:
        "Simply browse products, add items to your cart, proceed to checkout, enter your shipping details, and complete your payment.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept UPI, Debit Cards, Credit Cards, Net Banking, and other secure payment methods available during checkout.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, tracking information will be shared through email or other communication channels.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Orders may be cancelled before they are processed or shipped. Contact support as soon as possible.",
    },
    {
      question: "Do you offer returns or refunds?",
      answer:
        "Yes, eligible products may qualify for returns or refunds according to our Return & Refund Policy.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery timelines depend on your location and product availability. Most orders are delivered within the estimated timeframe.",
    },
    {
      question: "How can I contact customer support?",
      answer: (
        <>
          You can contact our support team anytime at{" "}
          <a href="mailto:support@shizzb.in">
            support@shizzb.in
          </a>
        </>
      ),
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use industry-standard security practices to protect your personal information and payment details.",
    },
  ];

  return (
    <Wrapper>
      <SEO pageTitle={"FAQ - ShizzB.in"} />
      <HeaderTwo />

      <div style={styles.container}>
        {/* LEFT SIDE IMAGE */}
        <div style={styles.left}>
          <Image
            src="/assets/img/faq/faq.png"
            alt="FAQ"
            width={359}
            height={347}
            style={styles.image}
          />
        </div>

        {/* RIGHT SIDE FAQ */}
        <div style={styles.right}>
          <h1 style={styles.title}>Frequently Asked Questions</h1>

          {faqs.map((faq, index) => (
            <div key={index} style={styles.faqBox}>
              <div
                style={styles.questionRow}
                onClick={() =>
                  setOpenFAQ(openFAQ === index ? null : index)
                }
              >
                <h4 style={{ margin: 0 }}>{faq.question}</h4>

                <span style={styles.plus}>
                  {openFAQ === index ? "−" : "+"}
                </span>
              </div>

              {openFAQ === index && (
                <p style={styles.answer}>{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </Wrapper>
  );
};

export default FAQPage;

const styles = {
  container: {
    maxWidth: "1300px",
    margin: "70px auto",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "50px",
    flexWrap: "wrap",
  },

  left: {
    flex: 1,
    minWidth: "350px",
    textAlign: "center",
  },

  right: {
    flex: 1.2,
    minWidth: "350px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "30px",
  },

  faqBox: {
    background: "#fff",
    padding: "20px",
    marginBottom: "18px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },

  questionRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },

  plus: {
    fontSize: "28px",
    fontWeight: "700",
    marginLeft: "15px",
  },

  answer: {
    marginTop: "15px",
    color: "#555",
    lineHeight: "1.8",
  },

  image: {
    borderRadius: "20px",
    animation: "float 4s ease-in-out infinite",
  },
};

// Floating animation
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
      100% { transform: translateY(0px); }
    }
  `;
  document.head.appendChild(style);
}