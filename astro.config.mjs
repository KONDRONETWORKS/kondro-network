// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
// https://astro.build/config
export default defineConfig({
    output:'server',
    site:'https://kondronetworks.com',
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
    adapter: node(
        {
            mode: 'standalone',
            experimentalStaticHeaders:true,
        }
    )
});
