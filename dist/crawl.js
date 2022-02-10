"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.melonCrawl = void 0;
const axios_1 = require("axios");
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const cheerio = require('cheerio');
const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("MusicDB", true, false, '/'));
async function melonCrawl() {
    const title = [];
    const artist = [];
    const album = [];
    const rank = 100;
    axios_1.default.get('https://www.melon.com/chart/index.htm')
        .then(res => {
        let i;
        const $ = cheerio.load(res.data);
        for (i = 0; i < rank; i++) {
            $('.ellipsis.rank01 > span > a').each(function () {
                const title_info = $(this);
                const title_info_text = title_info.text();
                title[i] = title_info_text;
                i++;
            });
        }
        for (i = 0; i < rank; i++) {
            $('.checkEllipsis').each(function () {
                const artist_info = $(this);
                const artist_info_text = artist_info.text();
                artist[i] = artist_info_text;
                i++;
            });
        }
        for (i = 0; i < rank; i++) {
            $('.ellipsis.rank03 > a').each(function () {
                const album_info = $(this);
                const album_info_text = album_info.text();
                album[i] = album_info_text;
                i++;
            });
        }
        for (i = 0; i < rank; i++) {
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
                }).catch(err => console.error('err'));
                i++;
            });
        }
        for (i = 1; i < rank + 1; i++) {
            const object = {
                ranking: i, name: title[i - 1], singer: artist[i - 1], album: album[i - 1]
            };
            db.push("/melon/summary[" + (i - 1) + "]", object, true);
        }
    }).catch(err => console.error(err));
}
exports.melonCrawl = melonCrawl;
//# sourceMappingURL=crawl.js.map