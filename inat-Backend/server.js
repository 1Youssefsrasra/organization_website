const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectToDatabase = require("./database");
const partnersRoutes = require("./routes/partnersRoutes");
const eventRoutes = require("./routes/eventRoutes");
const chiffresRoutes = require("./routes/chiffresRoutes");
const messageContactRoutes = require("./routes/messageContactRoutes");
const demandesRoutes = require("./routes/demandesRoutes");
const documentRoutes = require("./routes/documentRoutes");

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:3002','http://localhost:3000'] , 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

app.use(express.json());

connectToDatabase();

// Routes for different entities
app.use("/api/partners", partnersRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/chiffres", chiffresRoutes);
app.use("/api/messages", messageContactRoutes);
app.use("/api/demandes", demandesRoutes);
app.use("/api/documents", documentRoutes);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
