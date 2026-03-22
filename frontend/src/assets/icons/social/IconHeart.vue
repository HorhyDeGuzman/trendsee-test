<script setup lang="ts">
withDefaults(
    defineProps<{
        size?: number
        color?: string
    }>(),
    { size: 20, color: 'currentColor' },
)
</script>

<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10.5167 17.3417C10.2333 17.4417 9.76667 17.4417 9.48334 17.3417C7.06667 16.5167 1.66667 13.075 1.66667 7.24167C1.66667 4.66667 3.74167 2.58333 6.3 2.58333C7.81667 2.58333 9.15834 3.31667 10 4.45C10.8417 3.31667 12.1917 2.58333 13.7 2.58333C16.2583 2.58333 18.3333 4.66667 18.3333 7.24167C18.3333 13.075 12.9333 16.5167 10.5167 17.3417Z"
            :stroke="color"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>
