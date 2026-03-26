<script setup lang="ts">
import type { VideoStats } from '@/common/models/types/video'
import IconPlayVideo from '@/assets/icons/social/IconPlayVideo.vue'
import IconReels from '@/assets/icons/social/IconReels.vue'
import IconFire from '@/assets/icons/social/IconFire.vue'
import IconHeart from '@/assets/icons/social/IconHeart.vue'
import IconShare from '@/assets/icons/social/IconShare.vue'
import IconEye from '@/assets/icons/social/IconEye.vue'
import IconComment from '@/assets/icons/social/IconComment.vue'
import IconPlane from '@/assets/icons/social/IconPlane.vue'

const props = withDefaults(
    defineProps<{
        image: string
        stats: VideoStats
        showActions?: boolean
        showStats?: boolean
        showPlay?: boolean
        height?: string
    }>(),
    {
        showActions: true,
        showStats: true,
        showPlay: false,
        height: '400px',
    },
)
</script>

<template>
    <div
        class="video-preview"
        :style="{ backgroundImage: `url(${image})`, height: props.height }"
    >
        <div class="video-preview__header">
            <div class="video-preview__badges">
                <div class="video-preview__badge">
                    <IconReels />
                    <span>Reels</span>
                </div>
                <div class="video-preview__badge">
                    <IconFire />
                    <span>X10</span>
                </div>
            </div>
            <div
                v-if="showActions"
                class="video-preview__actions"
            >
                <button class="video-preview__action-btn">
                    <IconHeart />
                </button>
                <button class="video-preview__action-btn">
                    <IconShare />
                </button>
            </div>
        </div>

        <button
            v-if="showPlay"
            class="video-preview__play"
        >
            <IconPlayVideo />
        </button>

        <div
            v-if="showStats"
            class="video-preview__stats"
        >
            <div class="video-preview__stat">
                <IconEye />
                <span>{{ stats.views }}</span>
            </div>
            <div class="video-preview__stat">
                <IconHeart />
                <span>{{ stats.likes }}</span>
            </div>
            <div class="video-preview__stat">
                <IconComment />
                <span>{{ stats.comments }}</span>
            </div>
            <div class="video-preview__stat">
                <IconPlane />
                <span>{{ stats.shares }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.video-preview {
    position: relative;
    border-radius: var(--radius-lg);
    background: var(--color-placeholder) no-repeat center / cover;
    padding: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
}

.video-preview__play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
}

.video-preview__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.video-preview__badges {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.video-preview__badge {
    display: flex;
    align-items: center;
    max-height: 28px;
    gap: 4px;
    padding: 4px 6px 4px 4px;
    width: fit-content;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    border-radius: var(--radius-sm);
    color: var(--color-surface);
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.4px;
    line-height: 14.5px;
}

.video-preview__actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
}

.video-preview__action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px);
    border-radius: var(--radius-md);
    color: var(--color-surface);
    cursor: pointer;
    transition: background 0.15s ease;
}

.video-preview__action-btn:hover {
    background: rgba(0, 0, 0, 0.55);
}

.video-preview__stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 4px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    border-radius: var(--radius-md);
}

.video-preview__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 39px;
    gap: 4px;
    flex: 1;
    color: var(--color-surface);
}

.video-preview__stat span {
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.4px;
    line-height: 1.21;
}

@media (max-width: 450px) {
    .video-preview {
        height: auto;
        flex: 1;
        border-radius: 0;
    }
}
</style>
