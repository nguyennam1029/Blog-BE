const express = require("express");
const cors = require("cors");
require("dotenv").config();
const initRoutes = require("./src/routes");
require("./src/connection_database");
const app = express();
// config app
const corsOptions = {
  // origin: "http://127.0.0.1:5173",
  origin: "http://localhost",

  methods: ["GET", "PUT", "DELETE", "POST"],
};
// app.use(cors({
//     // url
//     origin: process.env.CLIENT_URL,
//     // cấu hình các phương thức được sử dụng trong trang
//     methods:['GET','PUT', 'DELETE', 'POST']
// }))
app.use(cors());
app.options("*", cors());
// nếu qua đc các method thì check xem có dữ liệu k
app.use(express.json());
// Lấy cả kiểu mãng ...
app.use(express.urlencoded({ extended: true }));

// Route
initRoutes(app);
// Simulate API delay
// app.use((req, res, next) => {
//   setTimeout(next, 3000); // Delay response by 3 seconds
// });
// Run on port
const PORT = process.env.PORT || 8888;
const listener = app.listen(PORT, () => {
  console.log(
    "NavDev - Server is running on the port " + listener.address().port
  );
});
