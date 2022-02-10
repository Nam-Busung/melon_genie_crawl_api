import {Injectable, NotFoundException} from '@nestjs/common';
import {Music} from './music.entity';
import {MusicDetail, MusicSummary} from './music.interface';
import {JsonDB} from "node-json-db";
import {Config} from "node-json-db/dist/lib/JsonDBConfig";


@Injectable()
export class MusicService {

    melon_getOne(id: number): Music {
        const db = new JsonDB(new Config("MusicDB", true, false, '/'));
        if (!(id > 0 && 101 > id)) {
            throw new NotFoundException(`Music with ID ${id} not found.`);
        }
        const music = {...db.getObject<MusicSummary>("/melon/summary[" + (id - 1) + "]"), ...db.getObject<MusicDetail>("/melon/detail[" + (id - 1) + "]")};

        return music;
    }

    genie_getOne(id: number): Music {
        const db = new JsonDB(new Config("MusicDB", true, false, '/'));
        if (!(id > 0 && 51 > id)) {
            throw new NotFoundException(`Music with ID ${id} not found.`);
        }
        const music = {...db.getObject<MusicSummary>("/genie/summary[" + (id - 1) + "]"), ...db.getObject<MusicDetail>("/genie/detail[" + (id - 1) + "]")};

        return music;
    }

    melon_getSum(): MusicSummary[] {
        const db = new JsonDB(new Config("MusicDB", true, false, '/'));
        try {
            db.getData("/melon");
        } catch (error) {
            throw new NotFoundException(`db not found.`);
        }

        const sum = db.getObject<MusicSummary[]>("/melon/summary")
        return sum;
    }

    genie_getSum(): MusicSummary[] {
        const db = new JsonDB(new Config("MusicDB", true, false, '/'));
        try {
            db.getData("/genie");
        } catch (error) {
            throw new NotFoundException(`db not found.`);
        }

        const sum = db.getObject<MusicSummary[]>("/genie/summary")
        return sum;
    }

    melon_getSong(): Music[] {
        const musicArr = [];
        const db = new JsonDB(new Config("MusicDB", true, false, '/'));
        try {
            db.getData("/melon");
        } catch (error) {
            throw new NotFoundException(`db not found.`);
        }


        for (let i = 0; i < 100; i++) {
            const music = {...db.getObject<MusicSummary>("/melon/summary[" + i + "]"), ...db.getObject<MusicDetail>("/melon/detail[" + i + "]")};
            musicArr.push(music)
        }
        return musicArr;
    }

    genie_getSong(): Music[] {
        const musicArr = [];
        const db = new JsonDB(new Config("MusicDB", true, false, '/'));
        try {
            db.getData("/genie");
        } catch (error) {
            throw new NotFoundException(`db not found.`);
        }


        for (let i = 0; i < 50; i++) {
            const music = {...db.getObject<MusicSummary>("/genie/summary[" + i + "]"), ...db.getObject<MusicDetail>("/genie/detail[" + i + "]")};
            musicArr.push(music)
        }
        return musicArr;
    }
}
