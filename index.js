const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PUBlISHABLE_KEY = "pk_test_51ID4RzCTNLsRFdFKsdnHQLV9lvPmrQyVpRthu9tNkDGdsSoZSDz9pxvVOazGCuZ6PGMuN5mmwyamwRxcVGRKJ1N300w6Pei32g"
const SECRET_KEY = "sk_test_51ID4RzCTNLsRFdFKsElUxHXnrk4n5vfgNVYf1NF6X8kUijbW0suM8iTVlfquOgilEjcKzOfJUsRgEeawCfCdmpbD007iOHiOlf"
const stripe = require('stripe')(SECRET_KEY)
const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000

app.set("view engine", "ejs")

app.get('/',(req, res) => {
	res.render('Home.ejs',{
		key:PUBlISHABLE_KEY
	})

})

app.post('/payment',(req, res) => {
	stripe.customers.create({
		email:req.body.stripeEmail,
		source:req.body.stripeToken,
		name:'Worldwide Photography',
		address:{
			line1:'18 Drahomanova Street',
			city:'Kyiv',
			country:'Ukraine'
		}
	})
	.then((customer) => {
		return stripe.charges.create({
			amount:70,
			description:'Membership',
			currency:'USD',
			customer: customer.id
		})
	})
	.then((charge) => {
		console.log(charge)
		res.send("Success")
	})
	.catch((err) => {
		res.send(err)
	})

})

app.listen(PORT, () => {
	console.log(`The app is running on ${PORT}`)
})