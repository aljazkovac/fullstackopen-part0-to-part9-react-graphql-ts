describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('The Blogosphere')
    cy.contains('All blogs(title, author, likes')
  })
  it('login form can be opened', function() {
    cy.contains('login').click()
  })
  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username-input').type('root')
    cy.get('#password-input').type('superpassword')
    cy.get('#login-button').click()
    cy.contains('superuser logged in')
  })
})