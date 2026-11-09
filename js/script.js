// =============================================
// DESTAQUE DO MENU CONFORME A ROLAGEM
// Projetos fica ativo na galeria; Contato assume quando o rodapé entra na tela
// =============================================
const footerEl      = document.getElementById('contato');
const linksProjetos = document.querySelectorAll('nav a[data-i18n="nav-portfolio"]');
const linksContato  = document.querySelectorAll('nav a[href="#contato"]');

function updateActiveNav() {
    if (!footerEl) return;
    const noRodape = footerEl.getBoundingClientRect().top < window.innerHeight * 0.5;
    linksProjetos.forEach(a => a.classList.toggle('on', !noRodape));
    linksContato.forEach(a  => a.classList.toggle('on', noRodape));
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('resize', updateActiveNav);
updateActiveNav();

// =============================================
// PROJETOS — para adicionar um trabalho novo:
//   1) acrescente um objeto na lista abaixo
//   2) crie as chaves pieceN-name / -desc / -type / -tool / -focus
//      (e -status se for o caso) em "translations", em EN e PT
//
//   area:   'design' (padrão) | 'dev'  -> em qual aba da galeria o projeto aparece
//   cat:    design: 'ui' | 'social' | 'editorial'
//           dev:    'web' | 'mobile' | 'api'   (a categoria define o filtro)
//   images: todas as imagens do projeto (a primeira vira a capa)
//   fit:    'contain' mostra a capa inteira (bom para imagens verticais);
//           omita para preencher o card (bom para telas largas)
//   scroll: true  -> no modal a imagem abre na largura toda e rola (bom para prints de site inteiro)
//   pos:    ponto de corte da capa quando fit não é 'contain' ('top', 'center'...)
//   link:   { url, key, icon }  -> botão no modal
//   links:  [ {url,key,icon}, ... ] -> vários botões (ex.: GitHub + site no ar)
//   status: { key, icon }       -> selo no modal (ex.: "em desenvolvimento")
//   sections: divide o projeto em seções dentro do modal (ex.: Catálogo, Posts, Cartão).
//             Cada seção mostra cards; clicar num card abre o carrossel dele.
//             [ { key: 'posts', browse: true,
//                 items: [ { key: 'post1', images: [...], unit: 'slides' | 'pages' } ] } ]
//             - browse: true -> clicar num card abre o carrossel com TODAS as imagens da seção,
//                               começando pelo card clicado (bom para posts de uma imagem só)
//             - unit:   texto do contador do card quando há mais de 1 imagem (padrão: 'slides')
//             - fit:    'contain' mostra a capa do card inteira (bom para imagens quadradas/horizontais)
//             Textos (em EN e PT): piece<ID>-sec-<key> e piece<ID>-sec-<key>-sub (título e subtítulo
//             da seção) e piece<ID>-item-<key> (nome de cada card).
//             "images" do projeto continua valendo: a primeira imagem é a capa no carrossel da galeria.
// =============================================
const pagesPng = (folder, n) => Array.from({ length: n }, (_, i) => `${folder}/${i + 1}.png`);
const pages = (folder, n) => Array.from({ length: n }, (_, i) => `${folder}/${i + 1}.webp`);
const IG_SEGUROS  = 'https://www.instagram.com/stradaesilvaseguros?igsh=MTNvNzFmZW50dXphcA%3D%3D';
const IG_LIBRERIA = 'https://www.instagram.com/p/Da53NU7D74s/?stkn=ZTZzczVwZXRvZXUy';

// Strada & Silva Seguros — pastas dentro de "Projetos de design/Strada & Silva Seguros"
const SEG = 'Projetos de design/Strada & Silva Seguros';
const SEG_AUTO     = pagesPng(`${SEG}/Post de prospecção seguro auto`, 3);
const SEG_EMPRESA  = pagesPng(`${SEG}/Post sobre empresa que trabalhamos`, 2);
const SEG_LEMBRETE = `${SEG}/Lembrete.png`;

// MODELO de projeto de programação (copie, preencha e tire os //):
// {
//     id: 6, area: 'dev', cat: 'web',
//     images: ['images/projetos/meu-app/1.webp', 'images/projetos/meu-app/2.webp'],
//     pos: 'top',
//     links: [
//         { url: 'https://github.com/StradaGustavo/meu-app', key: 'piece-link-github', icon: 'bxl-github' },
//         { url: 'https://meu-app.com',                      key: 'piece-link-live',   icon: 'bx-link-external' }
//     ]
// },
// e as chaves piece6-name / -desc / -type / -tool (as tecnologias) / -focus em "translations", EN e PT.

// Min Maria (collab com a Yasmin): cole os links aqui. Botão com link vazio ('') não aparece.
const MIN_INSTAGRAM = 'https://www.instagram.com/minmari.art/';
const MIN_BEHANCE   = 'https://www.behance.net/yasminmariaaf';
const MIN_SITE      = '';

const FILTERS = {
    design: ['all', 'ui', 'social', 'editorial'],
    dev:    ['all', 'web', 'mobile', 'api']
};

const PROJECTS = [
    {
        id: 1, cat: 'ui',
        images: [
            'Projetos de design/Classic Garage/1.png',
            'Projetos de design/Classic Garage/2.png',
            'Projetos de design/Classic Garage/3.png'
        ],
        pos: 'top',
        scroll: true
    },
    {
        // Strada & Silva Seguros: dividida em seções (Seguro auto, A corretora, Lembrete)
        id: 2, cat: 'social',
        images: [
            ...SEG_AUTO, ...SEG_EMPRESA, SEG_LEMBRETE
        ],
        fit: 'contain',
        sections: [
            {
                key: 'auto',
                items: [ { key: 'auto', images: SEG_AUTO } ]
            },
            {
                key: 'company',
                items: [ { key: 'company', images: SEG_EMPRESA } ]
            },
            {
                key: 'reminder',
                items: [ { key: 'reminder', images: [SEG_LEMBRETE], fit: 'contain' } ]
            }
        ],
        link: { url: IG_SEGUROS, key: 'piece-link-instagram', icon: 'bxl-instagram' }
    },
    {
        // Libreria Editora: dividida em seções (Catálogo, Posts, Cartão digital).
        // Para acrescentar um post: crie o card em "Posts" e as chaves piece3-item-... em EN e PT.
        id: 3, cat: 'editorial',
        images: [
            ...pagesPng('Projetos de design/Libreria/Catalogo', 13)
        ],
        sections: [
            {
                key: 'catalog',
                items: [
                    { key: 'catalog', unit: 'pages', images: pagesPng('Projetos de design/Libreria/Catalogo', 13) }
                ]
            },
            {
                key: 'posts', browse: true,
                items: [
                    { key: 'post1', images: ['Projetos de design/Libreria/Post_libreria/1.png'] },
                    { key: 'post2', images: ['Projetos de design/Libreria/Post_libreria/2.png'] },
                    { key: 'post3', images: ['Projetos de design/Libreria/Post_libreria/3.png'] }
                ]
            },
            {
                key: 'card',
                items: [
                    { key: 'card', images: ['Projetos de design/Libreria/Post_libreria/Cartão de visita - Libreria .png'] }
                ]
            }
        ]
    },
    {
        // Pokédex: meu primeiro projeto de desenvolvimento (por isso vem em primeiro na aba Programação)
        id: 6, area: 'dev', cat: 'api',
        images: ['Projeto programação/Pokédex/Pokedex.jpg'],
        pos: 'center',
        link: { url: 'https://stradagustavo.github.io/pokedex/', key: 'piece-link-project', icon: 'bx-link-external' }
    },
    {
        // Classic Garage (programação): projeto fictício, sem galeria, só descrição + botão para o site
        id: 4, area: 'dev', cat: 'web',
        fictional: true,
        images: ['Projeto programação/Classic Garage/Classic_Garage.png'],
        pos: 'top',
        link: { url: 'https://stradagustavo.github.io/classic_garage-home/', key: 'piece-link-project', icon: 'bx-link-external' }
    },
    {
        // Min Maria: portfólio real da Yasmin (collab: design dela, programação minha)
        id: 5, area: 'dev', cat: 'web',
        images: ['Projeto programação/Min Maria/Min_Maria.png'],
        pos: 'top',
        links: [
            { url: MIN_SITE,      key: 'piece-link-project',          icon: 'bx-link-external' },
            { url: MIN_INSTAGRAM, key: 'piece-link-instagram-yasmin', icon: 'bxl-instagram', iconOnly: true },
            { url: MIN_BEHANCE,   key: 'piece-link-behance-yasmin',   icon: 'bxl-behance',   iconOnly: true }
        ]
    }
];


// =============================================
// BILINGUAL CONTENT — EN / PT-BR
// =============================================
const translations = {
    en: {
        'nav-home':             'Home',
        'nav-services':         'Services',
        'nav-portfolio':        'Projects',
        'nav-contact':          'Contact',

        'gallery-title-a':      'Project',
        'gallery-title-b':      'Gallery',
        'gallery-about':        'I’m a developer and designer. I work with full stack programming (front-end and back-end) and with UX/UI design and visual identity, from the first idea to the product going live.',
        'gallery-how':          'The gallery has two areas: Design (brand identities, social posts and interfaces) and Programming (websites and apps). Pick an area, filter by category and click a project to see the details.',
        'skill-brand':          'Visual identity',

        'area-design':          'Design',
        'area-design-sub':      'UX/UI · Visual identity',
        'area-dev':             'Programming',
        'area-dev-sub':         'Full Stack · Apps',
        'cat-web':              'Web',
        'cat-mobile':           'Mobile',
        'cat-api':              'APIs',
        'empty-title':          'Programming projects coming soon',
        'empty-text':           'I\'m putting the code projects together to publish here. Meanwhile, take a look at my GitHub.',
        'btn-github':           'See GitHub',
        'piece-meta-stack':     'Stack',
        'piece-link-github':    'See code on GitHub',
        'piece-link-live':      'See it live',
        'piece-link-project':   'View project',
        'piece-link-instagram-yasmin': 'Yasmin’s Instagram',
        'piece-link-behance-yasmin':   'Yasmin’s Behance',
        'badge-fictional':      'Fictional',
        'badge-real':           'Real project',
        'dev-note-title':       'Why so few apps here?',
        'dev-note-text':        'Most of my projects are not available for download on the Play Store or the App Store, and that is intentional. I believe accessibility also means making the first contact with technology easier.',
        'dev-note-text2':       'As someone in the field, I know we are not always willing to install an app on our phones just to get to know a solution. That is why I prefer to do the full deploy of my projects and make them available online, so anyone can open them straight from the browser, on any device, without installing anything.',
        'dev-note-text3':       'This choice also reflects my concern for the experience of the people who use or get to know my work: reducing barriers, simplifying access and bringing technology closer to people. At first glance they may look like websites, but they are complete applications.',

        'cat-all':              'All',
        'cat-ui':               'UI / Web',
        'cat-social':           'Social media',
        'cat-editorial':        'Editorial',
        'view-project':         'View project',
        'count-one':            '1 project',
        'count-many':           '{n} projects',
        'modal-close':          'Close',
        'modal-fullscreen':     'Fullscreen',
        'modal-prev':           'Previous',
        'modal-next':           'Next',
        'back-sections':        'Back to sections',
        'unit-slides':          '{n} slides',
        'unit-pages':           '{n} pages',

        'piece-meta-type':      'Type',
        'piece-meta-tool':      'Tool',
        'piece-meta-focus':     'Focus',
        'piece-link-instagram': 'See more on Instagram',

        "piece1-name":          "Classic Garage",
        "piece1-desc":          "A landing page for Classic Garage, a workshop specialized in restoring classic cars. I went with black and red to keep it bold and mechanical, paired with a heavy, condensed typeface that gives the layout some weight. The site is organized into home, portfolio and about us: services, before-and-after restorations, customer reviews and the workshop's story. Restoring is also a way of caring.",
        "piece1-type":          "Web Design Landing Page",
        "piece1-tool":          "Canva",
        "piece1-focus":         "UI Design · Visual Identity",

        "piece2-name":          "Strada & Silva Seguros",
        "piece2-desc":          "Social media pieces for Strada & Silva Seguros, an insurance brokerage. I kept the brand's visual identity consistent across every post, with a strong orange, a clean white and the logo always present. The set includes educational posts about auto insurance and coverage, a presentation of the brokerage and the insurers it works with, and a quote reminder. I worked through composition, type hierarchy and color palette so each piece is instantly recognizable.",
        "piece2-type":          "Social Media",
        "piece2-tool":          "Canva",
        "piece2-focus":         "Visual Identity · Social Media",

        "piece3-name":          "Libreria Editora",
        "piece3-desc":          "Marketing materials for Libreria Editora, a company that sells globes, created as part of my work in its marketing team. The project brings together the 2026 globe catalog, with 13 pages built on the same grid so the products are easy to compare, along with social media posts aimed at resellers and bookstores and a digital business card with a QR code to the catalog. Everything follows the company's navy blue and white palette, with touches of gold.",
        "piece3-type":          "Catalog · Social Media · Digital Card",
        "piece3-tool":          "Canva",
        "piece3-focus":         "Editorial Design · Visual Identity",

        "piece4-name":          "Classic Garage",
        "piece4-desc":          "I developed the landing page for Classic Garage in code, a workshop specialized in restoring classic cars. The project brings together a presentation of the services, a before-and-after gallery of the restorations, customer reviews and the workshop's story. Everything was built by hand, from the code to the final result, and published for online access.\n\nBesides being a development project, it also carries a bit of my personality. I'm passionate about muscle cars, classic cars, V8 engines and automotive modifications. So I took the opportunity to turn that passion into inspiration, bringing the identity of the automotive world to every detail of the page.",
        "piece4-note":          "Classic Garage is a fictional project.",
        "piece4-type":          "Landing page · Website",
        "piece4-tool":          "HTML · CSS · JavaScript",
        "piece4-focus":         "Front-end · Deploy on GitHub",

        "piece5-name":          "Min Maria",
        "piece5-desc":          "This project was developed as a collab between me and Yasmin, in which we combined our skills to create a modern, professional digital portfolio with an identity of its own.\n\nYasmin was responsible for all of the design, creating the visual identity and the structure of the pages, while I took care of all the programming, turning the visual project into a functional experience that is accessible from the browser.\n\nIt was a partnership that brought design and development together, showing how different skills can complement each other to take an idea off the paper and turn it into a complete project. More than a portfolio, it is the result of a collaboration built on creativity, exchange of ideas and a lot of hard work.",
        "piece5-type":          "Portfolio · Website (collab)",
        "piece5-tool":          "HTML · CSS · JavaScript",
        "piece5-focus":         "Front-end · Design and development collab",
        "piece6-name":          "Pokédex",
        "piece6-desc":          "The Pokédex was my first development project and marked the beginning of my journey as a programmer. The goal was to explore consuming and integrating APIs, working with dynamic data to present Pokémon information in an organized and interactive way.\n\nThe project also focused on responsiveness, ensuring a good browsing experience across different devices and screen sizes.\n\nMore than a technical exercise, this project represents an important milestone in my journey: it was where I discovered my passion for programming and found the motivation to keep learning, experimenting and turning ideas into solutions.",
        "piece6-type":          "Web app · API integration",
        "piece6-tool":          "HTML · CSS · JavaScript · PokéAPI",
        "piece6-focus":         "Front-end · APIs · Responsiveness",

        "piece2-sec-auto":         "Auto insurance",
        "piece2-sec-auto-sub":     "Prospecting carousel on what auto insurance is and what it covers",
        "piece2-item-auto":        "Auto insurance: what it is and how it protects you",
        "piece2-sec-company":      "The brokerage",
        "piece2-sec-company-sub":  "Who Strada & Silva is and the insurers it works with",
        "piece2-item-company":     "Who is Strada & Silva Seguros",
        "piece2-sec-reminder":     "Reminder",
        "piece2-sec-reminder-sub": "A quote post to keep the brand present in the feed",
        "piece2-item-reminder":    "Reminder post",

        "piece3-sec-catalog":      "Catalog",
        "piece3-sec-catalog-sub":  "The 2026 globe catalog, every page on the same grid",
        "piece3-item-catalog":     "2026 Globe Catalog",
        "piece3-sec-posts":        "Posts",
        "piece3-sec-posts-sub":    "Social media pieces aimed at resellers and bookstores. Click one to see it full size",
        "piece3-item-post1":       "Sell without stock",
        "piece3-item-post2":       "Your bookstore sells stories",
        "piece3-item-post3":       "3 ways to sell globes",
        "piece3-sec-card":         "Digital card",
        "piece3-sec-card-sub":     "With a QR code that leads to the catalog",
        "piece3-item-card":        "Libreria digital business card",

        'cta-title':            'Let’s get your idea out of the garage',
        'cta-text':             'Website, app or brand identity: message me on WhatsApp and let’s put it on the road.',
        'btn-chat':             'Chat on WhatsApp',
        'footer-copy':          '\u00A9 2026 Gustavo Strada Silva',
    },

    pt: {
        'nav-home':             'Home',
        'nav-services':         'Serviços',
        'nav-portfolio':        'Projetos',
        'nav-contact':          'Contato',

        'gallery-title-a':      'Galeria de',
        'gallery-title-b':      'Projetos',
        'gallery-about':        'Sou desenvolvedor e designer. Trabalho com programação full stack (front-end e back-end) e com design de UX/UI e identidade visual, da primeira ideia até o produto no ar.',
        'gallery-how':          'A galeria tem duas áreas: Design (identidades visuais, posts e interfaces) e Programação (sites e apps). Escolha uma área, filtre por categoria e clique num projeto para ver os detalhes.',
        'skill-brand':          'Identidade visual',

        'area-design':          'Design',
        'area-design-sub':      'UX/UI · Identidade visual',
        'area-dev':             'Programação',
        'area-dev-sub':         'Full Stack · Apps',
        'cat-web':              'Web',
        'cat-mobile':           'Mobile',
        'cat-api':              'APIs',
        'empty-title':          'Projetos de programação em breve',
        'empty-text':           'Estou organizando os projetos de código para publicar aqui. Enquanto isso, dá uma olhada no meu GitHub.',
        'btn-github':           'Ver GitHub',
        'piece-meta-stack':     'Tecnologias',
        'piece-link-github':    'Ver código no GitHub',
        'piece-link-live':      'Ver no ar',
        'piece-link-project':   'Ver projeto',
        'piece-link-instagram-yasmin': 'Instagram da Yasmin',
        'piece-link-behance-yasmin':   'Behance da Yasmin',
        'badge-fictional':      'Fictício',
        'badge-real':           'Projeto real',
        'dev-note-title':       'Por que quase não tem app aqui?',
        'dev-note-text':        'A maioria dos meus projetos não está disponível para download na Play Store ou na App Store, e isso é intencional. Acredito que acessibilidade também significa facilitar o primeiro contato com a tecnologia.',
        'dev-note-text2':       'Como alguém da área, sei que nem sempre estamos dispostos a instalar um aplicativo no celular só para conhecer uma solução. Por isso, prefiro fazer o deploy completo dos meus projetos e disponibilizá-los online, permitindo que qualquer pessoa acesse diretamente pelo navegador, em qualquer dispositivo, sem precisar instalar nada.',
        'dev-note-text3':       'Essa escolha também reflete minha preocupação com a experiência de quem utiliza ou conhece meu trabalho: reduzir barreiras, simplificar o acesso e tornar a tecnologia mais próxima das pessoas. À primeira vista, podem até parecer sites, mas são aplicações completas.',

        'cat-all':              'Todos',
        'cat-ui':               'UI / Web',
        'cat-social':           'Social media',
        'cat-editorial':        'Editorial',
        'view-project':         'Ver projeto',
        'count-one':            '1 projeto',
        'count-many':           '{n} projetos',
        'modal-close':          'Fechar',
        'modal-fullscreen':     'Tela cheia',
        'modal-prev':           'Anterior',
        'modal-next':           'Próximo',
        'back-sections':        'Voltar às seções',
        'unit-slides':          '{n} slides',
        'unit-pages':           '{n} páginas',

        'piece-meta-type':      'Tipo',
        'piece-meta-tool':      'Ferramenta',
        'piece-meta-focus':     'Foco',
        'piece-link-instagram': 'Ver mais no Instagram',

        "piece1-name":          "Classic Garage",
        "piece1-desc":          "Landing page para a Classic Garage, oficina especializada em restauração de carros clássicos. Usei preto e vermelho pra passar robustez e tradição mecânica, com uma tipografia condensada e pesada que dá peso ao layout. O site se divide em início, portfólio e sobre nós: serviços, antes e depois das restaurações, depoimentos de clientes e a história da oficina. Cuidar também é restaurar.",
        "piece1-type":          "Web Design Landing Page",
        "piece1-tool":          "Canva",
        "piece1-focus":         "UI Design · Identidade Visual",

        "piece2-name":          "Strada & Silva Seguros",
        "piece2-desc":          "Peças para as redes sociais da Strada & Silva Seguros, corretora de seguros. Mantive a identidade visual da marca consistente em cada post, com laranja forte, branco limpo e o logo sempre presente. O conjunto reúne posts educativos sobre seguro auto e coberturas, a apresentação da corretora e das seguradoras parceiras e um post de lembrete com frase. Trabalhei composição, hierarquia tipográfica e paleta de cores pra criar peças que ficam reconhecíveis de cara.",
        "piece2-type":          "Social Media",
        "piece2-tool":          "Canva",
        "piece2-focus":         "Identidade Visual · Mídias Sociais",

        "piece3-name":          "Libreria Editora",
        "piece3-desc":          "Materiais de marketing da Libreria Editora, empresa que vende globos, criados como parte do meu trabalho no time de marketing. O projeto reúne o catálogo de globos 2026, com 13 páginas na mesma grade para facilitar a comparação entre os produtos, posts para redes sociais voltados a revendedores e livrarias e um cartão de visita digital com QR code para o catálogo. Tudo segue a paleta azul-marinho e branco da empresa, com toques de dourado.",
        "piece3-type":          "Catálogo · Social Media · Cartão Digital",
        "piece3-tool":          "Canva",
        "piece3-focus":         "Design Editorial · Identidade Visual",

        "piece4-name":          "Classic Garage",
        "piece4-desc":          "Desenvolvi em código a landing page da Classic Garage, uma oficina especializada na restauração de carros clássicos. O projeto reúne apresentação dos serviços, galeria de antes e depois das restaurações, depoimentos de clientes e a história da oficina. Tudo desenvolvido à mão, do código ao resultado final, e publicado para acesso online.\n\nAlém de ser um projeto de desenvolvimento, ele também carrega um pouco da minha personalidade. Sou apaixonado por muscle cars, carros antigos, motores V8 e modificações automotivas. Então, aproveitei a oportunidade para transformar essa paixão em inspiração, trazendo a identidade do universo automotivo para cada detalhe da página.",
        "piece4-note":          "Classic Garage é um projeto fictício.",
        "piece4-type":          "Landing page · Site",
        "piece4-tool":          "HTML · CSS · JavaScript",
        "piece4-focus":         "Front-end · Deploy no GitHub",

        "piece5-name":          "Min Maria",
        "piece5-desc":          "Este projeto foi desenvolvido em uma collab entre mim e a Yasmin, na qual juntamos nossas habilidades para criar um portfólio digital moderno, profissional e com identidade própria.\n\nA Yasmin ficou responsável por toda a parte de design, criando a identidade visual e a estrutura das páginas, enquanto eu cuidei de toda a programação, transformando o projeto visual em uma experiência funcional e acessível pelo navegador.\n\nFoi uma parceria que uniu design e desenvolvimento, mostrando como diferentes habilidades podem se complementar para tirar uma ideia do papel e transformá-la em um projeto completo. Mais do que um portfólio, é o resultado de uma colaboração construída com criatividade, troca de ideias e muito trabalho.",
        "piece5-type":          "Portfólio · Site (collab)",
        "piece5-tool":          "HTML · CSS · JavaScript",
        "piece5-focus":         "Front-end · Collab design e desenvolvimento",
        "piece6-name":          "Pokédex",
        "piece6-desc":          "A Pokédex foi meu primeiro projeto de desenvolvimento e marcou o início da minha trajetória como programador. A proposta foi explorar o consumo e a integração de APIs, trabalhando com dados dinâmicos para apresentar informações dos Pokémon de forma organizada e interativa.\n\nO projeto também teve como foco a responsividade, garantindo uma boa experiência de navegação em diferentes dispositivos e tamanhos de tela.\n\nMais do que um exercício técnico, esse projeto representa um marco importante na minha trajetória: foi nele que descobri minha paixão pela programação e encontrei a motivação para continuar aprendendo, experimentando e transformando ideias em soluções.",
        "piece6-type":          "Web app · Consumo de API",
        "piece6-tool":          "HTML · CSS · JavaScript · PokéAPI",
        "piece6-focus":         "Front-end · APIs · Responsividade",

        "piece2-sec-auto":         "Seguro auto",
        "piece2-sec-auto-sub":     "Carrossel de prospecção sobre o que é o seguro auto e o que ele cobre",
        "piece2-item-auto":        "Seguro auto: o que é e como protege você",
        "piece2-sec-company":      "A corretora",
        "piece2-sec-company-sub":  "Quem é a Strada & Silva e as seguradoras parceiras",
        "piece2-item-company":     "Quem é a Strada & Silva Seguros",
        "piece2-sec-reminder":     "Lembrete",
        "piece2-sec-reminder-sub": "Post com frase para manter a marca presente no feed",
        "piece2-item-reminder":    "Post de lembrete",

        "piece3-sec-catalog":      "Catálogo",
        "piece3-sec-catalog-sub":  "O catálogo de globos 2026, todas as páginas na mesma grade",
        "piece3-item-catalog":     "Catálogo de Globos 2026",
        "piece3-sec-posts":        "Posts",
        "piece3-sec-posts-sub":    "Peças para redes sociais voltadas a revendedores e livrarias. Clique num post para ver em tamanho grande",
        "piece3-item-post1":       "Venda sem estoque",
        "piece3-item-post2":       "Sua livraria vende histórias",
        "piece3-item-post3":       "3 formas de vender globos",
        "piece3-sec-card":         "Cartão digital",
        "piece3-sec-card-sub":     "Com QR code que leva ao catálogo",
        "piece3-item-card":        "Cartão de visita digital Libreria",

        'cta-title':            'Bora tirar sua ideia da garagem?',
        'cta-text':             'Site, app ou identidade visual: me chama no WhatsApp e a gente coloca ela na estrada.',
        'btn-chat':             'Chamar no WhatsApp',
        'footer-copy':          '\u00A9 2026 Gustavo Strada Silva',
    }
};

function getLang() {
    let saved = null;
    try { saved = localStorage.getItem('lang'); } catch (x) {}
    return saved || ((navigator.language || '').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en');
}

function tr(key) {
    const t = translations[getLang()] || translations.en;
    return t[key] !== undefined ? t[key] : (translations.en[key] || '');
}

function setLang(lang) {
    const t = translations[lang];
    if (!t) return;

    try { localStorage.setItem('lang', lang); } catch (x) {}

    document.getElementById('lang').textContent = lang === 'pt' ? 'EN' : 'PT';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
    });

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    // aria-labels dos botões da janela
    const set = (id, key) => { const el = document.getElementById(id); if (el) el.setAttribute('aria-label', t[key]); };
    set('m-close', 'modal-close'); set('m-prev', 'modal-prev'); set('m-next', 'modal-next');
    set('d-prev', 'modal-prev'); set('d-next', 'modal-next');
    set('m-expand', 'modal-fullscreen'); set('lb-close', 'modal-close'); set('lb-prev', 'modal-prev'); set('lb-next', 'modal-next');

    // Redesenha as partes geradas pelo script
    if (typeof renderGallery === 'function') renderGallery();
    if (typeof renderModal === 'function') renderModal();
}


