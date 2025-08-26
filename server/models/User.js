const mongoose =require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema(
    {
    userName:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true
    },
    googleId:
    {
        type:String
    },
    profilePic:
    {
        type:String
    },
    date:
    {
        type: Date,
        default: Date.now
    }
});
module.exports=mongoose.model('user',userSchema);