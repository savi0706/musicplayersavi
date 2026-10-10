import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/connectDB.js";
import router from "./routes/authRoutes.js";
import songRouter from "./routes/songRouters.js";


dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

connectDB();
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: [clientUrl, "http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/auth", router);
app.use("/api/song", songRouter);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});