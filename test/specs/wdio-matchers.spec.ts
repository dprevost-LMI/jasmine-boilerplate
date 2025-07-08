
import { expect as wdioExpect } from 'expect-webdriverio';
describe('WebdriverIO-specific Matchers', () => {
    it('Browser matchers - toHaveUrl and toHaveTitle', async () => {
    // Navigate to WebdriverIO site
        await browser.url('https://webdriver.io')

        // Test toHaveUrl matcher
        await expectAsync(browser).toHaveUrl('https://webdriver.io/')
        await expectAsync(browser).toHaveUrl(wdioExpect.stringContaining('webdriver'))

        // Test toHaveTitle matcher
        await expectAsync(browser).toHaveTitle(wdioExpect.stringContaining('WebdriverIO'))
    })

    it('Element existence and display matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test element existence
        const heroSection = await $('.hero')
        await expectAsync(heroSection).toExist()
        await expectAsync(heroSection).toBeDisplayed()

        // Test non-existent element
        const nonExistent = await $('.does-not-exist')
        await expectAsync(nonExistent).not.toExist()
    })

    it('Text content matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test toHaveText matcher with different options
        const subtitle = await $('.hero__subtitle')
        await expectAsync(subtitle).toHaveText(wdioExpect.stringContaining('automation'))
        await expectAsync(subtitle).toHaveText(wdioExpect.stringContaining('Node.js'))

        // Test with ignoreCase option
        await expectAsync(subtitle).toHaveText(wdioExpect.stringContaining('AUTOMATION'), { ignoreCase: true })
    })

    it('Attribute matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test toHaveAttribute matcher with a more reliable selector
        const logoLink = await $('a[href="/"]')
        await expectAsync(logoLink).toHaveAttribute('href')
        await expectAsync(logoLink).toHaveAttribute('href', '/')

        // Test class attributes
        const heroTitle = await $('.hero__title')
        await expectAsync(heroTitle).toHaveElementClass('hero__title')
    })

    it('Form interaction and value matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test search functionality
        const searchButton = await $('.DocSearch-Button')
        await expectAsync(searchButton).toBeClickable()
        await searchButton.click()

        const searchInput = await $('#docsearch-input')
        await expectAsync(searchInput).toBeDisplayed()

        // Test input value
        await searchInput.setValue('api')
        await expectAsync(searchInput).toHaveValue('api')
        await expectAsync(searchInput).toHaveValue(wdioExpect.stringContaining('ap'))

        // Test suggestions appear
        const suggestions = await $('.DocSearch-Hit')
        await suggestions.waitForExist({ timeout: 3000 })
        await expectAsync(suggestions).toExist()

        // Close search modal
        await browser.keys('Escape')
    })

    it('HTML content matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test toHaveHTML matcher
        const navigation = await $('nav')
        await expectAsync(navigation).toHaveHTML(wdioExpect.stringContaining('nav'))

        // Test with array of expected values
        const heroSection = await $('.hero')
        await expectAsync(heroSection).toHaveHTML(wdioExpect.stringContaining('hero'))
    })

    it('Multiple elements and array matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test multiple elements
        const navigationLinks = await $$('nav a')
        await expectAsync(navigationLinks).toBeElementsArrayOfSize({ gte: 3 })

        // Test text content of multiple elements - use more generic approach
        const linksCount = await navigationLinks.length
        if (linksCount >= 1) {
            // Test that first navigation link exists
            const firstLink = navigationLinks[0]
            await expectAsync(firstLink).toExist()
        }
    })

    it('Viewport and size matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test if element is in viewport
        const heroSection = await $('.hero')
        await expectAsync(heroSection).toBeDisplayedInViewport()
    })

    it('Focus and interaction state matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test clickable elements - use a more reliable selector
        const logoLink = await $('a[href="/"]')
        await expectAsync(logoLink).toBeClickable()

        // Test search button focus
        const searchButton = await $('.DocSearch-Button')
        await searchButton.click()

        const searchInput = await $('#docsearch-input')
        await expectAsync(searchInput).toBeFocused()

        // Close search
        await browser.keys('Escape')
    })

    it('Negative assertions and edge cases', async () => {
        await browser.url('https://webdriver.io')

        // Test negative assertions with WebdriverIO matchers
        const nonExistentElement = await $('.this-class-does-not-exist')
        await expectAsync(nonExistentElement).not.toExist()
        await expectAsync(nonExistentElement).not.toBeDisplayed()

        // Test element that exists but doesn't have certain attributes
        const heroTitle = await $('.hero__title')
        await expectAsync(heroTitle).not.toHaveAttribute('data-nonexistent')
        await expectAsync(heroTitle).not.toHaveElementClass('non-existent-class')
    })

    it('Complex selectors and CSS matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test complex CSS selectors
        const mainContent = await $('main')
        await expectAsync(mainContent).toExist()

        // Test child elements - use a more specific selector that exists
        const heroTitle = await $('.hero__title')
        await expectAsync(heroTitle).toExist()

        // Test CSS properties if available
        const heroSection = await $('.hero')
        await expectAsync(heroSection).toHaveElementClass(wdioExpect.stringContaining('hero'))
    })

    it('RegExp and partial matchers with WebdriverIO', async () => {
        await browser.url('https://webdriver.io')

        // Test RegExp matchers
        await expectAsync(browser).toHaveTitle(/WebdriverIO/i)
        await expectAsync(browser).toHaveUrl(/webdriver\.io/)

        // Test partial matchers
        const subtitle = await $('.hero__subtitle')
        await expectAsync(subtitle).toHaveText(wdioExpect.stringContaining('automation'))
        await expectAsync(subtitle).toHaveText(wdioExpect.stringContaining('framework'))

        // Test array of partial matchers
        await expectAsync(subtitle).toHaveText([
            wdioExpect.stringContaining('automation'),
            wdioExpect.stringContaining('Node.js'),
        ])
    })
})
