var express = require("express");
const { Pool } = require("pg");
//const fs = require("fs")
const dotenv = require("dotenv");
dotenv.config();
var router = express.Router();
//const caCert = fs.readFileSync("../eu-west-2-bundle.pem"); 
// database connection
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port:process.env.PGPORT,
  ssl: {
	  rejectUnauthorized: false,
	 
  }

});
//
//data

const booking = [
  {
    id: 1,
    title: "Mr",
    firstName: "John",
    surname: "Doe",
    email: "johndoe@doe.com",
    roomId: 2,
    checkInDate: "2017-11-21",
    checkOutDate: "2017-11-23",
  },
  {
    id: 2,
    title: "Doctor",
    firstName: "Sadia",
    surname: "Begum",
    email: "begum_sadia@sadia.org",
    roomId: 1,
    checkInDate: "2018-02-15",
    checkOutDate: "2018-02-28",
  },
  {
    id: 3,
    title: "Prince",
    firstName: "Henry",
    surname: "Wales",
    email: "harry@wales.com",
    roomId: 5,
    checkInDate: "2018-03-01",
    checkOutDate: "2018-04-09",
  },
  {
    id: 4,
    title: "Dame",
    firstName: "Judi",
    surname: "Dench",
    email: "Judi@dench.co.uk",
    roomId: 6,
    checkInDate: "2017-12-25",
    checkOutDate: "2018-01-03",
  },
  {
    id: 5,
    title: "Madam",
    firstName: "Anuradha",
    surname: "Selvam",
    email: "anu@selvam.net",
    roomId: 3,
    checkInDate: "2017-08-30",
    checkOutDate: "2017-10-02",
  },
];

//

//
router.get("/", (req, res) => {
  const storeBookings = async () => {
    try {
      for (a of booking) {
        const bookings = await pool.query(
          "INSERT INTO bookings VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
          [
            a.id,
            a.title,
            a.firstname,
            a.surname,
            a.email,
            a.room_id,
            a.check_in_date,
            a.check_out_date,
          ]
        );
      }
      res.json({ task: "finished" });
    } catch (err) {
      console.log(err);
    }
  };
  storeBookings();
});

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
