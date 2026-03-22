<script setup lang="ts">
import type { Component } from 'vue'
import IconChevronRight from '@/assets/icons/nav/IconChevronRight.vue'

defineProps<{
    title: string
    icon: Component
    gradient: string
}>()

defineEmits<{
    click: []
}>()
</script>

<template>
    <article
        class="nav-card"
        @click="$emit('click')"
    >
        <div
            class="nav-card__icon"
            :style="{ background: gradient }"
        >
            <component
                :is="icon"
                :size="24"
            />
        </div>
        <div class="nav-card__body">
            <h2 class="nav-card__title">{{ title }}</h2>
        </div>
        <div class="nav-card__arrow">
            <IconChevronRight :size="20" />
        </div>
    </article>
</template>

<style scoped>
.nav-card {
    display: flex;
    align-items: center;
    gap: 20px;
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    padding: 24px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--color-border);
}

.nav-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
}

.nav-card__icon {
    width: 56px;
    height: 56px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--color-surface);
}

.nav-card__body {
    flex: 1;
    min-width: 0;
}

.nav-card__title {
    font-family: var(--font-heading);
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text);
}

.nav-card__arrow {
    color: var(--color-text-muted);
    flex-shrink: 0;
    transition: all 0.2s ease;
}

.nav-card:hover .nav-card__arrow {
    transform: translateX(4px);
    color: var(--color-primary);
}

@media (max-width: 640px) {
    .nav-card {
        padding: 16px;
        gap: 14px;
    }

    .nav-card__icon {
        width: 48px;
        height: 48px;
    }

    .nav-card__title {
        font-size: 16px;
    }
}
</style>
