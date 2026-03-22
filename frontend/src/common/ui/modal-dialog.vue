<script setup lang="ts">
import { useModalOverlay } from '@/common/composables/useModalOverlay'
import IconClose from '@/assets/icons/action/IconClose.vue'

const props = withDefaults(
    defineProps<{
        visible?: boolean
        maxWidth?: string
    }>(),
    { visible: true, maxWidth: '560px' },
)

const emit = defineEmits<{
    close: []
}>()

const { overlayRef, handleMouseDown, handleMouseUp } = useModalOverlay(
    () => props.visible,
    () => emit('close'),
)
</script>

<template>
    <Teleport to="body">
        <Transition
            name="modal-dialog-backdrop"
            appear
        >
            <div
                v-if="visible"
                class="modal-dialog__backdrop"
            />
        </Transition>

        <Transition
            name="modal-dialog"
            appear
        >
            <div
                v-if="visible"
                ref="overlayRef"
                class="modal-dialog"
                @mousedown="handleMouseDown"
                @mouseup="handleMouseUp"
            >
                <div
                    class="modal-dialog__content"
                    :style="{ maxWidth }"
                >
                    <div class="modal-dialog__header">
                        <slot name="title" />
                        <button
                            class="modal-dialog__close"
                            @click="emit('close')"
                        >
                            <IconClose />
                        </button>
                    </div>

                    <slot />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-dialog__backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

.modal-dialog {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 101;
    padding: 24px;
    overflow: hidden;
}

.modal-dialog__content {
    background: var(--color-surface);
    border-radius: var(--radius-lg);
    padding: 24px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: var(--shadow-lg);
}

.modal-dialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 20px;
    min-width: 0;
}

.modal-dialog__close {
    color: var(--color-text-muted);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
    margin-left: auto;
    flex-shrink: 0;
}

.modal-dialog__close:hover {
    background: var(--color-bg);
    color: var(--color-text);
}

@media (max-width: 640px) {
    .modal-dialog {
        padding: 16px;
    }

    .modal-dialog__content {
        padding: 24px;
    }
}
</style>

<style>
.modal-dialog-backdrop-enter-active,
.modal-dialog-backdrop-leave-active {
    transition: opacity 0.2s ease;
}

.modal-dialog-backdrop-enter-from,
.modal-dialog-backdrop-leave-to {
    opacity: 0;
}

.modal-dialog-enter-active .modal-dialog__content,
.modal-dialog-leave-active .modal-dialog__content {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.modal-dialog-enter-from .modal-dialog__content,
.modal-dialog-leave-to .modal-dialog__content {
    opacity: 0;
    transform: translateY(20px);
}
</style>
