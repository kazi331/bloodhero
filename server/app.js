import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import passport from 'passport';

import './services/githubStrategy.js';
import './services/googleStrategy.js';

import admin from 'firebase-admin';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import routes from './routes/routes.js';


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: process.env.NEXT_PUBLIC_measurementId,
    privateKey: "process.env.NEXT_PUBLIC_privateKey",
    clientEmail: "process.env.NEXT_PUBLIC_clientEmail",

};

admin.initializeApp({
    credential: admin.credential.cert('./bloodhero-admin.json'),
})
const app = express();
const corsOptions = {
    origin: [
        'https://bloodhero.vercel.app', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002',],
    credentials: true,
    optionsSuccessStatus: 200,
    // allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'x-auth-token', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
}
// pre-flight for cors
app.options('*', cors(corsOptions));
// middlewares 
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// PASSPORT
app.use(passport.initialize());


// routes
app.use('/api/', routes)
app.use('/api/auth', authRoutes);



// home route
app.get('/', (req, res) => {
    res.json('Server is up and running');
})


// cron jobs
// import './cron-jobs/updateDonorAge.js';
// require('./cron-jobs/test');

// connect to database
// import './config/db.js';



// server listening
const port = process.env.PORT || 5000;
// app.listen(port, () => {
//     console.log(`Server started => http://localhost:${port}`);
// });

connectDB().then(() => {
    app.listen(port, () => {
        console.log("listening for requests");
    })
})

export default app;