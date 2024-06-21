import Log from '../models/logs.js';

// Function to log user activity
async function logActivity(action, userId, details) {
    try {
        const log = new Log({
            action,
            user: userId,
            details,
        });

        await log.save();
        
    } catch (error) {
        
    }
}

export default logActivity