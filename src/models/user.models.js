import mongoose from "mongoose";



const userSchema = mongoose.Schema({
    fullname : {
        type : String,
        require : [true, "fullname is required"],
        trim : true,
        validate : {
            validator : function(value){
                //regex
                return /^[a-zA-Z\s]+$/.test(value);
            },
            message : "fullname only accept A-Z, a-z."
        }
    },
    email : {
        type : String,
        require : [true, "email is required"],
        trim : true,
        validate : {
            validator : function (value){
                return /^[@\s]+$/.test(value);
            }
        }
    },
    password : {
        type : String,
        require : [true, "password is required"],
        validate : {
            validator : function (value){
                 return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(value);
            }
        }
    }
},{timestamps : true});

userSchema.pre('save', async function(){
    if(!this.isModified("password")) return ;
    try {
        const salt = await bcrypt.genSalt(10);
    
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        return "Unable to hash the password", error;
    }
});

const User = mongoose.model("User", userSchema);

export default User;