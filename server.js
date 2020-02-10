const express = require("express");
const path = require("path");
const fs = require("fs")
const db = require("./db/db.json")
const app = express();
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 7000;

console.log(db)

app.get("/api/notes", function(req, res) {
    res.json(db);
})

app.post("/api/notes", function(req, res){
    let id = db[db.length-1].id+1;
    let data = req.body;
    data["id"]=id;
    console.log(data);
    db.push(data);
    console.log(db);
    res.redirect("/notes");
})

// app.delete("/api/notes/:id", function(req, res) {
//     let data = req.body;
//     console.log(req.params.id);
//     db.filter(!req.params.id);
//     console.log(req.params.id);
//     res.redirect("/notes");
// //   function filterid() {
//        let id = req.params.id;
//        for (let i = 0; i < db.length; i++) {
//          const element = array[i];
         
//        }
// //   return age >= 18;
// // }
// })

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});