// =============================================
// GALERIA — filtros + cards
// =============================================
var activeFilter = 'all';
var activeArea   = 'design';
const areaOf = p => p.area || 'design';
var openProject = null;
var imgIndex = 0;

const worksEl = document.getElementById('works');
const countEl = document.getElementById('count');

function catLabel(cat) { return tr('cat-' + cat); }

// ---- Carrossel em "leque": o card do meio fica de frente, os outros inclinam para os lados ----
var deckIndex = 0;
var deckList  = [];
var deckCards = [];
var dragged   = false;
const dotsEl  = document.getElementById('deck-dots');

function pad(n) { return String(n).padStart(2, '0'); }

function goTo(i) {
    const n = deckList.length;
    if (!n) return;
    deckIndex = (i + n) % n;
    updateDeck();
}

function updateDeck() {
    const n = deckList.length;
    deckCards.forEach((c, i) => {
        let o = (i - deckIndex + n) % n;
        if (o > n / 2) o -= n;
        const far = Math.abs(o) > 2;
        c.style.setProperty('--o', o);
        c.style.setProperty('--abs', Math.min(Math.abs(o), 3));
        c.classList.toggle('is-active', o === 0);
        c.classList.toggle('far', far);
        c.tabIndex = o === 0 ? 0 : -1;
        c.setAttribute('aria-hidden', far ? 'true' : 'false');
    });

    const p = deckList[deckIndex];
    if (p) {
        document.getElementById('d-num').textContent   = pad(deckIndex + 1);
        document.getElementById('d-total').textContent = `/ ${pad(n)}`;
        document.getElementById('d-cat').textContent   = catLabel(p.cat);
        document.getElementById('d-name').textContent  = tr(`piece${p.id}-name`);
    }
    [...dotsEl.children].forEach((d, i) => d.classList.toggle('active', i === deckIndex));
    document.getElementById('d-prev').style.visibility = n > 1 ? '' : 'hidden';
    document.getElementById('d-next').style.visibility = n > 1 ? '' : 'hidden';
}

