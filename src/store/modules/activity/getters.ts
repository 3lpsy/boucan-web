import { IActivityState } from './state';

export interface IActivityGetters {
    getHttpRequestCount(state: IActivityState): number;
    getDnsRequestCount(state: IActivityState): number;
}

export const ActivityGetters: IActivityGetters = {
    getHttpRequestCount(state: IActivityState): number {
        return state.httpRequestCount;
    },
    getDnsRequestCount(state: IActivityState): number {
        return state.dnsRequestCount;
    },
};
