/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.ibb.co",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "dummyimage.com",
      "images-static.nykaa.com",
      "www.lakmeindia.com"
    ],
  },
};

module.exports = nextConfig;