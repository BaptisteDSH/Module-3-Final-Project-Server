// We reuse this import in order to have access to the `body` property in requests
const express = require("express");

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require("morgan");

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require("cookie-parser");

const cors = require("cors");

    // "https://pawty.netlify.app", // Production frontend
    //   "http://localhost:5173", // Development frontend
      (module.exports = (app) => {
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
      });
