require("dotenv").config();
const express = require("express");
const passport = require("passport");
require("./src/utils/passport")
const authRoutes = require("./src/routes/auth");
const mongoose = require("mongoose");
const crapRoutes = require("./src/routes/crap");
// const session = require("express-session");
// const cookieParser = require("cookie-parser");
//    http://localhost:1505/auth/google
const app = express();


//tempoary will change /remove session


//leftWare
app.use(express.json());
app.use(passport.initialize());
// app.use(passport.session());
app.use(express.urlencoded({extended: true}));

// app.use(cors({origin: "http://localhost:1505",
//     methods: "GET,POST,PUT,DELETE",
//     credentials: true,}));

//chemin 😂
app.use("/auth", authRoutes);
app.use("/api/crap", crapRoutes);
app.use("/test", crapRoutes);




//duck duck goooose 🦆
mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("DUCK DUCK GOOOOSE 🦆 ✅"))
    .catch((erreur)=> console.log("ducky is hurt 😢 retry plz!",erreur));


// dis starts the server in case you were wondering :)
const PORT = process.env.PORT || 1505;
app.listen(PORT, () => console.log("Serveur is 🏃🏼‍♂️💨💨💨💨💨💨"))



//AUTH' mounts them to the auth routes under /auth -  Any request starting with /auth will be handled by authRoutes (which we defined earlier).
//uri connects a partir du .env file - urlparser and unifiedtopology are options for the connection dont care bout them but u need em.
