export declare class ClockodoLib {
    constructor({ user, apiKey, cacheTime }: {
        user: string;
        apiKey: string;
        cacheTime?: number;
    });
    get(resource: any, params?: {}): Promise<any>;
    post(resource: any, params?: {}): Promise<any>;
    put(resource: any, params?: {}): Promise<any>;
    delete(resource: any, params?: {}): Promise<any>;
}
