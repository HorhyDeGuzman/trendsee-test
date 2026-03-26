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
                Язык: <IconFlagEn class="analysis-info-header__flag" /> Английский
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
    margin-bottom: 16px;
}

.analysis-info-header__label {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0.25px;
    color: var(--color-text-secondary);
}

.analysis-info-header__title {
    font-family: var(--font-primary);
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    margin-bottom: 8px;
    color: var(--color-text-heading);
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

.analysis-info-header__song-name {
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.7px;
    line-height: 16px;
    color: var(--color-text-alt);
}

.analysis-info-header__lang {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    letter-spacing: 0.25px;
    line-height: 21px;
    font-weight: 400;
}

.analysis-info-header__flag {
    margin-left: 4px;
}

.analysis-info-header__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 600px;
    margin-bottom: 24px;
}

.analysis-info-header__tag {
    padding: 4px 12px;
    border-radius: 1000px;
    letter-spacing: 0.25px;
    line-height: 21px;
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
}
</style>
