import express from "express";

const app = express();

app.get("/", (req,res) => {
    res.sendFile("./pages/index.html");
})

const server = app.listen(3000, () => {
    console.log("Listening on port 3000");
});