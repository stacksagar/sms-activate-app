const https = require("https");

const APIKEY =
  "F1Dk66WSGvl5eT1Nqz2ESN24ZrORCDGywvr38xHkZA8VsXWGRSxKtoclJ6vBmB5QEPphqx470QlV6tXsB2NDIHN7oiVeryPFHMIZOpxvl4j57MHgs9WUeJi1l4NAvdjS";
const MERCHANTID = "e5aaf612-efd1-4b78-98bf-376f887246a9";

const data = {
  amount: "15",
  currency: "USD",
  network: "tron",
  order_id: "1",
  url_callback: "https://example.com",
};

const jsonData = JSON.stringify(data);
const sign = require("crypto")
  .createHash("md5")
  .update(Buffer.from(jsonData).toString("base64") + APIKEY)
  .digest("hex");

const options = {
  hostname: "api.cryptomus.com",
  path: "/v1/payment",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    merchant: MERCHANTID,
    sign: sign,
  },
};

const req = https.request(options, (res: any) => {
  let body = "";
  res.on("data", (chunk: any) => {
    body += chunk;
  });
  res.on("end", () => {
    const original_data = JSON.parse(body);
    console.log(original_data);
  });
});

req.on("error", (error: any) => {
  console.error(error);
});

req.write(jsonData);
req.end();
