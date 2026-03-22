<script setup lang="ts">
import { ref } from 'vue'
import { usePostsStore } from '@/modules/feed/store/posts.store'
import { ModalDialog } from '@/common/ui'

defineProps<{
    visible?: boolean
}>()

const emit = defineEmits<{
    close: []
}>()

const postsStore = usePostsStore()

const title = ref('')
const text = ref('')
const submitting = ref(false)
const error = ref<string | null>(null)

async function handleSubmit() {
    if (!title.value.trim() || !text.value.trim()) return

    submitting.value = true
    error.value = null

    try {
        await postsStore.createPost(title.value.trim(), text.value.trim())
        title.value = ''
        text.value = ''
        emit('close')
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Ошибка создания'
    } finally {
        submitting.value = false
    }
}
</script>

<template>
    <ModalDialog
        :visible="visible"
        max-width="520px"
        @close="$emit('close')"
    >
        <template #title>
            <h2 class="create-post__title">Новая публикация</h2>
        </template>

        <form
            class="create-post__form"
            @submit.prevent="handleSubmit"
        >
            <label class="create-post__label">
                Заголовок
                <input
                    v-model="title"
                    type="text"
                    class="create-post__input"
                    placeholder="О чём публикация?"
                    required
                />
            </label>

            <label class="create-post__label">
                Текст
                <textarea
                    v-model="text"
                    class="create-post__textarea"
                    placeholder="Напишите текст публикации..."
                    rows="5"
                    required
                />
            </label>

            <p
                v-if="error"
                class="create-post__error"
            >
                {{ error }}
            </p>

            <button
                type="submit"
                class="create-post__submit"
                :disabled="submitting || !title.trim() || !text.trim()"
            >
                Опубликовать
            </button>
        </form>
    </ModalDialog>
</template>

<style scoped>
.create-post__title {
    font-family: var(--font-secondary);
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text);
}

.create-post__form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.create-post__label {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.create-post__input,
.create-post__textarea {
    padding: 10px 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    font-family: var(--font-primary);
    font-size: 14px;
    color: var(--color-text);
    background: var(--color-bg);
    outline: none;
    transition: border-color 0.2s ease;
}

.create-post__input:focus,
.create-post__textarea:focus {
    border-color: var(--color-primary);
    background: var(--color-surface);
}

.create-post__input::placeholder,
.create-post__textarea::placeholder {
    color: var(--color-text-muted);
}

.create-post__textarea {
    resize: none;
    min-height: 100px;
    line-height: 1.5;
}

.create-post__error {
    font-family: var(--font-secondary);
    font-size: 13px;
    color: var(--color-danger);
    text-align: center;
}

.create-post__submit {
    padding: 12px;
    background: var(--color-primary);
    color: var(--color-surface);
    border-radius: var(--radius-sm);
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
    min-height: 44px;
}

.create-post__submit:hover:not(:disabled) {
    background: var(--color-primary-hover);
}

.create-post__submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
