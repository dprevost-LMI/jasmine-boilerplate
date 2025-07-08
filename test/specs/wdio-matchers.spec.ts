
describe('WebdriverIO-specific Matchers', () => {
    it('Browser matchers - toHaveUrl and toHaveTitle', async () => {
    // Navigate to WebdriverIO site
        await browser.url('https://webdriver.io')

        // Test toHaveUrl matcher
        await expect(browser).toHaveUrl('https://webdriver.io/')
        await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))

        // Test toHaveTitle matcher
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })

    it('Element existence and display matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test element existence
        const heroSection = await $('.hero')
        await expect(heroSection).toExist()
        await expect(heroSection).toBeDisplayed()

        // Test non-existent element
        const nonExistent = await $('.does-not-exist')
        await expect(nonExistent).not.toExist()
    })

    it('Text content matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test toHaveText matcher with different options
        const subtitle = await $('.hero__subtitle')
        await expect(subtitle).toHaveText(expect.stringContaining('automation'))
        await expect(subtitle).toHaveText(expect.stringContaining('Node.js'))

        // Test with ignoreCase option
        await expect(subtitle).toHaveText(expect.stringContaining('AUTOMATION'), { ignoreCase: true })
    })

    it('Attribute matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test toHaveAttribute matcher with a more reliable selector
        const logoLink = await $('a[href="/"]')
        await expect(logoLink).toHaveAttribute('href')
        await expect(logoLink).toHaveAttribute('href', '/')

        // Test class attributes
        const heroTitle = await $('.hero__title')
        await expect(heroTitle).toHaveElementClass('hero__title')
    })

    it('Form interaction and value matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test search functionality
        const searchButton = await $('.DocSearch-Button')
        await expect(searchButton).toBeClickable()
        await searchButton.click()

        const searchInput = await $('#docsearch-input')
        await expect(searchInput).toBeDisplayed()

        // Test input value
        await searchInput.setValue('api')
        await expect(searchInput).toHaveValue('api')
        await expect(searchInput).toHaveValue(expect.stringContaining('ap'))

        // Test suggestions appear
        const suggestions = await $('.DocSearch-Hit')
        await suggestions.waitForExist({ timeout: 3000 })
        await expect(suggestions).toExist()

        // Close search modal
        await browser.keys('Escape')
    })

    it('HTML content matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test toHaveHTML matcher
        const navigation = await $('nav')
        await expect(navigation).toHaveHTML(expect.stringContaining('nav'))

        // Test with array of expected values
        const heroSection = await $('.hero')
        await expect(heroSection).toHaveHTML(expect.stringContaining('hero'))
    })

    it('Multiple elements and array matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test multiple elements
        const navigationLinks = await $$('nav a')
        await expect(navigationLinks).toBeElementsArrayOfSize({ gte: 3 })

        // Test text content of multiple elements - use more generic approach
        const linksCount = await navigationLinks.length
        if (linksCount >= 1) {
            // Test that first navigation link exists
            const firstLink = navigationLinks[0]
            await expect(firstLink).toExist()
        }
    })

    it('Viewport and size matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test if element is in viewport
        const heroSection = await $('.hero')
        await expect(heroSection).toBeDisplayedInViewport()
    })

    it('Focus and interaction state matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test clickable elements - use a more reliable selector
        const logoLink = await $('a[href="/"]')
        await expect(logoLink).toBeClickable()

        // Test search button focus
        const searchButton = await $('.DocSearch-Button')
        await searchButton.click()

        const searchInput = await $('#docsearch-input')
        await expect(searchInput).toBeFocused()

        // Close search
        await browser.keys('Escape')
    })

    it('Negative assertions and edge cases', async () => {
        await browser.url('https://webdriver.io')

        // Test negative assertions with WebdriverIO matchers
        const nonExistentElement = await $('.this-class-does-not-exist')
        await expect(nonExistentElement).not.toExist()
        await expect(nonExistentElement).not.toBeDisplayed()

        // Test element that exists but doesn't have certain attributes
        const heroTitle = await $('.hero__title')
        await expect(heroTitle).not.toHaveAttribute('data-nonexistent')
        await expect(heroTitle).not.toHaveElementClass('non-existent-class')
    })

    it('Complex selectors and CSS matchers', async () => {
        await browser.url('https://webdriver.io')

        // Test complex CSS selectors
        const mainContent = await $('main')
        await expect(mainContent).toExist()

        // Test child elements - use a more specific selector that exists
        const heroTitle = await $('.hero__title')
        await expect(heroTitle).toExist()

        // Test CSS properties if available
        const heroSection = await $('.hero')
        await expect(heroSection).toHaveElementClass(expect.stringContaining('hero'))
    })

    it('RegExp and partial matchers with WebdriverIO', async () => {
        await browser.url('https://webdriver.io')

        // Test RegExp matchers
        await expect(browser).toHaveTitle(/WebdriverIO/i)
        await expect(browser).toHaveUrl(/webdriver\.io/)

        // Test partial matchers
        const subtitle = await $('.hero__subtitle')
        await expect(subtitle).toHaveText(expect.stringContaining('automation'))
        await expect(subtitle).toHaveText(expect.stringContaining('framework'))

        // Test array of partial matchers
        await expect(subtitle).toHaveText([
            expect.stringContaining('automation'),
            expect.stringContaining('Node.js'),
        ])
    })
})
