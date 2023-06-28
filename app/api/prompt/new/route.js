import connectToDB from "@utils/database"
import Prompt from '@models/prompt'
export const POST = async (res) => {
    const {prompt,userId,tag} =  await res.json()

    try{
        await connectToDB()
        const newPrompt = Prompt.create({
            creator:userId,
            prompt:prompt,
            tag:tag,
        })
        console.log("success!")
        return new Response(JSON.stringify(newPrompt),{
            status:201,
        })

    }catch(error){
        console.log("failed")
        console.log(error)
        return new Response("failed to create a prompt",{
            status:500
        })
    }

} 