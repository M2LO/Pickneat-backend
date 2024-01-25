const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const authenticate = require("../middleware/authenticate")
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
// const User = require('../model/userSchema');


require('../DB/conn');
const User = require("../model/userSchema")
const Contact = require("../model/contact")
const products = require("../model/product")
const Bill = require("../model/bill")


router.get('/', (req, res) => {
    res.send("Router here.")
})

router.post('/register', async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Field Required!" })
    }

    try {
        const userExit = await User.findOne({ email: email });
        if (userExit) {
            return res.status(422).json({ error: "Email Already Registered!" })
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "Password Didn't Match" })
        }
        else {
            const user = new User({ name, email, password, cpassword })

            token = await user.generateAuthToken();

            await user.save()

            res.status(201).json({ message: "User Registered Successfully!" })
        }
    }
    catch (err) {
        console.log(err)
    }
})

//login 

router.post('/signin', async (req, res) => {

    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Field Required!" })
        }

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                // expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid" })
            } else {
                res.json({ message: "User Signin Successfully", token: token })
            }
        } else {
            res.status(400).json({ error: "Invalid" })
        }
    } catch (err) {
        console.log(err)
    }
});

router.post('/about', authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.post('/', authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.post('/products', authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.post('/nav', authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.post('/cart', authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.post('/admin', authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.post('/thankyou', authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.post('/checkout', authenticate, (req, res) => {
    res.send(req.rootUser);
});

// -----------------------------------------------------------------------
router.post('/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Field Required!" });
        }

        const newContact = new Contact({ name, email, message });

        await newContact.save();

        res.status(201).json({ message: "Message Submitted Successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// -----------------------------------------------------------------------

router.post('/submit-bill', async (req, res) => {

    try {
        const { fullName, email, address , city, state, zipCode } = req.body;

        const NewBill = new Bill({ fullName, email, address , city, state, zipCode  });

        await NewBill.save();

        res.status(201).json({ message: 'Bill saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving the bill' });
    }
});

module.exports = router;