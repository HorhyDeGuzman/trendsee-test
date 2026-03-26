<script setup lang="ts">
import type { VideoData } from '@/common/models/types/video'
import VideoPreview from './video-preview.vue'
import BloggerInfo from './blogger-info.vue'

const props = withDefaults(
    defineProps<{
        video: VideoData
        width?: string
        previewHeight?: string
    }>(),
    { width: '100%', previewHeight: '400px' },
)

const emit = defineEmits<{
    analyze: [video: VideoData]
}>()
</script>

<template>
    <div
        class="video-card"
        :style="{ width: props.width }"
    >
        <VideoPreview
            :image="video.image"
            :stats="video.stats"
            :height="props.previewHeight"
        />

        <div class="video-card__info">
            <BloggerInfo :blogger="video.blogger" />

            <div class="video-card__description">
                {{ video.description }}
            </div>

            <div class="video-card__date">{{ video.date }}</div>

            <button
                class="video-card__button"
                @click.stop="emit('analyze', video)"
            >
                Анализ
            </button>
        </div>
    </div>
</template>

<style scoped>
.video-card {
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    padding: 4px 4px 8px 4px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.video-card__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 4px;
}

.video-card__description {
    height: 44px;
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-secondary);
    letter-spacing: 0.4px;
    line-height: 14.5px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.video-card__date {
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-muted);
    letter-spacing: 0.4px;
    line-height: 1.21;
}

.video-card__button {
    width: 100%;
    padding: 12px;
    background: var(--color-primary);
    color: var(--color-surface);
    border-radius: var(--radius-md);
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.4px;
    line-height: 1.33;
    height: 40px;
    text-align: center;
    cursor: pointer;
    transition: background 0.15s ease;
}

.video-card__button:hover {
    background: var(--color-primary-hover);
}

@media (max-width: 450px) {
    .video-card {
        width: 100%;
        height: 100%;
        border-radius: 0;
        padding: 0;
    }

    .video-card__info {
        padding: 4px 12px 12px;
    }
}
</style>
