import {Test, TestingModule} from '@nestjs/testing';
import {MusicService} from './music.service';
import {NotFoundException} from "@nestjs/common";

describe('MusicService', () => {
    let service: MusicService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MusicService],
        }).compile();

        service = module.get<MusicService>(MusicService);

    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('melon_getSum', () => {
        it('should return an length 100 array', () => {
            const result = service.melon_getSum();
            expect(result).toHaveLength(100);
        });
    });
    describe('melon_getSong', () => {
        it('should return an length 100 array', () => {
            const result = service.melon_getSong();
            expect(result).toHaveLength(100);
        });
    });
    describe('melon_getOne', () => {
        it('should return a music entity(id:1)', () => {
            const music = service.melon_getOne(1);
            expect(typeof music.ranking).toBe('number');
            expect(typeof music.name).toBe('string');
            expect(typeof music.singer).toBe('string');
            expect(typeof music.publisher).toBe('string');
            expect(typeof music.agency).toBe('string');
        });

        it('should return a music entity(id:100)', () => {
            const music2 = service.melon_getOne(100);
            expect(typeof music2.ranking).toBe('number');
            expect(typeof music2.name).toBe('string');
            expect(typeof music2.singer).toBe('string');
            expect(typeof music2.publisher).toBe('string');
            expect(typeof music2.agency).toBe('string');
        });

        it('should throw 404 error', () => {
            try {
                service.melon_getOne(999);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('genie_getSum', () => {
        it('should return an length 50 array', () => {
            const result = service.genie_getSum();
            expect(result).toHaveLength(50);
        });
    });
    describe('genie_getSong', () => {
        it('should return an length 50 array', () => {
            const result = service.genie_getSong();
            expect(result).toHaveLength(50);
        });
    });
    describe('genie_getOne', () => {
        it('should return a music entity(id:1)', () => {
            const music = service.genie_getOne(1);
            expect(typeof music.ranking).toBe('number');
            expect(typeof music.name).toBe('string');
            expect(typeof music.singer).toBe('string');
            expect(typeof music.publisher).toBe('string');
            expect(typeof music.agency).toBe('string');
        });

        it('should return a music entity(id:100)', () => {
            const music2 = service.genie_getOne(50);
            expect(typeof music2.ranking).toBe('number');
            expect(typeof music2.name).toBe('string');
            expect(typeof music2.singer).toBe('string');
            expect(typeof music2.publisher).toBe('string');
            expect(typeof music2.agency).toBe('string');
        });

        it('should throw 404 error', () => {
            try {
                service.genie_getOne(51);
            } catch (e) {
                expect(e).toBeInstanceOf(NotFoundException);
            }
        });
    });
});

