import { lazy } from 'react';
const Index = lazy(() => import('../pages/chat'));
const GroupSettingsPage = lazy(() => import('../pages/GroupSettingsPage'));
const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',

    },
    {
        path: '/group/:groupId/settings',
        element: <GroupSettingsPage />,
        layout: 'default',
    },

];

export { routes };
