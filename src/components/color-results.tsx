import React from 'react';
import { motion } from 'framer-motion';
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
		<motion.div
			className="ColorResults"
			variants={{ visible: { transition: { staggerChildren: 6 } } }}
		>
			{props.colours.map((colour) => {
				return (
					<OverlayTrigger
						key={uniquishId()}
						placement="top"
						delay={{ show: 250, hide: 400 }}
						overlay={renderTooltip(colour.description)}
					>
						<motion.div
							className="ColorResults__result"
							variants={{
								hidden: { opacity: 0, y: -5 },
								visible: { opacity: 1, y: 0 },
							}}
							transition={{ type: 'spring', duration: 4 }}
						>
							<ColorBlock
								chosenColorHex={colour.hex}
								chosenColorName={colour.colour}
								textColor={colour.contrastingColourHex}
							/>
						</motion.div>
					</OverlayTrigger>
				);
			})}
		</motion.div>
	);
}

export default ColourResults;
