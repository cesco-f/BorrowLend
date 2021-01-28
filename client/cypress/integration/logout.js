describe('logout', () => {

	const email = 'Jerome';
	const password = '1234Password$';

	it('should be able to login', () => {
		cy.visit('http://localhost:4200');
		cy.get('input[name="userName"]').type(email)
		cy.get('input[name="password"]').type(password)
		cy.get('button').click();
	});	

	it('should be able to logout', () => {
		cy.get('button').click();
		cy.location('pathname').should('eq', '/login');
	})

})