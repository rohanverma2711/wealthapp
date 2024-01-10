// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB (replace 'your-mongodb-uri' with your MongoDB URI)
mongoose.connect(
  "mongodb+srv://rohanverma:robin@cluster0.oqhdvmw.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define a Code schema
const codeSchema = new mongoose.Schema({
  value: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Code = mongoose.model("Code", codeSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/api/codes", async (req, res) => {
  try {
    // Generate a new code
    const newCode = generateCode();

    // Save the code to the database
    const code = new Code({ value: newCode });
    await code.save();

    res.json({ code: newCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/codes/use", async (req, res) => {
  try {
    const enteredCode = req.body.code;

    // Check if the code exists in the database
    const code = await Code.findOne({ value: enteredCode });

    if (!code) {
      return res.status(400).json({ error: "Enter a valid code" });
    }

    // Check if the code has expired
    const expirationTime = 60 * 1000; // 60 seconds
    const currentTime = new Date();

    if (currentTime - code.createdAt > expirationTime) {
      return res.status(400).json({ error: "The code has expired" });
    }

    // Check if the code has already been used
    if (code.used) {
      return res.status(400).json({ error: "This code has already been used" });
    }

    // Mark the code as used
    code.used = true;
    await code.save();

    res.json({ message: "Code is correct" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Helper function to generate a random code
function generateCode() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const codeLength = Math.floor(Math.random() * 2) + 5; // Random length between 5 and 6
  let code = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
