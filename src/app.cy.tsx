import React from 'react';
import App from './app';

describe('<App />', () => {
	it('renders', () => {
		cy.viewport('macbook-16');
		cy.mount(<App />);
	});

	it('contains the expected header information', () => {
		cy.viewport('macbook-16');
		cy.mount(<App />);
		cy.get('.Header_strapline').should('contain.text', 'AI Colour Generator');
		cy.get('.Header__userInput').should('exist');
	});

	it('submitting a request should trigger a change', () => {
		cy.viewport('macbook-16');
		cy.mount(<App />);
		cy.spy().as('onChangeSpy');
		cy.get('.Header__userInput').type('sunset{enter}');
		cy.get('@onChangeSpy').should('have.been.calledWith', 'sunset');
	});
});
