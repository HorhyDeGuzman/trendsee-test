<script setup lang="ts">
import blogerAvatar from '@/assets/images/bloger-avatar.png'
import IconExit from '@/assets/icons/action/IconExit.vue'
import IconFlagRu from '@/assets/icons/locale/IconFlagRu.vue'
import IconChevronRight from '@/assets/icons/nav/IconChevronRight.vue'
</script>

<template>
    <div class="sidebar-user">
        <div class="sidebar-user__profile">
            <img
                class="sidebar-user__avatar"
                :src="blogerAvatar"
                alt="avatar"
            />
            <div class="sidebar-user__info">
                <span class="sidebar-user__name">Александра</span>
                <span class="sidebar-user__phone">+7 (999) 999-99-99</span>
            </div>
            <button class="sidebar-user__logout">
                <IconExit />
            </button>
        </div>

        <div class="sidebar-user__lang">
            <IconFlagRu :size="20" />
            <span class="sidebar-user__lang-code">RU</span>
            <IconChevronRight
                class="sidebar-user__lang-chevron"
                :size="16"
            />
        </div>
    </div>
</template>

<style scoped>
.sidebar-user {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.sidebar-user__profile {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 4px;
}

.sidebar-user__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.sidebar-user__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.sidebar-user__name {
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text-secondary);
}

.sidebar-user__phone {
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-muted);
}

.sidebar-user__logout {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.sidebar-user__lang {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 32px;
    padding: 8px 12px;
    cursor: pointer;
}

.sidebar-user__lang-code {
    font-family: var(--font-primary);
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-tertiary);
}

.sidebar-user__lang-chevron {
    transform: rotate(90deg);
}
</style>
