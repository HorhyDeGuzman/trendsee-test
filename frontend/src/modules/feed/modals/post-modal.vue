<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { PostResponse } from '@/core/api/generated'
import { formatDateTime } from '@/modules/feed/helpers/format-date'
import { ModalDialog } from '@/common/ui'
import { usePostsStore } from '@/modules/feed/store/posts.store'
import IconPencil from '@/assets/icons/action/IconPencil.vue'
import IconTrash from '@/assets/icons/action/IconTrash.vue'

const props = defineProps<{
    visible?: boolean
    post: PostResponse
}>()

const emit = defineEmits<{
    close: []
}>()

const postsStore = usePostsStore()

const isEditing = ref(false)
const editTitle = ref('')
const editText = ref('')
const saving = ref(false)
const deleting = ref(false)

function startEditing() {
    editTitle.value = props.post.title
    editText.value = props.post.text
    isEditing.value = true
}

function cancelEditing() {
    isEditing.value = false
}

const hasChanges = computed(() => {
    return editTitle.value.trim() !== props.post.title || editText.value.trim() !== props.post.text
})

async function handleSave() {
    if (!editTitle.value.trim() || !editText.value.trim()) return

    if (!hasChanges.value) {
        isEditing.value = false
        emit('close')
        return
    }

    saving.value = true
    try {
        await postsStore.updatePost(props.post.id, editTitle.value.trim(), editText.value.trim())
        isEditing.value = false
        emit('close')
    } catch {
        // ошибка в postsStore.error
    } finally {
        saving.value = false
    }
}

async function handleDelete() {
    deleting.value = true
    try {
        await postsStore.deletePost(props.post.id)
        emit('close')
    } catch {
        // ошибка в postsStore.error
    } finally {
        deleting.value = false
    }
}

const textRef = ref<HTMLElement | null>(null)
const isScrollable = ref(false)
const isAtBottom = ref(false)

function checkScroll() {
    const el = textRef.value
    if (!el) return

    isScrollable.value = el.scrollHeight > el.clientHeight
    isAtBottom.value = el.scrollHeight - el.scrollTop - el.clientHeight < 2
}

watch(
    () => props.visible,
    async (val) => {
        if (val) {
            isEditing.value = false
            await nextTick()
            checkScroll()
        }
    },
)
</script>

<template>
    <ModalDialog
        :visible="visible"
        max-width="560px"
        @close="$emit('close')"
    >
        <template #title>
            <h2
                v-if="!isEditing"
                class="post-modal__title"
            >
                {{ post.title }}
            </h2>
            <h2
                v-else
                class="post-modal__title"
            >
                Редактирование
            </h2>
        </template>

        <template v-if="!isEditing">
            <div
                class="post-modal__text-wrapper"
                :class="{ 'post-modal__text-wrapper--faded': isScrollable && !isAtBottom }"
            >
                <p
                    ref="textRef"
                    class="post-modal__text"
                    @scroll="checkScroll"
                >
                    {{ post.text }}
                </p>
            </div>

            <div class="post-modal__meta">
                <div class="post-modal__meta-item">
                    <span class="post-modal__meta-label">Автор</span>
                    <span class="post-modal__meta-value">{{ post.author_name }}</span>
                </div>
                <div class="post-modal__meta-item">
                    <span class="post-modal__meta-label">User ID</span>
                    <span class="post-modal__meta-value">{{ post.user_id }}</span>
                </div>
                <div class="post-modal__meta-item">
                    <span class="post-modal__meta-label">Создано</span>
                    <span class="post-modal__meta-value">{{
                        formatDateTime(post.created_at)
                    }}</span>
                </div>
                <div class="post-modal__meta-item">
                    <span class="post-modal__meta-label">Обновлено</span>
                    <span class="post-modal__meta-value">{{
                        formatDateTime(post.updated_at)
                    }}</span>
                </div>
            </div>

            <div class="post-modal__actions">
                <button
                    class="post-modal__action post-modal__action--edit"
                    @click="startEditing"
                >
                    <IconPencil :size="16" />
                    <span>Редактировать</span>
                </button>
                <button
                    class="post-modal__action post-modal__action--delete"
                    :disabled="deleting"
                    @click="handleDelete"
                >
                    <IconTrash :size="16" />
                    <span>Удалить</span>
                </button>
            </div>
        </template>

        <form
            v-else
            class="post-modal__edit"
            @submit.prevent="handleSave"
        >
            <label class="post-modal__label">
                Заголовок
                <input
                    v-model="editTitle"
                    type="text"
                    class="post-modal__input"
                    required
                />
            </label>
            <label class="post-modal__label">
                Текст
                <textarea
                    v-model="editText"
                    class="post-modal__textarea"
                    rows="5"
                    required
                />
            </label>
            <div class="post-modal__edit-actions">
                <button
                    type="submit"
                    class="post-modal__btn post-modal__btn--save"
                    :disabled="saving || !editTitle.trim() || !editText.trim()"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="post-modal__btn post-modal__btn--cancel"
                    @click="cancelEditing"
                >
                    Отмена
                </button>
            </div>
        </form>
    </ModalDialog>
</template>

<style scoped>
.post-modal__title {
    font-family: var(--font-secondary);
    font-size: 20px;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.post-modal__text-wrapper {
    position: relative;
    margin-bottom: 24px;
}

.post-modal__text-wrapper--faded::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    background: linear-gradient(transparent, var(--color-surface));
    pointer-events: none;
    transition: opacity 0.2s ease;
}

.post-modal__text {
    font-family: var(--font-secondary);
    font-size: 14px;
    color: var(--color-text-alt);
    line-height: 1.6;
    word-break: break-word;
    white-space: pre-wrap;
    max-height: 250px;
    overflow-y: auto;
    scrollbar-width: none;
}

.post-modal__text::-webkit-scrollbar {
    display: none;
}

.post-modal__meta {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
}

.post-modal__meta-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.post-modal__meta-label {
    font-family: var(--font-secondary);
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text-muted);
}

.post-modal__meta-value {
    font-family: var(--font-primary);
    font-size: 13px;
    color: var(--color-text);
}

.post-modal__actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
}

.post-modal__action {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: var(--radius-sm);
    font-family: var(--font-primary);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s ease;
}

.post-modal__action--edit {
    color: var(--color-primary);
}

.post-modal__action--edit:hover {
    background: var(--color-primary-light);
}

.post-modal__action--delete {
    color: var(--color-danger);
}

.post-modal__action--delete:hover:not(:disabled) {
    background: rgba(210, 6, 54, 0.05);
}

.post-modal__action--delete:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.post-modal__edit {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.post-modal__label {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text);
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.post-modal__input,
.post-modal__textarea {
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

.post-modal__input:focus,
.post-modal__textarea:focus {
    border-color: var(--color-primary);
    background: var(--color-surface);
}

.post-modal__textarea {
    resize: none;
    min-height: 100px;
    line-height: 1.5;
}

.post-modal__edit-actions {
    display: flex;
    gap: 8px;
}

.post-modal__btn {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.15s ease;
}

.post-modal__btn--save {
    background: var(--color-primary);
    color: var(--color-surface);
    flex: 1;
}

.post-modal__btn--save:hover:not(:disabled) {
    background: var(--color-primary-hover);
}

.post-modal__btn--save:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.post-modal__btn--cancel {
    color: var(--color-text-muted);
    background: var(--color-bg);
}

.post-modal__btn--cancel:hover {
    background: var(--color-bg-alt);
}

@media (max-width: 640px) {
    .post-modal__title {
        font-size: 18px;
    }
}
</style>
