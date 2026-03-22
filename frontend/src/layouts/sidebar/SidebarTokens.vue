<script setup lang="ts">
import IconTokens from '@/assets/icons/nav/IconTokens.vue'
import IconChevronRight from '@/assets/icons/nav/IconChevronRight.vue'
</script>

<template>
    <div class="sidebar-tokens">
        <div class="sidebar-tokens__header">
            <div class="sidebar-tokens__left">
                <IconTokens :size="20" />
                <span class="sidebar-tokens__label">Токены</span>
            </div>
            <span class="sidebar-tokens__count">1 245 / 4 497</span>
        </div>
        <div class="sidebar-tokens__bar">
            <div
                class="sidebar-tokens__fill"
                style="width: 28%"
            ></div>
        </div>
        <div class="sidebar-tokens__creative">
            <span>Creative +</span>
            <IconChevronRight :size="20" />
        </div>
    </div>
</template>

<style scoped>
.sidebar-tokens {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    padding: 12px;
    background: var(--color-surface);
    border-radius: var(--radius-sm);
}

.sidebar-tokens__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.sidebar-tokens__left {
    display: flex;
    align-items: center;
    gap: 8px;
}

.sidebar-tokens__label {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 600;
    color: var(--color-sidebar);
}

.sidebar-tokens__bar {
    width: 100%;
    height: 8px;
    background: var(--color-border-alt);
    border-radius: 100px;
    overflow: hidden;
}

.sidebar-tokens__fill {
    height: 100%;
    background: var(--color-primary);
    border-radius: 3px;
}

.sidebar-tokens__count {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 400;
    color: var(--color-sidebar);
}

.sidebar-tokens__creative {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-text-tertiary);
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    margin-top: 4px;
    cursor: pointer;
    border-radius: var(--radius-sm);
}
</style>
