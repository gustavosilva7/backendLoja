import {PrismaClient, usuarios} from "@prisma/client";
const prisma=new PrismaClient();
 
export async function findAll(): Promise<usuarios [] | null>{
    return await prisma.usuarios.findMany();
}
export async function create(usuario: usuarios): Promise<usuarios|null>{
    return await prisma.usuarios.create({data:usuario});
}