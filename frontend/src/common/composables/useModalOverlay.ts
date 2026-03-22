import { ref, watch, onUnmounted, type Ref } from 'vue'

export function useModalOverlay(visible: () => boolean, onClose: () => void) {
    const overlayRef = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>
    const mouseDownTarget = ref<EventTarget | null>(null)

    function handleMouseDown(e: MouseEvent) {
        mouseDownTarget.value = e.target
    }

    function handleMouseUp(e: MouseEvent) {
        if (e.target === overlayRef.value && mouseDownTarget.value === overlayRef.value) {
            onClose()
        }
        mouseDownTarget.value = null
    }

    watch(visible, (val) => {
        document.body.style.overflow = val ? 'hidden' : ''
    }, { immediate: true })

    onUnmounted(() => {
        document.body.style.overflow = ''
    })

    return { overlayRef, handleMouseDown, handleMouseUp }
}
