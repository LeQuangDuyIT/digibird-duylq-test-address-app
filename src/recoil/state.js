import { atom } from 'recoil';

const CURRENT_USER = 'current-user';
const ADDRESS_LIST = 'address-list';
const EDIT_ADDRESS = 'edit-address';

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

const editAddressState = atom({
  key: EDIT_ADDRESS,
  default: {
    isEditing: false,
    originData: {}
  }
});

export { currentUserState, addressListState, editAddressState };
