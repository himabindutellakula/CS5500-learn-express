import express, { Response } from 'express';
const router = express.Router();
import { UserRequest } from './types';

/**
 * @route GET /usernames
 * @description Retrieves a list of usernames with their corresponding IDs.
 * @param {UserRequest} req - The request object containing user data.
 * @param {Response} res - The response object used to send the usernames.
 * @returns {void}
 */
router.get('/usernames', (req: UserRequest, res: Response) => {
    let usernames = req.users?.map((user) => {
        return { id: user.id, username: user.username };
    });
    res.send(usernames);
});


/**
 * @route GET /username/:name
 * @description Retrieves user details by username.
 * @param {UserRequest} req - The request object containing user data.
 * @param {Response} res - The response object used to send user details or an error message.
 * @returns {void}
 */
router.get('/username/:name', (req: UserRequest, res: Response) => {
    let userName = req.params.name;
    let userEmail = req.users?.filter(function (user) {
        return user.username === userName;
    })
    if (userEmail?.length === 0) {
        res.send({ error: { message: `${userName} not found`, status: 404 } });
    }
    else {
        res.send(userEmail);
    }
});

export default router;