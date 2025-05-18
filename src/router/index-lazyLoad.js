import { createRouter, createWebHistory } from 'vue-router';


function lazyLoad(view) {
    return () => ({
        loader: () => import(`../views/${view}.vue`),
        loadingComponent: { template: `<div>Loading...</div>` },
        errorComponent: { template: `<div>Error loading component</div>` },
        delay: 100,
        timeout: 3000,
    })
}


const routes = [
    {
        path: '/',
        name: 'Home',
        component: lazyLoad('HomeView')
    },
    {
        path: '/about',
        name: 'About',
        component: lazyLoad('AboutView'),
        beforeEnter: (to, from, next) => {
            console.log('Route Guard: About');
            next();
        }
    },
    {
        path: '/user',
        name: 'User',
        component: lazyLoad('UserView')
    },
    {
        path: '/parent',
        name: 'Parent',
        component: lazyLoad('ParentView'),
        children: [
            {
                path: 'child',
                component: () => lazyWidget('/child/ChildView'),
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'Not Found',
        component: { template: `<div>404 - Page Not Found</div>` }
    }
];

const route = createRouter({
    history: createWebHistory(),
    routes
})

export default route;