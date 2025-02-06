import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import uploadRouter from "./routes/upload.route";
import songRouter from "./routes/song";
import mockupRouter from "./routes/mockup"
import { connectToDB } from "./database/database";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;
connectToDB();

app.use(express.json());
app.use(helmet());
app.use(cors({origin: '*'}));
app.use('/api/uploads', uploadRouter);
app.use('/api/songs', songRouter);
app.use('/api/mockup', mockupRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
