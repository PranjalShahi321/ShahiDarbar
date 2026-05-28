import cloudinary from "../config/cloudinary.js"
import express from "express"
import multer from "multer"


const router = express.Router()

const storage = multer.diskStorage({})

const upload = multer({ storage })

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {

      console.log(req.file)

      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "shahidarbar",
        }
      )

      res.json({
        imageUrl: result.secure_url,
      })

    } catch (error) {

      console.log(error)

      res.status(500).json({
        message: error.message,
      })

    }

  }
)

export default router