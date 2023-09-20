import React from 'react';
import { Stack } from 'react-bootstrap';

function IntroBox(): React.JSX.Element {
	return (
		<Stack className="d-flex flex-column justify-content-center align-items-center vh-100 pt-4 bg-opacity-25">
			<h1 className="display-4 text-info">AI Colour Picker Tool</h1>
		</Stack>
	);
}

export default IntroBox;
