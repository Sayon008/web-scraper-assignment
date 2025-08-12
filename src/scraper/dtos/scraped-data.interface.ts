export interface HeadingTag {
    tag:string;
    text:string;
}

export interface ScrapedLinks{
    href:string,
    text:string;
}

export interface ScrapedData{
    url:string;
    fetchedAt : string;
    title:string;
    headings: HeadingTag[];
    links:ScrapedLinks[];
}