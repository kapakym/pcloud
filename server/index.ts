require('dotenv').config();
const express = require('express')
const cors = require('cors')
// const path = require('path')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log('Server is started 2sa', PORT)
        })
    } catch (e) {
        console.log(e);
    }
}

startServer()




