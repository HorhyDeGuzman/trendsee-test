<script setup lang="ts">
defineProps<{
    title?: string
}>()
</script>

<template>
    <div class="analysis-section">
        <div
            v-if="title || $slots.actions"
            class="analysis-section__header"
        >
            <h3 v-if="title">{{ title }}</h3>
            <slot name="actions" />
        </div>
        <div class="analysis-section__body">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.analysis-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.analysis-section__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    padding: 4px 0;
    margin-top: 8px;
}

.analysis-section__header h3 {
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.15px;
    line-height: 21px;
    color: var(--color-text-heading);
}

.analysis-section__body {
    background: var(--color-bg-secondary);
    border-radius: 6px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.analysis-section__body :deep(p) {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 400;
    color: var(--color-text-secondary);
    line-height: 21px;
    letter-spacing: 0.25px;
}

.analysis-section__body :deep(h4) {
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-heading);
}
</style>
