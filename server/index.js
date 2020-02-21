require('dotenv').config();
const server = require('./api/server.js')


const PORT=  4000;

server.listen(PORT, ()=>{

    console.log(`\n ******Server is now listing on PORT ${PORT} *****`)
})