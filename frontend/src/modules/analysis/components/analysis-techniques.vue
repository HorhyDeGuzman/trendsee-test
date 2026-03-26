<script setup lang="ts">
import { computed } from 'vue'
import { techniques } from '@/modules/analysis/consts/analysis-data'
import type { TechniqueItem } from '@/modules/analysis/consts/analysis-data'
import IconCopy from '@/assets/icons/action/IconCopy.vue'

function chunkPairs(items: TechniqueItem[]): TechniqueItem[][] {
    const pairs: TechniqueItem[][] = []
    for (let i = 0; i < items.length; i += 2) {
        pairs.push(items.slice(i, i + 2))
    }
    return pairs
}

const groupedTechniques = computed(() =>
    techniques.map((tech) => ({
        ...tech,
        pairs: chunkPairs(tech.items),
    })),
)
</script>

<template>
    <div class="analysis-techniques">
        <div class="analysis-techniques__header">
            <h3 class="analysis-techniques__title">Рабочие приемы</h3>
            <button class="analysis-techniques__copy-btn">
                <IconCopy />
            </button>
        </div>

        <div class="analysis-techniques__body">
            <div
                v-for="(tech, idx) in groupedTechniques"
                :key="tech.title"
                class="analysis-techniques__group"
            >
                <h4 class="analysis-techniques__group-title">{{ idx + 2 }}. {{ tech.title }}</h4>
                <div class="analysis-techniques__pairs">
                    <div
                        v-for="(pair, pairIdx) in tech.pairs"
                        :key="pairIdx"
                        class="analysis-techniques__pair"
                    >
                        <p
                            v-for="(item, i) in pair"
                            :key="i"
                            class="analysis-techniques__item"
                        >
                            <span class="analysis-techniques__item-label">{{ item.label }}:</span>
                            {{ item.text }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.analysis-techniques {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 32px;
}

.analysis-techniques__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    padding: 4px 0;
}

.analysis-techniques__title {
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.15px;
    line-height: 21px;
    color: var(--color-text-heading);
}

.analysis-techniques__copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: var(--radius-md);
    background: var(--color-bg-secondary);
    border: none;
    cursor: pointer;
}

.analysis-techniques__body {
    background: var(--color-bg-secondary);
    border-radius: 6px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.analysis-techniques__group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.analysis-techniques__group-title {
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: 0.15px;
    padding-left: 4px;
    color: var(--color-text-heading);
}

.analysis-techniques__pairs {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.analysis-techniques__pair {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.analysis-techniques__item {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 400;
    color: var(--color-text-secondary);
    line-height: 21px;
    letter-spacing: 0.25px;
}

.analysis-techniques__item-label {
    font-weight: 400;
}
</style>
