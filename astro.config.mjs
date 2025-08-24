// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    output:'server',
    site:'https://it4acom.vercel.app/',
    integrations:[react(),sitemap()],
      vite:{
        define:{
            'ssr':{
                noExternal: ['@react-email/components', 'react-email','lucide-react']
            },
        },
        plugins:[
            tailwindcss(),
        ],
    },
    adapter: vercel({
        webAnalytics: {
        enabled: true,
        },
    }),
});
