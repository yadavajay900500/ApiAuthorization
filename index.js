const express = require('express');
const { authPage, authCourse } = require('./middleware');
const app = express();
const Mongoose = require("mongoose")
const PORT = process.env.PORT || 2020

app.use(express.json())
const userShema = Mongoose.Schema({
    name: String,
    courses: [],
    role: String

})

const apiModel = Mongoose.model("apiAuth", userShema)



const newsDataBaseDetails = Mongoose.connect(
    "............your mongodb Account path",
    (err) => {
        if (!err) {
            console.log("DataBase connected Suceessfully")
        } else {
            console.log("Database Connection Error", err)
        }
    })


app.get("/home", (req, res) => {
    res.status(200).json("Home Page")
})



app.get("/course/grades", authPage(["teacher", "admin"]), async (req, res) => {
    //there is no need to save the req.body
    const newData = new apiModel(req.body)
    newData.save((err, result) => {
        if (result) {
            console.log("***********",result)
            res.status(200).json({
                english: 60,
                Hindi: 95,
                Science: 86,
                History: 70
            })
        }
    })

})

app.get("/course/:number",authCourse, (req, res) => {
    const courseNumber = req.params.number
    res.status(200).json(`YOU HAVE PERMISSION TO SEE COURSE ${courseNumber}`)
})


app.listen(PORT, () => {
    console.log(`server is start on http://localhost:${PORT}`)
})