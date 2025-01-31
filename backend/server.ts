import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import router from "./routes/upload.route";
import { connectToDB } from "./database/database";

// Load environment variables
dotenv.config();

// Initialize express
const app = express();

// Define the port
const PORT = process.env.PORT || 8080;

// Connect to the database
connectToDB();

// Default middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({origin: '*'}));

// Routes
app.use('/api', router)

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
