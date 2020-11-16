const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const fs = require("fs");
const Club = require("./../Model/clubModel");

dotenv.config({ path: "./config.env" });
const app = require("./../app");

//set by node.js, express automatically sets env to development
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successful DB connection!");
  });

const clubs = JSON.parse(fs.readFileSync(`${__dirname}/clubs.json`, `utf-8`));

//IMPORT DATA IN DATABSE

const importData = async () => {
  try {
    await Club.create(clubs);
    console.log("Data added successfully");
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Club.deleteMany();
    console.log("Data deleted!");
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
