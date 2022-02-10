"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicController = void 0;
const common_1 = require("@nestjs/common");
const music_entity_1 = require("./music.entity");
const music_service_1 = require("./music.service");
let MusicController = class MusicController {
    constructor(logger, musicService) {
        this.logger = logger;
        this.musicService = musicService;
    }
    melon_getOne(musicId) {
        this.logger.info('GET /melon/song/' + musicId);
        let result;
        try {
            result = this.musicService.melon_getOne(musicId);
        }
        catch (error) {
            this.logger.error('GET /melon/song/' + musicId + ` | Music with ID ${musicId} not found.`);
            throw new common_1.NotFoundException(`Music with ID ${musicId} not found.`);
        }
        return result;
        return this.musicService.melon_getOne(musicId);
    }
    melon_getSum() {
        this.logger.info('GET /melon/summary');
        let result;
        try {
            result = this.musicService.melon_getSum();
        }
        catch (error) {
            this.logger.error('GET /melon/summary | db not found.');
            throw new common_1.NotFoundException(`db not found.`);
        }
        return result;
    }
    melon_getSong() {
        this.logger.info('GET /melon/songs');
        let result;
        try {
            result = this.musicService.melon_getSong();
        }
        catch (error) {
            this.logger.error('GET /melon/songs | db not found.');
            throw new common_1.NotFoundException(`db not found.`);
        }
        return result;
    }
    genie_getOne(musicId) {
        this.logger.info('GET /melon/song/' + musicId);
        let result;
        try {
            result = this.musicService.genie_getOne(musicId);
        }
        catch (error) {
            this.logger.error('GET /melon/song/' + musicId + ` | Music with ID ${musicId} not found.`);
            throw new common_1.NotFoundException(`Music with ID ${musicId} not found.`);
        }
        return result;
        return this.musicService.genie_getOne(musicId);
    }
    genie_getSum() {
        this.logger.info('GET /genie/summary');
        let result;
        try {
            result = this.musicService.genie_getSum();
        }
        catch (error) {
            this.logger.error('GET /genie/summary | db not found.');
            throw new common_1.NotFoundException(`db not found.`);
        }
        return result;
    }
    genie_getSong() {
        this.logger.info('GET /genie/songs');
        let result;
        try {
            result = this.musicService.genie_getSong();
        }
        catch (error) {
            this.logger.error('GET /genie/songs | db not found.');
            throw new common_1.NotFoundException(`db not found.`);
        }
        return result;
    }
};
__decorate([
    common_1.Get('/melon/song/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", music_entity_1.Music)
], MusicController.prototype, "melon_getOne", null);
__decorate([
    common_1.Get('/melon/summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], MusicController.prototype, "melon_getSum", null);
__decorate([
    common_1.Get('/melon/songs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], MusicController.prototype, "melon_getSong", null);
__decorate([
    common_1.Get('/genie/song/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", music_entity_1.Music)
], MusicController.prototype, "genie_getOne", null);
__decorate([
    common_1.Get('/genie/summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], MusicController.prototype, "genie_getSum", null);
__decorate([
    common_1.Get('/genie/songs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], MusicController.prototype, "genie_getSong", null);
MusicController = __decorate([
    common_1.Controller('music-chart'),
    __param(0, common_1.Inject('winston')),
    __metadata("design:paramtypes", [Object, music_service_1.MusicService])
], MusicController);
exports.MusicController = MusicController;
//# sourceMappingURL=music.controller.js.map