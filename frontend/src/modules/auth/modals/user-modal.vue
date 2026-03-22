<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/store/auth.store'
import { ModalDialog } from '@/common/ui'
import IconPencil from '@/assets/icons/action/IconPencil.vue'
import IconLogout from '@/assets/icons/action/IconLogout.vue'
import IconTrash from '@/assets/icons/action/IconTrash.vue'

defineProps<{
    visible?: boolean
}>()

defineEmits<{
    close: []
}>()

const router = useRouter()
const authStore = useAuthStore()

const isEditing = ref(false)
const newName = ref('')

function startEditing() {
    newName.value = authStore.user?.name ?? ''
    isEditing.value = true
}

async function handleUpdateName() {
    if (!newName.value.trim()) return

    if (newName.value.trim() === authStore.user?.name) {
        isEditing.value = false
        return
    }

    try {
        await authStore.updateName(newName.value.trim())
        isEditing.value = false
    } catch {
        // ошибка в authStore.error
    }
}

async function handleDelete() {
    try {
        await authStore.deleteUser()
        await router.push({ name: 'auth' })
    } catch {
        // ошибка в authStore.error
    }
}

function handleLogout() {
    authStore.logout()
    router.push({ name: 'auth' })
}
</script>

<template>
    <ModalDialog
        :visible="visible"
        max-width="400px"
        @close="$emit('close')"
    >
        <template #title>
            <h2 class="user-modal__title">Профиль</h2>
        </template>

        <div class="user-modal__field">
            <span class="user-modal__label">Имя</span>
            <span class="user-modal__value">{{ authStore.user?.name || 'Без имени' }}</span>
        </div>

        <div class="user-modal__field">
            <span class="user-modal__label">ID</span>
            <span class="user-modal__value">{{ authStore.user?.id }}</span>
        </div>

        <form
            v-if="isEditing"
            class="user-modal__edit"
            @submit.prevent="handleUpdateName"
        >
            <input
                v-model="newName"
                type="text"
                class="user-modal__input"
                placeholder="Новое имя"
                required
            />
            <div class="user-modal__edit-actions">
                <button
                    type="submit"
                    class="user-modal__btn user-modal__btn--primary"
                    :disabled="authStore.loading || !newName.trim()"
                >
                    Сохранить
                </button>
                <button
                    type="button"
                    class="user-modal__btn user-modal__btn--ghost"
                    @click="isEditing = false"
                >
                    Отмена
                </button>
            </div>
        </form>

        <div class="user-modal__divider" />

        <div class="user-modal__menu">
            <button
                class="user-modal__menu-item"
                @click="startEditing"
            >
                <IconPencil :size="18" />
                <span>Изменить имя</span>
            </button>

            <button
                class="user-modal__menu-item"
                @click="handleLogout"
            >
                <IconLogout :size="18" />
                <span>Выйти из аккаунта</span>
            </button>

            <button
                class="user-modal__menu-item user-modal__menu-item--danger"
                :disabled="authStore.loading"
                @click="handleDelete"
            >
                <IconTrash :size="18" />
                <span>Удалить аккаунт</span>
            </button>
        </div>

        <p
            v-if="authStore.error"
            class="user-modal__error"
        >
            {{ authStore.error }}
        </p>
    </ModalDialog>
</template>

<style scoped>
.user-modal__title {
    font-family: var(--font-secondary);
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: 0;
}

.user-modal__field {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
}

.user-modal__label {
    font-family: var(--font-secondary);
    font-size: 13px;
    color: var(--color-text-muted);
}

.user-modal__value {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text);
}

.user-modal__edit {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px 0;
}

.user-modal__input {
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

.user-modal__input:focus {
    border-color: var(--color-primary);
    background: var(--color-surface);
}

.user-modal__edit-actions {
    display: flex;
    gap: 8px;
}

.user-modal__divider {
    height: 1px;
    background: var(--color-border);
    margin: 4px 0;
}

.user-modal__menu {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 4px 0;
}

.user-modal__menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 8px;
    border-radius: var(--radius-sm);
    font-family: var(--font-primary);
    font-size: 14px;
    color: var(--color-text);
    cursor: pointer;
    transition: background 0.15s ease;
}

.user-modal__menu-item:hover {
    background: var(--color-bg);
}

.user-modal__menu-item--danger {
    color: var(--color-danger);
}

.user-modal__menu-item--danger:hover {
    background: rgba(210, 6, 54, 0.05);
}

.user-modal__btn {
    font-family: var(--font-primary);
    font-size: 13px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
}

.user-modal__btn--primary {
    background: var(--color-primary);
    color: var(--color-surface);
    flex: 1;
}

.user-modal__btn--primary:hover:not(:disabled) {
    background: var(--color-primary-hover);
}

.user-modal__btn--primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.user-modal__btn--ghost {
    color: var(--color-text-muted);
    background: var(--color-bg);
}

.user-modal__btn--ghost:hover {
    background: var(--color-bg-alt);
}

.user-modal__error {
    margin-top: 12px;
    padding: 10px;
    background: rgba(210, 6, 54, 0.05);
    border-radius: var(--radius-sm);
    font-family: var(--font-secondary);
    font-size: 13px;
    color: var(--color-danger);
    text-align: center;
}
</style>
