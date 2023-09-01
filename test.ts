const APIKEY =
  "F1Dk66WSGvl5eT1Nqz2ESN24ZrORCDGywvr38xHkZA8VsXWGRSxKtoclJ6vBmB5QEPphqx470QlV6tXsB2NDIHN7oiVeryPFHMIZOpxvl4j57MHgs9WUeJi1l4NAvdjSF1Dk66WSGvl5eT1Nqz2ESN24ZrORCDGywvr38xHkZA8VsXWGRSxKtoclJ6vBmB5QEPphqx470QlV6tXsB2NDIHN7oiVeryPFHMIZOpxvl4j57MHgs9WUeJi1l4NAvdjS";

const data = {
  amount: "15",
  currency: "USD",
  order_id: "4353453",
};

const jsonData = JSON.stringify(data).replace(/\//gm, "\\/");

const sign = require("crypto")
  .createHash("md5")
  .update(Buffer.from(jsonData).toString("base64") + APIKEY)
  .digest("hex");

console.log("sign");
console.log(sign);
