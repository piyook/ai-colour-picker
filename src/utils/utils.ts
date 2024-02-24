export const uniquishId = (): string => {
    return (
        Date.now().toString(36) +
        Math.floor(Number.MAX_SAFE_INTEGER * Math.random()).toString(36)
    );
};

export type HexColourResponse =
    | Array<{
          colourName: string;
          hex: string;
          description: string;
          contrastingColourHex: string;
      }>
    | undefined;

export type ColourData = {
    id: string | undefined;
    colourPrompt: string | undefined;
    colours: HexColourResponse | undefined;
};

export const extractHexColours = (response: string): HexColourResponse => {
    // Remove trailing comma that would invalidate JSON and close JSON for individual chunk of data
    const responseChunk = response.replace(/,\s*$/, '') + '] }';

    // See if it is possible to parse valid JSON (a complete chunk) otherwise return nothing
    try {
        const colourData = JSON.parse(responseChunk) as {
            colours: HexColourResponse;
        };
        return colourData?.colours;
    } catch {
        return undefined;
    }
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
