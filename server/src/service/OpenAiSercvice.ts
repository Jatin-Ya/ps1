import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config/config";

export class OpenAiService {
  private _client: OpenAI;

  constructor() {
    this._client = new OpenAI({
        apiKey: OPENAI_API_KEY || ""
    });
  }

    async analyzeFile(file: string, prompt: string) {
        // analyze the code file using a prompt containg naming conventions and other guidlines and return a review consisting of the inconsistencies in the code and how to fix them
        try{
          const response= await this._client.chat.completions.create({
              model: "gpt-4",
              messages: [
                  {
                      role:"system",
                      content:"You are a reviewer for a project. You have been assigned to review a project file. Both the content of project file and the guidelines for the project are provided in the user input. Your task is to review the project file and give a review of the project file. And if there are any inconsistencies in the project file, you have to give the corrected contents of the project file along with the review."
                  },
                  {
                      role:"user",
                      content:`
                      The guidelines for the project are as follows:
                      ${prompt}
                      The  constent of the project file is as follows:
                      ${file}
                      `
                  } 
              ]
          });

          return response['choices'][0]['message']['content']
      }
      catch(error){
          console.log(error);
      }
      // con
        // const response = await this._client.chat
        return "review";
    }
}