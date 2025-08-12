import { Body, Controller, Post } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperUrlDTO } from './dtos/scraper-url.dto';

@Controller('scraper')
export class ScraperController {

    constructor(
        private readonly scraperService: ScraperService,
    ){}

    @Post('scrape')
    async scrapeWebsite(@Body() scraperUrlDto : ScraperUrlDTO){
        const result = await this.scraperService.scrapeAndSave(scraperUrlDto.url);
        return {
            success:true, 
            message: 'Data is Scraped and saved successfully!', 
            result
        };
    }
}
