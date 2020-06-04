export declare class ClockodoLib {
    constructor({ user, apiKey, cacheTime, baseUrl }: {
        user: string;
        apiKey: string;
        cacheTime?: number;
        baseUrl: string;
    });
    get(resource: any, params?: {}): Promise<unknown>;
    post(resource: any, params?: {}): Promise<unknown>;
    put(resource: any, params?: {}): Promise<unknown>;
    delete(resource: any, params?: {}): Promise<unknown>;
}
