const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://permanafarishelmi:AgTuvJ!T7UMpsm3@cluster0.m7mgaol.mongodb.net/notesDB");

const notesSchema = new mongoose.Schema({
    title: String,
    content: String,
  }, { timestamps: true });
  
  const Note = mongoose.model("notes", notesSchema);
  

app.get("/", function (req, res) {
  Note.find({}, function (err, foundNotes) {
    if (!err) {
      res.render("tampil", { notes: foundNotes });
    } else {
      res.send(err);
    }
  });
});

app.post("/", function (req, res) {
    let newNote = new Note({
      title: req.body.title,
      content: req.body.content,
    });
  
    newNote.save(function (err) {
      if (!err) {
        res.redirect("/");
      } else {
        res.send(err);
      }
    });
  });
  

app.listen(3001, function () {
  console.log("Server is running on port 3001");
});

module.exports = app;
