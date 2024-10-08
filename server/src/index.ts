import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-records";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));

const mongoURI: string ="mongodb+srv://ayushiagarwal260103:oFiQ6FaZ75B8yVG8@personal-finance-tracke.oi0v1.mongodb.net/";
mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
