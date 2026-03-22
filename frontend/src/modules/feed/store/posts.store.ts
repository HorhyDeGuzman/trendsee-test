import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
    getUserPostsApiPostsUserUserIdGet,
    createPostApiPostsPost,
    updatePostApiPostsPostIdPatch,
    deletePostApiPostsPostIdDelete,
    type PostResponse,
} from '@/core/api/generated'

export const usePostsStore = defineStore('posts', () => {
    const posts = ref<PostResponse[]>([])
    const total = ref(0)
    const source = ref<string>('')
    const loading = ref(false)
    const error = ref<string | null>(null)

    const limit = 10
    const offset = computed(() => posts.value.length)
    const hasMore = computed(() => posts.value.length < total.value)

    async function fetchPosts() {
        if (loading.value || (!hasMore.value && posts.value.length > 0)) return

        const { useAuthStore } = await import('@/modules/auth')
        const authStore = useAuthStore()
        const userId = authStore.userId

        if (!userId) {
            error.value = 'Пользователь не авторизован'
            return
        }

        loading.value = true
        error.value = null

        try {
            const { data } = await getUserPostsApiPostsUserUserIdGet({
                path: { user_id: userId },
                query: { limit, offset: offset.value },
            })

            if (data) {
                posts.value.push(...data.posts)
                total.value = data.total
                source.value = data.source
            }
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Failed to fetch posts'
        } finally {
            loading.value = false
        }
    }

    async function createPost(title: string, text: string) {
        error.value = null

        try {
            const { data, error: apiError } = await createPostApiPostsPost({
                body: { title, text },
            })

            if (apiError) {
                throw new Error('Не удалось создать публикацию')
            }

            if (data) {
                posts.value.unshift(data)
                total.value += 1
            }

            return data
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Ошибка создания публикации'
            throw e
        }
    }

    async function updatePost(postId: number, title?: string, text?: string) {
        error.value = null

        try {
            const { data, error: apiError } = await updatePostApiPostsPostIdPatch({
                path: { post_id: postId },
                body: { title, text },
            })

            if (apiError) {
                throw new Error('Не удалось обновить публикацию')
            }

            if (data) {
                const index = posts.value.findIndex((p) => p.id === postId)
                if (index !== -1) {
                    posts.value[index] = data
                }
            }

            return data
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Ошибка обновления'
            throw e
        }
    }

    async function deletePost(postId: number) {
        error.value = null

        try {
            const { error: apiError } = await deletePostApiPostsPostIdDelete({
                path: { post_id: postId },
            })

            if (apiError) {
                throw new Error('Не удалось удалить публикацию')
            }

            posts.value = posts.value.filter((p) => p.id !== postId)
            total.value -= 1
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Ошибка удаления'
            throw e
        }
    }

    function reset() {
        posts.value = []
        total.value = 0
        source.value = ''
        error.value = null
    }

    return { posts, total, source, loading, error, hasMore, fetchPosts, createPost, updatePost, deletePost, reset }
})
