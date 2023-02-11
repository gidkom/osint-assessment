/* eslint-disable @typescript-eslint/prefer-for-of */
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class LgService {
    async scrape(url: string) {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        // browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Safari/537.36',
        );
        const selector = '.product-list-box';
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector(selector);
        await page.setViewport({ width: 1200, height: 800 });
        const items = await page.$$(`${selector} li .item`);
        const productList = [];
        for (let i = 0; i < items.length; i++) {
            const elem = items[i];
            const model = (await elem.$eval('.model-name', (node) => node.textContent)).trim();
            const price = (await elem.$eval('.price', (node) => node.textContent)).trim();
            productList.push({
                model,
                price,
                specs: model,
            });
        }
        return productList;
    }
}
