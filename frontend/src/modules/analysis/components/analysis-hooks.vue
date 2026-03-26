<script setup lang="ts">
import { hooks } from '@/modules/analysis/consts/analysis-data'
import IconCopy from '@/assets/icons/action/IconCopy.vue'
</script>

<template>
    <div class="analysis-hooks">
        <div class="analysis-hooks__body">
            <div
                v-for="hook in hooks"
                :key="hook.title"
                class="analysis-hooks__item"
            >
                <div class="analysis-hooks__header">
                    <div class="analysis-hooks__header-left">
                        <span class="analysis-hooks__title">{{ hook.title }}</span>
                        <span
                            v-if="hook.subtitle"
                            class="analysis-hooks__subtitle"
                        >
                            {{ hook.subtitle }}
                        </span>
                    </div>
                    <button class="analysis-hooks__copy-btn">
                        <IconCopy />
                    </button>
                </div>
                <p class="analysis-hooks__text">{{ hook.text }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.analysis-hooks {
    margin-bottom: 32px;
}

.analysis-hooks__body {
    background: var(--color-bg-secondary);
    border-radius: 6px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.analysis-hooks__item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.analysis-hooks__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.analysis-hooks__header-left {
    display: flex;
    align-items: center;
    gap: 8px;
}

.analysis-hooks__title {
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.15px;
    line-height: 24px;
    color: var(--color-text-heading);
}

.analysis-hooks__subtitle {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.25px;
    line-height: 21px;
    color: var(--color-text-muted);
}

.analysis-hooks__copy-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
}

.analysis-hooks__text {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 400;
    color: var(--color-text-secondary);
    line-height: 21px;
    letter-spacing: 0.25px;
}
</style>
