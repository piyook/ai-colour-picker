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
