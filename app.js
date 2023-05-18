require("dotenv").config()
require("./db")
const express = require("express")

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

const userRoutes = require('./routes/user.routes')
app.use('/api', userRoutes)

const wineRoutes = require('./routes/wine.routes')
app.use('/api', wineRoutes)

const supportRoutes = require('./routes/support.routes')
app.use('/api', supportRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app)

module.exports = app
