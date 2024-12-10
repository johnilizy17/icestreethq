/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PAYSTACK_URL: process.env.NEXT_PAYSTACK_URL,
    NEXT_PAYPAL_KEY: process.env.NEXT_PAYPAL_KEY,
  }
}

module.exports = nextConfig
