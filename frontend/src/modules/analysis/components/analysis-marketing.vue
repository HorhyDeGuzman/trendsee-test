<script setup lang="ts">
import { marketing } from '@/modules/analysis/consts/analysis-data'
import IconCopy from '@/assets/icons/action/IconCopy.vue'
</script>

<template>
    <div class="analysis-marketing">
        <div class="analysis-marketing__header">
            <h3 class="analysis-marketing__title">Воронка / Маркетинг</h3>
            <button class="analysis-marketing__copy-btn">
                <IconCopy />
            </button>
        </div>

        <div class="analysis-marketing__body">
            <div
                v-for="item in marketing"
                :key="item.title"
                class="analysis-marketing__item"
            >
                <h4 class="analysis-marketing__item-title">{{ item.title }}</h4>
                <p class="analysis-marketing__item-text">{{ item.desc }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.analysis-marketing {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.analysis-marketing__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    padding: 4px 0;
}

.analysis-marketing__title {
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.15px;
    line-height: 21px;
    color: var(--color-text-heading);
}

.analysis-marketing__copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: var(--radius-md);
    background: var(--color-bg-secondary);
    border: none;
    cursor: pointer;
}

.analysis-marketing__body {
    background: var(--color-bg-secondary);
    border-radius: 6px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.analysis-marketing__item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.analysis-marketing__item-title {
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.15px;
    line-height: 24px;
    color: var(--color-text-heading);
}

.analysis-marketing__item-text {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 400;
    color: var(--color-text-secondary);
    line-height: 21px;
    letter-spacing: 0.25px;
}
</style>
