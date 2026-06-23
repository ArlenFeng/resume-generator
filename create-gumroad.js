const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // Show browser so user can see what's happening
        defaultViewport: null,
        args: ['--start-maximized']
    });

    const page = await browser.newPage();

    try {
        // Step 1: Go to Gumroad login
        console.log('Step 1: Logging in...');
        await page.goto('https://app.gumroad.com/login', { waitUntil: 'networkidle2', timeout: 30000 });

        // Fill email
        await page.waitForSelector('input[name="user[email]"]', { timeout: 10000 });
        await page.type('input[name="user[email]"]', 'arlen17318595343@gmail.com', { delay: 50 });

        // Fill password
        await page.waitForSelector('input[name="user[password]"]', { timeout: 10000 });
        await page.type('input[name="user[password]"]', '8783hua..', { delay: 50 });

        // Click login button
        await page.waitForSelector('button[type="submit"]', { timeout: 10000 });
        await page.click('button[type="submit"]');

        // Wait for navigation after login
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 });
        console.log('Login successful! Current URL:', page.url());

        // Step 2: Create new product
        console.log('Step 2: Creating new product...');
        await page.goto('https://app.gumroad.com/products/new', { waitUntil: 'networkidle2', timeout: 30000 });

        // Wait for the product form to load
        await page.waitForTimeout(3000);

        // Try to find and fill the product name
        console.log('Step 3: Filling product details...');

        // Look for product name input
        const nameSelectors = [
            'input[name="product[name]"]',
            'input[placeholder*="name" i]',
            'input[placeholder*="Name" i]',
            '#product_name',
            'input[data-testid="product-name"]'
        ];

        let nameInput = null;
        for (const sel of nameSelectors) {
            try {
                nameInput = await page.$(sel);
        if (nameInput) {
            console.log('Found name input:', sel);
            break;
        }
            } catch (e) {}
        }

        if (nameInput) {
            await nameInput.click({ clickCount: 3 });
            await nameInput.type('Resume Builder - 5 Templates, PDF Export, Bilingual EN/CN', { delay: 30 });
        } else {
            console.log('Could not find name input, trying generic approach...');
            // Try first input on the page
            const inputs = await page.$$('input[type="text"], input:not([type])');
            if (inputs.length > 0) {
                await inputs[0].click({ clickCount: 3 });
                await inputs[0].type('Resume Builder - 5 Templates, PDF Export, Bilingual EN/CN', { delay: 30 });
            }
        }

        // Look for description textarea
        const descSelectors = [
            'textarea[name="product[description]"]',
            'textarea[placeholder*="description" i]',
            'textarea[placeholder*="Description" i]',
            '#product_description',
            'textarea[data-testid="product-description"]',
            '.ProseMirror',
            '[contenteditable="true"]'
        ];

        let descInput = null;
        for (const sel of descSelectors) {
            try {
                descInput = await page.$(sel);
                if (descInput) {
                    console.log('Found description input:', sel);
                    break;
                }
            } catch (e) {}
        }

        if (descInput) {
            await descInput.click();
            const descText = `Create a professional resume in 3 minutes. 5 beautiful templates, photo upload, real-time preview, one-click PDF export. Bilingual Chinese & English. No registration needed. After purchase you get a permanent access link.`;
            await descInput.type(descText, { delay: 10 });
        }

        // Look for price input
        const priceSelectors = [
            'input[name="product[price]"]',
            'input[placeholder*="price" i]',
            'input[placeholder*="Price" i]',
            '#product_price',
            'input[type="number"]'
        ];

        let priceInput = null;
        for (const sel of priceSelectors) {
            try {
                priceInput = await page.$(sel);
                if (priceInput) {
                    console.log('Found price input:', sel);
                    break;
                }
            } catch (e) {}
        }

        if (priceInput) {
            await priceInput.click({ clickCount: 3 });
            await priceInput.type('399', { delay: 30 }); // $3.99 in cents
        }

        console.log('Product details filled. Please review and click Publish manually.');
        console.log('Browser will stay open for you to complete the process.');

        // Take a screenshot to see current state
        await page.screenshot({ path: 'f:/claude/20260616_project/resume-generator/gumroad-screenshot.png' });
        console.log('Screenshot saved to gumroad-screenshot.png');

    } catch (error) {
        console.error('Error:', error.message);
        await page.screenshot({ path: 'f:/claude/20260616_project/resume-generator/gumroad-error.png' });
        console.log('Error screenshot saved to gumroad-error.png');
    }

    // Keep browser open
    console.log('\nBrowser is open. Complete the remaining steps manually:');
    console.log('1. Review the filled information');
    console.log('2. Upload cover image (open cover.html in another browser tab and screenshot it)');
    console.log('3. Set redirect URL to: https://arlenfeng.github.io/resume-generator/index.html');
    console.log('4. Click Publish');
})();
