import React, { useState } from 'react';
import OpenAI from 'openai';
import { AnimatePresence } from 'framer-motion';
import 'bootswatch/dist/materia/bootstrap.min.css';
import LoadSpinner from './components/load-spinner';
import { ErrorModal } from './components/error-modal';
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
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [modalShow, setModalShow] = React.useState(false);

	const submitHandler = async (
		userQuestion: string,
		numberOfColours: string,
	) => {
		setLoadSpinnerText(userQuestion?.toLocaleLowerCase());
		setIsLoading(true);
		setErrorMessage('');
		setModalShow(false);

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
			stream: true,
		};

		try {
			const stream = await openai.chat.completions
				.create(parameters)
				.catch((error) => {
					if (error instanceof OpenAI.APIError) {
						console.log(error.status);
						console.log(error.message);
						setErrorMessage(error.message);
						setModalShow(true);
						return undefined;
					}
				});

			let response = '';

			if (!stream) throw new Error('error');

			for await (const part of stream) {
				response += part.choices[0]?.delta?.content ?? '';

				// Add new question and answers to array in state to trigger re-render

				const streamedColours = extractHexColours(response);

				if (streamedColours) {
					setAiColourData({
						id: uniquishId(),
						colourPrompt: userQuestion,
						colours: streamedColours,
					});
				}
			}

			setIsLoading(false);
		} catch {
			// Catch any type of error and if not set, set error message
			setIsLoading(false);
			setModalShow(true);
			return undefined;
		}
	};

	return (
		<>
			<ErrorModal
				isShow={modalShow}
				message={errorMessage}
				onHide={() => {
					setModalShow(false);
				}}
			/>
			<AnimatePresence>
				{isLoading && <LoadSpinner prompt={loadSpinnerText ?? null} />}
			</AnimatePresence>

			<HeaderBlock submitHandler={submitHandler} />

			{!aiColourData && <IntroBox />}

			<AnimatePresence>
				{aiColourData && <ColourView aiColourData={aiColourData} />}
			</AnimatePresence>
		</>
	);
}

export default App;
