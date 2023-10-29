import React from 'react';
import { HeaderBlock } from './header-block';

describe('<App />', () => {
    it('renders', () => {
        cy.mount(
            <HeaderBlock
                submitHandler={async () => {
                    /* Submit Handler Mock */
                }}
            />,
        );
    });

    it('contains the expected information and components', () => {
        cy.mount(
            <HeaderBlock
                submitHandler={async () => {
                    /* Submit Handler Mock */
                }}
            />,
        );

        cy.get('.Header__strapline').should(
            'contain.text',
            'AI Colour Generator',
        );
        cy.get('.Header__userInput').should('exist');
        cy.get('.Header__colourTotal').should('contain.text', 'Colours : 6');
        cy.get('.Header__slider').should('exist');
        cy.get('Button').should('contain.text', 'Get Colors');
    });

    it('slider works as expected', () => {
        cy.mount(
            <HeaderBlock
                submitHandler={async () => {
                    /* SubmitHandler Mock */
                }}
            />,
        );

        // Neither of solutions below work as expected so need to use workaround
        // cy.get('input[type=range]').invoke('val', 100).trigger('change')
        // cy.get('input[type=range]').invoke('val', 100).trigger('input')

        cy.get('input[type="range"]')
            .then(($element) => {
                const element = $element[0] as HTMLInputElement;
                element.stepUp(50);
            })
            .trigger('input');

        cy.get('.Header__colourTotal').should('contain.text', 'Colours : 20');
    });
});
