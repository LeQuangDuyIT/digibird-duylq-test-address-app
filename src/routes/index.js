import Home from '~/pages/Home';
import Address from '~/pages/Address';
import AddAddress from '~/pages/AddAddress';

export const PATH = {
  ROOT: '/',
  ADDRESS: '/address',
  ADD_ADDRESS: '/address/add',
  EDIT_ADDRESS: '/address/edit'
};

const router = [
  { path: PATH.ROOT, component: Home },
  { path: PATH.ADDRESS, component: Address },
  { path: PATH.ADD_ADDRESS, component: AddAddress },
  { path: `${PATH.EDIT_ADDRESS}/:id`, component: AddAddress }
];

export default router;
