const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

// model
const User = require("./models/user-model");
//

const userRouter = require("./routes/user-router");
const collectionRouter = require("./routes/collection-router");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findById("632b76b5e94a546e77c28dec")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/user", userRouter.routes);
app.use("/collection", collectionRouter.routes);


mongoose
  .connect(
    "mongodb+srv://Mo:WjHdmHZns4aUI1Zx@cluster0.tao2gyj.mongodb.net/sticky-notes?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Mo",
          email: "mo@yahoo.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(5000);
  })
  .catch((err) => console.log(err));
