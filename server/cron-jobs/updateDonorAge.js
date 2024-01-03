import { schedule } from "node-cron";
import User from "../models/userSchema.js";

// update age field every day at midnight
schedule('0 0 1 * *', async (firetime) => {
    console.log('Updating users age field');
    try {
        const users = await User.find();
        for (const user of users) {
            const age = moment().diff(user.dob, 'years');
            user.age = age;
            await user.save();
            console.log({
                firetime: firetime,
                NOw: new Date()
            });
        }
    } catch (err) {
        console.log('Error updating age field', err.message);
    }
    console.log('Done updating users age field');

});