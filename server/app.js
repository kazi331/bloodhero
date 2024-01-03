import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import './middlewares/passport.js';
import authRoutes from './routes/authRoutes.js';
import routes from './routes/routes.js';

const app = express();

// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(
    {
        origin: ['http://localhost:3000', 'https://bloodhero.vercel.app'],
        credentials: true,
    }
))


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
import './config/db.js';



// server listening
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started => http://localhost:${port}`);
});

export default app;