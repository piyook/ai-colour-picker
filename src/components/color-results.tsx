import React from 'react';
import type { HexColourResponse } from '../utils/utils';
import { uniquishId } from '../utils/utils';
import ColorBlock from './color-block';

function ColourResults(props: {
	readonly colours: HexColourResponse;
}): React.JSX.Element {
	return (
		<div className="ColorResults">
			{props.colours.map((colour) => {
				return (
					<div key={uniquishId()} className="ColorResults__result">
						<ColorBlock
							chosenColorHex={colour.hex}
							chosenColorName={colour.colour}
							textColor={colour.contrastingColourHex}
						/>
						<span className="ColorResults__description">{colour.description}</span>
					</div>
				);
			})}
		</div>
	);
}

export default ColourResults;
