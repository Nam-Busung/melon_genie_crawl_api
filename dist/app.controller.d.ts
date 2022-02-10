import { Logger } from "winston";
import { CrawlService } from './crawl/crawl.service';
export declare class AppController {
    private readonly logger;
    private readonly crawlService;
    constructor(logger: Logger, crawlService: CrawlService);
    home(): string;
}
