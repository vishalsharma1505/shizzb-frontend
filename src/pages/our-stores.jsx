import React from "react";
import Wrapper from "@/layout/wrapper";
import SEO from "@/components/seo";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";

const stores = [
  {
    city: "Faridabad",
    address: "5B/18 ,NIT-5, Near Bake Bihari Mandir 121001",
    phone: "+91 7056000569",
    map: "https://www.google.com/maps/place/Shizzb+cosmetic+office+in+faridabad/@28.4026785,77.3000898,17z/data=!4m14!1m7!3m6!1s0x390cdd32327f6cdb:0xc55d3f60a0f4be5b!2sShizzb+cosmetic+office+in+faridabad!8m2!3d28.4026738!4d77.3026647!16s%2Fg%2F11y3hrxq3q!3m5!1s0x390cdd32327f6cdb:0xc55d3f60a0f4be5b!8m2!3d28.4026738!4d77.3026647!16s%2Fg%2F11y3hrxq3q?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
    image: "/assets/img/stores/store1.jpg",
  },

  {
    city: "Dehradun",
    address: "Chowk, Shimla Bypass Rd, near Post Office, Subhash Nagar, Dehradun, Shewala Kala, Uttarakhand 248171",
    phone: "+91 7906107631",
    map: "https://www.google.com/maps/place/SHIZZB+Makeover+%26+academy/@30.2932966,77.9957669,17z/data=!3m1!4b1!4m6!3m5!1s0x39092bc5bd3bd46f:0xd72aa99d2b863099!8m2!3d30.293292!4d77.9983418!16s%2Fg%2F11td9jlrj5?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
    image: "/assets/img/stores/dehradun-1.webp",
  },

  {
    city: "Dehradun-2",
    address: "Buddi, Dehradun, Uttarakhand 248007",
    phone: "+91 7906107631",
    map: "https://www.google.com/maps/place/ShizzB+Makeover+by+Kavita+Sheoran/@30.2979357,77.9312421,17z/data=!3m1!4b1!4m6!3m5!1s0x39092b03aaad4057:0xdd38b103f528e122!8m2!3d30.2979311!4d77.933817!16s%2Fg%2F11vqkzw9hc?entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D",
    image: "/assets/img/stores/dehradun-2.jpeg",
  },
];

const StoresPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Our Stores - ShizzB.in"} />
      <HeaderTwo />

      <div
        style={{
          maxWidth: "1300px",
          margin: "70px auto",
          padding: "20px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "700",
              marginBottom: "15px",
            }}
          >
            Our Stores
          </h1>

          <p
            style={{
              color: "#666",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
          >
            Visit your nearest ShizzB store and explore our collection of
            beauty, skincare, makeup, and cosmetic products.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))",
            gap: "30px",
          }}
        >
          {stores.map((store, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              {/* IMAGE + OVERLAY */}
              <div style={{ position: "relative" }}>
                <img
                  src={store.image}
                  alt={store.city}
                  style={{
                    width: "100%",
                    height: "320px",
                    objectFit: "cover",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "15px",
                    right: "15px",
                    bottom: "15px",
                    background: "rgba(0,0,0,0.75)",
                    color: "#fff",
                    padding: "15px",
                    borderRadius: "12px",
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#fff",
                    }}
                  >
                    ShizzB {store.city}
                  </h3>

                  <p
                    style={{
                      marginTop: "8px",
                      marginBottom: 0,
                      fontSize: "14px",
                      lineHeight: "1.7",
                      color: "#fff",
                    }}
                  >
                    📍 {store.address}
                  </p>
                </div>
              </div>

              {/* BUTTONS */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "20px",
                }}
              >
                <a
                  href={store.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#000",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Get Directions
                </a>

                <a
                  href={`tel:${store.phone}`}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    background: "#28a745",
                    color: "#fff",
                    padding: "12px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Call Us
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </Wrapper>
  );
};

export default StoresPage;