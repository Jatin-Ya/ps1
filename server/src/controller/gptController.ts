import { Request, Response } from "express";

const generateReiew = async (req: Request, res: Response) => {
    const { prompt } = req.body;
    // const review = await gpt3.generateReview(prompt);
    res.json({ review: "review" });
};

export const gptController = {
    generateReiew,
};