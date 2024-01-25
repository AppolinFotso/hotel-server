var express = require("express");
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
var router = express.Router();

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

// database connection
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: true,
});
//

// GET "/"
router.get("/", (req, res) => {
  const customers = async () => {
    try {
      const bookings = await pool.query("SELECT * FROM bookings");
      res.json(bookings.rows);
    } catch (err) {
      console.log(err);
    }
  };
  customers();
});
router.get("/:id", (req, res) => {
  const userId = req.params.id;
  const customerId = async () => {
    try {
      const bookings = await pool.query("SELECT * FROM bookings WHERE id=$1", [
        userId,
      ]);
      res.json(bookings.rows);
    } catch (err) {
      console.log(err);
    }
  };
  customerId();
});

router.post("/", (req, res) => {
  const storeBookings = async () => {
    try {
      const bookings = await pool.query(
        "INSERT INTO bookings VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
        [
          Number(req.body[0].id),
          req.body[0].title,
          req.body[0].firstname,
          req.body[0].surname,
          req.body[0].email,
          Number(req.body[0].room_id),
          req.body[0].check_in_date,
          req.body[0].check_out_date,
        ]
      );
      res.json(bookings.rows);
    } catch (err) {
      console.log(err);
    }
  };
  storeBookings();
});

module.exports = router;
