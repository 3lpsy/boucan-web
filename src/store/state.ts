import { AuthDefaultState, IAuthState } from '@/store/modules/auth/state';
import { ActivityDefaultState, IActivityState } from '@/store/modules/activity/state';

export interface IState {
    [key: string]: any;
    auth?: IAuthState;
    activty?: IActivityState;
}

export const DefaultState: IState = {};
