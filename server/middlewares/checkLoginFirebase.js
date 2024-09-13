import admin from 'firebase-admin';
const checkLoginFirebase = async (req, res, next) => {
    try {
        const idToken = req.headers.authorization;

        if (!idToken) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Verify the ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken; // Attach user information to the request object
        next();
    } catch (error) {
        console.error('Error verifying Firebase ID token:', error.message);
        return res.status(403).json({ error: 'Unauthorized' });
    }
};

export default checkLoginFirebase;