import { PrismaClient, produtos } from "@prisma/client";
const prisma = new PrismaClient();

export async function findAll(): Promise<produtos[] | null>{
    return await prisma.produtos.findMany({
        orderBy:{
            id: "asc"
        }
    })
}
export async function findIndex(id: number): Promise<produtos | null>{
    return await prisma.produtos.findUnique({
        where:{
            id: id
        }
    })
}

export async function create(produto: produtos): Promise<produtos | null> {
    return await prisma.produtos.create({ data: produto });
}