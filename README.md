# Astro Starter Kit: Basics for KONDRO-NETWORKS

Create a `.env` file in the project root with the following content:

//.env:

RESEND_API_KEY=YOUR_API  // for the contact

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![KONDRO-NETWORKS Preview](./siteweb.png)`

## 🚀 Project Structure

folders and files:

```text
  ├── public
│   ├── BlueLogoH.png
│   ├── BlueLogo.png
│   ├── favicon
│   │   ├── favicon1.zip
│   │   ├── faviconDark
│   │   │   ├── apple-touch-icon.png
│   │   │   ├── favicon-96x96.png
│   │   │   ├── favicon-96x96.png
│   │   │   ├── favicon.svg
│   │   │   ├── site.webmanifest
│   │   │   ├── web-app-manifest-192x192.png
│   │   │   └── web-app-manifest-512x512.png
│   │   ├── faviconLight
│   │   │   ├── apple-touch-icon.png
│   │   │   ├── favicon-96x96.png
│   │   │   ├── favicon-96x96.png
│   │   │   ├── favicon.svg
│   │   │   ├── site.webmanifest
│   │   │   ├── web-app-manifest-192x192.png
│   │   │   └── web-app-manifest-512x512.png
│   │   └── favicon.zip
│   ├── image
│   │   ├── bg
│   │   │   ├── backgroundMaquette.png
│   │   │   ├── backgroundMaquette.webp
│   │   │   └── Modif.png
│   │   ├── Certificat
│   │   │   ├── CCNP-Collaboration.webp
│   │   │   ├── fortinet-logo-fortinet-logo-aware-group.png
│   │   │   ├── pngwing.com.png
│   │   │   └── pngwing.com.webp
│   │   ├── logo
│   │   │   ├── BlueLogoH.png
│   │   │   ├── BlueLogo.png
│   │   │   ├── logoH .png
│   │   │   └── logo.png
│   │   ├── partenaryReferenceLogo
│   │   │   ├── aws.png
│   │   │   ├── Cisco_dark.svg
│   │   │   ├── Cisco_dark.webp
│   │   │   ├── Cisco_light.svg
│   │   │   ├── cisco-svgrepo-com.svg
│   │   │   ├── COMPUTEC (copy 1).png
│   │   │   ├── COMPUTEC.png
│   │   │   ├── CoteDivoirCable.png
│   │   │   ├── CoteDivoireCable.webp
│   │   │   ├── Dell_EMC-Logo.wine.png
│   │   │   ├── HIPERDIST.webp
│   │   │   ├── logo_asarel.png
│   │   │   ├── logo_asarel.webp
│   │   │   ├── logo_mugefci.png
│   │   │   ├── logo_mugefci.webp
│   │   │   ├── LOGO-NOVATECH-FICHIER-SOURCE.png
│   │   │   ├── MTN-Logo-2.svg
│   │   │   ├── MTNLogo.webp
│   │   │   └── OrangeCi.webp
│   │   ├── refs
│   │   │   ├── ccc.jpeg
│   │   │   ├── ccc.wbmp
│   │   │   ├── ccc.webp
│   │   │   ├── enerteam.webp
│   │   │   ├── logo_bsic.png
│   │   │   ├── logo_bsic.webp
│   │   │   ├── logo_groupe_prosuma.png
│   │   │   ├── logo_groupe_prosuma.webp
│   │   │   ├── sea_invest_logo_small.png
│   │   │   └── sea_invest_logo_small.webp
│   │   ├── sections
│   │   │   ├── Gemini_Generated_Image_yhzphlyhzphlyhzp.webp
│   │   │   ├── hero-network.jpg
│   │   │   ├── hero-network.webp
│   │   │   ├── homme_de_tir_moyen-travaillant.jpg
│   │   │   ├── homme_de_tir_moyen-travaillant-removebg-preview.png
│   │   │   ├── homme_de_tir_moyen-travaillant-removebg-preview.webp
│   │   │   ├── homme_de_tir_moyen-travaillant.webp
│   │   │   ├── image_person1.png
│   │   │   ├── image_person1.webp
│   │   │   ├── image_person2.png
│   │   │   ├── image_person2.webp
│   │   │   ├── image_person4.png
│   │   │   ├── image_person4.webp
│   │   │   ├── image_person.png
│   │   │   ├── image_person.webp
│   │   │   ├── image_preson3.png
│   │   │   ├── image_preson3.webp
│   │   │   ├── image-service-banck.jpg
│   │   │   ├── image-service-banck.webp
│   │   │   ├── image-service-ecommerce.jpg
│   │   │   ├── image-service-ecommerce.webp
│   │   │   ├── image-service-logistique.jpg
│   │   │   ├── image-service-logistique.webp
│   │   │   ├── image-service-network.jpg
│   │   │   ├── image-service-network.webp
│   │   │   ├── image-service-presentation.png
│   │   │   ├── image-service-presentation.webp
│   │   │   ├── image-service-sante.jpg
│   │   │   ├── image-service-sante.webp
│   │   │   ├── image-service-security.jpg
│   │   │   ├── image-service-security.webp
│   │   │   ├── logistique.jpg
│   │   │   ├── logistique.webp
│   │   │   ├── profile-1.jpg
│   │   │   ├── profile-1.webp
│   │   │   ├── profile-2.jpg
│   │   │   ├── profile-2.webp
│   │   │   ├── profile-3.jpg
│   │   │   ├── profile-3.webp
│   │   │   ├── profile-4.jpg
│   │   │   ├── profile-4.webp
│   │   │   └── profile-5.jpg
│   │   └── services
│   │       ├── Gemini_Generated_Image_1zrni41zrni41zrn.png
│   │       ├── Gemini_Generated_Image_1zrni41zrni41zrn.webp
│   │       ├── Gemini_Generated_Image_axxjxoaxxjxoaxxj.png
│   │       ├── Gemini_Generated_Image_axxjxoaxxjxoaxxj.webp
│   │       ├── Gemini_Generated_Image_gxayblgxayblgxay.png
│   │       ├── Gemini_Generated_Image_gxayblgxayblgxay.webp
│   │       ├── Gemini_Generated_Image_pkncnpkncnpkncnp.png
│   │       ├── Gemini_Generated_Image_pkncnpkncnpkncnp.webp
│   │       ├── Gemini_Generated_Image_pqpdlfpqpdlfpqpd.png
│   │       ├── Gemini_Generated_Image_pqpdlfpqpdlfpqpd.webp
│   │       └── Gemini_Generated_Image_qun3k8qun3k8qun3.png
│   ├── logo.png
│   ├── logoH.png
│   └── logo.png
├── README.md
├── siteweb.png
├── src
│   ├── actions
│   │   └── index.ts
│   ├── assets
│   │   └── assets.ts
│   ├── components
│   │   ├── magicui
│   │   │   ├── border-beam.tsx
│   │   │   └── marquee.tsx
│   │   ├── react
│   │   │   ├── sections
│   │   │   │   ├── CtaSection.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── SectionAbout.tsx
│   │   │   │   ├── SectionPartner.tsx
│   │   │   │   ├── SectorsActiviter.tsx
│   │   │   │   └── Services.tsx
│   │   │   └── UI
│   │   │       ├── About.tsx
│   │   │       ├── Animation
│   │   │       │   ├── AnimetedNetworkBackground.tsx
│   │   │       │   ├── LightCommunicationBackground.tsx
│   │   │       │   ├── NetworkBackground.tsx
│   │   │       │   ├── ParallaxSection.tsx
│   │   │       │   ├── ScrollReveal.tsx
│   │   │       │   └── TriangularBackground.tsx
│   │   │       ├── components
│   │   │       │   ├── ButtonFloating.tsx
│   │   │       │   ├── Button.tsx
│   │   │       │   ├── Carousel.tsx
│   │   │       │   ├── ChromaGrid.tsx
│   │   │       │   ├── CountUpAnimation.jsx
│   │   │       │   ├── FloatingCard.tsx
│   │   │       │   ├── GlowButton.tsx
│   │   │       │   ├── TitleDescript.tsx
│   │   │       │   └── TransitionSVGSection.tsx
│   │   │       ├── Contact.tsx
│   │   │       ├── Footer.tsx
│   │   │       ├── Header.tsx
│   │   │       └── Text
│   │   │           ├── BlurText.tsx
│   │   │           ├── CountUp.tsx
│   │   │           ├── DecryptedText.tsx
│   │   │           ├── ScrollVelocity.tsx
│   │   │           ├── DecryptedText.tsx
│   │   │           └── StartBorder.tsx
│   │   ├── ui
│   │   │   ├── alert.tsx
│   │   │   ├── background-beams.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card-carousel.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── It4aModernWebsiteBg.jsx
│   │   │   ├── masked-div.tsx
│   │   │   ├── smooth-cursor.tsx
│   │   │   └── textarea.tsx
│   │   ├── uiAceternity
│   │   │   └── UI
│   │   │       ├── Background
│   │   │       │   ├── BackgroundBeams.tsx
│   │   │       │   └── BackgroundLine.tsx
│   │   │       ├── CanvasReal
│   │   │       │   └── canvas-reveal-effect.tsx
│   │   │       ├── componentlist.tsx
│   │   │       └── components
│   │   │           ├── Sparkles.tsx
│   │   │           └── TracingBeam.tsx
│   │   └── variantionAnimtionMotion
│   │       └── variantMotion.ts
│   ├── contents
│   │   └── contents.ts
│   ├── emails
│   │   ├── AcknowledgmentEmail.tsx
│   │   ├── ContactEmail.tsx
│   │   └── logo.png
│   ├── Fonts
│   ├── layouts
│   │   └── Layout.astro
│   ├── lib
│   │   └── utils.ts
│   ├── pages
│   │   ├── 400.astro
│   │   ├── 401.astro
│   │   ├── 403.astro
│   │   ├── 404.astro
│   │   ├── 429.astro
│   │   ├── 500.astro
│   │   ├── 501.astro
│   │   ├── about.astro
│   │   ├── api
│   │   │   └── resend.ts
│   │   ├── contact.astro
│   │   ├── index.astro
│   │   └── services.astro
│   ├── styles
│   │   ├── global.css
│   │   └── StartBorder.css
│   └── types
│       └── email.ts
├── tailwind.config.js
├── todo.md
├── tsconfig.json
└── y
    └── Counter
        ├── Counter.css
        └── Counter.tsx

```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                     | Action                                               |
| :-------------------------- | :--------------------------------------------------- |
| `npm install`             | Installs dependencies                                |
| `npm run dev`             | Starts local dev server at `localhost:4321`        |
| `npm run build`           | Build your production site to `./dist/`            |
| `npm run preview`         | Preview your build locally, before deploying         |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                         |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# kondro-network
