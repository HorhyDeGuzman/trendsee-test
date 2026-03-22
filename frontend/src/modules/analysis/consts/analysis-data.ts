import type { Component } from 'vue'
import IconStructureFirst from '@/assets/icons/analysis/IconStructureFirst.vue'
import IconStructureSecond from '@/assets/icons/analysis/IconStructureSecond.vue'
import IconStructureThird from '@/assets/icons/analysis/IconStructureThird.vue'

export interface TagItem {
    text: string
    bg: string
    color: string
}

export interface StructureStep {
    time: string
    icon: Component
    title: string
    desc: string
}

export interface HookItem {
    title: string
    subtitle?: string
    text: string
}

export interface TechniqueItem {
    label: string
    text: string
}

export interface TechniqueGroup {
    title: string
    items: TechniqueItem[]
}

export interface MarketingItem {
    title: string
    desc: string
}

export const tags: TagItem[] = [
    { text: 'Туториал', bg: 'var(--color-tag-purple-bg)', color: 'var(--color-tag-purple)' },
    { text: 'Энергичное видео', bg: 'var(--color-tag-green-bg)', color: 'var(--color-tag-green)' },
    { text: 'Изи монтаж', bg: 'var(--color-tag-orange-bg)', color: 'var(--color-tag-orange)' },
    { text: 'Трендовый звук', bg: 'var(--color-tag-pink-bg)', color: 'var(--color-tag-pink)' },
    { text: 'Лид магнит', bg: 'var(--color-tag-orange-bg)', color: 'var(--color-tag-orange)' },
    {
        text: 'Красота и здоровье',
        bg: 'var(--color-tag-purple-bg)',
        color: 'var(--color-tag-purple)',
    },
]

export const structureSteps: StructureStep[] = [
    {
        time: '0–3 сек',
        icon: IconStructureFirst,
        title: 'Шок-сравнение',
        desc: 'Визуальный (Девушка с предметом) + Текст на экране: "Это спасет вашу зиму"',
    },
    {
        time: '3–15 сек',
        icon: IconStructureSecond,
        title: 'Сюжет',
        desc: '[Герой] показывает проблему → Резкая смена кадра → Решение',
    },
    {
        time: '15–120 сек',
        icon: IconStructureThird,
        title: 'Финал / CTA',
        desc: 'Призыв: "Пиши слово "ССЫЛКА" в комменты"',
    },
]

export const hooks: HookItem[] = [
    { title: 'Хук фраза', text: 'Одна из них — пустышка. Угадаешь какая?' },
    { title: 'Визуальный хук', text: 'Одна из них — пустышка. Угадаешь какая?' },
    { title: 'Текстовый хук', text: 'Одна из них — пустышка. Угадаешь какая?' },
]

export const techniques: TechniqueGroup[] = [
    {
        title: 'Суть видео',
        items: [
            { label: 'Приём', text: '"кому подходит / кому нет" двумя блоками.' },
            {
                label: 'Почему сработало',
                text: 'это формат “диагноз → лечение → решение”. Люди сохраняют не эмоции, а инструкцию. И это “обзор”, а не философия',
            },
        ],
    },
    {
        title: 'Монтаж',
        items: [
            {
                label: 'Приём',
                text: 'смена планов каждые 1–2 секунды: лицо → продукт крупно → рука (демо) → снова лицо.',
            },
            {
                label: 'Почему сработало',
                text: 'вертикалки смотрят на автопилоте. Частая смена планов держит внимание даже без звука',
            },
            {
                label: 'Приём',
                text: 'все доказательства — через B-roll вставки на 0.3–0.8 сек (катышки, блеск, этикетка, нанесение.',
            },
            {
                label: 'Почему сработало',
                text: 'речь в кадре быстро утомляет. B-roll делает ощущение “я реально тестировал”.',
            },
        ],
    },
    {
        title: 'Реплики',
        items: [
            {
                label: 'Приём',
                text: '“триггер доверия” одной фразой: “Я не продаю этот SPF, мне пох, скажу как есть.”',
            },
            { label: 'Почему сработало', text: 'снимает защиту "мне впаривают".' },
            {
                label: 'Приём',
                text: '"вилка выбора" в середине: "Если кожа жирная — делай так. Если сухая — так."',
            },
            {
                label: 'Почему сработало',
                text: 'персонализация без долгого объяснения = удержание.',
            },
        ],
    },
]

export const marketing: MarketingItem[] = [
    {
        title: 'CTA голос/визуал',
        desc: 'Почему сработало: зритель узнаёт свой баг мгновенно. Это не "мнение", а физический факт в кадре, мозг цепляется.',
    },
    {
        title: 'Тригер',
        desc: 'Почему сработало: зритель узнаёт свой баг мгновенно. Это не "мнение", а физический факт в кадре, мозг цепляется.',
    },
    {
        title: 'Куда ведет',
        desc: 'Почему сработало: зритель узнаёт свой баг мгновенно. Это не "мнение", а физический факт в кадре, мозг цепляется.',
    },
    {
        title: 'Лид-магнит',
        desc: 'Почему сработало: зритель узнаёт свой баг мгновенно. Это не "мнение", а физический факт в кадре, мозг цепляется.',
    },
]
