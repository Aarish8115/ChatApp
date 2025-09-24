const Chat=require("../models/Chat");

async function sendMessage(req,res){
    const {senderId,receiverId,message}=req.body;
    try {
        const chat = new Chat({
            chatId: new mongoose.Types.ObjectId().toString(),
            senderId,
            receiverId,
            message
        });
        await chat.save();
        res.status(200).json({message:"Message sent successfully",chat});
    } catch (error) {
        res.status(500).json({message:"Error sending message",error});
    }
}

async function getMessages(req,res){
    const {userId}=req.params;
    const {currentUserId}=req.user;
    try {
        const messages = await Chat.find({
            $or: [
                { senderId: currentUserId, receiverId: userId },
                { senderId: userId, receiverId: currentUserId }
            ]
        });
        res.status(200).json({messages});
    } catch (error) {
        res.status(500).json({message:"Error fetching messages",error});
    }
}

module.exports={sendMessage,getMessages};
