// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Test One',
            username: 'testone',
            password: 'testing'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('Submit')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testone')
            cy.get('#password').type('testing')
            cy.contains('Submit').click()
            cy.contains('logout').click()
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('testone')
            cy.get('#password').type('wrong')
            cy.contains('Submit').click()

            cy.get('.error')
            .should('contain', 'invalid username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')

        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'testone', password: 'testing'})
        })

        it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('Monday')
            cy.get('#author').type('Tester 1')
            cy.get('#url').type('www.testing.com')
            cy.get('#likes').type('3')
            cy.get('#create-button').click()

            cy.get('html').should('contain', 'Monday Tester 1')
        })

        it.only('user can like a blog', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('Tuesday')
            cy.get('#author').type('Tester 2')
            cy.get('#url').type('www.testingtwo.com')
            cy.get('#likes').type('2')
            cy.get('#create-button').click()
            cy.get('#view').click()
            cy.get('#like').click()

            cy.get('.likes').contains('3')
        })
    })
})