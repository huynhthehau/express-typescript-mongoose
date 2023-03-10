import { NextFunction, Request, Response } from 'express'
import UsersService from "../services/users.service"
import { User } from '../interfaces/users.interface';
import { changeProfileDto, CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { RequestWithUser } from '../interfaces/auth.interface';

class UsersController {
    public userService = new UsersService;

    public getUsers = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const findAllUsersData: User[] = await this.userService.findAllUser();
            res.status(200).json({ data: findAllUsersData, message: "find All User" })
        } catch (error) {
            next(error)
        }

    }

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id
            const findUserByIdData: User = await this.userService.findUserById(id);
            const data = {
                id: findUserByIdData._id,
                email: findUserByIdData.email,
                display_name: findUserByIdData.display_name,
                avatar: findUserByIdData.avatar,
                bio: findUserByIdData.bio,
                location: findUserByIdData.location,
                about: findUserByIdData.about,
                created_at: findUserByIdData.created_at,
                updated_at: findUserByIdData.updated_at
            }
            res.status(200).json({ data: data, message: "find user by id" })
        } catch (error) {
            next(error)
        }
    }

    public createUser = async (req: any, res: Response, next: NextFunction) => {
        try {
            let userData: CreateUserDto = req.body;
            let avatar = null;
            if (req.file) {
                if (req.fileValidationError) {
                    return res.send(req.fileValidationError);
                }
                avatar = req.file.filename;
            }

            const createUserData: User = await this.userService.createUser(userData, avatar)
            res.status(201).json({ data: createUserData, message: 'created' });
        } catch (error) {
            next(error)
        }
    }

    public updateUser = async (req: any, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id
            let userData: UpdateUserDto = req.body
            let avatar = null
            if (req.file) {
                if (req.fileValidationError) {
                    return res.send(req.fileValidationError);
                }
                avatar = req.file.filename;
            } else { avatar = userData.oldAvatar }

            userData = { ...userData, avatar: avatar }

            const updateUserData: User = await this.userService.updateUser(id, userData)

            res.status(200).json({ data: updateUserData, message: "Update!!!" })

        } catch (error) {
            next(error)
        }
    }

    public deleteUserById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id
            const deleteUserById = await this.userService.deleteUser(id);
            res.status(200).json({ data: deleteUserById, message: "delete user" })
        } catch (error) {
            next(error)
        }
    }

    public changeProfile = async (req: any, res: Response, next: NextFunction) => {
        try {
            const id = req.user.id
            let userData: changeProfileDto = req.body
            let avatar = null
            if (req.file) {
                if (req.fileValidationError) {
                    return res.send(req.fileValidationError);
                }
                avatar = req.file.filename;
            } else { avatar = userData.oldAvatar }
            userData = { ...userData, avatar: avatar }

            const updateUserData = await this.userService.changeProfile(id, userData)

            res.status(200).json({ data: updateUserData, message: "Update!!!" })

        } catch (error) {
            next(error)
        }
    }
}

export default UsersController