import {Inject, Injectable} from '@nestjs/common';
import {MusicDetail, MusicSummary} from "../music/music.interface";
import axios from "axios";
import {JsonDB} from "node-json-db";
import {Config} from "node-json-db/dist/lib/JsonDBConfig";
import {Logger} from "winston";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cheerio = require('cheerio');
const db = new JsonDB(new Config("MusicDB", true, false, '/'));


@Injectable()
export class CrawlService {
    constructor(@Inject('winston') private readonly logger: Logger) {
    }

    melon_crawl() {
        const logger = this.logger
        const title = [];
        const artist = [];
        const album = [];
        const rank = 100;

        axios.get('https://www.melon.com/chart/index.htm')
            .then(res => {
                const $ = cheerio.load(res.data);

                // 곡명 파싱

                $('.ellipsis.rank01 > span > a').each(function (index) {
                    const title_info = $(this);
                    const title_info_text = title_info.text();
                    title[index] = title_info_text;
                })


                // 아티스트명 파싱

                $('.checkEllipsis').each(function (index) {
                    const artist_info = $(this);
                    const artist_info_text = artist_info.text();
                    artist[index] = artist_info_text;
                })


                // 앨범명 파싱

                $('.ellipsis.rank03 > a').each(function (index) {
                    const album_info = $(this);
                    const album_info_text = album_info.text();
                    album[index] = album_info_text;

                })


                // 앨범 상세 정보
                $('.image_typeAll').each(function (index, e) {
                    const albumId = this.attribs.href.split(`'`)[1]

                    axios.get('https://www.melon.com/album/detail.htm?albumId=' + albumId)
                        .then(res => {
                            const $ = cheerio.load(res.data);
                            $('.meta > dl').each(function () {
                                const album_detail = $(this);
                                const album_detail_text = album_detail.text();
                                const publisher = album_detail_text.split('발매사')[1].split('기획사')[0].trim()
                                const agency = album_detail_text.split('기획사')[1].trim()
                                const object = {
                                    publisher: publisher, agency: agency
                                } as MusicDetail;
                                db.push("/melon/detail[" + index + "]", object, true);
                            })
                        }).catch(err => {
                        logger.error('melon album detail crawl failed from albumId: ' + albumId);
                    })
                })


                // db 저장
                for (let i = 1; i < rank + 1; i++) {
                    const object = {
                        ranking: i, name: title[i - 1], singer: artist[i - 1], album: album[i - 1]
                    } as MusicSummary;
                    db.push("/melon/summary[" + (i - 1) + "]", object, true);
                }
            }).catch(err => {
            this.logger.error('melon top100 crawl failed');
        })
    }

    genie_crawl() {
        const logger = this.logger
        const title = [];
        const artist = [];
        const album = [];
        const rank = 50;

        axios.get('https://www.genie.co.kr/chart/top200')
            .then(res => {
                const $ = cheerio.load(res.data);

                // 곡명 파싱
                $('.title.ellipsis').each(function (index) {
                    const title_info = $(this);
                    const title_info_text = title_info.text().trim();
                    title[index] = title_info_text;
                })


                // 아티스트명 파싱
                $('.artist.ellipsis').each(function (index) {
                    const artist_info = $(this);
                    const artist_info_text = artist_info.text();
                    artist[index] = artist_info_text;
                })

                //
                // 앨범명 파싱
                $('.albumtitle.ellipsis').each(function (index) {
                    const album_info = $(this);
                    const album_info_text = album_info.text();
                    album[index] = album_info_text;
                })

                //
                // 앨범 상세 정보
                $('.albumtitle.ellipsis').each(function (index, e) {
                    const albumId = this.attribs.onclick.split(`'`)[1]

                    axios.get('https://www.genie.co.kr/detail/albumInfo?axnm=' + albumId)
                        .then(res => {
                            const $ = cheerio.load(res.data);
                            $('.info-data').each(function () {
                                const album_detail = $(this);
                                const album_detail_text = album_detail.text();
                                const publisher = album_detail_text.split('\n')[4].trim()
                                const agency = album_detail_text.split('\n')[5].trim()
                                const object = {
                                    publisher: publisher, agency: agency
                                } as MusicDetail;
                                db.push("/genie/detail[" + index + "]", object, true);
                            })
                        }).catch(err => {
                        logger.error('genie album detail crawl failed from albumId: ' + albumId);
                    })
                })
                //
                //
                // // db 저장
                for (let i = 1; i < rank + 1; i++) {
                    const object = {
                        ranking: i, name: title[i - 1], singer: artist[i - 1], album: album[i - 1]
                    } as MusicSummary;
                    db.push("/genie/summary[" + (i - 1) + "]", object, true);
                }
            }).catch(err => {
            this.logger.error('genie top100 crawl failed');
        })
    }

}
