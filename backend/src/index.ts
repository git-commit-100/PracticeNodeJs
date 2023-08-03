import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res, next) => {
  res.send({ response: "NodeJs with Typescript" });
});

app.listen(PORT, () => {
  console.log(`Node running on port ${PORT}`);
});
