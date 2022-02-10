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
exports.CrawlService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const cheerio = require('cheerio');
const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("MusicDB", true, false, '/'));
let CrawlService = class CrawlService {
    constructor(logger) {
        this.logger = logger;
    }
    melon_crawl() {
        const logger = this.logger;
        const title = [];
        const artist = [];
        const album = [];
        const rank = 100;
        axios_1.default.get('https://www.melon.com/chart/index.htm')
            .then(res => {
            const $ = cheerio.load(res.data);
            $('.ellipsis.rank01 > span > a').each(function (index) {
                const title_info = $(this);
                const title_info_text = title_info.text();
                title[index] = title_info_text;
            });
            $('.checkEllipsis').each(function (index) {
                const artist_info = $(this);
                const artist_info_text = artist_info.text();
                artist[index] = artist_info_text;
            });
            $('.ellipsis.rank03 > a').each(function (index) {
                const album_info = $(this);
                const album_info_text = album_info.text();
                album[index] = album_info_text;
            });
            $('.image_typeAll').each(function (index, e) {
                const albumId = this.attribs.href.split(`'`)[1];
                axios_1.default.get('https://www.melon.com/album/detail.htm?albumId=' + albumId)
                    .then(res => {
                    const $ = cheerio.load(res.data);
                    $('.meta > dl').each(function () {
                        const album_detail = $(this);
                        const album_detail_text = album_detail.text();
                        const publisher = album_detail_text.split('발매사')[1].split('기획사')[0].trim();
                        const agency = album_detail_text.split('기획사')[1].trim();
                        const object = {
                            publisher: publisher, agency: agency
                        };
                        db.push("/melon/detail[" + index + "]", object, true);
                    });
                }).catch(err => {
                    logger.error('melon album detail crawl failed from albumId: ' + albumId);
                });
            });
            for (let i = 1; i < rank + 1; i++) {
                const object = {
                    ranking: i, name: title[i - 1], singer: artist[i - 1], album: album[i - 1]
                };
                db.push("/melon/summary[" + (i - 1) + "]", object, true);
            }
        }).catch(err => {
            this.logger.error('melon top100 crawl failed');
        });
    }
    genie_crawl() {
        const logger = this.logger;
        const title = [];
        const artist = [];
        const album = [];
        const rank = 50;
        axios_1.default.get('https://www.genie.co.kr/chart/top200')
            .then(res => {
            const $ = cheerio.load(res.data);
            $('.title.ellipsis').each(function (index) {
                const title_info = $(this);
                const title_info_text = title_info.text().trim();
                title[index] = title_info_text;
            });
            $('.artist.ellipsis').each(function (index) {
                const artist_info = $(this);
                const artist_info_text = artist_info.text();
                artist[index] = artist_info_text;
            });
            $('.albumtitle.ellipsis').each(function (index) {
                const album_info = $(this);
                const album_info_text = album_info.text();
                album[index] = album_info_text;
            });
            $('.albumtitle.ellipsis').each(function (index, e) {
                const albumId = this.attribs.onclick.split(`'`)[1];
                axios_1.default.get('https://www.genie.co.kr/detail/albumInfo?axnm=' + albumId)
                    .then(res => {
                    const $ = cheerio.load(res.data);
                    $('.info-data').each(function () {
                        const album_detail = $(this);
                        const album_detail_text = album_detail.text();
                        const publisher = album_detail_text.split('\n')[4].trim();
                        const agency = album_detail_text.split('\n')[5].trim();
                        const object = {
                            publisher: publisher, agency: agency
                        };
                        db.push("/genie/detail[" + index + "]", object, true);
                    });
                }).catch(err => {
                    logger.error('genie album detail crawl failed from albumId: ' + albumId);
                });
            });
            for (let i = 1; i < rank + 1; i++) {
                const object = {
                    ranking: i, name: title[i - 1], singer: artist[i - 1], album: album[i - 1]
                };
                db.push("/genie/summary[" + (i - 1) + "]", object, true);
            }
        }).catch(err => {
            this.logger.error('genie top100 crawl failed');
        });
    }
};
CrawlService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('winston')),
    __metadata("design:paramtypes", [Object])
], CrawlService);
exports.CrawlService = CrawlService;
//# sourceMappingURL=crawl.service.js.map