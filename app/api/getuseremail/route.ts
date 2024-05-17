import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs";
import prisma from '@/lib/prisma';

export async function POST() {
  let updatedUsers = [];

  try {
    // Obtém a lista de todos os usuários
    const userList = await clerkClient.users.getUserList({ limit: 4 });

    // Itera sobre cada usuário na lista
    for (const user of userList) {
      const userId = user.id;
      const userEmail = user.emailAddresses[0].emailAddress;

      // Verifica se o usuário já existe no banco de dados
      const existingUser = await prisma.user.findFirst({
        where: { userId: userId }
      });

      // Atualiza ou cria um novo registro de usuário
      if (existingUser) {
        await prisma.user.update({
          where: { userId: userId },
          data: { email: userEmail }
        });
      } else {
        await prisma.user.create({
          data: {
            userId: userId,
            email: userEmail
          }
        });
      }

      // Adiciona o e-mail do usuário à lista de usuários atualizados
    //   updatedUsers.push(userEmail);
    }
  } catch (error) {
    console.error('Erro ao atualizar usuários:', error);
  }

  // Retorna a lista de e-mails dos usuários atualizados
  return new NextResponse(null, { status: 200 });
}
