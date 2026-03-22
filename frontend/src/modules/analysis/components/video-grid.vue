<script setup lang="ts">
import type { VideoData } from '@/common/models/types/video'
import { VideoCard } from '@/modules/video-screen'

defineProps<{
    videos: VideoData[]
}>()

const emit = defineEmits<{
    analyze: [video: VideoData]
}>()
</script>

<template>
    <div class="video-grid">
        <VideoCard
            v-for="(video, index) in videos"
            :key="index"
            :video="video"
            preview-height="348px"
            @analyze="emit('analyze', $event)"
        />
    </div>
</template>

<style scoped>
.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 8px;
}
</style>
