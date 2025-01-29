import express, {Request, Response} from "express";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// Sample route
app.get("/", (req : Request, res: Response) => {
  res.send("Hello, Express with TypeScripssst");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
