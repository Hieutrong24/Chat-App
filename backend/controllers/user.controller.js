import UserModel from "../models/user.model.js";

const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({_id: { $ne: req.user._id }});
        res.status(200).json({ data: users, success: true });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
const getUserById = (req, res) => {
  res.send(`User ID: ${req.params.id}`);
};

export default {
    getUsers, getUserById
}