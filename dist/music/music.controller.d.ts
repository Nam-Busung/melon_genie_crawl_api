import { Music } from './music.entity';
import { MusicService } from './music.service';
import { MusicSummary } from './music.interface';
import { Logger } from "winston";
export declare class MusicController {
    private readonly logger;
    private readonly musicService;
    constructor(logger: Logger, musicService: MusicService);
    melon_getOne(musicId: number): Music;
    melon_getSum(): MusicSummary[];
    melon_getSong(): Music[];
    genie_getOne(musicId: number): Music;
    genie_getSum(): MusicSummary[];
    genie_getSong(): Music[];
}
