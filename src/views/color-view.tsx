import React from 'react';
import Button from 'react-bootstrap/Button';
import { motion } from 'framer-motion';
import {
    copyToClipboard,
    type ColourData,
    type HexColourResponse,
} from '../utils/utils';
import ColourResults from '../components/color-results';

function ColourView(properties: {
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
        properties?.aiColourData.colours === undefined ||
        properties?.aiColourData.colours === null
    )
        return <h2>No Data</h2>;

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
        >
            {/* <h2 className="ColourView__themeText display-4">
				{props.aiColourData.colourPrompt}
			</h2> */}
            <div>
                <ColourResults colours={properties.aiColourData?.colours} />
            </div>
            <Button
                variant="primary mt-5"
                onClick={async () => {
                    await clickHandler(properties.aiColourData?.colours);
                }}
            >
                Copy JSON Results To Clipboard
            </Button>
        </motion.div>
    );
}

export default ColourView;
