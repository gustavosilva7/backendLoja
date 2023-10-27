import { PrismaClient, usuarios } from "@prisma/client";
const prisma = new PrismaClient();

export async function findAll(): Promise<usuarios[] | null> {
    return await prisma.usuarios.findMany({
        orderBy: {
            id: "asc"
        },
        skip: 1,
        take: 2,
    });
}

export async function findAllPaginated(pageSize: number = 5, pageNumber: number = 1): Promise<usuarios[] | null> {
    return await prisma.usuarios.findMany({
        orderBy: {
            id: "asc"
        },
        skip: (pageSize*(pageNumber-1)),
        take: pageSize,
    });
}

export async function create(usuario: usuarios): Promise<usuarios | null> {
    return await prisma.usuarios.create({ data: usuario });
}