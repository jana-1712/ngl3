import { Message } from "../model/message.model.js"
export async function createMessage(content,receiver,sender){
    return Message.create({
        content:content,
        sender:sender,
        receiver:receiver
    })
}export async function getAllMessags(userId){
    Message.find(
        {  recevier:userId  },
        {},
        {  populate:{path:'sender'}  }
    )
}