function renderGallery() {
    if (!worksEl) return;

    const areaList = PROJECTS.filter(p => areaOf(p) === activeArea);
    renderFilters();
    document.getElementById('count-design').textContent = pad(PROJECTS.filter(p => areaOf(p) === 'design').length);
    document.getElementById('count-dev').textContent    = pad(PROJECTS.filter(p => areaOf(p) === 'dev').length);

    const vazio = areaList.length === 0;
    document.getElementById('empty').hidden   = !vazio;
    document.getElementById('deck').hidden    = vazio;
    document.getElementById('toolbar').hidden = vazio;
    document.getElementById('dev-note').hidden = activeArea !== 'dev';

    deckList = areaList.filter(p => activeFilter === 'all' || p.cat === activeFilter);
    if (deckIndex >= deckList.length) deckIndex = 0;

    worksEl.innerHTML = '';
    dotsEl.innerHTML  = '';
    deckCards = [];

    deckList.forEach((p, i) => {
        const name = tr(`piece${p.id}-name`);
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'work';
        card.setAttribute('aria-label', name);
        card.innerHTML = `
            <div class="work-media" style="--pos:${p.pos || 'top'}">
                <img src="${encodeURI(p.images[0])}" alt="${name}" loading="lazy" draggable="false">
            </div>
            <span class="work-num">${pad(i + 1)}</span>
            ${p.fictional || p.real ? `<span class="work-badge">${tr(p.fictional ? 'badge-fictional' : 'badge-real')}</span>` : ''}
            <span class="work-arrow"><i class='bx bx-up-arrow-alt'></i></span>`;
        card.addEventListener('click', () => {
            if (dragged) return;
            if (i === deckIndex) openModal(p.id); else goTo(i);
        });
        worksEl.appendChild(card);
        deckCards.push(card);

        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(dot);
    });

    updateDeck();

    const n = deckList.length;
    countEl.textContent = n === 1 ? tr('count-one') : tr('count-many').replace('{n}', n);
}

