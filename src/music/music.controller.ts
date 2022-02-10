import {Controller, Get, Inject, NotFoundException, Param} from '@nestjs/common';
import {Music} from './music.entity';
import {MusicService} from './music.service';
import {MusicSummary} from './music.interface';
import {Logger} from "winston";


@Controller('music-chart')
export class MusicController {
    constructor(@Inject('winston')
                private readonly logger: Logger,
                private readonly musicService: MusicService) {
    }

    @Get('/melon/song/:id')
    melon_getOne(@Param('id') musicId: number): Music {
        this.logger.info('GET /melon/song/' + musicId);
        //
        let result: Music;
        try {
            result = this.musicService.melon_getOne(musicId);
        } catch (error) {
            this.logger.error('GET /melon/song/' + musicId + ` | Music with ID ${musicId} not found.`);
            throw new NotFoundException(`Music with ID ${musicId} not found.`);
        }
        return result;
    }

    @Get('/melon/summary')
    melon_getSum(): MusicSummary[] {
        this.logger.info('GET /melon/summary');

        let result: MusicSummary[];
        try {
            result = this.musicService.melon_getSum()
        } catch (error) {
            this.logger.error('GET /melon/summary | db not found.');
            throw new NotFoundException(`db not found.`);
        }
        return result;
    }

    @Get('/melon/songs')
    melon_getSong(): Music[] {
        this.logger.info('GET /melon/songs');

        let result: Music[];
        try {
            result = this.musicService.melon_getSong()
        } catch (error) {
            this.logger.error('GET /melon/songs | db not found.');
            throw new NotFoundException(`db not found.`);
        }

        return result;
    }


    @Get('/genie/song/:id')
    genie_getOne(@Param('id') musicId: number): Music {
        this.logger.info('GET /melon/song/' + musicId);
        //
        let result: Music;
        try {
            result = this.musicService.genie_getOne(musicId);
        } catch (error) {
            this.logger.error('GET /melon/song/' + musicId + ` | Music with ID ${musicId} not found.`);
            throw new NotFoundException(`Music with ID ${musicId} not found.`);
        }
        return result;
    }

    @Get('/genie/summary')
    genie_getSum(): MusicSummary[] {
        this.logger.info('GET /genie/summary');

        let result: MusicSummary[];
        try {
            result = this.musicService.genie_getSum()
        } catch (error) {
            this.logger.error('GET /genie/summary | db not found.');
            throw new NotFoundException(`db not found.`);
        }
        return result;
    }

    @Get('/genie/songs')
    genie_getSong(): Music[] {
        this.logger.info('GET /genie/songs');

        let result: Music[];
        try {
            result = this.musicService.genie_getSong()
        } catch (error) {
            this.logger.error('GET /genie/songs | db not found.');
            throw new NotFoundException(`db not found.`);
        }

        return result;
    }
}
