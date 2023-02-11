import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class AsusService {
    async scrape(url: string) {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        // browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
        );

        const selector = '#productListContainer';
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await page.setViewport({ width: 1200, height: 800 });

        const items = await page.$$(`${selector} .filter_product_list`);
        const productList = [];

        for (const elem of items) {
            const model = (await elem.$eval('.headingRow', (node) => node.textContent)).trim();
            const specs = (
                await elem.$eval('.featureDescriptionRow', (node) => node.textContent)
            ).trim();
            productList.push({
                model,
                specs,
            });
        }
        return productList;
    }
}
