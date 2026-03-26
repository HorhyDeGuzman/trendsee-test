<script setup lang="ts">
import { ref, computed } from 'vue'
import IconTranslation from '@/assets/icons/locale/IconTranslation.vue'
import IconCopy from '@/assets/icons/action/IconCopy.vue'
import IconChevronRight from '@/assets/icons/nav/IconChevronRight.vue'
import { transcription } from '@/modules/analysis/consts/analysis-data'

const expanded = ref(false)

const VISIBLE_COUNT = 3

const visibleText = computed(() => {
    if (expanded.value) return transcription

    const preview = transcription.slice(0, VISIBLE_COUNT)
    const last = preview[preview.length - 1]
    if (last) {
        preview[preview.length - 1] = last + '...'
    }
    return preview
})
</script>

<template>
    <div class="analysis-transcription">
        <div class="analysis-transcription__header">
            <h3 class="analysis-transcription__title">Транскрибация</h3>
            <div class="analysis-transcription__actions">
                <button class="analysis-transcription__btn">
                    <IconTranslation /> <span>Переведено</span>
                </button>
                <button class="analysis-transcription__btn-copy">
                    <IconCopy />
                </button>
            </div>
        </div>

        <div class="analysis-transcription__body">
            <div class="analysis-transcription__text">
                <p
                    v-for="(paragraph, index) in visibleText"
                    :key="index"
                    class="analysis-transcription__paragraph"
                >
                    {{ paragraph }}
                </p>
            </div>
            <button
                class="analysis-transcription__more"
                @click="expanded = !expanded"
            >
                <IconChevronRight
                    :size="16"
                    class="analysis-transcription__more-icon"
                    :class="{ 'analysis-transcription__more-icon--expanded': expanded }"
                />
                {{ expanded ? 'Скрыть' : 'Ещё' }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.analysis-transcription {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 35px;
}

.analysis-transcription__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    padding: 4px 0;
}

.analysis-transcription__title {
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.15px;
    line-height: 21px;
    color: var(--color-text-heading);
}

.analysis-transcription__actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.analysis-transcription__btn {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 12px 8px 8px;
    border-radius: var(--radius-md);
    font-family: var(--font-primary);
    line-height: 16px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.4px;
    color: var(--color-primary);
    background: var(--color-bg-secondary);
}

.analysis-transcription__btn-copy {
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: var(--radius-md);
    font-family: var(--font-primary);
    line-height: 16px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.4px;
    color: var(--color-primary);
    background: var(--color-bg-secondary);
}

.analysis-transcription__body {
    background: var(--color-bg-secondary);
    border-radius: 6px;
    padding: 16px 16px 8px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.analysis-transcription__text {
    display: flex;
    flex-direction: column;
    gap: 21px;
}

.analysis-transcription__paragraph {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 400;
    color: var(--color-text-secondary);
    line-height: 21px;
    letter-spacing: 0.25px;
}

.analysis-transcription__more {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.4px;
    color: var(--color-text);
    width: fit-content;
    align-self: flex-end;
    padding: 8px;
    padding-right: 13px;
    background: none;
    border: none;
    cursor: pointer;
}

.analysis-transcription__more-icon {
    transform: rotate(90deg);
    transition: transform 0.2s ease;
}

.analysis-transcription__more-icon--expanded {
    transform: rotate(-90deg);
}
</style>
