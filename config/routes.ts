import type { Route } from '@ant-design/pro-layout/lib/typings';

const routes: Route[] = [
  {
    path: '/login',
    name: 'login',
    component: './login',
    layout: false,
    hideInMenu: true,
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'profile',
    component: './welcome',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];

export default routes;
