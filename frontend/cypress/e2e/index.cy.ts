describe('template spec', () => {
  it('passes', () => {
    cy.visit(Cypress.env('base_url'))
  })
})

//TODO: Finish creating test for new pet
describe('Create New Pet', () => {
  it('passes', () => {
    cy.visit(Cypress.env('base_url'))
    cy.get('#new-pet-btn').click()
    cy.get('input[name="name"]').type('FeeFee')
    cy.get('input[name=""')
  })
})