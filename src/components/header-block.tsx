import React, { useState, useRef, useEffect } from 'react';
import FormRange from 'react-bootstrap/FormRange';
import { Button } from 'react-bootstrap';

type HeaderBlockProps = {
	readonly submitHandler: (
		userQuestion: string,
		numberOfColours: string,
	) => Promise<void>;
};

export function HeaderBlock({
	submitHandler,
}: HeaderBlockProps): React.JSX.Element {
	const [numberOfColours, setNumberOfColours] = useState('6');
	const inputData = useRef<HTMLInputElement>(null);
	const slider = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputData.current) inputData.current.focus();
	});

	const rangeHandler = () => {
		if (slider?.current) {
			let currentValue = Math.floor(Number.parseInt(slider.current.value, 10) / 5);
			if (currentValue === 0) {
				currentValue = 1;
			}

			setNumberOfColours(currentValue.toString());
		}
	};

	const inputHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		// Screen out empty values or any key press that is not 'enter'
		if (
			event.key !== 'Enter' ||
			inputData.current === null ||
			inputData.current.value === ''
		)
			return;

		// Set up return data and set loading spinner until OAI response is obtained
		await submitHandler(inputData.current.value, numberOfColours);

		// Reset input to empty
		inputData.current.value = '';
	};

	const clickHandler = async () => {
		if (inputData.current === null || inputData.current.value === '') return;

		await submitHandler(inputData.current.value, numberOfColours);

		inputData.current.value = '';
	};

	return (
		<header className="Header">
			<div className="Header_strapline">
				<h5>AI Colour Generator</h5>
			</div>
			<input
				ref={inputData}
				className="Header__userInput text-white bg-primary fw-bold "
				type="text"
				placeholder="What kind of colours should I find?"
				onKeyUp={inputHandler}
			/>

			<div>Colours : {numberOfColours}</div>
			<div className="Header_slider">
				<FormRange ref={slider} onChange={rangeHandler} />
			</div>
			<Button
				className="mt-2"
				variant="outline-info"
				size="sm"
				onClick={clickHandler}
			>
				Submit
			</Button>
		</header>
	);
}
