import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as cheerio  from 'cheerio';
import { ScrapedData } from './dtos/scraped-data.interface';
import * as fs from 'fs/promises';
import { timeStamp } from 'console';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ScraperService {

    constructor(private readonly configService:ConfigService){}

    async scrapeAndSave(url:string) : Promise<{savedTo: string, data: ScrapedData}>{
        try{

            // Fecthing from the env file
            const timeout = this.configService.get<number>('SCRAPER_TIMEOUT',10000);
            const directory = this.configService.get<string>('SCRAPER_OUTPUT_DIR','./');

            // Scraping the website from the provided URL
            const response = await axios.get(url, {timeout});

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
            $('h1, h2, h3, h4, h5, h6').each((_, element) => {
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
            const timeStamp = Date.now();
            const filePath = `${directory}scraped-data-${timeStamp}.json`;
            const fileContent = JSON.stringify({url, data:scrapedData}, null, 2);

            await fs.writeFile(filePath, fileContent);

            console.log(`Successfully scraped the data from ${url} and saved it to a ${filePath}`);

            return {
                savedTo:filePath,
                data: scrapedData
            }
        }
        catch(error){
            console.log(`Error Scraping ${url}:`, error.message);
            if(axios.isAxiosError(error)){
                throw new BadRequestException(`HTTP: ${error.response?.status}: Could not fetch the ${url}`);
            }

            if(error.code === 'ENOTFOUND'){
                throw new BadRequestException(`Invalid URL or host unreachable.`);
            }

            throw new InternalServerErrorException('Failed to scrape website.');
        }

    }
}
