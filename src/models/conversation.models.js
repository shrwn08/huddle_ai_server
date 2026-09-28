import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        participants : [{
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        }],
        type : {
            type : String,
            enum : ["direct", "group"],
            default : "direct"
        },
        title : {
            type : String,
            trim : true,
            maxlength : 100,
        },
        createdBy : {
            type :  mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        lastMessage : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Message",
            default : null
        }
    },{timestamps : true}
);


conversationSchema.index({participants : 1});

const Conversation = mongoose.model("Conversation", conversationSchema);


export default Conversation;