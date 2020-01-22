export declare class ClockodoLib {
    constructor(user: any, apiKey: any, cacheTime: any);
    get(resource: any, params?: {}): Promise<unknown>;
    post(resource: any, params?: {}): Promise<unknown>;
    put(resource: any, params?: {}): Promise<unknown>;
    delete(resource: any, params?: {}): Promise<unknown>;
}
