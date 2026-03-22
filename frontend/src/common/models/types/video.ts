export interface VideoBadge {
    icon: string
    label: string
}

export interface VideoStats {
    views: string
    likes: string
    comments: string
    shares: string
}

export interface BloggerData {
    name: string
    subscribers: string
    avatar: string
}

export interface VideoData {
    image: string
    badges: VideoBadge[]
    stats: VideoStats
    blogger: BloggerData
    description: string
    date: string
}
