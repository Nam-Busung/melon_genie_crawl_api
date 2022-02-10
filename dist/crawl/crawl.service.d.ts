import { Logger } from "winston";
export declare class CrawlService {
    private readonly logger;
    constructor(logger: Logger);
    melon_crawl(): void;
    genie_crawl(): void;
}
