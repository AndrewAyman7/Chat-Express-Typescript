import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UserRepository';

const userRepository = new UserRepository();

export const validateUsersExist = async (req:any, res: Response, next: NextFunction) => {
    const { membersIds } = req.body;

    if (!Array.isArray(membersIds) || membersIds.length === 0) {
        res.status(400).json({ message: 'membersIds are required and should be a non-empty array' });
        return;
    }

    const users = await Promise.all(membersIds.map(id => userRepository.getById(id)));
    const missingUserIds = membersIds.filter((id, index) => !users[index]);

    if (missingUserIds.length > 0) {
        res.status(400).json({ message: `Users with IDs [${missingUserIds.join(', ')}] do not exist` });
        return;
    }

    // Pass users to next middleware , bdl ma agebhom tany mn el DB w a3ml nfs el Query
    req.users = users.filter(user => user);

    next();
};