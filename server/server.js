const express = require("express");
const cors = require("cors");
const session = require("express-session");
const usersRouter = require("./routes/users"); // your new users route
const auditRoute = require("./routes/auditRoute");
const reportsRouter = require('./routes/Reports');




require("dotenv").config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // 👈 your frontend origin
  credentials: true                // 👈 allows cookies to be sent
}));

app.use(express.json());
app.use('/api/reports', reportsRouter);


app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/audit", auditRoute);
app.use("/api/users", usersRouter);  // This handles signup/login now

// Your other routes and error handlers...

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
