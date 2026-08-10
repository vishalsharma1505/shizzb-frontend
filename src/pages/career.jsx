import React from "react";
import Wrapper from "@/layout/wrapper";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import Image from "next/image";

const CareerPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Careers - ShizzB.in"} />
      <HeaderTwo />

      <div className="career-wrapper">
        {/* LEFT SIDE */}
        <div className="career-left">
          <h1>Build Your Career With ShizzB.in</h1>

          <p>
            At <strong> ShizzB.in </strong>, we believe that success comes from passionate
             people who are dedicated, creative, and committed to excellence. 
             We are always looking for talented individuals who want to grow their 
             careers in a dynamic and fast-paced environment while contributing to the
              growth of a modern beauty and cosmetics brand.
          </p>

          <p>
            We offer an opportunity to work with a team that values innovation, collaboration,
             and continuous improvement. If you are motivated, enthusiastic, and ready to be part
              of an exciting journey, we would love to hear from you.
          </p>

          <div className="email-box">
            📩 Send your CV at:{" "}
            <a href="mailto:career@shizzb.in">career@shizzb.in</a>
          </div>

          <p className="note">
            Our team carefully reviews every application and contacts shortlisted 
            candidates for the next steps in the hiring process.
          </p>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="career-right">
          <div className="image-wrapper">
            <Image
              src="/assets/img/career/career.jpg"
              alt="Careers at ShizzB"
              width={360}
              height={360}
              className="career-image"
            />
          </div>
        </div>
      </div>

      <Footer />

      {/* CSS */}
      <style jsx>{`
  .career-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 70px auto;
    padding: 20px;
    gap: 50px;
  }

  .career-left {
    flex: 1 1 500px;
    min-width: 0;
  }

  .career-left h1 {
    font-size: 38px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #111;
    line-height: 1.2;
  }

  .career-left p {
    font-size: 16px;
    line-height: 1.8;
    color: #444;
    margin-bottom: 15px;
  }

  .email-box {
    margin-top: 20px;
    padding: 15px 18px;
    background: linear-gradient(135deg, #f8f9ff, #eef1ff);
    border-left: 4px solid #4f46e5;
    border-radius: 10px;
    font-size: 16px;
  }

  .email-box a {
    color: #4f46e5;
    font-weight: 600;
    text-decoration: none;
    word-break: break-word;
  }

  .note {
    margin-top: 15px;
    font-size: 14px;
    color: #777;
  }

  .career-right {
  flex: 1 1 500px;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper {
  width: 100%;
  max-width: 520px;
  display: flex;
  justify-content: center;
  animation: float 4s ease-in-out infinite;
}

.career-image {
  display: block;
  width: 100%;
  height: auto;
  max-width: 520px;
  object-fit: contain;
  border-radius: 20px;
  transition: transform 0.4s ease;
}

  .image-wrapper:hover .career-image {
    transform: scale(1.05);
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(-12px);
    }

    100% {
      transform: translateY(0px);
    }
  }

  /* Tablet */
  @media (max-width: 991px) {
    .career-wrapper {
      gap: 35px;
      margin: 50px auto;
    }

    .career-left h1 {
      font-size: 34px;
    }
  }

  /* Mobile */
  @media (max-width: 768px) {
  .career-wrapper {
    flex-direction: column;
    text-align: center;
    margin: 35px auto;
    padding: 20px 15px;
    gap: 30px;
  }

  .career-left {
    width: 100%;
  }

  .career-right {
    width: 100%;
    flex: none;
  }

  .image-wrapper {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .career-image {
    width: 100%;
    height: auto;
    max-width: 500px;
    object-fit: contain;
  }
}

@media (max-width: 480px) {
  .career-wrapper {
    padding: 15px 12px;
  }

  .career-right {
    width: 100%;
  }

  .image-wrapper {
    width: 100%;
    max-width: 100%;
  }

  .career-image {
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 15px;
  }
}

  /* Small mobile */
  @media (max-width: 480px) {
    .career-wrapper {
      margin: 25px auto;
      padding: 15px 12px;
      gap: 25px;
    }

    .career-left h1 {
      font-size: 26px;
    }

    .career-left p {
      font-size: 14px;
      line-height: 1.65;
    }

    .email-box {
      font-size: 14px;
      padding: 12px;
    }

    .note {
      font-size: 13px;
    }

    .career-image {
      border-radius: 12px;
    }
  }
`}</style>
    </Wrapper>
  );
};

export default CareerPage;