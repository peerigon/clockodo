export declare class ClockodoLib {
    constructor({ user, apiKey, cacheTime }: {
        user: string;
        apiKey: string;
        cacheTime?: number;
    });
    get(resource: any, params?: {}): Promise<unknown>;
    post(resource: any, params?: {}): Promise<unknown>;
    put(resource: any, params?: {}): Promise<unknown>;
    delete(resource: any, params?: {}): Promise<unknown>;
}
