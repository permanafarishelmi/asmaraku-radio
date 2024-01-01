const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://permanafarishelmi:AgTuvJ!T7UMpsm3@cluster0.m7mgaol.mongodb.net/notesDB");

const notesSchema = new mongoose.Schema({
  title: String,
  content: String,
}, { timestamps: true });

const Note = mongoose.model("notes", notesSchema);


app.set("views", __dirname);
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  Note.find({}, function (err, foundNotes) {
    if (!err) {
      res.render("index", { notes: foundNotes });
    } else {
      res.send(err);
    }
  });
});

app.post("/", function (req, res) {
  let newNote = new Note({
    title: req.body.title,
    content: req.body.content,
    date: req.body.date, // Menggunakan field date dari formulir HTML
  });
  newNote.save();
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});

module.exports = app;
