const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// "https://pawty.netlify.app", // Production frontend
//   "http://localhost:5173", // Development frontend
module.exports = (app) => {
  // Configure CORS pour accepter les requêtes de votre frontend
  app.use(
    cors({
      origin: "https://pawty.netlify.app", // Remplacez par l'URL exacte de votre frontend
      methods: "GET,POST,PUT,DELETE", // Méthodes autorisées
      allowedHeaders: "Content-Type,Authorization", // En-têtes autorisés
    })
  );

  // Le reste de votre configuration
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
