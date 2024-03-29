import React, { useState, useRef, useEffect } from 'react';
import FormRange from 'react-bootstrap/FormRange';
import { Button } from 'react-bootstrap';

type HeaderBlockProperties = {
    readonly submitHandler: (
        userQuestion: string,
        numberOfColours: string,
    ) => Promise<void>;
};

export function HeaderBlock({
    submitHandler,
}: HeaderBlockProperties): React.JSX.Element {
    const [numberOfColours, setNumberOfColours] = useState('6');
    const [currentTopic, setCurrentTopic] = useState<string>();
    const [screenMode, setScreenMode] = useState('light');
    const inputData = useRef<HTMLInputElement>(null);
    const slider = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputData.current) inputData.current.focus();
    });

    useEffect(() => {
        document.documentElement.dataset.bsTheme = screenMode;
    }, [screenMode]);

    const rangeHandler = () => {
        if (slider?.current) {
            let currentValue = Math.floor(
                Number.parseInt(slider.current.value, 10) / 5,
            );
            if (currentValue === 0) {
                currentValue = 1;
            }

            setNumberOfColours(currentValue.toString());
        }
    };

    const inputHandler = async (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        // Screen out empty values or any key press that is not 'enter'
        if (
            event.key !== 'Enter' ||
            inputData.current === null ||
            inputData.current.value === ''
        )
            return;

        setCurrentTopic(inputData.current.value);

        // Set up return data and set loading spinner until OAI response is obtained
        await submitHandler(inputData.current.value, numberOfColours);

        // Reset input to empty
        inputData.current.value = '';
    };

    const clickHandler = async () => {
        if (inputData.current === null || inputData.current.value === '')
            return;

        setCurrentTopic(inputData.current.value);

        await submitHandler(inputData.current.value, numberOfColours);

        inputData.current.value = '';
    };

    const ModeChangeHandler = () => {
        setScreenMode(screenMode === 'dark' ? 'light' : 'dark');
    };

    return (
        <header className="Header">
            <div className="form-check form-switch d-flex align-self-end align-items-center m-10">
                <div className="px-3">dark</div>
                <div className="form-check form-switch ">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        onChange={ModeChangeHandler}
                    />
                </div>
            </div>
            <div className="Header__widgetBar">
                <div className="Header__sliderGroup">
                    <div className="Header__colourTotal">
                        Colours : {numberOfColours}
                    </div>
                    <div className="Header__slider">
                        <FormRange
                            ref={slider}
                            data-bs-theme="light"
                            onChange={rangeHandler}
                        />
                    </div>
                </div>

                <Button
                    className="mt-4 Header__button"
                    variant="primary"
                    size="sm"
                    onClick={clickHandler}
                >
                    Get Colors
                </Button>

                <div className="Header__currentTopic">
                    <div className="Header__strapline">
                        <h5>AI Colour Generator Tool</h5>
                    </div>
                    <h6>colour topic: </h6>
                    <h5 className="text-primary">
                        {' '}
                        {currentTopic
                            ? currentTopic?.toLocaleLowerCase()
                            : 'none'}
                    </h5>
                </div>
            </div>
            <input
                ref={inputData}
                className="Header__userInput text-primary border border-secondary
				 fw-bold "
                type="text"
                placeholder="What kind of colours should I find?"
                onKeyUp={inputHandler}
            />
        </header>
    );
}
