import express from "express"
import bcrypt from "bcryptjs"

import User from "../models/User.js"

import generateToken from "../utils/generateToken.js"

const router = express.Router()

/* REGISTER USER */

router.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body

    /* CHECK USER */

    const userExists = await User.findOne({
      email,
    })

    if (userExists) {

      return res.status(400).json({
        message: "User already exists",
      })

    }

    /* HASH PASSWORD */

    const salt = await bcrypt.genSalt(10)

    const hashedPassword =
      await bcrypt.hash(password, salt)

    /* CREATE USER */

    const user = await User.create({

      name,

      email,

      password: hashedPassword,

    })

    /* RESPONSE */

    res.status(201).json({

      _id: user._id,

      name: user.name,

      email: user.email,

      isAdmin: user.isAdmin,

      token: generateToken(user._id),

    })

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

/* LOGIN USER */

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body

    /* FIND USER */

    const user = await User.findOne({
      email,
    })

    /* CHECK PASSWORD */

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {

      res.json({

        _id: user._id,

        name: user.name,

        email: user.email,

        isAdmin: user.isAdmin,

        token: generateToken(user._id),

      })

    } else {

      res.status(401).json({
        message:
          "Invalid email or password",
      })

    }

  } catch (error) {

    res.status(500).json({
      message: error.message,
    })

  }

})

export default router