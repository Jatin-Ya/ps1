import OpenAI from "openai";

export class OpenAiService {
  private _client: OpenAI;

  constructor() {
    this._client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY || ""
    });
  }

    async analyzeFile(file: string, prompt: string) {
        // analyze the code file using a prompt containg naming conventions and other guidlines and return a review consisting of the inconsistencies in the code and how to fix them

        // const response = await this._client.chat
        return "review";
    }
}