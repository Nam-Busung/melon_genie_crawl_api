"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicService = void 0;
const common_1 = require("@nestjs/common");
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
let MusicService = class MusicService {
    melon_getOne(id) {
        const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("MusicDB", true, false, '/'));
        if (!(id > 0 && 101 > id)) {
            throw new common_1.NotFoundException(`Music with ID ${id} not found.`);
        }
        const music = Object.assign(Object.assign({}, db.getObject("/melon/summary[" + (id - 1) + "]")), db.getObject("/melon/detail[" + (id - 1) + "]"));
        return music;
    }
    genie_getOne(id) {
        const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("MusicDB", true, false, '/'));
        if (!(id > 0 && 51 > id)) {
            throw new common_1.NotFoundException(`Music with ID ${id} not found.`);
        }
        const music = Object.assign(Object.assign({}, db.getObject("/genie/summary[" + (id - 1) + "]")), db.getObject("/genie/detail[" + (id - 1) + "]"));
        return music;
    }
    melon_getSum() {
        const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("MusicDB", true, false, '/'));
        try {
            db.getData("/melon");
        }
        catch (error) {
            throw new common_1.NotFoundException(`db not found.`);
        }
        const sum = db.getObject("/melon/summary");
        return sum;
    }
    genie_getSum() {
        const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("MusicDB", true, false, '/'));
        try {
            db.getData("/genie");
        }
        catch (error) {
            throw new common_1.NotFoundException(`db not found.`);
        }
        const sum = db.getObject("/genie/summary");
        return sum;
    }
    melon_getSong() {
        const musicArr = [];
        const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("MusicDB", true, false, '/'));
        try {
            db.getData("/melon");
        }
        catch (error) {
            throw new common_1.NotFoundException(`db not found.`);
        }
        for (let i = 0; i < 100; i++) {
            const music = Object.assign(Object.assign({}, db.getObject("/melon/summary[" + i + "]")), db.getObject("/melon/detail[" + i + "]"));
            musicArr.push(music);
        }
        return musicArr;
    }
    genie_getSong() {
        const musicArr = [];
        const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("MusicDB", true, false, '/'));
        try {
            db.getData("/genie");
        }
        catch (error) {
            throw new common_1.NotFoundException(`db not found.`);
        }
        for (let i = 0; i < 50; i++) {
            const music = Object.assign(Object.assign({}, db.getObject("/genie/summary[" + i + "]")), db.getObject("/genie/detail[" + i + "]"));
            musicArr.push(music);
        }
        return musicArr;
    }
};
MusicService = __decorate([
    common_1.Injectable()
], MusicService);
exports.MusicService = MusicService;
//# sourceMappingURL=music.service.js.map