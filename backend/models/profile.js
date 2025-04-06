// import mongoose from "mongoose";

// const profileSchema = new mongoose.Schema({
//     name : {type : String , required : true},
//     weight:{type :Number , required : true, min : [0,'Weight Can Not Be Negative']},
//     height:{type :Number , required : true, min : [0,'Weight Can Not Be Negative']},
//     gender:{type :String,required: true,enum:{values : ['male','female','other'],message:'{VALUE} is not a valid argument'}},
//     age:{type:Number,required : true}
// });

// const Profile  = mongoose.model("profile",profileSchema)
// export default Profile;

import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: { 
        type: String, 
        required: [true, 'Name is required']
    },
    weight: {
        type: Number, 
        required: [true, 'Weight is required'], 
        min: [0, 'Weight cannot be negative']
    },
    height: {
        type: Number, 
        required: [true, 'Height is required'], 
        min: [0, 'Height cannot be negative']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not a valid gender'
        }
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age cannot be negative']
    }
}, {
    timestamps: true
});

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;