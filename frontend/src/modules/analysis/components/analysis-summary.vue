<script setup lang="ts"></script>

<template>
    <div class="analysis-summary">
        <div class="analysis-summary__header">
            <h3 class="analysis-summary__title">Суть</h3>
        </div>
        <div class="analysis-summary__body">
            <p class="analysis-summary__text">
                Разбор состава/логики: он в человеческих словах переводит состав/механику ("что
                реально делает Х"), называет 2–3 работающих активных компонента и 2–3 маркетинговых
                "пустых" обещания.
            </p>
        </div>
    </div>
</template>

<style scoped>
.analysis-summary {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 32px 0;
}

.analysis-summary__header {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 4px 0;
}

.analysis-summary__title {
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.15px;
    line-height: 21px;
    color: var(--color-text-heading);
}

.analysis-summary__body {
    background: var(--color-bg-secondary);
    border-radius: 6px;
    padding: 16px;
}

.analysis-summary__text {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 400;
    color: var(--color-text-secondary);
    line-height: 21px;
    letter-spacing: 0.25px;
}
</style>
