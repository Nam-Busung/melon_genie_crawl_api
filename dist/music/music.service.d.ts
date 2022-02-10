import { Music } from './music.entity';
import { MusicSummary } from './music.interface';
export declare class MusicService {
    melon_getOne(id: number): Music;
    genie_getOne(id: number): Music;
    melon_getSum(): MusicSummary[];
    genie_getSum(): MusicSummary[];
    melon_getSong(): Music[];
    genie_getSong(): Music[];
}
