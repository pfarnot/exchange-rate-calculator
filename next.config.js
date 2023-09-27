/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY_Oanda: process.env.Oanda_API_KEY,
    API_KEY_ExchangeRate: process.env.ExchangeRate_API_Key
  }
}

module.exports = nextConfig
