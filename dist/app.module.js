"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const music_module_1 = require("./music/music.module");
const app_controller_1 = require("./app.controller");
const nest_winston_1 = require("nest-winston");
const crawl_service_1 = require("./crawl/crawl.service");
const winston = require("winston");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [nest_winston_1.WinstonModule.forRoot({
                format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
                transports: [
                    new winston.transports.Console(),
                    new winston.transports.File({
                        dirname: ('./log/'),
                        filename: 'info.log',
                        level: 'info',
                    }),
                    new winston.transports.File({
                        dirname: ('./log/'),
                        filename: 'error.log',
                        level: 'error',
                    }),
                ],
            }), music_module_1.MusicModule],
        controllers: [app_controller_1.AppController],
        providers: [crawl_service_1.CrawlService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map