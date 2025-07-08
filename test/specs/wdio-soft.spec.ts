// /**
//  * WebdriverIO Soft Assertions Tests
//  *
//  * This test file demonstrates the usage of expect.soft() for soft assertions
//  * in WebdriverIO tests. Soft assertions allow tests to continue executing
//  * even when assertions fail, collecting all failures and reporting them
//  * at the end.
//  */

// // TODO: Reenable when expect.soft() is working on the Jasmine setup
// xdescribe('WebdriverIO Soft Assertions', () => {

//     beforeEach(async () => {
//     // Clear any previous soft failures before each test
//         expect.clearSoftFailures()
//     })

//     afterEach(async () => {
//     // Assert any accumulated soft failures at the end of each test
//         expect.assertSoftFailures()
//     })

//     it('Basic soft assertions with elements', async () => {
//         await browser.url('https://webdriver.io')

//         const heroSection = await browser.$('.hero')
//         const navigation = await browser.$('nav')

//         // These will not stop test execution if they fail
//         // All failures will be collected and reported at the end
//         await expect.soft(heroSection).toBeDisplayed()
//         await expect.soft(navigation).toBeDisplayed()
//         await expect.soft(heroSection).toExist()
//         await expect.soft(navigation).toExist()

//         // Assert all soft failures collected during this test
//         expect.assertSoftFailures()
//     })

//     it('Soft assertions with browser properties', async () => {
//         await browser.url('https://webdriver.io')

//         // Soft assertions on browser properties
//         await expect.soft(browser).toHaveUrl('https://webdriver.io/')
//         await expect.soft(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
//         await expect.soft(browser).toHaveUrl(expect.stringContaining('webdriver'))

//         // Test negative soft assertions
//         await expect.soft(browser).not.toHaveUrl('https://example.com')
//         await expect.soft(browser).not.toHaveTitle('Wrong Title')
//     })

//     it('Soft assertions with element text and attributes', async () => {
//         await browser.url('https://webdriver.io')

//         // Use elements and properties that we know exist and have content
//         const heroDescription = await browser.$(".hero p, .subtitle, [class*='hero'] p")

//         // Soft assertions on element text - using elements that actually have text
//         // Test with the description that we know contains text
//         await expect.soft(heroDescription).toHaveText(expect.stringContaining('automation'))
//         await expect.soft(heroDescription).toHaveText(expect.any(String))
//         await expect.soft(heroDescription).not.toHaveText('')

//         // Soft assertions with regex patterns on the description
//         await expect.soft(heroDescription).toHaveText(/automation|testing|framework|browser|node/i)

//         // Test browser-level text assertions which are more reliable
//         await expect.soft(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
//         await expect.soft(browser).toHaveUrl(expect.stringContaining('webdriver.io'))

//         // Soft assertions on element attributes - test any existing links
//         const allLinks = await browser.$$('a')
//         if ((await allLinks.length) > 0) {
//             const firstLink = allLinks[0]
//             await expect.soft(firstLink).toHaveAttribute('href', expect.any(String))
//             await expect.soft(firstLink).not.toHaveAttribute('href', '')
//         }
//     })

//     it('Soft assertions with element arrays', async () => {
//         await browser.url('https://webdriver.io')

//         const navLinks = await browser.$$('nav a')
//         const allLinks = await browser.$$('a')

//         // Soft assertions on element arrays
//         await expect.soft(navLinks).toBeElementsArrayOfSize({ gte: 3 })
//         await expect.soft(allLinks).toBeElementsArrayOfSize({ gte: 10 })

//         // Test individual elements in array with soft assertions
//         if (await navLinks.length > 0) {
//             const firstLink = navLinks[0]
//             await expect.soft(firstLink).toBeDisplayed()
//             await expect.soft(firstLink).toBeClickable()
//         }
//     })

//     it('Soft assertions with form interactions', async () => {
//         await browser.url('https://webdriver.io')

//         // Try to interact with search functionality
//         const searchButton = await browser.$('.DocSearch-Button')
//         await expect.soft(searchButton).toExist()
//         await expect.soft(searchButton).toBeDisplayed()

//         if (await searchButton.isExisting()) {
//             await searchButton.click()

//             const searchInput = await browser.$('#docsearch-input')
//             await searchInput.waitForDisplayed({ timeout: 3000 })

//             await expect.soft(searchInput).toBeDisplayed()
//             await expect.soft(searchInput).toBeFocused()

//             // Test input value with soft assertions
//             await searchInput.setValue('testing')
//             await expect.soft(searchInput).toHaveValue('testing')
//             await expect.soft(searchInput).toHaveValue(expect.stringContaining('test'))

//             // Close modal
//             await browser.keys('Escape')
//         }
//     })

//     it('Soft assertions with CSS properties', async () => {
//         await browser.url('https://webdriver.io')

//         const heroSection = await browser.$('.hero')
//         const navigation = await browser.$('nav')

//         // Soft assertions on element visibility (which implies CSS display properties)
//         await expect.soft(heroSection).toBeDisplayed() // This implies display is not "none"
//         await expect.soft(navigation).toBeDisplayed()

//         // Test element dimensions with soft assertions
//         const heroSize = await heroSection.getSize()
//         const heroLocation = await heroSection.getLocation()