function renderFilters() {
    const box = document.getElementById('filters');
    box.innerHTML = '';
    FILTERS[activeArea].forEach(f => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'filter-btn' + (f === activeFilter ? ' active' : '');
        b.textContent = tr('cat-' + f);
        b.addEventListener('click', () => {
            activeFilter = f;
            deckIndex = 0;
            renderGallery();
        });
        box.appendChild(b);
    });
}

// Menu de áreas (Design / Programação)
function setArea(area) {
    activeArea = area;
    activeFilter = 'all';
    deckIndex = 0;
    document.querySelectorAll('.area').forEach(b => {
        const on = b.dataset.area === area;
        b.classList.toggle('active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderGallery();
}

document.querySelectorAll('.area').forEach(b => b.addEventListener('click', () => {
    setArea(b.dataset.area);
    try { history.replaceState(null, '', b.dataset.area === 'dev' ? '#programacao' : '#design'); } catch (x) {}
}));

document.getElementById('d-prev').addEventListener('click', () => goTo(deckIndex - 1));
document.getElementById('d-next').addEventListener('click', () => goTo(deckIndex + 1));
document.getElementById('d-open').addEventListener('click', () => {
    const p = deckList[deckIndex];
    if (p) openModal(p.id);
});

// Arrastar (mouse ou dedo) para trocar de projeto
(function () {
    const deck = document.getElementById('deck');
    let x0 = null;
    deck.addEventListener('pointerdown', e => { x0 = e.clientX; dragged = false; });
    deck.addEventListener('pointerup', e => {
        if (x0 === null) return;
        const dx = e.clientX - x0;
        x0 = null;
        if (Math.abs(dx) > 40) {
            dragged = true;
            goTo(deckIndex + (dx < 0 ? 1 : -1));
            setTimeout(() => { dragged = false; }, 50);
        }
    });
    deck.addEventListener('pointercancel', () => { x0 = null; });
})();

// Setas do teclado quando a janela está fechada
document.addEventListener('keydown', e => {
    if (modal.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  goTo(deckIndex - 1);
    if (e.key === 'ArrowRight') goTo(deckIndex + 1);
});


// =============================================
// MODAL — detalhes do projeto
// =============================================
const modal   = document.getElementById('modal');
const mImg    = document.getElementById('m-img');
const mDots   = document.getElementById('m-dots');
const mCount  = document.getElementById('m-count');
const mMedia  = document.querySelector('.modal-media');

const mPanel    = document.querySelector('.modal-scroll');   // a caixa que rola dentro do painel
const mSections = document.getElementById('m-sections');
const mSet      = document.getElementById('m-set');

// Projetos com seções: viewSet = imagens do card aberto (null = mostrando a lista de seções)
var viewSet      = null;
var viewTitleKey = '';

function currentProject() { return PROJECTS.find(p => p.id === openProject); }
function hasSections(p)   { return !!(p && p.sections && p.sections.length); }
function imagesOf(p)      { return viewSet || p.images; }

function showImage(i) {
    const p = currentProject();
    if (!p) return;
    if (hasSections(p) && !viewSet) return;      // lista de seções na tela, nada a mostrar
    const list = imagesOf(p);
    imgIndex = (i + list.length) % list.length;
    if (typeof updateLightbox === 'function') updateLightbox();

    mImg.classList.add('fade');
    const next = new Image();
    next.onload = () => {
        mImg.src = encodeURI(list[imgIndex]);
        mImg.parentElement.scrollTop = 0;
        mImg.alt = `${tr(`piece${p.id}-name`)} — ${imgIndex + 1}/${list.length}`;
        mImg.classList.remove('fade');
    };
    next.src = encodeURI(list[imgIndex]);

    mCount.textContent = `${imgIndex + 1} / ${list.length}`;
    [...mDots.children].forEach((d, di) => d.classList.toggle('active', di === imgIndex));
}

// Cards das seções (Catálogo, Posts, Cartão...)
function renderSections(p) {
    mSections.innerHTML = '';
    if (!hasSections(p)) return;

    p.sections.forEach(sec => {
        const box = document.createElement('section');
        box.className = 'sec';
        box.innerHTML = `
            <h3 class="sec-title">${tr(`piece${p.id}-sec-${sec.key}`)}</h3>
            <p class="sec-sub">${tr(`piece${p.id}-sec-${sec.key}-sub`)}</p>
            <div class="sec-grid"></div>`;
        const grid = box.querySelector('.sec-grid');

        let offset = 0;   // posição do card dentro do carrossel da seção (modo browse)
        sec.items.forEach(it => {
            const name  = tr(`piece${p.id}-item-${it.key}`);
            const multi = it.images.length > 1;
            const meta  = multi ? tr('unit-' + (it.unit || 'slides')).replace('{n}', it.images.length) : '';
            const start = offset;
            offset += it.images.length;

            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'sec-card';
            card.setAttribute('aria-label', name);
            card.innerHTML = `
                <span class="sec-media${it.fit === 'contain' ? ' contain' : ''}">
                    <img src="${encodeURI(it.images[0])}" alt="" loading="lazy" draggable="false">
                    ${multi ? `<span class="sec-layers"><i class='bx bx-layer'></i></span>` : ''}
                    <span class="sec-go"><i class='bx bx-up-arrow-alt'></i></span>
                </span>
                <span class="sec-name">${name}</span>
                ${meta ? `<span class="sec-meta">${meta}</span>` : ''}`;

            card.addEventListener('click', () => {
                if (sec.browse) {
                    const all = sec.items.flatMap(x => x.images);
                    openSet(all, start, `piece${p.id}-sec-${sec.key}`);
                } else {
                    openSet(it.images, 0, `piece${p.id}-item-${it.key}`);
                }
            });
            grid.appendChild(card);
        });
        mSections.appendChild(box);
    });
}

function openSet(images, start, titleKey) {
    viewSet = images;
    viewTitleKey = titleKey;
    imgIndex = start || 0;
    renderModal();
    mPanel.scrollTop = 0;
    document.getElementById('m-back').focus();
}

function backToSections() {
    closeLightbox();
    viewSet = null;
    imgIndex = 0;
    renderModal();
    mPanel.scrollTop = 0;
    document.getElementById('m-close').focus();
}

function renderModal() {
    const p = currentProject();
    if (!p) return;
    const id = p.id;

    // número do projeto = posição dele dentro da própria área (Design ou Programação), igual ao do card
    const posNaArea = PROJECTS.filter(x => areaOf(x) === areaOf(p)).indexOf(p) + 1;
    document.getElementById('m-tag').textContent  = `${pad(posNaArea)} — ${catLabel(p.cat)}`;
    document.getElementById('m-name').textContent = tr(`piece${id}-name`);
    // A descrição pode ter parágrafos: separe com uma linha em branco (\n\n) no texto
    const descEl = document.getElementById('m-desc');
    descEl.innerHTML = '';
    tr(`piece${id}-desc`).split('\n\n').forEach(t => {
        const par = document.createElement('p');
        par.textContent = t;
        descEl.appendChild(par);
    });
    document.getElementById('m-type').textContent  = tr(`piece${id}-type`);
    document.getElementById('m-tool-label').textContent = tr(areaOf(p) === 'dev' ? 'piece-meta-stack' : 'piece-meta-tool');
    document.getElementById('m-tool').textContent  = tr(`piece${id}-tool`);
    document.getElementById('m-focus').textContent = tr(`piece${id}-focus`);

    const extra = document.getElementById('m-extra');
    extra.innerHTML = '';
    const links = (p.links || (p.link ? [p.link] : [])).filter(l => l.url);   // sem URL, o botão não aparece
    if (links.length) {
        extra.innerHTML = '<div class="m-links">' + links.map(l => l.iconOnly
            ? `<a class="btn btn-icon" href="${l.url}" target="_blank" rel="noopener noreferrer" aria-label="${tr(l.key)}" title="${tr(l.key)}"><i class='bx ${l.icon}'></i></a>`
            : `<a class="btn" href="${l.url}" target="_blank" rel="noopener noreferrer"><i class='bx ${l.icon}'></i><span>${tr(l.key)}</span></a>`).join('') + '</div>';
    } else if (p.status) {
        extra.innerHTML = `<span class="chip-status"><i class='bx ${p.status.icon}'></i><span>${tr(p.status.key)}</span></span>`;
    }
    if (p.fictional || p.real) {
        const noteIcon = p.real ? 'bx-check-circle' : 'bx-info-circle';
        extra.insertAdjacentHTML('afterbegin', `<p class="m-note"><i class='bx ${noteIcon}'></i><span>${tr(`piece${id}-note`)}</span></p>`);
    }

    // Seções: lista de cards ou visualizador de um card
    const sectioned = hasSections(p);
    const inViewer  = !sectioned || !!viewSet;
    mPanel.classList.toggle('has-sections', sectioned);
    mPanel.classList.toggle('in-viewer', inViewer);
    renderSections(p);
    mSet.textContent = viewSet ? tr(viewTitleKey) : '';
    if (!inViewer) return;

    // Pontinhos só quando são poucas imagens (catálogo usa só o contador)
    const list = imagesOf(p);
    mDots.innerHTML = '';
    if (list.length > 1 && list.length <= 8) {
        list.forEach((_, i) => {
            const d = document.createElement('button');
            d.setAttribute('aria-label', `${i + 1}`);
            d.addEventListener('click', () => showImage(i));
            mDots.appendChild(d);
        });
    }
    mMedia.classList.toggle('single', list.length < 2);
    mMedia.classList.toggle('scrolls', !!p.scroll);
    showImage(imgIndex);
}

function openModal(id) {
    openProject = id;
    imgIndex = 0;
    viewSet = null;
    renderModal();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    document.getElementById('m-close').focus();
}

function closeModal() {
    closeLightbox();
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    openProject = null;
    viewSet = null;
}

document.getElementById('m-close').addEventListener('click', closeModal);
document.getElementById('m-back').addEventListener('click', backToSections);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.getElementById('m-prev').addEventListener('click', () => showImage(imgIndex - 1));
document.getElementById('m-next').addEventListener('click', () => showImage(imgIndex + 1));

document.addEventListener('keydown', e => {
    if (!modal.classList.contains('open') || lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') {
        if (hasSections(currentProject()) && viewSet) backToSections(); else closeModal();
    }
    if (e.key === 'ArrowLeft') showImage(imgIndex - 1);
    if (e.key === 'ArrowRight') showImage(imgIndex + 1);
});

// =============================================
// TELA CHEIA — clique na imagem do projeto para ver em tamanho grande
//   - tenta usar a tela cheia de verdade do navegador (Fullscreen API);
//     onde não existir (ex.: iPhone), usa a janela cobrindo a tela toda
//   - clique na imagem: aproxima / afasta (prints de site inteiro já abrem rolando)
//   - setas, teclado (← → Esc) e arrastar para o lado trocam de imagem
// =============================================
const lightbox = document.getElementById('lightbox');
const lbView   = document.getElementById('lb-view');
const lbImg    = document.getElementById('lb-img');
const lbCount  = document.getElementById('lb-count');

function updateLightbox() {
    if (!lightbox.classList.contains('open')) return;
    const p = currentProject();
    if (!p) return;
    const list = imagesOf(p);
    lbImg.src = encodeURI(list[imgIndex]);
    lbImg.alt = `${tr(`piece${p.id}-name`)} — ${imgIndex + 1}/${list.length}`;
    lbCount.textContent = `${imgIndex + 1} / ${list.length}`;
    lbView.classList.toggle('tall', !!p.scroll);
    lbView.classList.remove('zoomed');
    lbView.scrollTop = 0;
    lbView.scrollLeft = 0;
    lightbox.classList.toggle('single', list.length < 2);
}

function openLightbox() {
    if (!currentProject()) return;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    updateLightbox();
    try {
        const req = lightbox.requestFullscreen || lightbox.webkitRequestFullscreen;
        if (req) { const r = req.call(lightbox); if (r && r.catch) r.catch(() => {}); }
    } catch (x) {}
    document.getElementById('lb-close').focus();
}

function closeLightbox() {
    if (!lightbox.classList.contains('open')) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImg.removeAttribute('src');
    try {
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        }
    } catch (x) {}
}

// Esc na tela cheia do navegador: fecha também a janela por cima
function onFsChange() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) closeLightbox();
}
document.addEventListener('fullscreenchange', onFsChange);
document.addEventListener('webkitfullscreenchange', onFsChange);

mImg.addEventListener('click', openLightbox);
document.getElementById('m-expand').addEventListener('click', openLightbox);
document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => showImage(imgIndex - 1));
document.getElementById('lb-next').addEventListener('click', () => showImage(imgIndex + 1));

