<script setup lang="ts">
import type { VideoData } from '@/common/models/types/video'
import { ModalPanel } from '@/common/ui'
import IconClose from '@/assets/icons/action/IconClose.vue'
import IconAdapt from '@/assets/icons/analysis/IconAdapt.vue'
import AnalysisVideoSide from '@/modules/analysis/components/analysis-video-side.vue'
import AnalysisInfoHeader from '@/modules/analysis/components/analysis-info-header.vue'
import AnalysisTranscription from '@/modules/analysis/components/analysis-transcription.vue'
import AnalysisSummary from '@/modules/analysis/components/analysis-summary.vue'
import AnalysisStructure from '@/modules/analysis/components/analysis-structure.vue'
import AnalysisHooks from '@/modules/analysis/components/analysis-hooks.vue'
import AnalysisTechniques from '@/modules/analysis/components/analysis-techniques.vue'
import AnalysisMarketing from '@/modules/analysis/components/analysis-marketing.vue'

defineProps<{
    visible: boolean
    video: VideoData | null
}>()

const emit = defineEmits<{
    close: []
}>()
</script>

<template>
    <ModalPanel
        :visible="visible"
        @close="emit('close')"
    >
        <AnalysisVideoSide
            v-if="video"
            :video="video"
        />

        <div class="analysis-modal__content">
            <button
                class="analysis-modal__close"
                @click="emit('close')"
            >
                <IconClose :size="16" />
            </button>

            <AnalysisInfoHeader />

            <AnalysisTranscription />

            <button class="analysis-modal__adapt-btn">
                <IconAdapt />
                <span>Адаптировать</span>
            </button>

            <AnalysisSummary />

            <AnalysisStructure />

            <AnalysisHooks />

            <AnalysisTechniques />

            <AnalysisMarketing />
        </div>
    </ModalPanel>
</template>

<style scoped>
.analysis-modal__content {
    position: relative;
    flex: 1;
    padding: 24px 24px 24px 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    scrollbar-width: none;
}

.analysis-modal__content::-webkit-scrollbar {
    display: none;
}

.analysis-modal__close {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg-secondary);
    border-radius: var(--radius-lg);
    color: var(--color-text-secondary);
    transition: all 0.15s ease;
    z-index: 1;
}

.analysis-modal__close:hover {
    background: var(--color-border);
    color: var(--color-text);
}

.analysis-modal__adapt-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px 24px;
    background: var(--color-primary);
    color: var(--color-surface);
    border-radius: var(--radius-md);
    font-family: var(--font-primary);
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.25px;
    line-height: 24px;
    width: 220px;
    transition: background 0.15s ease;
}

.analysis-modal__adapt-btn:hover {
    background: var(--color-primary-hover);
}
</style>
