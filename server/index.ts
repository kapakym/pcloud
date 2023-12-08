require('dotenv').config();
const express = require('express')
const cors = require('cors')
const fs = require('fs');

const PORT = process.env.PORT || 5001;

const app = express();
app.use(cors())
app.use(express.json())

app.post('/api/folders', (req: any, res: any) => {

    const items = fs.readdirSync('.', {withFileTypes: true})
    const folders = items.filter((item: any) => item.isDirectory).map((item:any)=>item.name)
    res.status(200).json(folders)
    // });
})

const startServer = async () => {
    try {
        app.listen(PORT, () => {
            console.log('Server is started', PORT)
        })
    } catch (e) {
        console.log(e);
    }
}

startServer()




