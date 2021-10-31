const mongodb = require("mongodb");
const Admin = require("../models/admin");
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

const register_admin = async (req, res) => {
  try {
    const { error } = registerValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const u = await Admin.findOne({ email: req.body.email });
    if (u) return res.status(400).send("email already exists!");
    //hashpassword
    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash(req.body.password, salt);

    const admin = {
      username: req.body.username,  
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashpassword,
      email: req.body.email,
      type: req.body.type,
    };
    const token = JWT.sign(
      { admin: admin },
      process.env.TOKEN_ACCOUNT_ACTIVATION,
      {
        expiresIn: "7d"
      }
    );
    const adminr = new Admin(admin);
      const saveuser = await adminr.save();
      res.header("auth-token", token);
      res.status(200).send({ message: "your account has been activated" , admin:saveuser,token});
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
  const u = await Admin.findOne({ email: req.body.email });
  if (u) return res.status(400).send("email already exists!");
  //hashpassword
  const salt = await bcrypt.genSalt(10);

  const hashpassword = await bcrypt.hash(req.body.password, salt);

  const admin = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: hashpassword,
    email: req.body.email,
    gender: req.body.gender,
    age: 0,
  };
  const token = JWT.sign({ admin: admin }, process.env.TOKEN_ACCOUNT_ACTIVATION, {
    expiresIn: "15m",
  });

  const emailData = {
    from: process.env.email,
    to: admin.email,
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
          const { admin } = JWT.decode(token);
          console.log("admin: ", admin);
          const adminrr = await Admin.findOne({ email: admin.email });
          if (adminrr)
            return res.status(400).send("Account Already Activated!!");

          const adminr = new Admin({
            firstname: admin.firstname,
            lastname: admin.lastname,
            password: admin.password,
            email: admin.email,

            profileUrl: "",
            gender: admin.gender,
            age: 0,
            resetPasswordLink: "",
          });
          const saveuser = await adminr.save();
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

  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin)
    return res.status(400).send({ err: "email or password is wrong!" });

  const validPass = await bcrypt.compare(req.body.password, admin.password);

  if (!validPass) return res.status(400).send({ err: " password is wrong!" });

  //create JWT token
  const token = JWT.sign({ admin: admin }, process.env.TOKEN_SECRET, {
    expiresIn: "7d", //7 days login
  });
  res.header("auth-token", token).send({ token: token, admin: admin });
};

const forgetPassword = async (req, res) => {
  const email = req.body;

  console.log(email);
  const { error } = emailVallidation(email);
  if (error) return res.status(400).send(error.details[0].message);

  Admin.findOne({ email: email.email }, (err, admin) => {
    if (err || !admin) {
      return res
        .status(400)
        .send({ error: "Admin with that email doesnt exist " + email.email });
    }

    //if Exist
    const token = JWT.sign(
      {
        _id: admin._id,
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
      admin.updateOne(
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

        await Admin.findOneAndUpdate(
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
        Admin.findOne({ email: email }).exec((err, admin) => {
          //find if this email already exist
          if (admin) {
            const token = JWT.sign({ _id: admin.id }, process.env.TOKEN_SECRET, {
              expiresIn: "7d", //expires in 7 days
            });

            const { _id, email, firstname, lastname, profileUrl, gender, age } =
              admin;
            return res
              .status(200)
              .send({
                toke,
                admin: {
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
            admin = new Admin({
              email,
              firstname,
              lastname,
              profileUrl,
              gender,
              age,
            }); //create user object with email
            admin.save((err, save) => {
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
                admin: {
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
  register_admin,
  activate_account,
  forgetPassword,
  changePassword,
  GoogleOAuth_Login,
  mobile_register,
};
