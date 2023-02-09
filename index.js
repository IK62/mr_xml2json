const express = require('express')
const app = express()
const router = require('./relay/relay.router')

init()

function init() {
    app.use(express.json())
    app.use(router)

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log(`server started at port ${PORT}`))
}