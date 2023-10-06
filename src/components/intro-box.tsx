import React from 'react';
import { Stack } from 'react-bootstrap';

function IntroBox(): React.JSX.Element {
	return (
		<Stack className="IntroBox d-flex flex-column justify-content-center align-items-center vh-100 pt-4 bg-opacity-25">
			<h1 className="display-4 text-info">AI Colour Picker Tool</h1>
			<div>
				Enter a word or sentence in the box above to get a range of colours inspired
				by this phrase.
				<br />
				For example try &apos;Autumn Leaf&apos;.
			</div>
		</Stack>
	);
}

export default IntroBox;