//         // Use regular expect for primitive values since expect.soft() works on WebDriver elements
//         expect(heroSize.width).toBeGreaterThan(100)
//         expect(heroSize.height).toBeGreaterThan(50)
//         expect(heroLocation.x).toBeGreaterThanOrEqual(0)
//         expect(heroLocation.y).toBeGreaterThanOrEqual(0)
//     })

//     it('Soft assertions with asymmetric matchers', async () => {
//         await browser.url('https://webdriver.io')

//         // Use elements that actually exist and have content
//         const heroDescription = await browser.$(".hero p, .subtitle, [class*='hero'] p")
//         const allLinks = await browser.$$('a')

//         // Soft assertions with various asymmetric matchers
//         await expect.soft(heroDescription).toHaveText(expect.stringContaining('automation'))
//         await expect.soft(heroDescription).toHaveText(expect.stringMatching(/automation|testing|framework/i))
//         await expect.soft(heroDescription).not.toHaveText(expect.stringContaining('Vue.js'))

//         // Array matchers with soft assertions
//         const linkTexts = []
//         const maxLinks = Math.min(3, await allLinks.length)
//         for (let i = 0; i < maxLinks; i++) {
//             const linkText = await allLinks[i].getText()
//             linkTexts.push(linkText)
//         }

//         expect(linkTexts).toEqual(expect.arrayContaining([expect.any(String)]))
//         expect(linkTexts.length).toBeGreaterThan(0)

//         // Window properties with regular expect since these are primitive values
//         const windowSize = await browser.getWindowSize()
//         expect(windowSize).toEqual(expect.objectContaining({
//             width: expect.any(Number),
//             height: expect.any(Number),
//         }))
//     })

//     it('Chainable element soft assertions', async () => {
//         await browser.url('https://webdriver.io')

//         // Soft assertions with chainable elements (not awaited)
//         const chainableHero = browser.$('.hero')
//         const chainableNav = browser.$('nav')
//         const chainableLinks = browser.$$('a')

//         // These should work without await since they're chainable
//         await expect.soft(chainableHero).toBeDisplayed()
//         await expect.soft(chainableNav).toBeDisplayed()
//         await expect.soft(chainableLinks).toBeElementsArrayOfSize({ gte: 5 })

//         await expect.soft(chainableHero).toExist()
//         await expect.soft(chainableNav).toExist()
//         await expect.soft(chainableHero).not.toHaveText('')
//     })

//     it('Mixed soft and regular assertions', async () => {
//         await browser.url('https://webdriver.io')

//         const heroSection = await browser.$('.hero')

//         // Regular assertion - will stop test if it fails
//         await expect(heroSection).toExist()

//         // Soft assertions - will collect failures but continue
//         await expect.soft(heroSection).toBeDisplayed()
//         await expect.soft(heroSection).toHaveText(expect.stringContaining('WebdriverIO'))
//         await expect.soft(heroSection).not.toHaveText('Non-existent text')

//         // Another regular assertion
//         await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))

//         // More soft assertions
//         await expect.soft(browser).toHaveTitle(expect.any(String))
//         await expect.soft(browser).not.toHaveTitle('')
//     })

//     it('Soft assertion failure collection demo', async () => {
//         await browser.url('https://webdriver.io')

//         const heroSection = await browser.$('.hero')

//         // This test demonstrates how to use soft assertions and check failure counts
//         // without actually failing the test - useful for demonstrations

//         // All passing soft assertions
//         await expect.soft(heroSection).toExist() // Should pass
//         await expect.soft(heroSection).toBeDisplayed() // Should pass
//         await expect.soft(browser).toHaveUrl(expect.stringContaining('webdriver')) // Should pass
//         await expect.soft(browser).toHaveTitle(expect.stringContaining('WebdriverIO')) // Should pass

//         // More passing assertions
//         await expect.soft(heroSection).not.toHaveText('') // Should pass
//         await expect.soft(browser).toHaveUrl('https://webdriver.io/') // Should pass
//     })

//     it('Demonstrating soft assertion benefits', async () => {
//         await browser.url('https://webdriver.io')

//         // In a traditional test, if the first assertion fails,
//         // we'd never know about the other potential failures
//         // With soft assertions, we collect ALL failures

//         const heroSection = await browser.$('.hero')
//         const navigation = await browser.$('nav')
//         const footer = await browser.$('footer')

//         // Test multiple elements - all failures will be collected
//         await expect.soft(heroSection).toExist()
//         await expect.soft(heroSection).toBeDisplayed()
//         // Use a more reliable text assertion or skip if hero doesn't contain text
//         const heroText = await heroSection.getText()
//         if (heroText) {
//             await expect.soft(heroSection).toHaveText(expect.stringContaining('automation'))
//         }

//         await expect.soft(navigation).toExist()
//         await expect.soft(navigation).toBeDisplayed()
//         // Test tag name instead of role attribute since role may not exist
//         await expect.soft(navigation).toHaveElementProperty('tagName', 'NAV')

//         // This might fail, but test continues
//         await expect.soft(footer).toExist()
//         await expect.soft(footer).toBeDisplayed()

//         // Browser level assertions
//         await expect.soft(browser).toHaveUrl('https://webdriver.io/')
//         await expect.soft(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
//     })

// })
