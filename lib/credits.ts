import prisma from "./prisma";

export const decreaseCredit = async (userId: string) => {
    await prisma.user.update({
        where: {
            userId: userId,
        },
        data: {
            credits: {
                decrement: 1,
            },
        },
    });
}

export const checkCredit = async (userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            userId: userId,
        },
    });
    if(user)
    return user?.credits;
}