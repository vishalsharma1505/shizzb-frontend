import React from "react";
import Wrapper from "@/layout/wrapper";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import Image from "next/image";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

const AboutPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"About Us - ShizzB.in"} />
      <HeaderTwo />

      <div style={styles.page}>

        {/* ================= ABOUT US ================= */}
        <section style={styles.section}>
          <div style={styles.left}>
            <h1 style={styles.title}>About ShizzB.in</h1>
            <p style={styles.text}>
              ShizzB.in is a modern cosmetics and beauty eCommerce platform committed to 
              making online shopping simple, secure, and enjoyable for customers across India.
            </p>
            <p style={styles.text}>
              Our goal is to provide a trusted destination where people can discover quality skincare, 
              makeup, haircare, and beauty products, enjoy competitive prices, and experience a smooth 
              shopping journey from start to finish.
            </p>
          </div>

          <div style={styles.right}>
            <Image
  src="/assets/img/about/about1.jpg"
  alt="About ShizzB"
  width={612}
  height={358}
  style={styles.image}
/>
          </div>
        </section>

        {/* ================= OUR STORY ================= */}
        <section style={{ ...styles.section, flexDirection: "row-reverse" }}>
          <div style={styles.left}>
            <h2 style={styles.title}>Our Story</h2>
            <p style={styles.text}>
              Our goal is to provide a trusted destination where people can discover 
              quality skincare, makeup, haircare, and beauty products, enjoy competitive prices,
               and experience a smooth shopping journey from start to finish.
            </p>
            <p style={styles.text}>
              We recognized the need for a trusted online platform where customers could easily 
              discover skincare, makeup, haircare, and beauty products from reliable brands.
            </p>
            <p style={styles.text}>
              What started as a simple idea has grown into a dedicated beauty destination focused on 
              delivering quality products, great value, and a seamless shopping experience to customers across India.
            </p>
          </div>

          <div style={styles.right}>
            <Image
              src="/assets/img/about/story.png"
              alt="Our Story"
              width={500}
              height={500}
              style={styles.image}
            />
          </div>
        </section>

        {/* ================= FOUNDER ================= */}
<section
  style={{
    textAlign: "center",
    padding: "80px 0",
    background: "#fafafa",
    borderRadius: "20px",
    marginTop: "40px",
  }}
>
  <h2
    style={{
      fontSize: "34px",
      marginBottom: "15px",
      fontWeight: "700",
    }}
  >
    Founder
  </h2>

  <p
    style={{
      maxWidth: "700px",
      margin: "0 auto 50px",
      color: "#666",
      lineHeight: "1.8",
    }}
  >
    Leading the vision behind ShizzB.in with a commitment to making
    beauty and cosmetics shopping simple, reliable, and accessible
    across India.
  </p>

  <div
    style={{
      maxWidth: "420px",
      margin: "0 auto",
      background: "#fff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    }}
  >
    <div
      style={{
        position: "relative",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.querySelector(".founder-overlay").style.opacity = "1")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.querySelector(".founder-overlay").style.opacity = "0")
      }
    >
      <img
        src="/assets/img/founders/founder1.jpeg"
        alt="Founder"
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
        }}
      />

      <div
        className="founder-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.55)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "25px",
          opacity: 0,
          transition: "0.3s ease",
        }}
      >
        <a
          href="https://www.instagram.com/geetadagar10"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#fff" }}
        >
          <FaInstagram size={34} />
        </a>

        <a
          href="https://www.linkedin.com/in/geeta-dagar"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#fff" }}
        >
          <FaLinkedin size={34} />
        </a>
      </div>
    </div>

    <div
      style={{
        padding: "25px",
      }}
    >
      <h3
        style={{
          marginBottom: "8px",
          fontSize: "28px",
          fontWeight: "700",
        }}
      >
        Geeta Dagar
      </h3>

      <p
        style={{
          color: "#888",
          fontSize: "16px",
          marginBottom: "15px",
        }}
      >
        Founder & CEO
      </p>

      <p
        style={{
          color: "#555",
          lineHeight: "1.8",
          fontSize: "15px",
        }}
      >
        Passionate about beauty, innovation, and customer experience,
        Geeta Dagar founded ShizzB.in with a vision to create a trusted
        destination for premium cosmetics and skincare products.
      </p>
    </div>
  </div>
</section>

      </div>

      <Footer />
    </Wrapper>
  );
};

export default AboutPage;

/* ================= STYLES ================= */
const styles = {
  page: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "60px 20px",
  },

  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "40px",
    marginBottom: "80px",
    flexWrap: "wrap",
  },

  left: {
    flex: 1,
    minWidth: "300px",
  },

  right: {
    flex: 1,
    textAlign: "center",
    minWidth: "300px",
  },

  title: {
    fontSize: "34px",
    marginBottom: "15px",
    fontWeight: "700",
  },

  text: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#444",
    marginBottom: "12px",
  },

  image: {
  borderRadius: "15px",
  animation: "float 4s ease-in-out infinite",
  maxWidth: "100%",
  height: "auto",
},

  founderSection: {
    textAlign: "center",
    padding: "40px 0",
  },

  centerTitle: {
    fontSize: "32px",
    marginBottom: "40px",
    fontWeight: "700",
  },

  founderGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
  },

  card: {
    width: "250px",
    padding: "20px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    position: "relative",
  },

  imgBox: {
    position: "relative",
  },

  founderImg: {
    borderRadius: "50%",
    transition: "0.3s",
  },

  insta: {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#E1306C",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    opacity: 0,
    transition: "0.3s",
    textDecoration: "none",
  },
};

/* FLOAT ANIMATION */
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }

    .card:hover a {
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(style);
}