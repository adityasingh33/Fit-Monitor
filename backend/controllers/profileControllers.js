

// export const getProfile = async (req, res) => {
//     try {
//         const userId = req.user._id || req.user.id;
//         console.log("Looking for profile with userId:", userId);

//         let profile = await Profile.findOne({ user: userId });
        
//         if (!profile) {
//             // Create a profile with required input instead of defaults
//             return res.status(404).json({ 
//                 message: "Profile not found. Please create one with required details.",
//                 requiredFields: ["weight", "height", "gender", "age"]
//             });
//         }
//         res.json(profile);
//     } catch (error) {
//         console.error("Profile fetch error:", error);
//         res.status(500).json({ message: error.message });
//     }
// };

// export const updateProfile = async (req, res) => {
//     try {
//         const userId = req.user._id || req.user.id;
//         console.log("Update data:", req.body);

//         // Validate required fields
//         const { weight, height, gender, age } = req.body;
//         if (!weight || !height || !gender || !age) {
//             return res.status(400).json({
//                 message: "Missing required fields",
//                 requiredFields: ["weight", "height", "gender", "age"]
//             });
//         }

//         let profile = await Profile.findOne({ user: userId });
        
//         if (!profile) {
//             profile = new Profile({
//                 user: userId,
//                 name: req.user.name,
//                 ...req.body
//             });
//         } else {
//             Object.assign(profile, req.body);
//         }

//         await profile.save();
//         res.json(profile);
//     } catch (error) {
//         console.error("Profile update error:", error);
//         res.status(500).json({ message: error.message });
//     }
// };


import Profile from '../models/profile.js';

export const getProfile = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        console.log("Looking for profile with userId:", userId);

        const profile = await Profile.findOne({ user: userId });
        
        if (!profile) {
            return res.status(404).json({ 
                success: false,
                message: "Profile not found. Please create one with required details.",
                requiredFields: ["weight", "height", "gender", "age"]
            });
        }

        res.json({
            success: true,
            profile
        });
    } catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ 
            success: false,
            message: "Error fetching profile",
            error: error.message 
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        console.log("Update request for userId:", userId);
        console.log("Update data:", req.body);

        // Validate required fields and data types
        const { weight, height, gender, age } = req.body;
        
        // Check required fields
        if (!weight || !height || !gender || !age) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                requiredFields: ["weight", "height", "gender", "age"]
            });
        }

        // Validate data types and ranges
        if (typeof weight !== 'number' || weight <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid weight value"
            });
        }

        if (typeof height !== 'number' || height <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid height value"
            });
        }

        if (!['male', 'female', 'other'].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: "Invalid gender value"
            });
        }

        if (typeof age !== 'number' || age <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid age value"
            });
        }

        let profile = await Profile.findOne({ user: userId });
        
        if (!profile) {
            profile = new Profile({
                user: userId,
                name: req.user.name,
                ...req.body
            });
        } else {
            Object.assign(profile, req.body);
        }

        await profile.save();
        
        res.json({
            success: true,
            message: "Profile updated successfully",
            profile
        });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({ 
            success: false,
            message: "Error updating profile",
            error: error.message 
        });
    }
};