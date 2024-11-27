const User = require('../schema/user_schema');
const express = require('express');
const bcryptjs = require('bcryptjs');
const Auth = require('../middleware/auth');
const router = express.Router();
router.post('/register', async (req, res) => {
    console.log('here')
    console.log(req.body)
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(403).json({ error: 'Email already registered' });
        }
        const userData = await User(req.body);
        const e = await bcryptjs.hash(req.body.password, 10);
        userData.password = e;
        const token = await userData.generateAuthToken();
        userData.token = token;
        await userData.save();
        console.log('here')
        res.status(200).send(userData);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send(error);
    }
});
router.post('/login', async (req, res) => {
    try {
        // Find the user by email
        let val = await User.findOne({ email: req.body.email });
        if (!val) {
            return res.status(404).send("User not found");
        }

        // Compare the entered password with the hashed password in the database
        let isPasswordValid = await bcryptjs.compare(req.body.password, val.password);
        if (isPasswordValid) {
            // Generate a new token
            let token = await val.generateAuthToken();
            res.cookie('authToken', token);
            // res.cookie('authToken', token, {
            //     maxAge: 3 * 60 * 60 * 1000, // 3 hours in milliseconds
            //     httpOnly: true, // Makes the cookie inaccessible to client-side scripts for security
            //     secure: process.env.NODE_ENV === 'production' // Ensures the cookie is sent only over HTTPS in production
            // });

            // Update the token in the database
            console.log('val',val)
            val.token = token;
            await val.save();

            // Set the token in the cookies

            // Send success response
            res.status(200).send(val);
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("Internal server error");
    }
});

router.post('/logout', async (req, res) => {
    try {
        res.clearCookie('authToken');
        res.status(200).send("Logged out successfully");
    } catch (error) {
        res.status(500).send("Error logging out");
    }
});
router.get('/user', async (req, res) => {
    try {
        let val = await User.find({});
        if (val) {
            res.status(200).send(val);
        }
        else {
            res.status(404).send('Not found');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
})
router.get('/user/:id', Auth, async (req, res) => {
    try {
            let val = await User.findOne({ _id: req.params.id });
            if (val) {
                res.status(200).send(val);
            }
            else {
                res.status(404).send('Not found');
            }
        
    }
    catch (err) {
        res.status(500).send(err);
    }
})
router.put('/user/:id', Auth, async (req, res) => {
    try {
        if (req.user.isAdmin) {
            let val = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            if (val === null) {
                res.status(404).send('error');
            }
            else {
                res.status(200).send(val);
            }
        }
        else {
            return res.status(403).send('You are not authorized to update this user');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
})
router.delete('/user/:id', Auth, async (req, res) => {
    try {
        if (req.user.isAdmin) {
            let val = await User.findOneAndDelete({ _id: req.params.id })
            if (!val) {
                return res.status(404).send('user not found');
            } else {
                return res.status(200).send({ message: 'user deleted successfully', deletedUser: val });
            }
        }
        else {
            return res.status(403).send('You are not authorized to delete this user');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
})

router.post('/favorite-movies', Auth, async (req, res) => {
    console.log('req.body',req.body)
    const { trackId, action,userId } = req.body;

    if (!trackId || !['add', 'remove'].includes(action)) {
        return res.status(400).send({ error: 'Invalid request. Provide a trackId and a valid action (add/remove).' });
    }

    try {
        const update = action === 'add'
            ? { $addToSet: { favoriteMovies: trackId } } // Add trackId (if not already in the array)
            : { $pull: { favoriteMovies: trackId } };    // Remove trackId

        await User.updateOne({ _id: userId }, update);

        res.status(200).send({ message: `Movie ${action === 'add' ? 'added to' : 'removed from'} favorites successfully.` });
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while updating favorite movies.', details: error.message });
    }
});
module.exports = router;