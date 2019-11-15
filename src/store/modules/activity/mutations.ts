import { IActivityState } from './state';

export interface IActivityMutations {
    SET_HTTP_REQUEST_COUNT(state: IActivityState, count: number): void;
    SET_DNS_REQUEST_COUNT(state: IActivityState, count: number): void;
}

export const ActivityMutations: IActivityMutations = {
    SET_HTTP_REQUEST_COUNT: (state: IActivityState, count: number) => {
        state.httpRequestCount = count;
    },
    SET_DNS_REQUEST_COUNT: (state: IActivityState, count: number) => {
        state.dnsRequestCount = count;
    },
};
