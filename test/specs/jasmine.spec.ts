describe('Jasmine basics', () => {
    it('should be able to use withContext on expect', async () => {

        console.log('expect(\'test\')', expect('test'))

        // The below generate tsc error: Property 'withContext' does not exist on type 'Matchers<void | Promise<void>, string>'.ts(2339)
        // expect('test').withContext('test').toEqual('test')
    })
})
