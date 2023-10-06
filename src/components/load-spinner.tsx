import React from 'react';
import { Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';

function LoadSpinner(): React.JSX.Element {
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
				className="text-white LoadSpinner__spinner"
			/>
			<h1 className="display-4 text-white">getting colours</h1>
		</motion.div>
	);
}

export default LoadSpinner;
