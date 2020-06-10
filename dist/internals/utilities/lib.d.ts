export declare class ClockodoLib {
    constructor({ user, apiKey }: {
        user: string;
        apiKey: string;
    });
    get(resource: any, params?: {}): Promise<any>;
    post(resource: any, params?: {}): Promise<any>;
    put(resource: any, params?: {}): Promise<any>;
    delete(resource: any, params?: {}): Promise<any>;
}
