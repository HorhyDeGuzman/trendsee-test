import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
    input: 'http://localhost:8000/openapi.json',
    output: {
        path: 'src/core/api/generated',
        clean: true,
    },
    plugins: ['@hey-api/typescript', '@hey-api/sdk', '@hey-api/client-fetch'],
})
