import { LoggerService as LS } from '@nestjs/common';
export declare class LoggerService implements LS {
    private logger;
    constructor(service: any);
    log(message: string): void;
    error(message: string, trace: string): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
