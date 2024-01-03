import { connect } from 'mongoose';

connect('mongodb://localhost:27017/bloodHero')
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log("Failed to connect to database", err))

