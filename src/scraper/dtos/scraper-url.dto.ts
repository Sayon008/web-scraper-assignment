import { IsNotEmpty, IsUrl } from "class-validator";

export class ScraperUrlDTO{
    @IsUrl()
    @IsNotEmpty()
    url:string;
}