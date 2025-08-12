import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio  from 'cheerio';
import { ScrapedData } from './dtos/scraped-data.interface';
import * as fs from 'fs/promises';

@Injectable()
export class ScraperService {

    async scrapeAndSave(url:string) : Promise<string>{
        try{
            // Scraping the website from the provided URL
            const response = await axios.get(url, {timeout: 10000});

            const html = response.data;

            // Extracting the data in using Cheerio from the response
            const $ = cheerio.load(html);

            const scrapedData : ScrapedData = {
                url,
                fetchedAt : new Date().toISOString(),
                title : '',
                headings : [],
                links : [],
            };

            // Extracting all titles from the html
            scrapedData.title = $('title').first().text().trim();

            // Extracting all the h1 tags
            $('h1').each((_, element) => {
                scrapedData.headings.push({
                    tag : element.tagName.toLowerCase(),
                    text : $(element).text().trim()
                });
            });

            // Extracting all the links
            $('a[href]').each((_, element) => {
                scrapedData.links.push({
                    href : $(element).attr('href') || '',
                    text : $(element).text().trim(),
                });
            });

            // Writing data to file
            const filePath = 'scraped-data.json';
            const fileContent = JSON.stringify({url, data:scrapedData}, null, 2);

            await fs.writeFile(filePath, fileContent);

            return `Successfully scraped the data from ${url} and saved it to a ${filePath}`;
        }
        catch(error){
            console.log(`Error Scraping ${url}:`, error.message);
            throw new Error('Failed to scrape the website. ');
        }

    }
}
