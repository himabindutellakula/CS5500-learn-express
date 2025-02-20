import express, { Response } from 'express';
import  { promises as fsPromises } from 'fs';
import path from 'path';
import {UserRequest} from './types';
import {User} from './types';

const router = express.Router()
const writeFile = '../data/users.json';

/**
 * @route POST /adduser
 * @description Adds a new user to the user list and saves it to a JSON file.
 * @param {UserRequest} req - The request object containing the new user data.
 * @param {Response} res - The response object used to send the operation status.
 * @returns {Promise<void>}
 */
router.post('/adduser', async (req: UserRequest, res: Response) => {
    try {
        let newuser = req.body as User;
        req.users?.push(newuser);

        await fsPromises.writeFile(
            path.resolve(__dirname, writeFile),
            JSON.stringify(req.users)
        );

        console.log('User Saved');
        res.send('done');
    } catch (err) {
        console.log('Failed to write:', err);
        res.status(500).send('Error saving user');
    }
});

export default router;