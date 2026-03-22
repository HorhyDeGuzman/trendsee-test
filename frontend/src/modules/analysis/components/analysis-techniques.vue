<script setup lang="ts">
import { techniques } from '@/modules/analysis/consts/analysis-data'
import AnalysisSection from './analysis-section.vue'
import IconCopy from '@/assets/icons/action/IconCopy.vue'
</script>

<template>
    <AnalysisSection title="Рабочие приемы">
        <template #actions>
            <button class="analysis-techniques__copy-btn">
                <IconCopy />
            </button>
        </template>

        <div
            v-for="(tech, idx) in techniques"
            :key="tech.title"
            class="analysis-techniques__group"
        >
            <h4 class="analysis-techniques__group-title">{{ idx + 2 }}. {{ tech.title }}</h4>
            <p
                v-for="(item, i) in tech.items"
                :key="i"
            >
                <span>{{ item.label }}:</span>
                {{ item.text }}
            </p>
        </div>
    </AnalysisSection>
</template>

<style scoped>
.analysis-techniques__copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: var(--radius-md);
    background: var(--color-bg-secondary);
}

.analysis-techniques__group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.analysis-techniques__group-title {
    font-weight: 600;
    color: var(--color-text-heading);
}
</style>
