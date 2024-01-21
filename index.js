const express = require('express');
const cors = require('cors');
require('dotenv').config();
const initRoutes = require('./src/routes')
require('./src/connection_database')
const app = express();
// config app 
app.use(cors({
    // url 
    origin: process.env.CLIENT_URL,
    // cấu hình các phương thức được sử dụng trong trang
    methods:['GET','PUT', 'DELETE', 'POST']
}))

// nếu qua đc các method thì check xem có dữ liệu k
app.use(express.json())
// Lấy cả kiểu mãng ...
app.use(express.urlencoded({extended: true}))

// Route
initRoutes(app);

// Run on port
const PORT = process.env.PORT || 8888;
const listener = app.listen(PORT, () => {
    console.log('NavDev - Server is running on the port '+ listener.address().port);
})