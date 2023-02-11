/* eslint-disable @typescript-eslint/prefer-for-of */
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class LenovoService {
    async scrape(url: string) {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        // browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
        );
        const selector = '.product_list';
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector(selector);
        await page.setViewport({ width: 1200, height: 800 });
        const items = await page.$$(`${selector} .product_right`);

        const productList = [];
        for (const elem of items) {
            let model;
            try {
                model = (await elem.$eval('.product_right', (node) => node.textContent)).trim();
            // const specs = (await elem.$eval('.series-item-card_points ', (node) => node.textContent)).trim();
            } catch (error) {
                model = '';
            }

            productList.push({
                model,
                // specs,
            });
        }
        return productList;
    }
}
