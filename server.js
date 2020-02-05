var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var port = 3000 ||  process.env.PORT;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/api/notes", (req,res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data)=> {
    const json = JSON.parse(data);
    res.json(json);
  });
});

app.post("/api/notes",(req, res) => {
  const newNote = req.body;
  // console.log(req.body)
  // const parsedNote = JSON.stringify(newNote);
  fs.readFile("./db/db.json", "utf-8", (err,data) => {
    // res.send(data);
    const parsedArray = JSON.parse(data);
    parsedArray.push(newNote);
    console.log(parsedArray);
    const stringifyArray = JSON.stringify(parsedArray);
    fs.writeFile("./db/db.json", stringifyArray,"utf-8", (err) => {
      if(err) throw err;
  
    });
    res.json(parsedArray);
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const query = req.params;
  fs.readFile("./db/db.json", "utf-8", (err,data) => {
    const parsedArray = JSON.parse(data);
    idArray = parsedArray.map((note,index) => {
      note.id = index;
    });
    const filteredArr = parsedArray.filter(note => note.id !==
      parseInt(query.id));

    fs.writeFile("./db/db.json", filteredArr, "utf-8", err =>  {
      if (err) throw err;
    });
    res.json(filteredArr);
  });
});

app.get("/notes",(req,res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("*",(req, res) => {
  return res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.listen(port, console.log(`server is running on port ${port}`));
