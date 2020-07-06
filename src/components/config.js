
const prod = {
    url: {
        API_URL: "https://fee-payment-server.herokuapp.com",
    }
};

const dev = {
    url: {
        API_URL: "http://localhost:4000/feePaymentDB"
    }
};

const API = process.env.NODE_ENV === "development" ? dev.url.API_URL : prod.url.API_URL;
export default API;