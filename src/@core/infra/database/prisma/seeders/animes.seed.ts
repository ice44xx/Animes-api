// seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAnimes() {
  const animesToCreate = [
    {
      name: 'Jujutsu no kaisen',
      synopsis:
        'Sofrimento, arrependimento, vergonha: os sentimentos negativos dos humanos tornam-se Maldições...',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133090/Thumbnails/jujutsu_aboouc_ehronz.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/jujutsu_bjtr4u.webp',
      feature: true,
      categoryNames: ['terror', 'aventura'],
      type: 'series',
      classificationName: 'seinen',
    },
    {
      name: 'Konosuba',
      synopsis:
        'Após um acidente de trânsito, a breve e desapontadora vida de Kazuma Sato deveria ter acabado...',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133090/Thumbnails/KonoSuba_erzgrt_ubbfcj.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/kono_fzph0b.webp',
      feature: true,
      categoryNames: ['fantasia', 'comédia'],
      type: 'series',
      classificationName: 'shounen',
    },
    {
      name: 'Dr.STONE',
      synopsis:
        'Milhares de anos após um misterioso fenômeno transformar a humanidade inteira em pedra...',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133089/Thumbnails/Dr._Stone_c5ljk4_rgc0yc.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/drstone_bhm1xs.webp',
      feature: true,
      categoryNames: ['sci-fi', 'drama'],
      type: 'series',
      classificationName: 'shounen',
    },
    {
      name: 'Chainsaw Man',
      synopsis:
        'Denji é um adolescente que mora com Pochita, o Demônio da Motosserra. Por conta das dívidas...',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690133090/Thumbnails/Chainsaw_man_tndear_md6klt.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/chainsaw_ngu1qd.webp',
      feature: true,
      categoryNames: ['ação', 'terror'],
      type: 'series',
      classificationName: 'shounen',
    },
    {
      name: 'SPY x FAMILY',
      synopsis: 'Há décadas, as nações de Ostania e Westalis promovem uma guerra fria sem fim...',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132962/Thumbnails/SpyxFamily_udjb16_r2h2io.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387481/Thumbnails/backgrounds/spy_m9luro.webp',
      feature: true,
      categoryNames: ['comédia', 'drama'],
      type: 'series',
      classificationName: 'shounen',
    },
    {
      name: 'Oshi No Ko',
      synopsis:
        'Um médico e seu paciente recém-falecido renascem como gêmeos de um famoso ídolo musical japonês...',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132960/Thumbnails/Oshi_No_Ko_tkcp3i_bvnbri.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/oshi_xfgqgh.webp',
      feature: true,
      categoryNames: ['drama', 'aventura'],
      type: 'series',
      classificationName: 'shounen',
    },
    {
      name: 'Overlord',
      synopsis: 'Quando um MMORPG bastante popular anuncia que será desligado permanentemente...',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132961/Thumbnails/Overlord_3_Temporada_faj9qm_fy4ksy.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/overlord_qxe9jz.webp',
      feature: true,
      categoryNames: ['ação', 'fantasia'],
      type: 'series',
      classificationName: 'shounen',
    },
    {
      name: 'Boku No Hero',
      synopsis:
        'Por toda a sua vida, Izuku sonhou ser um heroi — um objetivo ambicioso para qualquer um...',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132960/Thumbnails/My_Hero_a_ct9h64_dbxlf6.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/boku_jdq1u2.webp',
      feature: true,
      categoryNames: ['ação', 'fantasia'],
      type: 'series',
      classificationName: 'shounen',
    },
    {
      name: 'Mashle',
      synopsis:
        'Em um mundo onde todos são capazes de usar magia, há uma floresta densa e escura...',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132959/Thumbnails/Mashle_illcy6_l2ladk.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/mashle_tvpc17.webp',
      feature: true,
      categoryNames: ['ação', 'fantasia'],
      type: 'series',
      classificationName: 'shounen',
    },
    {
      name: 'Kaguya-Sama: LOVE IS WAR',
      synopsis:
        'Veio de boa família? Sim! Tem uma personalidade promissora? Sim! todos os jovens de elite...',
      thumbnailUrl:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1690132957/Thumbnails/Kaguya-sama_zipp7i_cpl30v.webp',
      background:
        'https://res.cloudinary.com/doupbxhfd/image/upload/v1704387480/Thumbnails/backgrounds/kaguya_i0y0sr.webp',
      feature: true,
      categoryNames: ['comédia', 'romance'],
      type: 'movies',
      classificationName: 'seinen',
    },
  ];

  for (const animeData of animesToCreate) {
    const existingAnime = await prisma.animes.findMany({
      where: {
        name: animeData.name,
      },
    });

    if (existingAnime.length === 0) {
      const categories = animeData.categoryNames.map((categoryName) => ({
        where: { name: categoryName },
        create: { name: categoryName },
      }));

      try {
        await prisma.animes.create({
          data: {
            name: animeData.name,
            synopsis: animeData.synopsis,
            thumbnailUrl: animeData.thumbnailUrl,
            background: animeData.background,
            feature: animeData.feature,
            types: {
              connect: {
                name: animeData.type,
              },
            },
            classifications: {
              connect: {
                name: animeData.classificationName,
              },
            },
            categories: {
              connectOrCreate: categories,
            },
          },
        });
      } catch (error) {}
    }
  }
}

createAnimes()
  .then(() => {
    console.log('Animes gerados com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao gerar os animes:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
