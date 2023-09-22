import React from 'react';
import Button from 'react-bootstrap/Button';
import type { ColourData, HexColourResponse } from '../utils/utils';
import ColourResults from '../components/color-results';
import { copyToClipboard } from '../utils/utils';

function ColourView(props: {
	readonly aiColourData: ColourData;
}): React.JSX.Element {
	const clickHandler = async (
		colours: HexColourResponse | undefined,
	): Promise<void> => {
		try {
			await copyToClipboard(JSON.stringify(colours));
		} catch {
			throw new Error('failed to copy to clipboard');
		}
	};

	if (
		props?.aiColourData.colours === undefined ||
		props?.aiColourData.colours === null
	)
		return <h2>No Data</h2>;

	return (
		<>
			<h2 className="ColourView__themeText display-4">
				{props.aiColourData.colourPrompt}
			</h2>
			<ColourResults colours={props.aiColourData?.colours} />
			<Button
				variant="primary mt-5"
				onClick={async () => {
					await clickHandler(props.aiColourData?.colours);
				}}
			>
				Copy JSON Results To Clipboard
			</Button>
		</>
	);
}

export default ColourView;
