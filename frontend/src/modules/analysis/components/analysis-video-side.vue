<script setup lang="ts">
import type { VideoData } from '@/common/models/types/video'
import type { StatItem } from '@/modules/analysis/models/analysis.types'
import { VideoPreview, BloggerInfo } from '@/modules/video-screen'
import IconShare from '@/assets/icons/social/IconShare.vue'
import IconEye from '@/assets/icons/social/IconEye.vue'
import IconHeart from '@/assets/icons/social/IconHeart.vue'
import IconComment from '@/assets/icons/social/IconComment.vue'
import IconPlane from '@/assets/icons/social/IconPlane.vue'
import IconEr from '@/assets/icons/social/IconEr.vue'

defineProps<{
    video: VideoData
}>()

const stats: StatItem[] = [
    { label: 'Просмотры', value: '1,2 млн', icon: IconEye, color: 'var(--color-stat-views)' },
    { label: 'Лайки', value: '1,2 млн', icon: IconHeart, color: 'var(--color-stat-likes)' },
    { label: 'Комментарии', value: '1,2 млн', icon: IconComment, color: 'var(--color-stat-comments)' },
    { label: 'Репосты', value: '1,2 млн', icon: IconPlane, color: 'var(--color-stat-reposts)' },
    { label: 'ER', value: '1,2 млн', icon: IconEr, color: 'var(--color-stat-views)' },
]
</script>

<template>
    <div class="analysis-video-side">
        <div class="analysis-video-side__card">
            <VideoPreview
                :image="video.image"
                :stats="video.stats"
                :show-actions="false"
                :show-stats="false"
                :show-play="true"
                height="340px"
            />

            <div class="analysis-video-side__meta">
                <span class="analysis-video-side__date">{{ video.date }}</span>
                <div class="analysis-video-side__actions">
                    <IconShare
                        :size="20"
                        color="var(--color-text-secondary)"
                    />
                </div>
            </div>

            <BloggerInfo :blogger="video.blogger" />

            <div class="analysis-video-side__description">
                <p>{{ video.description }}</p>
            </div>

            <div class="analysis-video-side__stats">
                <div
                    v-for="stat in stats"
                    :key="stat.label"
                    class="analysis-video-side__stat"
                >
                    <div class="analysis-video-side__stat-left">
                        <component
                            :is="stat.icon"
                            :size="16"
                            :color="stat.color"
                        />
                        <span class="analysis-video-side__stat-label">{{ stat.label }}</span>
                    </div>
                    <span class="analysis-video-side__stat-value">{{ stat.value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.analysis-video-side {
    padding: 24px 0 24px 24px;
    overflow-y: auto;
    scrollbar-width: none;
}

.analysis-video-side::-webkit-scrollbar {
    display: none;
}

.analysis-video-side__card {
    display: flex;
    width: 216px;
    flex-direction: column;
    gap: 8px;
}

.analysis-video-side__meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.analysis-video-side__date {
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-muted);
}

.analysis-video-side__actions {
    display: flex;
    gap: 8px;
    color: var(--color-text-muted);
}

.analysis-video-side__description {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.analysis-video-side__description p {
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-alt);
    line-height: 1.4;
}

.analysis-video-side__stats {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.analysis-video-side__stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 37px;
    padding: 10px 12px;
    background: var(--color-bg-secondary);
    border-radius: var(--radius-md);
}

.analysis-video-side__stat-left {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
}

.analysis-video-side__stat-label {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-alt);
}

.analysis-video-side__stat-value {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text);
}
</style>
