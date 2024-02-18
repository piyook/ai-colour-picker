import React from 'react';

export default function ColorBlock(properties: {
    readonly chosenColorHex: string;
    readonly chosenColorName: string;
    readonly textColor: string;
}): React.JSX.Element {
    return (
        <div
            className="ColorBlock"
            style={{
                backgroundColor: properties.chosenColorHex,
                color: properties.textColor,
            }}
        >
            <p className="ColorBlock_info">
                {properties.chosenColorName} <br />
                <br />
                {properties.chosenColorHex}{' '}
            </p>
        </div>
    );
}
