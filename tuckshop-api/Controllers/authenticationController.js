const mongodb = require("mongodb");
const User = require("../models/user");
const JWT = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { Account_activation_email } = require("../helpers/email");
const {
  registerValidate,
  loginValidate,
  emailVallidation,
  passwordValidate,
} = require("../helpers/validation.js");
//validation service
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { error } = registerValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const u = await User.findOne({ email: req.body.email });
    if (u) return res.status(400).send("email already exists!");
    //hashpassword
    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashpassword,
      email: req.body.email,
      type: req.body.type,
    };
    const token = JWT.sign(
      { user: user },
      process.env.TOKEN_ACCOUNT_ACTIVATION,
      {
        expiresIn: "7d"
      }
    );
    const userr = new User(user);
      const saveuser = await userr.save();
      res.header("auth-token", token);
      res.status(200).send({ message: "your account has been activated" , user:saveuser,token});
    // const emailData = {
    //   from: process.env.email,
    //   to: user.email,
    //   subject: "Account Acctivation link",
    //   html: `<h1>Please click the link to acctivate</h1>
    // <p>${process.env.client}activation/${token}</p>
    // <hr/>
    // <p>this email is an activation for your account at</P>
    // <h1>Healit services ${process.env.client}<h1/>
    // `,
    // };

    // Account_activation_email(emailData);
    // res.status(200).send("email has been sent. please verify your account");
  } catch (err) {
    console.log(err);
    res.status(400).send("an error occured");
  }
};

const mobile_register = async (req, res) => {
  const u = await User.findOne({ email: req.body.email });
  if (u) return res.status(400).send("email already exists!");
  //hashpassword
  const salt = await bcrypt.genSalt(10);

  const hashpassword = await bcrypt.hash(req.body.password, salt);

  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: hashpassword,
    email: req.body.email,
    gender: req.body.gender,
    age: 0,
  };
  const token = JWT.sign({ user: user }, process.env.TOKEN_ACCOUNT_ACTIVATION, {
    expiresIn: "15m",
  });

  const emailData = {
    from: process.env.email,
    to: user.email,
    subject: "Account Acctivation link",
    html: `<h1>Please click the link to acctivate</h1>
        <p>${process.env.client}activation/${token}</p>
        <hr/>
        <p>this email is an activation for your account at</P>
        <h1>Healit services ${process.env.client}<h1/>
        `,
  };

  try {
    Account_activation_email(emailData);
    res.status(200).send("email has been sent. please verify your account");
  } catch (err) {
    console.log(err);
    res.status(400).send("an error occured");
  }
};

const activate_account = async (req, res) => {
  console.log(req.body);
  const { token } = req.body;
  console.log(token);

  if (token) {
    JWT.verify(
      token,
      process.env.TOKEN_ACCOUNT_ACTIVATION,
      async (err, decoded) => {
        if (err) {
          return res.status(400).send("Link Expired. sign up again");
        } else {
          const { user } = JWT.decode(token);
          console.log("user: ", user);
          const userrr = await User.findOne({ email: user.email });
          if (userrr)
            return res.status(400).send("Account Already Activated!!");

          const userr = new User({
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password,
            email: user.email,

            profileUrl: "",
            gender: user.gender,
            age: 0,
            resetPasswordLink: "",
          });
          const saveuser = await userr.save();
          res.header("auth-token", token);
          res.status(200).send({ message: "your account has been activated" });
        }
      }
    );
  }
};

const login = async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send({ err: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ err: "email or password is wrong!" });

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) return res.status(400).send({ err: " password is wrong!" });

  //create JWT token
  const token = JWT.sign({ user: user }, process.env.TOKEN_SECRET, {
    expiresIn: "7d", //7 days login
  });
  res.header("auth-token", token).send({ token: token, user: user });
};

const forgetPassword = async (req, res) => {
  const email = req.body;

  console.log(email);
  const { error } = emailVallidation(email);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: email.email }, (err, user) => {
    if (err || !user) {
      return res
        .status(400)
        .send({ error: "User with that email doesnt exist " + email.email });
    }

    //if Exist
    const token = JWT.sign(
      {
        _id: user._id,
      },
      process.env.RESET_PASSWORD,
      {
        expiresIn: "10m",
      }
    );
    //send email with token

    const emailData = {
      from: process.env.email,
      to: email.email,
      subject: "Password Reset link",
      html: `<h1>Please click the link to reset your password</h1>
    <p>${process.env.client}password/reset/${token}</p>
    <hr/>
    <p>this email is to reset password  for your account</P>
    <h1>Healit services ${process.env.client}<h1/>
    `,
    };
    try {
      user.updateOne(
        {
          resetPasswordLink: token,
        },
        (err, success) => {
          if (err) {
            console.log("RESET PASSWORD ,", err);
            return res
              .status(400)
              .send({ error: "Database connection error on password reset" });
          } else {
            Account_activation_email(emailData);
            return res
              .status(200)
              .send("please check your email to rest your password");
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
};
const changePassword = async (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  console.log(req.body);

  const { error } = passwordValidate({ password: newPassword });

  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  if (resetPasswordLink) {
    JWT.verify(
      resetPasswordLink,
      process.env.RESET_PASSWORD,
      async function (err, decoded) {
        if (err) {
          console.log(err);
          return res.status(400).send({ error: "Expired Link, try again" });
        }

        const { _id } = JWT.decode(resetPasswordLink);

        //hashpassword
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(newPassword, salt);

        await User.findOneAndUpdate(
          { _id: _id },
          { password: hashpassword },
          (err, result) => {
            if (err) {
              return res
                .status(400)
                .send({ error: "error resetting passeord" });
            }

            res
              .status(200)
              .send({
                message:
                  " Password reset was succesfull now you can login with new password.",
              });
          }
        );
      }
    );
    // })
  }
};
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
const GoogleOAuth_Login = (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then((respons) => {
      console.log(respons);
      const { email_verified, name, email } = respons.payload;

      if (email_verified) {
        User.findOne({ email: email }).exec((err, user) => {
          //find if this email already exist
          if (user) {
            const token = JWT.sign({ _id: user.id }, process.env.TOKEN_SECRET, {
              expiresIn: "7d", //expires in 7 days
            });

            const { _id, email, firstname, lastname, profileUrl, gender, age } =
              user;
            return res
              .status(200)
              .send({
                toke,
                user: {
                  _id,
                  email,
                  firstname,
                  lastname,
                  profileUrl,
                  gender,
                  age,
                },
              });
          } else {
            //else if user doesn't exist we will save in the database
            let password = email + process.env.TOKEN_SECRET;
            user = new User({
              email,
              firstname,
              lastname,
              profileUrl,
              gender,
              age,
            }); //create user object with email
            user.save((err, save) => {
              if (err) {
                return res.status(400).send({ error: "could not sign in" });
              }
              const token = JWT.sign(
                { _id: DataCue._id },
                process.env.TOKEN_SECRET,
                { expiresIn: "7d" }
              );
              const {
                _id,
                email,
                firstname,
                lastname,
                profileUrl,
                gender,
                age,
              } = data;
              return res.status(200).send({
                token,
                user: {
                  _id,
                  email,
                  firstname,
                  lastname,
                  profileUrl,
                  gender,
                  age,
                },
              });
            });
          }
        });
      } else {
        return res.status(400).send({ error: "google login failed" });
      }
    });
};
const FacebookOAuth_Login = (req, res) => {};

const TwitterOAuth_Login = (req, res) => {};

module.exports = {
  login,
  register,
  activate_account,
  forgetPassword,
  changePassword,
  GoogleOAuth_Login,
  mobile_register,
};
