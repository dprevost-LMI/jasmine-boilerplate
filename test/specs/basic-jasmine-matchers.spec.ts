
describe('Basic Jasmine Matchers', () => {
    it('Jasmine equality matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test using Jasmine expect with element properties
        const heroSection = await $('.hero')

        // Get element properties and test with Jasmine matchers
        const isDisplayed = await heroSection.isDisplayed()
        expect(isDisplayed).toBe(true)
        expect(isDisplayed).toEqual(true)

        const exists = await heroSection.isExisting()
        expect(exists).toBe(true)
        expect(exists).toEqual(true)

        // Test browser properties with Jasmine matchers
        const currentUrl = await browser.getUrl()
        expect(currentUrl).toBe('https://webdriver.io/')
        expect(currentUrl).toEqual('https://webdriver.io/')

        const title = await browser.getTitle()
        expect(title).toContain('WebdriverIO')
        expect(typeof title).toBe('string')
        expect(title.length).toBeGreaterThan(0)
    })

    it('Jasmine number and comparison matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test element dimensions with Jasmine number matchers
        const heroSection = await $('.hero')
        const size = await heroSection.getSize()

        expect(size.width).toBeGreaterThan(0)
        expect(size.height).toBeGreaterThan(0)
        expect(size.width).toBeGreaterThanOrEqual(100)
        expect(size.height).toBeGreaterThanOrEqual(50)
        expect(size.width).toBeLessThan(10000)
        expect(size.height).toBeLessThan(10000)
        expect(size.width).toBeLessThanOrEqual(5000)
        expect(size.height).toBeLessThanOrEqual(5000)

        // Test with numbers
        expect(size.width).toBeCloseTo(size.width, 0)
        expect(Number.isInteger(size.width)).toBe(true)
        expect(Number.isInteger(size.height)).toBe(true)

        // Test navigation links count
        const navLinks = await $$('nav a')
        const linkCount = navLinks.length
        expect(linkCount).toBeGreaterThanOrEqual(1)
        expect(typeof linkCount).toBe('number')
    })

    it('Jasmine string matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test string methods with Jasmine
        const title = await browser.getTitle()
        expect(title).toMatch(/WebdriverIO/i)
        expect(title).toMatch(/^.*WebdriverIO.*$/)
        expect(title).toContain('WebdriverIO')

        // Test element text content
        const heroTitle = await $('.hero__title')
        const titleText = await heroTitle.getText()
        expect(typeof titleText).toBe('string')
        expect(titleText.length).toBeGreaterThanOrEqual(0)

        // Test element attributes
        const logoLink = await $('a[href="/"]')
        const href = await logoLink.getAttribute('href')
        expect(href).toBe('/')
        expect(href).toEqual('/')

        // Test URL patterns
        const currentUrl = await browser.getUrl()
        expect(currentUrl).toMatch(/^https:\/\//)
        expect(currentUrl).toMatch(/\/$/)
        expect(currentUrl).toContain('webdriver.io')
    })

    it('Jasmine array and object matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test window handles as array with Jasmine matchers
        const windowHandles = await browser.getWindowHandles()
        expect(Array.isArray(windowHandles)).toBe(true)
        expect(windowHandles.length).toBe(1)
        expect(windowHandles[0]).toEqual(jasmine.any(String))

        // Test window size as object with Jasmine matchers
        const windowSize = await browser.getWindowSize()
        expect(windowSize).toEqual(jasmine.objectContaining({
            width: jasmine.any(Number),
            height: jasmine.any(Number)
        }))
        expect(windowSize.width).toBeDefined()
        expect(windowSize.height).toBeDefined()
        expect(typeof windowSize.width).toBe('number')
        expect(typeof windowSize.height).toBe('number')

        // Test element location object
        const heroSection = await $('.hero')
        const location = await heroSection.getLocation()
        expect(location).toEqual(jasmine.objectContaining({
            x: jasmine.any(Number),
            y: jasmine.any(Number)
        }))
        expect(Object.keys(location)).toContain('x')
        expect(Object.keys(location)).toContain('y')

        // Test multiple elements as array
        const allLinks = await $$('a')
        expect(allLinks).toEqual(jasmine.any(Array))
        expect(allLinks.length).toBeGreaterThan(0)

        // Test element collection properties
        const linkTexts = []
        const maxLinks = Math.min(3, await allLinks.length)
        for (let i = 0; i < maxLinks; i++) {
            const linkText = await allLinks[i].getText()
            linkTexts.push(linkText)
        }
        expect(linkTexts.every((text: string) => typeof text === 'string')).toBe(true)
    })

    it('Jasmine boolean and truthiness matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test boolean values from WebDriver methods with Jasmine
        const heroSection = await $('.hero')

        const isDisplayed = await heroSection.isDisplayed()
        const exists = await heroSection.isExisting()
        const isEnabled = await heroSection.isEnabled()

        // Test with Jasmine boolean matchers
        expect(isDisplayed).toBe(true)
        expect(exists).toBe(true)
        expect(isEnabled).toBe(true)

        expect(isDisplayed).toBeTruthy()
        expect(exists).toBeTruthy()
        expect(isEnabled).toBeTruthy()

        expect(isDisplayed).not.toBe(false)
        expect(exists).not.toBe(false)
        expect(isEnabled).not.toBe(false)

        expect(isDisplayed).not.toBeFalsy()
        expect(exists).not.toBeFalsy()
        expect(isEnabled).not.toBeFalsy()

        // Test with non-existent element
        const nonExistent = await $('.does-not-exist')
        const nonExistentDisplayed = await nonExistent.isDisplayed()
        const nonExistentExists = await nonExistent.isExisting()

        expect(nonExistentDisplayed).toBe(false)
        expect(nonExistentExists).toBe(false)
        expect(nonExistentDisplayed).toBeFalsy()
        expect(nonExistentExists).toBeFalsy()
        expect(nonExistentDisplayed).not.toBeTruthy()
        expect(nonExistentExists).not.toBeTruthy()
    })

    it('Jasmine type checking matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test different data types with Jasmine
        const heroSection = await $('.hero')

        // Test string types
        const title = await browser.getTitle()
        const tagName = await heroSection.getTagName()
        expect(typeof title).toBe('string')
        expect(typeof tagName).toBe('string')

        // Test number types
        const size = await heroSection.getSize()
        expect(typeof size.width).toBe('number')
        expect(typeof size.height).toBe('number')

        // Test boolean types
        const isDisplayed = await heroSection.isDisplayed()
        const exists = await heroSection.isExisting()
        expect(typeof isDisplayed).toBe('boolean')
        expect(typeof exists).toBe('boolean')

        // Test object types
        const location = await heroSection.getLocation()
        const windowSize = await browser.getWindowSize()
        expect(typeof location).toBe('object')
        expect(typeof windowSize).toBe('object')
        expect(location).not.toBeNull()
        expect(windowSize).not.toBeNull()

        // Test array types
        const windowHandles = await browser.getWindowHandles()
        const allLinks = await $$('a')
        expect(Array.isArray(windowHandles)).toBe(true)
        expect(Array.isArray(allLinks)).toBe(true)

        // Test undefined/null
        const nonExistentAttribute = await heroSection.getAttribute('data-non-existent')
        expect(nonExistentAttribute).toBeNull()
    })

    it('Jasmine error and exception matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test that certain operations don't throw (synchronous)
        expect(() => {
            const num = 5 + 5
            return num
        }).not.toThrow()

        expect(() => {
            const title = 'WebdriverIO'
            return title.toUpperCase()
        }).not.toThrow()

        // Test basic calculations and operations
        const size = await $('.hero').getSize()
        const area = size.width * size.height
        expect(area).toBeGreaterThan(0)
        expect(typeof area).toBe('number')
        expect(Number.isFinite(area)).toBe(true)

        // Test string operations
        const title = await browser.getTitle()
        const upperTitle = title.toUpperCase()
        expect(upperTitle).toEqual(title.toUpperCase())
        expect(upperTitle).toContain('WEBDRIVERIO')
    })

    it('Jasmine async operation matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test that WebDriver operations complete successfully
        const title = await browser.getTitle()
        expect(title).toContain('WebdriverIO')

        const url = await browser.getUrl()
        expect(url).toBe('https://webdriver.io/')

        // Test element method results
        const heroSection = await $('.hero')
        const isDisplayed = await heroSection.isDisplayed()
        const exists = await heroSection.isExisting()
        const isEnabled = await heroSection.isEnabled()

        expect(isDisplayed).toBe(true)
        expect(exists).toBe(true)
        expect(isEnabled).toBe(true)

        // Test element size and location
        const size = await heroSection.getSize()
        expect(size).toEqual(jasmine.objectContaining({
            width: jasmine.any(Number),
            height: jasmine.any(Number)
        }))

        const location = await heroSection.getLocation()
        expect(location).toEqual(jasmine.objectContaining({
            x: jasmine.any(Number),
            y: jasmine.any(Number)
        }))

        // Test element attributes
        const logoLink = await $('a[href="/"]')
        const href = await logoLink.getAttribute('href')
        expect(href).toBe('/')

        const tagName = await logoLink.getTagName()
        expect(tagName.toLowerCase()).toMatch(/^a$/)

        // Test window handles
        const windowHandles = await browser.getWindowHandles()
        expect(windowHandles).toEqual(jasmine.any(Array))
        expect(windowHandles.length).toBe(1)

        // Test window size
        const windowSize = await browser.getWindowSize()
        expect(windowSize).toEqual(jasmine.objectContaining({
            width: jasmine.any(Number),
            height: jasmine.any(Number)
        }))

        // Test element text
        const heroTitle = await $('.hero__title')
        const text = await heroTitle.getText()
        expect(text).toEqual(jasmine.any(String))
    })

    it('Jasmine async error handling', async () => {
        await browser.url('https://webdriver.io')

        // Test error handling with try/catch since Jasmine doesn't have .rejects
        let errorThrown = false
        try {
            // This should not throw an error
            await browser.getTitle()
        } catch {
            errorThrown = true
        }
        expect(errorThrown).toBe(false)

        // Test with invalid operations that might fail
        try {
            const size = await $('.hero').getSize()
            expect(size).toBeDefined()
            expect(typeof size.width).toBe('number')
        } catch (error) {
            // If this fails, we can handle it gracefully
            expect(error).toBeDefined()
        }

        // Test custom error scenarios
        const throwingFunction = () => {
            throw new Error('Test error')
        }

        expect(throwingFunction).toThrowError('Test error')
        expect(throwingFunction).toThrowError(Error)

        // Test async function that throws
        const asyncThrowFunction = async () => {
            throw new Error('Async function error')
        }

        let asyncErrorCaught = false
        try {
            await asyncThrowFunction()
        } catch (error) {
            asyncErrorCaught = true
            expect(error).toEqual(jasmine.any(Error))
            expect((error as Error).message).toBe('Async function error')
        }
        expect(asyncErrorCaught).toBe(true)
    })

    it('Jasmine mixed async and synchronous operations', async () => {
        await browser.url('https://webdriver.io')

        // Test synchronous operations
        const nums = [1, 2, 3, 4, 5]
        expect(nums).toEqual(jasmine.any(Array))
        expect(nums.length).toBe(5)
        expect(nums).toContain(3)

        // Test asynchronous WebDriver operations
        const heroSection = await $('.hero')
        expect(heroSection).toBeDefined()

        // Combine sync and async
        const title = await browser.getTitle()
        const titleLength = title.length
        expect(titleLength).toBeGreaterThan(0)
        expect(typeof titleLength).toBe('number')

        // Test Promise-like behavior
        const urlPromise = browser.getUrl()
        expect(urlPromise).toEqual(jasmine.any(Promise))

        const url = await urlPromise
        expect(url).toBe('https://webdriver.io/')

        // Test multiple async operations
        const operations = await Promise.all([
            browser.getTitle(),
            browser.getUrl(),
            heroSection.isDisplayed()
        ])

        expect(operations[0]).toContain('WebdriverIO')
        expect(operations[1]).toBe('https://webdriver.io/')
        expect(operations[2]).toBe(true)

        // Test delayed operations
        const delayedResult = await new Promise<string>(resolve => {
            setTimeout(() => resolve('delayed result'), 100)
        })
        expect(delayedResult).toBe('delayed result')
    })
})
