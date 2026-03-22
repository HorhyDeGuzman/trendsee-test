<script setup lang="ts">
import type { PostResponse } from '@/core/api/generated'
import { formatDate } from '@/modules/feed/helpers/format-date'

defineProps<{
    post: PostResponse
}>()

defineEmits<{
    click: []
}>()
</script>

<template>
    <article
        class="post-card"
        @click="$emit('click')"
    >
        <h3 class="post-card__title">{{ post.title }}</h3>
        <p class="post-card__text">{{ post.text }}</p>
        <div class="post-card__footer">
            <span class="post-card__date">{{ formatDate(post.created_at) }}</span>
        </div>
    </article>
</template>

<style scoped>
.post-card {
    background: var(--color-surface);
    border-radius: var(--radius-md);
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--color-border);
}

.post-card:hover {
    box-shadow: var(--shadow-md);
    border-color: var(--color-primary);
}

.post-card__title {
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.post-card__text {
    font-family: var(--font-secondary);
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.5;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.post-card__footer {
    display: flex;
    align-items: center;
}

.post-card__date {
    font-family: var(--font-secondary);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-muted);
}
</style>