lbImg.addEventListener('click', () => {
    if (lbView.classList.contains('tall')) return;
    lbView.classList.toggle('zoomed');
    lbView.scrollTop = 0;
    lbView.scrollLeft = 0;
});

// clicar no fundo escuro fecha
lbView.addEventListener('click', e => { if (e.target === lbView) closeLightbox(); });

document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  showImage(imgIndex - 1);
    if (e.key === 'ArrowRight') showImage(imgIndex + 1);
});

(function () {
    let x0 = null, y0 = null;
    lbView.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    lbView.addEventListener('touchend', e => {
        if (x0 === null || lbView.classList.contains('zoomed')) { x0 = null; return; }
        const dx = e.changedTouches[0].clientX - x0;
        const dy = e.changedTouches[0].clientY - y0;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) showImage(imgIndex + (dx < 0 ? 1 : -1));
        x0 = null;
    });
})();


// Gesto de arrastar no celular
(function () {
    let x0 = null;
    const stage = document.querySelector('.stage');
    stage.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', e => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) showImage(imgIndex + (dx < 0 ? 1 : -1));
        x0 = null;
    });
})();


// =============================================
document.getElementById('lang').addEventListener('click', () => setLang(getLang() === 'pt' ? 'en' : 'pt'));

// INÍCIO — aplica o idioma salvo (isso também desenha a galeria)
// =============================================
if (location.hash === '#programacao') activeArea = 'dev';
document.querySelectorAll('.area').forEach(b => {
    const on = b.dataset.area === activeArea;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
});
setLang(getLang());