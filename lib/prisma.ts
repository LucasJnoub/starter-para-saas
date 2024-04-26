// import { PrismaClient } from '@prisma/client';

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient({
//     datasources: {
//       db: {
//         url: process.env.DATABASE_URL,
//         // Defina o tamanho da pool de conexões
//         // Consulte a documentação do Prisma para obter mais informações sobre estas opções: https://www.prisma.io/docs/concepts/components/prisma-client/pooling#configuring-the-pool
//         config: {
//           max: 20,
//           min: 2,
//           idleTimeoutMillis: 10000,
//           connectionTimeoutMillis: 10000,
//         },
//       },
//     },
//   });
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient({
//       datasources: {
//         db: {
//           url: process.env.DATABASE_URL,
//         },
//       },
//     });
//   }
//   prisma = global.prisma;
// }

// export default prisma;
