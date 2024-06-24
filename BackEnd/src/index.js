import express from "express";
import cors from "cors";
import adminRouter from "./FireBase/adminRoute.js"; 
const port = 3000;

const app = express();
app.use(express.json()); // Ensure JSON parsing middleware is used

app.use(cors({ origin: "*"}));
app.use("/admin", adminRouter);


app.get("/", (req, res) => {
  res.send("hello world nguyen");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
