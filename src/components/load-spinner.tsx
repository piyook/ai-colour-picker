import React from 'react';
import { Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';

type LoadSpinnerProperties = {
    readonly prompt: string | undefined;
};

function LoadSpinner({ prompt }: LoadSpinnerProperties): React.JSX.Element {
    return (
        <motion.div
            className="LoadSpinner"
            variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
        >
            <Spinner
                animation="border"
                role="status"
                className="LoadSpinner__spinner"
            />
            <h1 className="display-4">getting colours</h1>
            {prompt && (
                <>
                    <h3 className="display-6">for</h3>
                    <h3 className="display-6"> {prompt}</h3>
                </>
            )}
        </motion.div>
    );
}

export default LoadSpinner;
