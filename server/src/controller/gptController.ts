import { Request, Response } from "express";
import { getFilesAndPaths } from "../utils/GithubUtils";
import {OpenAI} from "openai";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateReview = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    // const files = await getFilesAndPaths();

    try{
        const response= await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role:"system",
                    content:""//have to give a general prompt on what to do 
                },
                {
                    role:"user",
                    content:prompt
                } 
            ]
        });
    }
    catch(error){
        console.log(error);
    }
    // const review = await gpt3.generateReview(prompt);
    res.json({ review: "review" });
};


