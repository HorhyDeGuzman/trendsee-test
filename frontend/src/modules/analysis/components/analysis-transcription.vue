<script setup lang="ts">
import AnalysisSection from './analysis-section.vue'
import IconTranslation from '@/assets/icons/locale/IconTranslation.vue'
import IconCopy from '@/assets/icons/action/IconCopy.vue'
import IconChevronRight from '@/assets/icons/nav/IconChevronRight.vue'
</script>

<template>
    <AnalysisSection title="Транскрибация">
        <template #actions>
            <div class="analysis-transcription__actions">
                <button class="analysis-transcription__btn">
                    <IconTranslation /> <span>Переведено</span>
                </button>
                <button class="analysis-transcription__btn">
                    <IconCopy />
                </button>
            </div>
        </template>

        <p>
            SPF скатывается? Смотри — вот эти катышки. И нет, это не всегда "плохой SPF".
        </p>
        <p>Скатывается по трём причинам.</p>
        <p>
            Первая — ты намазал под SPF слишком много всего: сыворотка, крем, база... сверху
            SPF — и оно начинает конфликтовать. Чем больше слоёв, тем выше шанс, что всё
            свернётся в катышки....
        </p>
        <button class="analysis-transcription__more-link">
            <IconChevronRight
                :size="16"
                class="analysis-transcription__more-icon"
            />
            Ещё
        </button>
    </AnalysisSection>
</template>

<style scoped>
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
    font-size: 12px;
    font-weight: 600;
    color: var(--color-primary);
    background: var(--color-bg-secondary);
}

.analysis-transcription__more-link {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text);
    width: fit-content;
    align-self: flex-end;
}

.analysis-transcription__more-icon {
    transform: rotate(90deg);
}
</style>
