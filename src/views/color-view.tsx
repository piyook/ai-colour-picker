import React from 'react';
import type { ColourData } from '../utils/utils';
import ColourResults from '../components/color-results';

function ColourView(props: {
	readonly aiColourData: ColourData;
}): React.JSX.Element {
	if (
		props?.aiColourData.colours === undefined ||
		props?.aiColourData.colours === null
	)
		return <h2>No Data</h2>;

	return (
		<>
			<h1>Results</h1>
			<h2>Chosen colour prompt {props.aiColourData.colourPrompt}</h2>
			<ColourResults colours={props.aiColourData.colours} />
		</>
	);
}

export default ColourView;
