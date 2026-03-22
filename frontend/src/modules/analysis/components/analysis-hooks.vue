<script setup lang="ts">
import { hooks } from '@/modules/analysis/consts/analysis-data'
import AnalysisSection from './analysis-section.vue'
import IconCopy from '@/assets/icons/action/IconCopy.vue'
</script>

<template>
    <AnalysisSection>
        <div
            v-for="hook in hooks"
            :key="hook.title"
            class="analysis-hooks__item"
        >
            <div class="analysis-hooks__header">
                <div>
                    <span class="analysis-hooks__title">{{ hook.title }}</span>
                    <span
                        v-if="hook.subtitle"
                        class="analysis-hooks__sub"
                        >{{ hook.subtitle }}</span
                    >
                </div>
                <button class="analysis-hooks__copy-btn">
                    <IconCopy />
                </button>
            </div>
            <p>{{ hook.text }}</p>
        </div>
    </AnalysisSection>
</template>

<style scoped>
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

.analysis-hooks__title {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-heading);
}

.analysis-hooks__sub {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 400;
    color: var(--color-text-muted);
}

.analysis-hooks__copy-btn {
    margin-left: auto;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
