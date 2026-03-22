<script setup lang="ts">
import type { VideoData } from '@/common/models/types/video'
import AppHeader from '@/layouts/header/AppHeader.vue'
import { VideoCard } from '@/modules/video-screen'
import videoCartImage from '@/assets/images/video-cart-image.png'
import blogerAvatar from '@/assets/images/bloger-avatar.png'

const video: VideoData = {
    image: videoCartImage,
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
}
</script>

<template>
    <div class="video-screen">
        <AppHeader class="video-screen__header" />

        <main class="video-screen__content">
            <VideoCard :video="video" />
        </main>
    </div>
</template>

<style scoped>
.video-screen {
    min-height: 100dvh;
    background-color: var(--color-bg-dark);
}

.video-screen__content {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 262px;
    margin: 0 auto;
    height: calc(100dvh - 84px);
}

@media (max-width: 640px) {
    .video-screen__content {
        height: calc(100dvh - 76px);
    }
}

@media (max-width: 450px) {
    .video-screen__header {
        display: none;
    }

    .video-screen__content {
        height: 100dvh;
        max-width: 100%;
        background-color: var(--color-surface);
    }
}
</style>
