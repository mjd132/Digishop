const express = require("express");
const UserSevice = require("../Application/UserServices");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
// const session = require("cookie-session");
const session = require("express-session");
const { User, Product } = require("../Infrastructure/Database");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const MongoStore = require("connect-mongo");
const MainServices = require("../Application/MainServices");
const ProductServices = require("../Application/ProductServices");

const app = express();

const { default: mongoose } = require("mongoose");
const { title } = require("../Domain/Product");

//
const jwtRequired = passport.authenticate("jwt", { session: false });
//express json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie and session setup
app.use(cookieParser());
// app.use(
//   session({
//     name: "DigishopAuth",
//     keys: "Digishop-Secret-Key-lackvqi4o53m;9cvuaw4",
//     maxAge: new Date(Date.now() + 30 * 60 * 1000), // Set the session to expire in 30 minutes (in milliseconds)
//   })
// );

app.use(
  session({
    secret: "Digishop-Secret-Key-lackvqi4o53m;9cvuaw4",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/Digishop",
      collectionName: "storeSessions",
    }),
    cookie: { maxAge: 30 * 60 * 1000 },
  })
);
1;
//Passport setup
app.use(passport.initialize());
app.use(passport.session());

//

// /api route injection
apiRouter.use(async (req, res, next) => {
  // await setTimeout(next, 1000);
  next();
});

//Passport-Local Authentication
passport.use(
  "passport-login",
  new LocalStrategy(
    {
      usernameField: "mobile",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const body = req.body;
      console.log("login");
      try {
        const user = await UserSevice.getUser(body.mobile);
        if (user) {
          if (await bcrypt.compare(body.password, user.profile.password)) {
            console.log(user.id);

            return done(null, user);
          } else
            return done(null, false, {
              message: "Password not correct!",
              code: 2002,
            });
        } else {
          return done(null, false, {
            message: "user not exist!",
            code: 2001,
          });
        }
      } catch (err) {
        return done(null, false, {
          message: "a problem occurded!",
          error: err,
        });
      }
    }
  )
);
passport.use(
  "passport-signup",
  new LocalStrategy(
    {
      usernameField: "mobile",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const body = req.body;
      console.log("signup");
      try {
        if (await UserSevice.isExistUser(body.mobile)) {
          return done(null, false, { message: "User is Exist!", code: 2003 });
        }
        if (password !== body.rePassword) {
          return done(null, false, {
            message: "RePassword not match!",
            code: 2004,
          });
        }
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = {
          "profile.mobile": body.mobile,
          "profile.password": hashedPassword,
        };
        const result = await UserSevice.createUser(user);
        console.log(result.id);
        return done(null, result);
      } catch (err) {
        return done(err);
      }
    }
  )
);
// passport.serializeUser(async (user, done) => {
//   await done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await UserSevice.getUserById(id);
//   await done(null, user);
// });

async function authenticator(req, res, next) {
  if (req.body.rePassword) {
    passport.authenticate("passport-signup", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Handle signup failure
        return res.status(401).json({ message: "Signup failed", info });
      }
      // Handle signup success
      console.log(user);
      req.session.userId = user.id;
      return next();
    })(req, res, next);
  } else {
    passport.authenticate("passport-login", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        // Handle signup failure
        return res.status(401).json({ message: "login failed", info });
      }
      // Handle signup success
      console.log(user);
      req.session.userId = user.id;
      return next();
    })(req, res, next);
  }
}

