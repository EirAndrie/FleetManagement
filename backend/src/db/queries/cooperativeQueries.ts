import { eq } from "drizzle-orm";

import { db } from "../../config/connectDB";
import { Cooperatives } from "../schemas/Cooperative";
import { NewCooperative } from "../schemas/Cooperative";
import { UpdateCooperativeDTO } from "../dto/cooperativeDTO";

export async function insertCooperative(
    cooperative: NewCooperative
) {
    return await db.insert(Cooperatives)
                    .values(cooperative)
                    .returning();
}

export async function getCooperativeById(
    cooperativeId: string
) {
    return await db.select()
                    .from(Cooperatives)
                    .where(eq(Cooperatives.cooperativeId, cooperativeId));
}

export async function updateCooperative(
    cooperativeId: string,
    data: UpdateCooperativeDTO
) {
    return await db.update(Cooperatives)
                    .set(data)
                    .where(eq(Cooperatives.cooperativeId, cooperativeId))
                    .returning();
}

export async function deleteCooperative(
    cooperativeId: string
) {
    return await db.delete(Cooperatives)
                    .where(eq(Cooperatives.cooperativeId, cooperativeId));
}
