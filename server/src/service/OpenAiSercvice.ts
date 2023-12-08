import OpenAI from "openai";
import { OPENAI_API_KEY } from "../config/config";
import { error } from "console";
import Project from "../models/projectModel";

export class OpenAiService {
    private _client: OpenAI;

    constructor() {
        this._client = new OpenAI({
            apiKey: OPENAI_API_KEY || ""
        });
    }

    async analyzeFile(file: string, prompt: string) {
        // analyze the code file using a prompt containg naming conventions and other guidlines and return a review consisting of the inconsistencies in the code and how to fix them
        const response = await this._client.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a reviewer for a project. You have been assigned to review a project file. Both the content of project file and the guidelines for the project are provided in the user input. Your task is to review the project file and give a review of the project file. And if there are any inconsistencies in the project file, you have to give the corrected contents of the project file along with the review."
                },
                {
                    role: "user",
                    content: `
                      The guidelines for the project are as follows:
                      ${prompt}
                      The  constent of the project file is as follows:
                      ${file}
                      `
                }
            ]
        });

        return response['choices'][0]['message']['content'] || "";
        // con
        // const response = await this._client.chat
        return "review";
    }

    async generateRoadmap(guidlines: string, description: string, title: string) {
        // generate a roadmap for the project using the guidlines, description and title
        const response = await this._client.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "The user will provide a description of the project and the guidelines for the project. The user will also provide the title of the project. The task is to generate a roadmap for the project. The roadmap should contain the steps to be followed to complete the project. The roadmap should also contain the order in which the steps should be followed. The roadmap should also contain the time required to complete each step. The roadmap should also contain the resources required to complete the project. All the steps should be seperated by <<<>>> this identifier. The roadmap should be generated in the user input."
                },
                {
                    role: "user",
                    content: `
                        The title of the project is ${title}.
                        The description of the project is as follows:
                        ${description}
                      The guidelines for the project are as follows:
                      ${guidlines}
                      `
                }
            ]
        });
        const responseText: string = response['choices'][0]['message']['content'] || "";
        const responseArray = responseText.split("<<<>>>");
        return responseArray;

    }

    async query(query: string, file: string) {
        const response = await this._client.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "The user will provide a query and a file. The task is to answer the query which is related to that file. The answer should be generated in the user input."
                },
                {
                    role: "user",
                    content: `
                        The query is as follows:
                        ${query}
                        The file is as follows:
                        ${file}
                      `
                }
            ]
        });
        return response['choices'][0]['message']['content'] || "";
    }
}
