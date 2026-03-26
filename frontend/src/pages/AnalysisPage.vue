<script setup lang="ts">
import { ref } from 'vue'
import type { VideoData } from '@/common/models/types/video'
import AppSidebar from '@/layouts/sidebar/AppSidebar.vue'
import { VideoGrid, AnalysisModal } from '@/modules/analysis'
import { analysisDescription } from '@/modules/analysis/consts/analysis-data'
import videoCartImage1 from '@/assets/images/video-cart-image.png'
import videoCartImage2 from '@/assets/images/video-cart-image-2.png'
import videoCartImage3 from '@/assets/images/video-cart-image-3.png'
import blogerAvatar from '@/assets/images/bloger-avatar.png'
import IconLightning from '@/assets/icons/analysis/IconLightning.vue'

const showAnalysis = ref(false)
const selectedVideo = ref<VideoData | null>(null)

function openAnalysis(video: VideoData) {
    selectedVideo.value = { ...video, description: analysisDescription }
    showAnalysis.value = true
}

const baseImages = [videoCartImage1, videoCartImage2, videoCartImage3]

const imageGrid = [
    videoCartImage1,
    videoCartImage2,
    videoCartImage3,
    videoCartImage1,
    videoCartImage2,
    videoCartImage3,
    videoCartImage1,
    videoCartImage2,
    videoCartImage3,
    videoCartImage1,
    videoCartImage2,
    videoCartImage2,
    videoCartImage1,
    videoCartImage1,
    videoCartImage1,
    videoCartImage1,
    ...Array.from({ length: 8 }, (_, i) => baseImages[i % baseImages.length]!),
]

const videos: VideoData[] = Array.from({ length: 24 }, (_, i) => ({
    image: imageGrid[i] ?? videoCartImage1,
    badges: [
        { icon: 'reels', label: 'Reels' },
        { icon: 'fire', label: 'X10' },
    ],
    stats: {
        views: '105k',
        likes: '85k',
        comments: '15k',
        shares: '485',
    },
    blogger: {
        name: '@blogerich',
        subscribers: '384.5K',
        avatar: blogerAvatar,
    },
    description: '500 000 лайков на ютубе делаем , бля буду скидываю 😂😂',
    date: '12.12.2025',
}))
</script>

<template>
    <div class="analysis-page">
        <AppSidebar />

        <div class="analysis-page__container">
            <div class="analysis-page__content">
                <VideoGrid
                    :videos="videos"
                    @analyze="openAnalysis"
                />
            </div>

            <div class="analysis-page__footer">
                <button class="analysis-page__load-more">
                    <IconLightning />
                    <span class="analysis-page__load-more-text">Найти еще ролики</span>
                </button>

                <div class="analysis-page__counter">
                    <div class="analysis-page__counter-spinner"></div>
                    <span>Видео: 24 из 3000</span>
                </div>
            </div>
        </div>

        <AnalysisModal
            :visible="showAnalysis"
            :video="selectedVideo"
            @close="showAnalysis = false"
        />
    </div>
</template>

<style scoped>
.analysis-page {
    display: flex;
    min-height: 100dvh;
    gap: 16px;
    background: var(--color-bg-secondary);
}

.analysis-page__container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 16px 16px 16px 0;
    gap: 16px;
    position: relative;
}

.analysis-page__content {
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    padding: 16px 16px 68px 16px;
}

.analysis-page__footer {
    position: fixed;
    bottom: 24px;
    left: 274px;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 0 32px;
    pointer-events: none;
    z-index: 10;
}

.analysis-page__footer > * {
    pointer-events: auto;
}

.analysis-page__load-more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 240px;
    gap: 8px;
    padding: 12px 0;
    background: var(--color-primary);
    color: var(--color-surface);
    border-radius: var(--radius-lg);
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.4px;
    cursor: pointer;
    transition: background 0.15s ease;
}

.analysis-page__load-more:hover {
    background: var(--color-primary-hover);
}

.analysis-page__load-more-text {
    margin-left: 2px;
}

.analysis-page__counter {
    position: absolute;
    right: 24px;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 24px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 100px;
    backdrop-filter: blur(8px);
    letter-spacing: 0.5px;
    color: var(--color-surface);
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 500;
}

.analysis-page__counter-spinner {
    width: 24px;
    height: 24px;
    border: 4px solid var(--color-surface);
    border-top-color: var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
