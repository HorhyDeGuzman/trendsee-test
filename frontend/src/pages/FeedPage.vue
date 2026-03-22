<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { PostResponse } from '@/core/api/generated'
import '@/core/api/client'
import { usePostsStore, PostCard, PostModal, CreatePostModal, useInfiniteScroll } from '@/modules/feed'
import { AppLoader } from '@/common/ui'
import AppHeader from '@/layouts/header/AppHeader.vue'
import IconPlus from '@/assets/icons/action/IconPlus.vue'

const store = usePostsStore()
const selectedPost = ref<PostResponse | null>(null)
const showCreateModal = ref(false)

onMounted(() => {
    store.reset()
    store.fetchPosts()
})

useInfiniteScroll(() => {
    if (store.hasMore && !store.loading) {
        store.fetchPosts()
    }
})

function openModal(post: PostResponse) {
    selectedPost.value = post
}

function closeModal() {
    selectedPost.value = null
}
</script>

<template>
    <div class="feed">
        <AppHeader show-user />

        <main class="feed__content">
            <div class="feed__header">
                <h1 class="feed__title">Публикации</h1>
                <button
                    class="feed__create-btn"
                    :disabled="store.loading"
                    @click="showCreateModal = true"
                >
                    <IconPlus :size="18" />
                    <span>Создать</span>
                </button>
            </div>

            <div class="feed__list">
                <PostCard
                    v-for="post in store.posts"
                    :key="post.id"
                    :post="post"
                    @click="openModal(post)"
                />
            </div>

            <AppLoader v-if="store.loading" />

            <p
                v-if="!store.loading && !store.hasMore && store.posts.length > 0"
                class="feed__end"
            >
                Все публикации загружены
            </p>

            <p
                v-if="store.error"
                class="feed__error"
            >
                {{ store.error }}
            </p>

            <p
                v-if="!store.loading && store.posts.length === 0 && !store.error"
                class="feed__empty"
            >
                Публикаций пока нет
            </p>
        </main>

        <PostModal
            v-if="selectedPost"
            visible
            :post="selectedPost"
            @close="closeModal"
        />

        <CreatePostModal
            :visible="showCreateModal"
            @close="showCreateModal = false"
        />
    </div>
</template>

<style scoped>
.feed {
    min-height: 100dvh;
    background: var(--color-bg);
}

.feed__content {
    max-width: 700px;
    margin: 0 auto;
    padding: 24px;
}

.feed__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.feed__title {
    font-family: var(--font-secondary);
    font-size: 24px;
    font-weight: 600;
    color: var(--color-text);
}

.feed__create-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    background: var(--color-primary);
    color: var(--color-surface);
    border-radius: var(--radius-sm);
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;
}

.feed__create-btn:hover:not(:disabled) {
    background: var(--color-primary-hover);
}

.feed__create-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.feed__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.feed__end,
.feed__empty,
.feed__error {
    text-align: center;
    padding: 24px;
    font-family: var(--font-secondary);
    font-size: 14px;
}

.feed__end {
    color: var(--color-text-muted);
}

.feed__empty {
    color: var(--color-text-secondary);
}

.feed__error {
    color: var(--color-danger);
}

@media (max-width: 640px) {
    .feed__content {
        padding: 16px;
    }

    .feed__title {
        font-size: 20px;
    }

    .feed__create-btn span {
        display: none;
    }

    .feed__create-btn {
        padding: 10px;
    }
}
</style>
