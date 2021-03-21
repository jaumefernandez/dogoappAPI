const express = require("express");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const Trans = require("../model/Transaction");




// const router = express.Router();
const cors = require("cors");
const Transaction = require("../model/Transaction");
router.use(cors());




/**
 * @method - POST
 * @param - /signup
 * @description - Transaction save-trans
 */

router.post(
  "/save-trans",
  [
    check("tipo", "Please Enter a Valid Username").not().isEmpty(),
    check("emailid", "Please enter a valid email").isEmail(),
    check("emailtrans", "Please enter a valid email").isEmail(),
    check("trans", "Please enter a valid Amount of transaction").isFloat()
    // check("date", "Please enter a valid Date").isDate()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    console.log(req.body);
    const { tipo, emailid, emailtrans, trans, date } = req.body;
    try {
      // Solo una Transaction por mail y segundo (date)
      let transaction = await Trans.findOne({ emailid, date });

      if (transaction) {
        return res.status(400).json({
          msg: "Transaction already done before"
        });
      }

      transaction = new Transaction({
        tipo,
        emailid,
        emailtrans,
        trans,
        date
      });

      await transaction.save();
      return res.status(200).json({
        msg: "Transaction save!"
      });

    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);



router.post("/from-email", async (req, res) => {
  
  try {
    // request.user is getting fetched from Middleware after token authentication
    const emailid = req.body;
    const transactions = await Trans.find(emailid).sort({date : -1});
    res.status(200).json(transactions);
  } catch (e) {
    res.status(500).send({ message: "Error in Fetching transactions" });
  }
});


module.exports = router;