const db = require("../database/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const queryAsync = util.promisify(db.query).bind(db);
const secretKey = process.env.SECRET_KEY;

const selectAll = async (req, res) => {
  try {
    const items = await queryAsync("SELECT * FROM item");
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getFavByUser = async (req, res) => {
  try {
    const userId = req.params.iduser;
    const favs = await queryAsync(
      "SELECT i.*, f.idfavourites FROM favourites f JOIN item i ON f.item_iditem = i.iditem WHERE f.users_id = ?",
      [userId]
    );
    res.status(200).send(favs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addFav = async (req, res) => {
  try {
    const userId = req.params.iduser;
    const itemId = req.params.iditem;
    const result = await queryAsync(
      "INSERT INTO store.favourites (users_id, item_iditem) VALUES (?, ?)",
      [userId, itemId]
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const signUp = async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSMAIL,
    },
  });

  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, secretKey, {
      expiresIn: "1h",
    });

    const result = await queryAsync(
      "INSERT INTO users (email, password, username, verification_token) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, username, verificationToken]
    );

    if (result instanceof Error) {
      console.error("Error executing query:", result.message);
      return res.status(500).json({ error: "Registration failed" });
    }

    const mailOptions = {
      from: "abstoreeeee@gmail.com",
      to: email,
      subject: "Email Verification",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation Email</title>
      </head>
      <body>
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); text-align: center;">
              <h1 style="color: #333; margin-bottom: 20px;">Verification Email</h1>
              <p style="margin-bottom: 20px; color: #555;">Dear ${username},</p>
              <p style="margin-bottom: 20px; color: #555;">Verify your email by clicking the button below:</p>
              <button onclick="verifyEmail()" style="padding: 10px 20px; background-color: #007bff; color: #fff; border: none; border-radius: 10px; cursor: pointer;">Verify</button>
              <p style="margin-top: 20px; color: #777;">Best regards,<br>ABStore</p>
          </div>
          <script>
            function verifyEmail() {
              fetch('http://localhost:3000/verify/${verificationToken}', { method: 'GET' })
                .then(response => {console.log(response),response.json()})
                .then(data => {
                  console.log(data)
                  if (data.message) {
                    alert(data.message);
                  } else {
                    alert('Verification failed. Please try again.');
                  }
                })
                .catch(error => {
                  console.error('Error:', error);
                  alert('Verification failed. Please try again.');
                });
            }
          </script>
      </body>
      </html>`,
    };

    res.status(200).json({
      message:
        "Registration successful. Please check your email to verify your account.",
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Verification email sent:", info.response);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, secretKey);
    const email = decoded.email;

    const result = await queryAsync(
      "UPDATE users SET is_verified = 1 WHERE email = ? AND verification_token = ?",
      [email, token]
    );

    if (result instanceof Error) {
      console.error("Error updating verification status:", result.message);
      return res.status(500).json({ error: "Email verification failed" });
    }

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Invalid or expired token" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await queryAsync(
      "SELECT idusers, password FROM users WHERE email = ?",
      [email]
    );

    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user.idusers }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ token, id: user.idusers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
};

const selectOne = async (req, res) => {
  try {
    const item = await queryAsync("SELECT * FROM item WHERE iditem = ?", [
      req.params.id,
    ]);
    res.status(200).send(item);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const add = async (req, res) => {
  try {
    const result = await queryAsync("INSERT INTO item SET ?", req.body);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res) => {
  try {
    const result = await queryAsync("UPDATE item SET ? WHERE iditem = ?", [
      req.body,
      req.params.id,
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const remove = async (req, res) => {
  try {
    const result = await queryAsync("DELETE FROM item WHERE iditem = ?", [
      req.params.id,
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  selectAll,
  add,
  remove,
  update,
  selectOne,
  signUp,
  login,
  addFav,
  getFavByUser,
  verifyEmail,
};
