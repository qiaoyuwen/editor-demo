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
    path: '/template',
    name: 'template',
    icon: 'profile',
    routes: [
      {
        path: '/template/list',
        name: 'template-list',
        component: './template',
      },
      {
        path: '/template/add',
        name: 'template-add',
        component: './template/add',
        hideInMenu: true,
      },
      {
        path: '/template/edit',
        name: 'template-edit',
        component: './template/add',
        hideInMenu: true,
      },
      {
        path: '/template',
        redirect: '/template/list',
      },
    ],
  },
  {
    path: '/',
    redirect: '/template',
  },
  {
    component: './404',
  },
];

export default routes;
