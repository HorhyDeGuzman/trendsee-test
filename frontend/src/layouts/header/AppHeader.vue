<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import IconLogo from '@/assets/icons/IconLogo.vue'
import { useAuthStore, UserModal } from '@/modules/auth'

defineProps<{
    subtitle?: string
    showUser?: boolean
}>()

const authStore = useAuthStore()
const showModal = ref(false)
</script>

<template>
    <header class="app-header">
        <RouterLink
            to="/"
            class="app-header__logo"
        >
            <IconLogo color="var(--color-surface)" />
            <span class="app-header__logo-text">trendsee</span>
        </RouterLink>
        <p
            v-if="subtitle"
            class="app-header__subtitle"
        >
            {{ subtitle }}
        </p>
        <slot />
        <button
            v-if="showUser && authStore.isAuthenticated"
            class="app-header__user"
            @click="showModal = true"
        >
            {{ authStore.user?.name || `ID: ${authStore.user?.id}` }}
        </button>

        <UserModal
            :visible="showModal"
            @close="showModal = false"
        />
    </header>
</template>

<style scoped>
.app-header {
    width: 100%;
    background: var(--color-sidebar);
    padding: 24px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.app-header__logo {
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
}

.app-header__logo-text {
    font-family: var(--font-heading);
    font-size: 24px;
    font-weight: 700;
    color: var(--color-surface);
    letter-spacing: -0.5px;
}

.app-header__subtitle {
    font-family: var(--font-secondary);
    font-size: 14px;
    color: var(--color-text-muted);
}

.app-header__user {
    font-family: var(--font-primary);
    font-size: 13px;
    font-weight: 500;
    color: var(--color-surface);
    cursor: pointer;
    padding: 6px 14px;
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.1);
}

.app-header__user:hover {
    background: rgba(255, 255, 255, 0.18);
}

@media (max-width: 640px) {
    .app-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        padding: 20px;
    }
}
</style>
