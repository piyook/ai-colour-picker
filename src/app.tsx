import React, { useState } from 'react';
import OpenAI from 'openai';
import { AnimatePresence } from 'framer-motion';
import 'bootswatch/dist/materia/bootstrap.min.css';
import LoadSpinner from './components/load-spinner';
import './App.css';
import { uniquishId, extractHexColours, type ColourData } from './utils/utils';
import { HeaderBlock } from './components/header-block';
import IntroBox from './components/intro-box';
import ColourView from './views/color-view';

/* Set OAI config object
NOTE THIS IS FOR DEMO PROJECT PURPOSES ONLY NEVER USE API KEY IN FRONTEND CLIENT IN 
A REAL PRODUCTION APP - INSTEAD CREATE A BACKEND API TO HANDLE THIS FOR THE APP */
const openai = new OpenAI({
	apiKey:
		(import.meta.env.VITE_OPENAI_API_KEY as string) ?? 'please_provide_key',
	dangerouslyAllowBrowser: true,
});

function App(): React.JSX.Element {
	const [aiColourData, setAiColourData] = useState<ColourData>();
	const [isLoading, setIsLoading] = useState(false);
	const [loadSpinnerText, setLoadSpinnerText] = useState('');

	const submitHandler = async (
		userQuestion: string,
		numberOfColours: string,
	) => {
		setLoadSpinnerText(userQuestion?.toLocaleLowerCase());
		setIsLoading(true);

		// Prepare prompt
		const parameters: OpenAI.Chat.ChatCompletionCreateParams = {
			messages: [
				{
					role: 'user',
					content: `Return only an array of a complemetary palette of ${numberOfColours} colours as hex values in json format based ${userQuestion}, including colour, hex, contrastingColourHex 
			and description as keys in an object with colours as a key arranged in order of darkest colours first. Dont include any other text in your response.`,
				},
			],
			model: 'gpt-3.5-turbo',
		};

		// Get OAI response with user supplied prompt and await response
		const completion: OpenAI.Chat.ChatCompletion | undefined =
			await openai.chat.completions.create(parameters).catch((error) => {
				if (error instanceof OpenAI.APIError) {
					console.log(error.status);
					console.log(error.message);
					return undefined;
				}

				throw new Error('Sorry - there was an error. Please Try again later.');
			});

		// Set OAI response and unset loading spinner
		const OaiAnswer: string | undefined =
			completion?.choices[0].message.content ?? 'error';

		setIsLoading(false);

		// Add new question and answers to array in state to trigger re-render
		setAiColourData({
			id: uniquishId(),
			colourPrompt: userQuestion,
			colours: extractHexColours(OaiAnswer),
		});
	};

	return (
		<>
			<AnimatePresence>
				{isLoading && <LoadSpinner prompt={loadSpinnerText ?? null} />}
			</AnimatePresence>

			<HeaderBlock submitHandler={submitHandler} />

			{!aiColourData && <IntroBox />}

			<AnimatePresence>
				{aiColourData && !isLoading && <ColourView aiColourData={aiColourData} />}
			</AnimatePresence>
		</>
	);
}

export default App;
