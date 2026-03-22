import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/pages/HomePage.vue'),
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('@/pages/AuthPage.vue'),
        },
        {
            path: '/feed',
            name: 'feed',
            component: () => import('@/pages/FeedPage.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/video-screen',
            name: 'video-screen',
            component: () => import('@/pages/VideoScreenPage.vue'),
        },
        {
            path: '/analysis',
            name: 'analysis',
            component: () => import('@/pages/AnalysisPage.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
})

router.beforeEach(async (to) => {
    const { useAuthStore } = await import('@/modules/auth')

    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return { name: 'auth' }
    }

    if (to.name === 'auth' && authStore.isAuthenticated) {
        return { name: 'feed' }
    }
})

export default router
