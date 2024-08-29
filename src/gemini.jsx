/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = "AIzaSyBzxkPSJZzRijOhOkTicSZVvisjp5xir5k";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  
   export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a vocabulary card for a beginner in English in JSON format. Provide 10  words for a beginner in english , the user is expected to know english well but he's trying to enhance his vocabulary , its correct definition, and two incorrect definitions. Ensure the correct definition is clear and easy to understand for a beginner level, and the incorrect ones are plausible but wrong. Ensure the output follows this structure{\n  \"word\": \"example_word\",\n  \"correct_definition\": \"This is the correct definition.\",\n  \"incorrect_definitions\": [\n    \"This is an incorrect definition 1.\",\n    \"This is an incorrect definition 2.\"\n  ]} "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"word\": \"curious\",\n    \"correct_definition\": \"Wanting to know or learn more about something.\",\n    \"incorrect_definitions\": [\n      \"Feeling angry or upset.\",\n      \"Being very tired or sleepy.\"\n    ]\n  },\n  {\n    \"word\": \"amazing\",\n    \"correct_definition\": \"Very impressive or wonderful.\",\n    \"incorrect_definitions\": [\n      \"Something that is very small.\",\n      \"Something that is very common.\"\n    ]\n  },\n  {\n    \"word\": \"relax\",\n    \"correct_definition\": \"To rest and become calm.\",\n    \"incorrect_definitions\": [\n      \"To work hard and be busy.\",\n      \"To make something smaller.\"\n    ]\n  },\n  {\n    \"word\": \"enjoy\",\n    \"correct_definition\": \"To find something pleasant or fun.\",\n    \"incorrect_definitions\": [\n      \"To dislike something very much.\",\n      \"To forget something completely.\"\n    ]\n  },\n  {\n    \"word\": \"imagine\",\n    \"correct_definition\": \"To create a picture in your mind.\",\n    \"incorrect_definitions\": [\n      \"To forget something completely.\",\n      \"To eat something quickly.\"\n    ]\n  },\n  {\n    \"word\": \"explore\",\n    \"correct_definition\": \"To travel around and discover new places.\",\n    \"incorrect_definitions\": [\n      \"To stay in one place and do nothing.\",\n      \"To clean something carefully.\"\n    ]\n  },\n  {\n    \"word\": \"achieve\",\n    \"correct_definition\": \"To succeed in doing something.\",\n    \"incorrect_definitions\": [\n      \"To fail to do something.\",\n      \"To make something smaller.\"\n    ]\n  },\n  {\n    \"word\": \"challenge\",\n    \"correct_definition\": \"A difficult task or problem.\",\n    \"incorrect_definitions\": [\n      \"An easy task or problem.\",\n      \"A very small thing.\"\n    ]\n  },\n  {\n    \"word\": \"inspire\",\n    \"correct_definition\": \"To make someone feel excited or motivated to do something.\",\n    \"incorrect_definitions\": [\n      \"To make someone feel sad or discouraged.\",\n      \"To make something smaller.\"\n    ]\n  },\n  {\n    \"word\": \"unique\",\n    \"correct_definition\": \"Being the only one of its kind.\",\n    \"incorrect_definitions\": [\n      \"Being very common or ordinary.\",\n      \"Being very small or tiny.\"\n    ]\n  }\n]\n```"},
          ],
        },
      ],
    });
  
  