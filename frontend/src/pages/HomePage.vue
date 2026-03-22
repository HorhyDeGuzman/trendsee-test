<script setup lang="ts">
import { useRouter } from 'vue-router'
import { markRaw } from 'vue'
import type { NavPage } from '@/common/models/types/ui'
import AppHeader from '@/layouts/header/AppHeader.vue'
import { NavCard } from '@/modules/home'
import IconFeed from '@/assets/icons/nav/IconFeed.vue'
import IconVideo from '@/assets/icons/nav/IconVideo.vue'
import IconAnalytics from '@/assets/icons/nav/IconAnalytics.vue'

const router = useRouter()

const pages: NavPage[] = [
    {
        title: 'Лента публикаций',
        icon: markRaw(IconFeed),
        route: '/feed',
        gradient: 'linear-gradient(135deg, var(--color-primary-accent) 0%, var(--color-accent-purple) 100%)',
    },
    {
        title: 'Видео экран',
        icon: markRaw(IconVideo),
        route: '/video-screen',
        gradient: 'linear-gradient(135deg, var(--color-danger) 0%, var(--color-warning) 100%)',
    },
    {
        title: 'Анализ видео',
        icon: markRaw(IconAnalytics),
        route: '/analysis',
        gradient: 'linear-gradient(135deg, var(--color-success) 0%, var(--color-primary) 100%)',
    },
]
</script>

<template>
    <div class="home">
        <AppHeader subtitle="Тестовое задание — Fullstack-разработчик" />

        <main class="home__content">
            <h1 class="home__title">Страницы проекта</h1>

            <div class="home__grid">
                <NavCard
                    v-for="page in pages"
                    :key="page.route"
                    :title="page.title"
                    :icon="page.icon"
                    :gradient="page.gradient"
                    @click="router.push(page.route)"
                />
            </div>
        </main>
    </div>
</template>

<style scoped>
.home {
    min-height: 100dvh;
    background: var(--color-bg);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.home__content {
    width: 100%;
    max-width: 800px;
    padding: 48px 24px;
}

.home__title {
    font-family: var(--font-secondary);
    font-size: 32px;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 24px;
}

.home__grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

@media (max-width: 640px) {
    .home__content {
        padding: 32px 16px;
    }

    .home__title {
        font-size: 24px;
    }
}
</style>
