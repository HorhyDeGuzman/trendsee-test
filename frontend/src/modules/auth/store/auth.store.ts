import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
    createUserApiUsersPost,
    getTokenApiUsersUserIdTokenGet,
    updateUserApiUsersUserIdPatch,
    deleteUserApiUsersUserIdDelete,
    type UserResponse,
} from '@/core/api/generated'

const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<UserResponse | null>(null)
    const token = ref<string | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const isAuthenticated = computed(() => !!token.value)
    const userId = computed(() => user.value?.id ?? null)

    function saveToStorage() {
        if (token.value) {
            localStorage.setItem(TOKEN_KEY, token.value)
        }
        if (user.value) {
            localStorage.setItem(USER_KEY, JSON.stringify(user.value))
        }
    }

    function clearStorage() {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
    }

    async function register(name: string) {
        loading.value = true
        error.value = null

        try {
            const { data, error: apiError } = await createUserApiUsersPost({
                body: { name },
            })

            if (apiError) {
                throw new Error('Не удалось создать пользователя')
            }

            if (data) {
                user.value = data.user
                token.value = data.token
                saveToStorage()
            }
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Ошибка регистрации'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function loginById(id: number) {
        loading.value = true
        error.value = null

        try {
            const { data, error: apiError } = await getTokenApiUsersUserIdTokenGet({
                path: { user_id: id },
            })

            if (apiError) {
                throw new Error('Пользователь не найден')
            }

            if (data) {
                user.value = data.user
                token.value = data.token
                saveToStorage()
            }
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Ошибка входа'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function updateName(newName: string) {
        if (!user.value) return

        loading.value = true
        error.value = null

        try {
            const { data, error: apiError } = await updateUserApiUsersUserIdPatch({
                path: { user_id: user.value.id },
                body: { name: newName },
            })

            if (apiError) {
                throw new Error('Не удалось обновить имя')
            }

            if (data) {
                user.value = data
                saveToStorage()
            }
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Ошибка обновления'
            throw e
        } finally {
            loading.value = false
        }
    }

    async function deleteUser() {
        if (!user.value) return

        loading.value = true
        error.value = null

        try {
            const { error: apiError } = await deleteUserApiUsersUserIdDelete({
                path: { user_id: user.value.id },
            })

            if (apiError) {
                throw new Error('Не удалось удалить пользователя')
            }

            logout()
        } catch (e) {
            error.value = e instanceof Error ? e.message : 'Ошибка удаления'
            throw e
        } finally {
            loading.value = false
        }
    }

    function logout() {
        user.value = null
        token.value = null
        error.value = null
        clearStorage()

        import('@/modules/feed').then(({ usePostsStore }) => {
            usePostsStore().reset()
        })
    }

    function init() {
        const savedToken = localStorage.getItem(TOKEN_KEY)
        const savedUser = localStorage.getItem(USER_KEY)

        if (savedToken) {
            token.value = savedToken
        }
        if (savedUser) {
            try {
                user.value = JSON.parse(savedUser)
            } catch {
                localStorage.removeItem(USER_KEY)
            }
        }
    }

    return {
        user,
        token,
        loading,
        error,
        isAuthenticated,
        userId,
        register,
        loginById,
        updateName,
        deleteUser,
        logout,
        init,
    }
})
