import { connect } from 'mongoose';
import { mongoURI } from './urls.js';
connect(mongoURI)
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log("Failed to connect to database", err))

