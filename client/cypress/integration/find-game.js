describe('find game', () => {

	const email = 'Jerome';
	const password = '1234Password$';
	const game = 'Grand Theft Auto';

	it('should log the user in', () => {
			cy.visit('http://localhost:4200');
			cy.get('input[name="userName"]').type(email)
			cy.get('input[name="password"]').type(password)
			cy.get('button').click();
			cy.location('pathname').should('eq', '/search');
		});	

		it('should be possible to search for a game', () => {
			cy.get('input[name="search"]').type(game);
			cy.get('.item-card').first()
				.should('be.visible')
		});

		it('should change the dropdown', () => {
			cy.get('.item-card')
				.get('select').first()
				.select('tolend')
				.select('toborrow');
		})

})