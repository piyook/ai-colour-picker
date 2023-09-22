import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import type { HexColourResponse } from '../utils/utils';
import { uniquishId } from '../utils/utils';
import ColorBlock from './color-block';

function ColourResults(props: {
	readonly colours: HexColourResponse;
}): React.JSX.Element {
	if (!Array.isArray(props.colours))
		return <div>No Colours Found - Please Try Again</div>;

	const renderTooltip = (colourName: string) => (
		<Tooltip id="button-tooltip">{colourName}</Tooltip>
	);

	return (
		<div className="ColorResults">
			{props.colours.map((colour) => {
				return (
					<OverlayTrigger
						key={uniquishId()}
						placement="top"
						delay={{ show: 250, hide: 400 }}
						overlay={renderTooltip(colour.description)}
					>
						<div className="ColorResults__result">
							<ColorBlock
								chosenColorHex={colour.hex}
								chosenColorName={colour.colour}
								textColor={colour.contrastingColourHex}
							/>
						</div>
					</OverlayTrigger>
				);
			})}
		</div>
	);
}

export default ColourResults;
