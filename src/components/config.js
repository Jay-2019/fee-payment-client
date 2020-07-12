// configuration for production and local host.

// this API_URL is used for production mode.
const prod = {
    url: {
        API_URL: "https://fee-payment-server.herokuapp.com/feePaymentDB",
    }
};
// this API_URL is used for development mode.
const dev = {
    url: {
        API_URL: "http://localhost:4000/feePaymentDB"
    }
};

const API = process.env.NODE_ENV === "development" ? dev.url.API_URL : prod.url.API_URL;
export default API;