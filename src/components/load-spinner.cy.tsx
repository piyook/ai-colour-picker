import React from 'react';
import LoadSpinner from './load-spinner';

describe('<LoadSpinner />', () => {
    it('renders', () => {
        cy.mount(<LoadSpinner prompt="Cypress Test" />);
    });

    it('contains the expected text when No Prompt prop passed', () => {
        cy.mount(<LoadSpinner prompt={undefined} />);
        cy.get('.LoadSpinner h1').should('contain.text', 'getting colours');
        cy.get('.LoadSpinner h3').should('not.exist');
    });

    it('contains the expected text when Prompt prop passed', () => {
        cy.mount(<LoadSpinner prompt="Cypress Test" />);
        cy.get('.LoadSpinner h1').should('contain.text', 'getting colours');
        cy.get('.LoadSpinner h3').should('contain.text', 'Cypress Test');
    });
});
