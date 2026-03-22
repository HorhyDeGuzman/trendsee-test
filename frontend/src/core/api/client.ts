import { client } from '@/core/api/generated/client.gen'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

client.setConfig({
    baseUrl: BASE_URL,
    auth: () => localStorage.getItem('token') || undefined,
})

client.interceptors.response.use((response) => {
    if (response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        import('@/core/router').then(({ default: router }) => {
            router.push({ name: 'auth' })
        })
    }
    return response
})

export { client }
