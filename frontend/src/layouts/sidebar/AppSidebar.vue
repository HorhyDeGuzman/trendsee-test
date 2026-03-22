<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconLogo from '@/assets/icons/IconLogo.vue'
import SidebarNav from './SidebarNav.vue'
import SidebarTokens from './SidebarTokens.vue'
import SidebarUser from './SidebarUser.vue'
</script>

<template>
    <aside class="sidebar">
        <RouterLink
            to="/"
            class="sidebar__logo"
        >
            <IconLogo color="var(--color-sidebar)" />
            <span class="sidebar__logo-text">trendsee</span>
            <span class="sidebar__logo-badge">Beta</span>
        </RouterLink>

        <SidebarNav />

        <div class="sidebar__bottom">
            <SidebarTokens />
            <SidebarUser />
        </div>
    </aside>
</template>

<style scoped>
.sidebar {
    width: 274px;
    min-width: 274px;
    height: 100dvh;
    background: var(--color-bg-secondary);
    display: flex;
    flex-direction: column;
    padding: 12px 16px;
    position: sticky;
    top: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
}

.sidebar::-webkit-scrollbar {
    display: none;
}

.sidebar__logo {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 28px;
    text-decoration: none;
    margin-bottom: 12px;
    flex-shrink: 0;
}

.sidebar__logo-text {
    font-family: var(--font-heading);
    font-size: 20px;
    font-weight: 700;
    color: var(--color-sidebar);
    letter-spacing: -0.5px;
}

.sidebar__logo-badge {
    font-family: var(--font-primary);
    font-size: 10px;
    font-weight: 700;
    color: var(--color-text-secondary);
    background: var(--color-border-alt);
    padding: 4px 8px;
    border-radius: 100px;
    letter-spacing: 0.5px;
}

.sidebar__bottom {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-top: 12px;
}
</style>
