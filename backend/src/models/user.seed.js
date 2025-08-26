import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "../lib/db.js";
import { User } from "./models.js";

// Get current file path (__dirname equivalent for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the root folder
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const seedUsers = [
  // Female Users
  {
    username: "emma.thompson",
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456",
  },
  {
    username: "olivia.miller",
    email: "olivia.miller@example.com",
    fullName: "Olivia Miller",
    password: "123456",
  },
  {
    username: "sophia.davis",
    email: "sophia.davis@example.com",
    fullName: "Sophia Davis",
    password: "123456",
  },
  {
    username: "ava.wilson",
    email: "ava.wilson@example.com",
    fullName: "Ava Wilson",
    password: "123456",
  },
  {
    username: "isabella.brown",
    email: "isabella.brown@example.com",
    fullName: "Isabella Brown",
    password: "123456",
  },
  {
    username: "mia.johnson",
    email: "mia.johnson@example.com",
    fullName: "Mia Johnson",
    password: "123456",
  },
  {
    username: "charlotte.williams",
    email: "charlotte.williams@example.com",
    fullName: "Charlotte Williams",
    password: "123456",
  },
  {
    username: "amelia.garcia",
    email: "amelia.garcia@example.com",
    fullName: "Amelia Garcia",
    password: "123456",
  },

  // Male Users
  {
    username: "james.anderson",
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    password: "123456",
  },
  {
    username: "william.clark",
    email: "william.clark@example.com",
    fullName: "William Clark",
    password: "123456",
  },
  {
    username: "benjamin.taylor",
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    password: "123456",
  },
  {
    username: "lucas.moore",
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    password: "123456",
  },
  {
    username: "henry.jackson",
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "123456",
  },
  {
    username: "alexander.martin",
    email: "alexander.martin@example.com",
    fullName: "Alexander Martin",
    password: "123456",
  },
  {
    username: "daniel.rodriguez",
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Rodriguez",
    password: "123456",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();
