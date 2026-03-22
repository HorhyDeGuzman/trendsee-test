<script setup lang="ts">
import { useModalOverlay } from '@/common/composables/useModalOverlay'

const props = withDefaults(
    defineProps<{
        visible?: boolean
        width?: string
    }>(),
    { visible: true, width: '72dvw' },
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
            name="modal-panel-backdrop"
            appear
        >
            <div
                v-if="visible"
                class="modal-panel__backdrop"
            />
        </Transition>

        <Transition
            name="modal-panel"
            appear
        >
            <div
                v-if="visible"
                ref="overlayRef"
                class="modal-panel"
                @mousedown="handleMouseDown"
                @mouseup="handleMouseUp"
            >
                <div
                    class="modal-panel__content"
                    :style="{ width }"
                >
                    <slot />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-panel__backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
}

.modal-panel {
    position: fixed;
    inset: 0;
    z-index: 201;
    display: flex;
    justify-content: flex-end;
}

.modal-panel__content {
    max-width: 100%;
    height: 100%;
    background: var(--color-surface);
    display: flex;
    gap: 32px;
    overflow: hidden;
    border-radius: 24px 0 0 24px;
    position: relative;
}

</style>

<style>
.modal-panel-backdrop-enter-active,
.modal-panel-backdrop-leave-active {
    transition: opacity 0.2s ease;
}

.modal-panel-backdrop-enter-from,
.modal-panel-backdrop-leave-to {
    opacity: 0;
}

.modal-panel-enter-active,
.modal-panel-leave-active {
    transition: opacity 0.2s ease;
}

.modal-panel-enter-active .modal-panel__content,
.modal-panel-leave-active .modal-panel__content {
    transition: transform 0.2s ease;
}

.modal-panel-enter-from {
    opacity: 0;
}

.modal-panel-enter-from .modal-panel__content {
    transform: translateX(100%);
}

.modal-panel-leave-to {
    opacity: 0;
}

.modal-panel-leave-to .modal-panel__content {
    transform: translateX(100%);
}
</style>
