<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import '@/core/api/client'
import { useAuthStore } from '@/modules/auth'
import AppHeader from '@/layouts/header/AppHeader.vue'

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref<'register' | 'login'>('register')
const name = ref('')
const id = ref<number | null>(null)

async function handleRegister() {
    if (!name.value.trim()) return

    try {
        await authStore.register(name.value.trim())
        await router.push('/feed')
    } catch {
        // authStore.error
    }
}

async function handleLogin() {
    if (!id.value) return

    try {
        await authStore.loginById(id.value)
        await router.push('/feed')
    } catch {
        // authStore.error
    }
}
</script>

<template>
    <div class="auth">
        <AppHeader subtitle="Авторизация" />

        <main class="auth__content">
            <div class="auth__card">
                <h1 class="auth__title">Добро пожаловать</h1>
                <p class="auth__description">
                    Войдите или создайте аккаунт для доступа к ленте публикаций
                </p>

                <div class="auth__tabs">
                    <button
                        class="auth__tab"
                        :class="{ 'auth__tab--active': activeTab === 'register' }"
                        @click="activeTab = 'register'"
                    >
                        Регистрация
                    </button>
                    <button
                        class="auth__tab"
                        :class="{ 'auth__tab--active': activeTab === 'login' }"
                        @click="activeTab = 'login'"
                    >
                        Вход по ID
                    </button>
                </div>

                <form
                    v-if="activeTab === 'register'"
                    class="auth__form"
                    @submit.prevent="handleRegister"
                >
                    <label class="auth__label">
                        Имя пользователя
                        <input
                            v-model="name"
                            type="text"
                            class="auth__input"
                            placeholder="Введите имя"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        class="auth__button"
                        :disabled="authStore.loading || !name.trim()"
                    >
                        Создать аккаунт
                    </button>
                </form>

                <form
                    v-else
                    class="auth__form"
                    @submit.prevent="handleLogin"
                >
                    <label class="auth__label">
                        ID пользователя
                        <input
                            v-model.number="id"
                            type="number"
                            class="auth__input"
                            placeholder="Введите ID"
                            min="1"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        class="auth__button"
                        :disabled="authStore.loading || !id"
                    >
                        Войти
                    </button>
                </form>

                <p
                    v-if="authStore.error"
                    class="auth__error"
                >
                    {{ authStore.error }}
                </p>
            </div>
        </main>
    </div>
</template>

<style scoped>
.auth {
    min-height: 100dvh;
    background: var(--color-bg);
}

.auth__content {
    display: flex;
    justify-content: center;
    padding: 48px 24px;
}

.auth__card {
    width: 100%;
    max-width: 420px;
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    padding: 32px;
    box-shadow: var(--shadow-md);
}

.auth__title {
    font-family: var(--font-secondary);
    font-size: 24px;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 8px;
}

.auth__description {
    font-family: var(--font-secondary);
    font-size: 14px;
    color: var(--color-text-muted);
    margin-bottom: 24px;
}

.auth__tabs {
    display: flex;
    gap: 4px;
    background: var(--color-bg);
    border-radius: var(--radius-sm);
    padding: 4px;
    margin-bottom: 24px;
}

.auth__tab {
    flex: 1;
    padding: 10px 16px;
    border-radius: 6px;
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-secondary);
    transition: all 0.2s ease;
    cursor: pointer;
}

.auth__tab--active {
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-sm);
}

.auth__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.auth__label {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.auth__input {
    padding: 10px 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font-family: var(--font-primary);
    font-size: 14px;
    color: var(--color-text);
    background: var(--color-surface);
    transition: border-color 0.2s ease;
    outline: none;
}

.auth__input:focus {
    border-color: var(--color-primary);
}

.auth__input::placeholder {
    color: var(--color-text-muted);
}

.auth__button {
    padding: 12px;
    background: var(--color-primary);
    color: var(--color-surface);
    border-radius: var(--radius-sm);
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
}

.auth__button:hover:not(:disabled) {
    background: var(--color-primary-hover);
}

.auth__button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.auth__error {
    margin-top: 12px;
    font-family: var(--font-secondary);
    font-size: 13px;
    color: var(--color-danger);
    text-align: center;
}

@media (max-width: 640px) {
    .auth__content {
        padding: 24px 16px;
    }

    .auth__card {
        padding: 24px;
    }
}
</style>
