import Home from '~/pages/Home';
import Address from '~/pages/Address';
import AddAddress from '~/pages/AddAddress';

export const PATH = {
  ROOT: '/',
  ADDRESS: '/address',
  ADD_ADDRESS: '/add-address'
};

const router = [
  { path: PATH.ROOT, component: Home },
  { path: PATH.ADDRESS, component: Address },
  { path: PATH.ADD_ADDRESS, component: AddAddress }
];

export default router;
