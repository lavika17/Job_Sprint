// crearted server
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import applicationRoute from "./routes/application.route.js";
import jobRoute from "./routes/job.route.js";

dotenv.config({});
const app = express();


// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:5173',
  'https://job-sprint-nine.vercel.app',
  'https://job-sprint-frontend.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

//api's 
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT , ()=>{
    connectDB();
    console.log(`server is running at port: ${PORT}`);
})
