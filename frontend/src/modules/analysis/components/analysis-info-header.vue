<script setup lang="ts">
import { tags } from '@/modules/analysis/consts/analysis-data'
import IconSong from '@/assets/icons/social/IconSong.vue'
import IconFlagEn from '@/assets/icons/locale/IconFlagEn.vue'
</script>

<template>
    <div class="analysis-info-header">
        <span class="analysis-info-header__label">Тема видео</span>
        <h2 class="analysis-info-header__title">
            Рассуждения на тему правильности и неправильности
        </h2>
        <div class="analysis-info-header__meta">
            <div class="analysis-info-header__song">
                <IconSong />
                <span class="analysis-info-header__song-name">Tyga – Pop it off</span>
            </div>
            <span class="analysis-info-header__lang">
                Язык: <IconFlagEn /> Английский
            </span>
        </div>
    </div>

    <div class="analysis-info-header__tags">
        <span
            v-for="tag in tags"
            :key="tag.text"
            class="analysis-info-header__tag"
            :style="{ background: tag.bg, color: tag.color }"
        >
            {{ tag.text }}
        </span>
    </div>
</template>

<style scoped>
.analysis-info-header {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 90px;
}

.analysis-info-header__label {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-secondary);
}

.analysis-info-header__title {
    font-family: var(--font-primary);
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--color-text-heading);
    line-height: 1.3;
}

.analysis-info-header__meta {
    display: flex;
    align-items: center;
    gap: 16px;
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-secondary);
}

.analysis-info-header__song {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 4px 12px 4px 8px;
    background: var(--color-bg-alt);
    border-radius: var(--radius-xl);
    color: var(--color-text-alt);
}

.analysis-info-header__lang {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 400;
}

.analysis-info-header__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 600px;
}

.analysis-info-header__tag {
    padding: 4px 12px;
    border-radius: 1000px;
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
}
</style>
