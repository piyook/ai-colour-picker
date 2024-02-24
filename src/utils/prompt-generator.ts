type PromptProperties = { userQuestion: string; numberOfColours: string };

export const promptGenerator = ({
    userQuestion,
    numberOfColours,
}: PromptProperties) => `Return only an array of a complemetary palette of ${numberOfColours} colours as hex values in json format inspired by ${userQuestion}, including colourName, hex, contrastingColourHex 
and description as keys in an object with colours as a key arranged in order of darkest colours first. The colour description should be detailled and descriptive. Dont include any other text in your response.`;
