export interface IActivityState {
    httpRequestCount: number;
    dnsRequestCount: number;
}

export const ActivityDefaultState = (): IActivityState => {
    return {
        httpRequestCount: 0,
        dnsRequestCount: 0,
    };
};
