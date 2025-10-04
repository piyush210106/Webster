import { GoogleGenerativeAI } from "@google/generative-ai";

const talkBot = async (req, res) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash-lite"});

    let chatSession = model.startChat({history: []});
    const {prompt} = req.body;
    if(!prompt) return res.status(400).json({message: "Invalid prompt"});

    try {
        const result = await chatSession.sendMessage(prompt);
        const response = result.response;
        const text = response.text();

        return res.status(200).json(text);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Failed to generate response", error});
    }
}

export {talkBot};
