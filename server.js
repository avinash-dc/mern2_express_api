const express = require('express');
const { success, info, error } = require("consola");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { NODE_ENV, PORT } = require('./config');
const { DbConnection } = require("./config/db");
const AuthRoute = require("./routes/auth");
const ProfileRoute= require("./routes/profile");
const app = express();

let StartServer = async () => {
    try {
      //Database connecti starts here
      DbConnection();
      //Database connecti ends here

      //middleware section starts here
      // app.use(express.json());
      
      if (NODE_ENV === "development") {
        app.use(morgan("dev"));
      }

      app.use(express.json());
      app.use(cors());
      app.use(cookieParser());
      //middleware section starts here

      app.use("/api/auth", AuthRoute);
      app.use("/api/profile", ProfileRoute);


      //listen port start
        app.listen(PORT, err => {
            if (err) {
                error(err);
            } else {
                success('server is running on port number 5000'.green.bold);
            }
        });
      //listen port ends
    } catch (err) {
        error(`${err}`.red.bold);
    }
};

StartServer();