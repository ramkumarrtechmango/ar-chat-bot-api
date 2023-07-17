const AppUser = require('../models/userModel');
const AppError = require('../helpers/appError');
const { ObjectId } = require('mongodb'); // or ObjectID 
const authMiddleware = require('../middleware/auth');

exports.createAppUser = async (req, res, next) => {
    console.log(req.body);
    const { firstName, lastName, email, password, dob, address1, address2, city, state, country } = req.body;

    if (!firstName || !lastName || !email || !password || !address1 || !address2 || !city || !state || !country) {
        return next(
            new AppError('Required fields are missing. Kindly check your params', 400)
        );
    }
    try {
        const appUser = await new AppUser(req.body).save();

        res.status(200).json({
            status: 'Success',
            message: 'User created successfully',
            result: {
                appUser,
            },
        });
    } catch (error) {
        next(error);
    }

}

exports.getAllAppUser = async (req, res, next) => {
    try {
        const { page, size } = req.query;
        const limit = size ? +size : 10;
        const offset = page ? page * limit : 0;
        const query = {};

        let userList = await AppUser.paginate(query, {
            limit,
            offset
        });
        res.status(200).json({
            status: 'Success',
            result: { ...userList },
        });
    } catch (error) {
        next(error)
    }

}

exports.getUserById = async (req, res, next) => {
    const { id } = req.params;
    if (id === null) {
        return next(new AppError('Please provide User Id', 400));
    }
    try {

        var userDetail = await AppUser.findById(id).exec();
        if (!userDetail) {
            next(new AppError('Invalid id', 400));
        }

        var response = userDetail.toObject();

        res.status(200).json({
            status: 'Success',
            userDetails: response
        });

    } catch (error) {
        next(error)
    }
}

exports.deleteUserById = async (req, res, next) => {
    const { id } = req.params;
    if (id === null) {
        return next(new AppError('Please provide User Id', 400));
    }

    try {

        var userDetails = await AppUser.deleteOne({ id: id }).exec();

        res.status(200).json({
            status: 'Success',
            message: 'User deleted successfully'
        })

    } catch (error) {
        next(error);
    }
}

exports.updateUser = async (req, res, next) => {
    const { id } = req.body;
    const { firstName, lastName, email, dob, address1, address2, city, state, country } = req.body;

    if (!firstName || !lastName || !email || !address1 || !address2 || !city || !state || !country) {
        return next(
            new AppError('Required fields are missing. Kindly check your params', 400)
        );
    }
    try {
        const userDetails = await AppUser.findByIdAndUpdate({ _id: id }, req.body, { runValidators: false, context: "query" });

        res.status(200).json({
            message: "User updated successfully",
            status: "Success",
            result: userDetails
        });
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return next(
            new AppError('Required fields are missing. Kindly check your params', 400)
        );
    }

    try {
        console.log(email);
        const userDetail = await AppUser.findOne({ email }).select('+password').exec();
        console.log(userDetail);
        if (!userDetail || !userDetail.correctPassword(password, userDetail.password)) {
            return next(new AppError("Incorrect email or password", 401));
        }

        const token = authMiddleware.accessToken(userDetail._id,userDetail.email)
        userDetail.token = token;

        res.status(200).json({
            status: "Success",
            result: userDetail,
        });
    } catch (error) {
        next(error)
    }
}