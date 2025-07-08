import { expect as wdioExpect } from 'expect-webdriverio'
describe('Standard Expect Matchers', () => {
    it('Standard expect matchers - toEqual and toBe', async () => {
        await browser.url('https://webdriver.io')

        // Test using standard expect matchers with element properties
        const heroSection = await $('.hero')

        // Get element properties and test with standard matchers
        const isDisplayed = await heroSection.isDisplayed()

        expect(isDisplayed).toBe(true)

        const exists = await heroSection.isExisting()
        expect(exists).toEqual(true)

        // Test element dimensions with standard matchers
        const size = await heroSection.getSize()
        expect(size).toEqual(wdioExpect.objectContaining({
            width: wdioExpect.any(Number),
            height: wdioExpect.any(Number),
        }))
        expect(size.width).toBeGreaterThan(0)
        expect(size.height).toBeGreaterThan(0)

        // Test element location
        const location = await heroSection.getLocation()
        expect(location).toEqual(wdioExpect.objectContaining({
            x: wdioExpect.any(Number),
            y: wdioExpect.any(Number),
        }))

        // Test browser properties with standard matchers
        const currentUrl = await browser.getUrl()
        expect(currentUrl).toEqual('https://webdriver.io/')
        expect(currentUrl).toMatch(/^https:\/\/webdriver\.io/)

        const title = await browser.getTitle()
        expect(title).toEqual(wdioExpect.stringContaining('WebdriverIO'))
        expect(title.length).toBeGreaterThan(0)

        // Test element text content with standard matchers
        // Use page title instead since h1 might be empty
        const pageTitle = await browser.getTitle()
        expect(pageTitle).toEqual(wdioExpect.stringContaining('WebdriverIO'))
        expect(typeof pageTitle).toBe('string')
        expect(pageTitle.length).toBeGreaterThan(0)

        // Test element attributes with standard matchers
        const logoLink = await $('a[href="/"]')
        const href = await logoLink.getAttribute('href')
        expect(href).toBe('/')
        expect(href).toEqual('/')

        // Test CSS properties with standard matchers
        const heroDisplay = await heroSection.getCSSProperty('display')
        expect(heroDisplay).toEqual(wdioExpect.objectContaining({
            property: 'display',
            value: wdioExpect.any(String),
        }))
        expect(heroDisplay.value).not.toBe('none')

        // Test element tag names
        const tagName = await heroSection.getTagName()
        expect(tagName.toLowerCase()).toEqual('header')
        expect(tagName).toMatch(/^(header|div|section)$/i)
    })

    it('Expect matchers with form interactions', async () => {
        await browser.url('https://webdriver.io')

        // Test search button interactions with standard matchers
        const searchButton = await $('.DocSearch-Button')

        const isClickable = await searchButton.isClickable()
        expect(isClickable).toBe(true)
        expect(isClickable).toEqual(true)

        const isEnabled = await searchButton.isEnabled()
        expect(isEnabled).toBe(true)

        // Click and test modal appearance
        await searchButton.click()

        const searchInput = await $('#docsearch-input')
        await searchInput.waitForDisplayed({ timeout: 3000 })

        const inputDisplayed = await searchInput.isDisplayed()
        expect(inputDisplayed).toBe(true)

        // Test input value changes
        await searchInput.setValue('testing')

        const inputValue = await searchInput.getValue()
        expect(inputValue).toEqual('testing')
        expect(inputValue).toBe('testing')
        expect(inputValue.length).toEqual(7)

        // Clear and test empty value
        // TODO: unstable why?
        // await searchInput.clearValue();
        // await browser.pause(1000); // Wait for input to clear
        // const clearedValue = await searchInput.getValue();
        // expect(clearedValue).toBe("");
        // expect(clearedValue).toEqual("");
        // expect(clearedValue).toHaveLength(0);

        // Close modal
        await browser.keys('Escape')
    })

    it('Array and object matchers with WebDriver data', async () => {
        await browser.url('https://webdriver.io')

        // Test window handles as array
        const windowHandles = await browser.getWindowHandles()
        expect(windowHandles).toEqual(wdioExpect.arrayContaining([wdioExpect.any(String)]))
        expect(windowHandles.length).toBe(1)
        expect(Array.isArray(windowHandles)).toBe(true)

        // Test window size as object
        const windowSize = await browser.getWindowSize()
        expect(windowSize).toEqual({
            width: wdioExpect.any(Number),
            height: wdioExpect.any(Number),
        })
        expect(windowSize).toEqual(wdioExpect.objectContaining({
            width: wdioExpect.any(Number),
        }))

        // Test element location and size as objects with standard matchers
        const heroSection = await $('.hero')
        const location = await heroSection.getLocation()
        const size = await heroSection.getSize()

        expect(location).toEqual({
            x: jasmine.any(Number),
            y: jasmine.any(Number),
        })

        expect(size).toEqual({
            width: jasmine.any(Number),
            height: jasmine.any(Number),
        })

        // Test basic size validation with standard matchers
        expect(size.width).toBeGreaterThan(100)
        expect(size.height).toBeGreaterThan(50)

        // Test multiple elements as array
        const allLinks = await $$('a')
        expect(allLinks).toEqual(wdioExpect.any(Array))
        expect(await $$('a').length).toBeGreaterThan(0)

        // Test element texts as array - test first 3 elements
        const linkTexts = []
        const maxLinks = Math.min(3, await allLinks.length)
        for (let i = 0; i < maxLinks; i++) {
            const linkText = await allLinks[i].getText()
            linkTexts.push(linkText)
        }

        expect(linkTexts).toEqual(wdioExpect.arrayContaining([wdioExpect.any(String)]))
        expect(linkTexts.every((text: string) => typeof text === 'string')).toBe(true)
    })

    it('Number and type matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test navigation links count with number matchers
        const linkCount = await $$('nav a').length
        expect(linkCount).toBeGreaterThanOrEqual(1)
        expect(typeof linkCount).toBe('number')

        // Test element dimensions with number matchers
        const heroSection = await $('.hero')
        const size = await heroSection.getSize()
        expect(size.width).toBeGreaterThan(0)
        expect(size.height).toBeGreaterThan(0)
        expect(typeof size.width).toBe('number')
        expect(typeof size.height).toBe('number')

        // Test string properties
        const title = await browser.getTitle()
        expect(typeof title).toBe('string')
        expect(title.length).toBeGreaterThan(0)
        expect(title).not.toBe('')
    })

    it('Boolean and truthiness matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test boolean values from WebDriver methods
        const heroSection = await $('.hero')

        const isDisplayed = await heroSection.isDisplayed()
        const exists = await heroSection.isExisting()
        const isEnabled = await heroSection.isEnabled()

        // Test with expect boolean matchers
        expect(isDisplayed).toBe(true)
        expect(exists).toBe(true)
        expect(isEnabled).toBe(true)

        expect(isDisplayed).toBeTruthy()
        expect(exists).toBeTruthy()
        expect(isEnabled).toBeTruthy()

        // Test with non-existent element
        const nonExistent = await $('.does-not-exist')
        const nonExistentDisplayed = await nonExistent.isDisplayed()
        const nonExistentExists = await nonExistent.isExisting()

        expect(nonExistentDisplayed).toBe(false)
        expect(nonExistentExists).toBe(false)
        expect(nonExistentDisplayed).toBeFalsy()
        expect(nonExistentExists).toBeFalsy()
    })
})
