import React from 'react';

export default function ColorBlock(props: {
	readonly chosenColorHex: string;
	readonly chosenColorName: string;
	readonly textColor: string;
}): React.JSX.Element {
	return (
		<div
			className="ColorBlock"
			style={{ backgroundColor: props.chosenColorHex, color: props.textColor }}
		>
			<p>
				{' '}
				{props.chosenColorName} : {props.chosenColorHex}{' '}
			</p>
		</div>
	);
}
