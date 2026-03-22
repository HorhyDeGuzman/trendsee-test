<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M15 10.83v5a1.67 1.67 0 0 1-1.67 1.67H4.17a1.67 1.67 0 0 1-1.67-1.67V6.67A1.67 1.67 0 0 1 4.17 5h5M12.5 2.5H17.5V7.5M8.33 11.67L17.5 2.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 20 })
</script>
