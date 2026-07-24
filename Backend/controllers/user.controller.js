import User from "../models/user.model.js";

export const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id)
            .select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {

        console.error("Get Profile Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};



export const updateProfile = async (req, res) => {
    try {

        const { username, phone, gender, dob } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (username !== undefined) {
            user.username = username.trim();
        }

        if (phone !== undefined) {
            user.phone = phone.trim();
        }

        if (gender !== undefined) {
            user.gender = gender;
        }

        if (dob !== undefined) {
            user.dob = dob;
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                username: user.username,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                dob: user.dob,
                profileImage: user.profileImage
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};