const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const path = require('path');
const compression = require('compression');
const express = require('express');
// const stripe = require("stripe")(keySecret);

const app = express();
app.use(compression());
// app.use(require("body-parser").urlencoded({extended: false}));

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

/// Post Routes ////

// app.post("/charge", (req, res) => {
//   let amount = 500;
//
//   stripe.customers.create({
//     email: req.body.stripeEmail,
//     source: req.body.stripeToken
//   })
//     .then(customer =>
//       stripe.charges.create({
//         amount,
//         description: "Sample Charge",
//         currency: "usd",
//         customer: customer.id
//       }))
//     .then(charge => res.render("charge.pug"));
// });




app.listen(3000);
