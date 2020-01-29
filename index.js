// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const envconfig = require('dotenv').config();

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
    var msg = ""
    var name = "";
    var ctr = 0
    for(var item in req.headers){
        if(item.includes("ps_sso")){
            out.push(item + ":" + req.headers[item]);
            ctr++;
        }

        if(item.includes("ps_sso_first")){
            name = req.headers[item]
        }
    }
    if(ctr == 0){
        msg = "Unfortunately, it looks like you did not send the correct headers.";
        name = "friend"
    }
    res.render("user", { title: "Profile", userProfile: { headers: out, nickname: name }, message: msg });
    next()
});

app.get("/logout", (req, res, next) => {
    var name = "";
    var ctr = 0
    for(var item in req.headers){
        if(item.includes("ps_sso_first")){
            name = req.headers[item]
            ctr++
        }
    }
    if(ctr == 0){
        name = "friend"
    }
    res.render("logout", { title: "Logout", userProfile: { nickname: name } });
    next()
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});


