<script setup lang="ts">
import type { BloggerData } from '@/common/models/types/video'
import IconFollow from '@/assets/icons/social/IconFollow.vue'

defineProps<{
    blogger: BloggerData
}>()
</script>

<template>
    <div class="blogger-info">
        <div class="blogger-info__left">
            <img
                class="blogger-info__avatar"
                :src="blogger.avatar"
                alt="avatar"
            />
            <div class="blogger-info__body">
                <span class="blogger-info__name">{{ blogger.name }}</span>
                <span class="blogger-info__subs">{{ blogger.subscribers }}</span>
            </div>
        </div>
        <div class="blogger-info__icons">
            <IconFollow />
        </div>
    </div>
</template>

<style scoped>
.blogger-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    max-height: 49px;
    padding: 4px 0;
}

.blogger-info__left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
}

.blogger-info__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--color-placeholder-light);
    flex-shrink: 0;
}

.blogger-info__body {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
}

.blogger-info__name {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 600;
    color: var(--color-primary);
    letter-spacing: 0.1px;
    line-height: 1.5;
}

.blogger-info__subs {
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-secondary);
    letter-spacing: 0.4px;
    line-height: 1.33;
}

.blogger-info__icons {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px;
    flex-shrink: 0;
    cursor: pointer;
}
</style>
