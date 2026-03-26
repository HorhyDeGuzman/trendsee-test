<script setup lang="ts">
import type { SidebarNavSection } from '@/common/models/types/ui'
import { useRoute } from 'vue-router'
import IconHome from '@/assets/icons/nav/IconHome.vue'
import IconTv from '@/assets/icons/nav/IconTv.vue'
import IconDetective from '@/assets/icons/nav/IconDetective.vue'
import IconRadar from '@/assets/icons/nav/IconRadar.vue'
import IconCross from '@/assets/icons/action/IconCross.vue'
import IconBot from '@/assets/icons/nav/IconBot.vue'
import IconAi from '@/assets/icons/nav/IconAi.vue'
import IconCarousels from '@/assets/icons/nav/IconCarousels.vue'
import IconVideoAnalysis from '@/assets/icons/nav/IconVideoAnalysis.vue'
import IconProfileAnalysis from '@/assets/icons/nav/IconProfileAnalysis.vue'
import IconDraft from '@/assets/icons/nav/IconDraft.vue'

const route = useRoute()

const sections: SidebarNavSection[] = [
    {
        title: 'Поиск контента',
        items: [
            { label: 'Главная', icon: IconHome, to: '/' },
            { label: 'Видео', icon: IconTv, to: '/videos' },
            { label: 'Шпионаж', icon: IconDetective, to: '/spy' },
            {
                label: 'Контент радар',
                icon: IconRadar,
                to: '/content-radar',
                badge: '712',
                badgeType: 'count',
            },
        ],
    },
    {
        title: 'Работа с соцсетями',
        items: [
            { label: 'Кросс-постинг', icon: IconCross, to: '/cross-posting' },
            { label: 'Чат боты', icon: IconBot, to: '/chat-bots' },
        ],
    },
    {
        title: 'Инструменты',
        items: [
            { label: 'ИИ-сценарий', icon: IconAi, to: '/ai-scenario' },
            { label: 'Карусели', icon: IconCarousels, to: '/carousels' },
            { label: 'Анализ видео', icon: IconVideoAnalysis, to: '/analysis' },
            { label: 'Анализ профиля', icon: IconProfileAnalysis, to: '/profile-analysis' },
            { label: 'Черновик', icon: IconDraft, to: '/draft', badge: 'Скоро', badgeType: 'soon' },
        ],
    },
]
</script>

<template>
    <nav class="sidebar-nav">
        <div
            v-for="section in sections"
            :key="section.title"
            class="sidebar-nav__section"
        >
            <div class="sidebar-nav__title">{{ section.title }}</div>
            <div
                v-for="item in section.items"
                :key="item.to"
                class="sidebar-nav__link"
                :class="{ 'sidebar-nav__link--active': route.path === item.to }"
            >
                <component
                    :is="item.icon"
                    :size="20"
                />
                <span class="sidebar-nav__label">{{ item.label }}</span>
                <span
                    v-if="item.badge"
                    class="sidebar-nav__badge"
                    :class="{ 'sidebar-nav__badge--soon': item.badgeType === 'soon' }"
                >
                    {{ item.badge }}
                </span>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.sidebar-nav {
    display: flex;
    flex-direction: column;
}

.sidebar-nav__section {
    display: flex;
    flex-direction: column;
}

.sidebar-nav__title {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 600;
    line-height: 21px;
    color: var(--color-text-tertiary);
    padding: 4px 0;
    margin-bottom: 4px;
}

.sidebar-nav__link {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px;
    height: 40px;
    border-radius: var(--radius-sm);
    color: var(--color-text-secondary);
    cursor: pointer;
    text-decoration: none;
    font-family: var(--font-primary);
    font-size: 14px;
    letter-spacing: 1.7px;
    font-weight: 500;
    transition: all 0.15s ease;
}

.sidebar-nav__link:hover {
    background: var(--color-bg-active);
    color: var(--color-sidebar);
}

.sidebar-nav__label {
    flex: 1;
}

.sidebar-nav__badge {
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.8px;
    color: var(--color-primary);
    background: var(--color-tag-purple-bg);
    padding: 4px 8px;
    border-radius: 100px;
}

.sidebar-nav__badge--soon {
    color: var(--color-text-secondary);
    background: var(--color-border-alt);
}
</style>
