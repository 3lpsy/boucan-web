import { Module } from 'vuex';
import { IState } from '@/store/state';
import { ActivityDefaultState, IActivityState } from './state';
import { ActivityActions } from './actions';
import { ActivityGetters } from './getters';
import { ActivityMutations } from './mutations';

export const ActivityModule: Module<IActivityState, IState> = {
    namespaced: true,
    actions: {
        ...ActivityActions,
    },
    getters: {
        ...ActivityGetters,
    },
    state: {
        ...ActivityDefaultState(),
    },
    mutations: {
        ...ActivityMutations,
    },
};
