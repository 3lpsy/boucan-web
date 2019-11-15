import { ActionContext } from 'vuex';
import { IActivityState } from './state';
import { IState } from '@/store/state';

export interface IActivityActions {
    incHttpRequestCount(context: ActionContext<IActivityState, IState>): Promise<number>;
    incDnsRequestCount(context: ActionContext<IActivityState, IState>): Promise<number>;
    clearHttpRequestCount(context: ActionContext<IActivityState, IState>): Promise<number>;
    clearDnsRequestCount(context: ActionContext<IActivityState, IState>): Promise<number>;
}

export const ActivityActions: IActivityActions = {
    incHttpRequestCount({ commit, getters }): Promise<number> {
        return new Promise((resolve, reject) => {
            let current = getters.getHttpRequestCount + 1;
            commit('SET_HTTP_REQUEST_COUNT', current);

            resolve(current);
        });
    },
    incDnsRequestCount({ commit, getters }): Promise<number> {
        return new Promise((resolve, reject) => {
            let current = getters.getDnsRequestCount + 1;
            commit('SET_DNS_REQUEST_COUNT', current);
            resolve(current);
        });
    },
    clearHttpRequestCount({ commit }): Promise<number> {
        return new Promise((resolve, reject) => {
            commit('SET_HTTP_REQUEST_COUNT', 0);
            resolve(0);
        });
    },
    clearDnsRequestCount({ commit }): Promise<number> {
        return new Promise((resolve, reject) => {
            commit('SET_DNS_REQUEST_COUNT', 0);
            resolve(0);
        });
    },
};
