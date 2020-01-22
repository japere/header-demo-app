// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8085";

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.render("index", { title: "Home" });
});

app.get("/user", (req, res, next) => {
    var out = [];
    var name = "";
    var ctr = 0
    for(var item in req.headers){
        if(item.includes("accept")){
            out.push(item + ":" + req.headers[item]);
            ctr++;
        }

        if(item.includes("accept-encoding")){
            name = req.headers[item]
        }
    }
    res.render("user", { title: "Profile", userProfile: { headers: out, nickname: name } });
    next()
});

app.get("/logout", (req, res) => {
    res.render("logout", { title: "Logout", userProfile: { nickname: "Friend" } });
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});


