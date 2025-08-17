describe('Jasmine basics', () => {
    it('should be able to use withContext on expect', async () => {

        // The below generate a tsc error, but it works at runtime
        expect('test').withContext('test').toEqual('test')
    })
})
