const express = require('express');
const app = express();
const filesRouter = require('./routers/files')
const foldersRouter = require('./routers/files')


const cors = require('cors')
app.use(cors())
app.use('/items', express.static('items'))
app.use('/items', filesRouter)




app.listen(5000, () => console.log('listen on port 5000'))