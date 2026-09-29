import mongoose from "mongoose";
import bcrypt from "bcryptjs"



const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        required : [true, "fullname is required"],
        trim : true,
        validate : {
            validator : function(value){
                //regex
                return /^[a-zA-Z\s]+$/.test(value);
            },
            message : "fullname only accept A-Z, a-z."
        }
    },
    username:{
        type : String,
        required : [true, "username is required"],
        trim : true,
        unique : true,
        lowercase : true,
        set : (value) => value.replace(/^@+/,"")
    },
    email : {
        type : String,
        required : [true, "email is required"],
        trim : true,
        validate : {
            validator : function (value){
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }
        }
    },
    password : {
        type : String,
        required : [true, "password is required"],
        
    }
},{timestamps : true,
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});


//virtual field that returns the username 

userSchema.virtual("hundle").get(function(){
    return this.username;
});

userSchema.pre('save', async function(){
    if(!this.isModified("password")) return ;
    try {
        const salt = await bcrypt.genSalt(10);
    
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        return "Unable to hash the password", error;
    }
});

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;