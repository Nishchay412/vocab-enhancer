export const Ai_prompt = `Generate a vocabulary card for a {fluency} in {language} in JSON format. Provide 15 words for a beginner in {language}. The user is expected to know {language} well but is trying to enhance their vocabulary. Include the word, its correct definition, and two incorrect definitions. Ensure the correct definition is clear and easy to understand at a {fluency} level, and the incorrect ones are plausible but wrong.Make sure the json is wrapped up in an array and it follows all the rule, and all i get is a json file, the json would have a name associated to it as {fluency} - dont add a string before or after it or anything of sort The output should follow this structure:

{
  "word": "example_word",
  "correct_definition": "This is the correct definition.",
  "incorrect_definitions": [
    "This is an incorrect definition 1.",
    "This is an incorrect definition 2."
  ]
}`;