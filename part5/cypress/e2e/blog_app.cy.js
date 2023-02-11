describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'test user',
      username: 'tester',
      password: 'testerpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('login functionality', function() {
    it('front page can be opened', function() {
      cy.contains('The Blogosphere')
      cy.contains('All blogs(title, author, likes)')
    })
    it('login form can be opened', function() {
      cy.contains('login').click()
    })
    it('user can login', function() {
      cy.contains('login').click()
      cy.get('#username-input').type('tester')
      cy.get('#password-input').type('testerpassword')
      cy.get('#login-button').click()
      cy.contains('test user logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username-input').type('tester')
      cy.get('#password-input').type('testerpassword')
      cy.get('#login-button').click()
    })
    it('a new blog can be created', function() {
      cy.contains('Add a blog').click()
      cy.get('#newAuthorInput').type('Author Test')
      cy.get('#newTitleInput').type('Title Test')
      cy.get('#newUrlInput').type('Url Test')
      cy.get('#newLikesInput').type('10')
      cy.contains('Save').click()
      cy.contains('Author Test')
      cy.contains('Title Test')
      cy.contains('Url Test')
      cy.contains('10')
    })
  })
})


