const express = require('express');
const mongoose = require('mongoose')

const port = 3000;
const app = express();


app.get('/', (req, res) => {
    res.json({ id: 1, title: "Blog title", description: "Blog description" })
})

app.listen(port, () => {
    console.log('Cblog uygulaması ayağa kalktı.')
})