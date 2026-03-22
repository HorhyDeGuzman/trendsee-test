import { onMounted, onUnmounted } from 'vue'

export function useInfiniteScroll(callback: () => void, threshold = 500) {
    let ticking = false

    function onScroll() {
        if (ticking) return
        ticking = true

        requestAnimationFrame(() => {
            const scrollBottom =
                document.documentElement.scrollHeight -
                document.documentElement.scrollTop -
                window.innerHeight

            if (scrollBottom < threshold) {
                callback()
            }

            ticking = false
        })
    }

    onMounted(() => {
        window.addEventListener('scroll', onScroll, { passive: true })
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', onScroll)
    })
}
