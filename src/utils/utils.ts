export const uniquishId = (): string => {
	return (
		Date.now().toString(36) +
		Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(36)
	);
};

export type HexColourResponse = Array<{
	colour: string;
	hex: string;
	description: string;
	contrastingColourHex: string;
}>;

export type ColourData = {
	id: string | undefined;
	colourPrompt: string | undefined;
	colours: HexColourResponse | undefined;
};

export const extractHexColours = (response: string): HexColourResponse => {
	const colourData = JSON.parse(response) as { colours: HexColourResponse };

	return colourData?.colours;
};

export const copyToClipboard = async (copyText: string) => {
	try {
		if ('clipboard' in navigator) {
			await navigator.clipboard.writeText(copyText);
		} else {
			// Use for older browsers
			document.execCommand('copy', true, copyText);
		}
	} catch {
		throw new Error('Error Copying To Clipboard');
	}
};
