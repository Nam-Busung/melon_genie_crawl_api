import {Controller, Get, Inject} from '@nestjs/common';
import {Logger} from "winston";
import {CrawlService} from './crawl/crawl.service';

@Controller('')
export class AppController {
    constructor(@Inject('winston') private readonly logger: Logger, private readonly crawlService: CrawlService) {
        this.crawlService.melon_crawl();
        this.crawlService.genie_crawl();


        setInterval(this.crawlService.melon_crawl, 1800000);
        setInterval(this.crawlService.genie_crawl, 1800000);

    }

    @Get() home() {
        this.logger.info('GET /');
        return 'music API';
    }
}
