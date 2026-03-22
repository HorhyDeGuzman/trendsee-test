<script setup lang="ts">
import { structureSteps } from '@/modules/analysis/consts/analysis-data'
import IconTime from '@/assets/icons/analysis/IconTime.vue'
</script>

<template>
    <div class="analysis-structure">
        <div class="analysis-structure__header">
            <h3>Структура</h3>
        </div>
        <div class="analysis-structure__timeline">
            <div
                v-for="step in structureSteps"
                :key="step.time"
                class="analysis-structure__step"
            >
                <div class="analysis-structure__step-left">
                    <span class="analysis-structure__step-time">
                        <IconTime /> {{ step.time }}
                    </span>
                    <component
                        :is="step.icon"
                        class="analysis-structure__step-icon"
                    />
                </div>
                <div class="analysis-structure__step-content">
                    <span class="analysis-structure__step-title">{{ step.title }}</span>
                    <span class="analysis-structure__step-desc">{{ step.desc }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.analysis-structure {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.analysis-structure__header h3 {
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-heading);
}

.analysis-structure__timeline {
    display: flex;
    flex-direction: column;
}

.analysis-structure__step {
    display: flex;
    gap: 10px;
}

.analysis-structure__step-left {
    display: flex;
    align-items: start;
    justify-content: end;
    min-width: 115px;
}

.analysis-structure__step-time {
    display: flex;
    align-items: center;
    padding-top: 10px;
    margin-right: 8px;
    gap: 4px;
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-secondary);
    white-space: nowrap;
}

.analysis-structure__step-icon {
    flex-shrink: 0;
}

.analysis-structure__step-content {
    display: flex;
    flex-direction: column;
    max-width: 390px;
    gap: 4px;
    padding-top: 8px;
}

.analysis-structure__step-title {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-heading);
}

.analysis-structure__step-desc {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 400;
    color: var(--color-text-secondary);
    line-height: 1.5;
}
</style>
