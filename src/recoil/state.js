import { atom } from 'recoil';

const CURRENT_USER = 'current-user';
const ADDRESS_LIST = 'address-list';

const currentUserState = atom({
  key: CURRENT_USER,
  default: {
    isAuthenticated: false,
    data: {}
  }
});

const addressListState = atom({
  key: ADDRESS_LIST,
  default: []
});

export { currentUserState, addressListState };
