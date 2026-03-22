<script setup lang="ts">
import { marketing } from '@/modules/analysis/consts/analysis-data'
import AnalysisSection from './analysis-section.vue'
import IconCopy from '@/assets/icons/action/IconCopy.vue'
</script>

<template>
    <AnalysisSection title="Воронка / Маркетинг">
        <template #actions>
            <button class="analysis-marketing__copy-btn">
                <IconCopy />
            </button>
        </template>

        <div
            v-for="item in marketing"
            :key="item.title"
            class="analysis-marketing__item"
        >
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
        </div>
    </AnalysisSection>
</template>

<style scoped>
.analysis-marketing__copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: var(--radius-md);
    background: var(--color-bg-secondary);
}

.analysis-marketing__item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
</style>
