import type { Component } from 'vue'

export interface NavPage {
    title: string
    icon: Component
    route: string
    gradient: string
}

export interface SidebarNavItem {
    label: string
    icon: Component
    to: string
    badge?: string
    badgeType?: 'count' | 'soon'
}

export interface SidebarNavSection {
    title: string
    items: SidebarNavItem[]
}