// Define child routes under /api
apiRouter.post("/auth", authenticator, async (req, res) => {
  // res.redirect("/dashboard");
  await res.json({ message: "authenticate succussful", code: 2000 });
});
apiRouter.get("/user/logout", async (req, res) => {
  const session = req.session;
  if (session.userId) {
    req.session.userId = undefined;
    res.status(200).json({ message: "user logouted!" });
  } else {
    res.status(401).json({ message: "user not loged in", code: 2005 });
  }
});
apiRouter.get("/user", async (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    const user = await UserSevice.getUserById(userId);
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: "Unauthorize", code: 2004 });
  }
});
//TODO - is Authed? to sperate function
apiRouter.post("/user/profile", async (req, res) => {
  const body = req.body;
  const userId = req.session.userId;
  if (!userId || !body)
    return res.status(400).json({ message: "Bad Request!", code: 2001 });

  if (body.oldPass && body.pass !== body.rePass)
    return res
      .status(400)
      .json({ message: "pass and repass not equal!", code: 2002 });

  if (body.oldPass && body.pass === body.rePass) {
    const user = await UserSevice.getUserById(userId);
    if (!(await bcrypt.compare(body.oldPass, user.profile.password)))
      return res
        .status(400)
        .json({ message: "password not correct!", code: 2003 });
    var hashedPassword = await bcrypt.hash(body.pass, 10);
    const newProfile = {
      name: body.name,
      family: body.family,
      birthday: body.birthday,
      password: hashedPassword,
      email: body.email,
      mobile: user.profile.mobile,
    };
    const result = await UserSevice.editProfile(userId, newProfile);
    if (result)
      return res
        .status(200)
        .json({ message: "Profile Editing Succussful!", code: 2000 });
    else
      return res
        .status(500)
        .json({ message: "A problem occurded", code: 2004 });
  }

  const result = await UserSevice.editProfile(userId, body);
  if (result) {
    return res
      .status(200)
      .json({ message: "Profile Editing Succussful!", code: 2000 });
  } else {
    res.status(500).json({ message: "A problem occurded", code: 2004 });
  }
});

apiRouter.get("/main", async (req, res) => {
  const content = await MainServices.get();
  if (content) return res.status(200).json(content);
  else return res.sendStatus(500);
});
// TODO - check is admin
apiRouter.post("/main", async (req, res) => {
  const main = req.body;
  if (Object.keys(main).length === 0) return res.sendStatus(500);
  const result = await MainServices.set(main);
  if (result) return res.sendStatus(200);
  else return res.sendStatus(500);
});

apiRouter.get("/product/:productId", async (req, res) => {
  const productId = req.params.productId;
  const result = await ProductServices.get(productId);
  if (result) res.json(result);
  else res.status(404).json();
});
async function checkIsAdmin(req, res, next) {
  const userId = req.session.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized!" });
  const user = await UserSevice.getUserById(userId);
  if (user.role === "admin") next();
  else return res.sendStatus(401);
}
// TODO - check is admin
apiRouter.post("/product", async (req, res) => {
  const product = req.body;
  if (Object.keys(product).length === 0) return res.status(500).json();
  const result = await ProductServices.add(product);
  if (result) {
    return res.json(result);
  } else {
    return res.sendStatus(500);
  }
});
apiRouter.route("/cart").post(async (req, res) => {
  const userId = req.session.userId;
  // const cart = req.body;
  const params = req.query;
  if (!userId) {
    return res.sendStatus(401);
  }
  if (Object.keys(params).length === 0) return res.sendStatus(400);
  // const user = await UserSevice.getUserById(userId);
  if (params.action === "delete") {
    const result = await UserSevice.deleteFromCart(userId, params.id);
    if (result) return res.json(result);
    else return res.sendStatus(400);
  } else if (params.action === "add") {
    const productId = parseInt(params.id);
    const isItemExist = await UserSevice.isExistItemInCart(userId, productId);
    if (isItemExist) return res.status(400).send("Item exist in cart!");
    const result = await UserSevice.addToCart(userId, {
      productId: params.id,
      productName: params.title,
      count: params.count,
    });
    if (result) return res.json(result);
    else return res.sendStatus(500);
  }
});
app.post("/", authenticator, (req, res) => {});

apiRouter.get("/test", (req, res) => {
  res.json(req.body);
});

// Mount the /api router to the main app
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
