import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
