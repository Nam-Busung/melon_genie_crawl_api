import {Module} from '@nestjs/common';
import {MusicModule} from './music/music.module';
import {AppController} from './app.controller';
import {WinstonModule} from "nest-winston";
import { CrawlService } from './crawl/crawl.service';
import * as winston from "winston";

@Module({
    imports: [WinstonModule.forRoot({
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                dirname: ( './log/'),
                filename: 'info.log',
                level: 'info',
            }),
            new winston.transports.File({
                dirname: ( './log/'),
                filename: 'error.log',
                level: 'error',
            }),
        ],
    }),MusicModule],
    controllers: [AppController],
    providers: [CrawlService],
})
export class AppModule {
}
