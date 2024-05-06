const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config;
const connectionString = process.env.PORT || 4000;

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(connectionString)
  .then(client => {
    console.log("Connected to Database");
    const db = client.db("Motivational-quotes");
    const quotesCollection = db.collection("quotes");

    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then(results => {
          res.render("index.ejs", { quotes: results });
        })
        .catch(error => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then(result => {
          res.redirect("/");
        })
        .catch(error => console.error(error));
    });

    app.put("/quotes", (req, res) => {
      quotesCollection
        .findOneAndUpdate(
          { name: "Brene Brown" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then(result => {
          res.json("Success");
        })
        .catch(error => console.error(error));
    });
    app.delete("/quotes", (req, res) => {
      quotesCollection
        .deleteOne({ name: req.body.name })
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json("No quote to delete");
          }

          res.json("Deleted Tony Robbins quote");
        })
        .catch(error => console.error(error));
    });

    app.listen(3000, function () {
      console.log("Listening on 3000");
    });
  })
  .catch(error => console.error(error));
