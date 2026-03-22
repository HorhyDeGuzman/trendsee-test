<script setup lang="ts">
defineProps<{
    size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
    <div class="app-loader">
        <div :class="['app-loader__spinner', `app-loader__spinner--${size ?? 'md'}`]" />
    </div>
</template>

<style scoped>
.app-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}

.app-loader__spinner {
    border-radius: 50%;
    border: 3px solid var(--color-border);
    border-top-color: var(--color-primary);
    animation: spin 0.8s linear infinite;
}

.app-loader__spinner--sm {
    width: 24px;
    height: 24px;
}

.app-loader__spinner--md {
    width: 40px;
    height: 40px;
}

.app-loader__spinner--lg {
    width: 56px;
    height: 56px;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
