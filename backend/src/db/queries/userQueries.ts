import {eq, ilike, and, or} from "drizzle-orm";

import { db } from "../../config/connectDB";
import { Users } from "../schemas/User";
import { NewUsers } from "../schemas/User"; // inferred type
import { UpdateUserDTO } from "../dto/userDTO";

// Query to insert new user to the database
export async function insertUser(data: NewUsers) {
  return await db.insert(Users)
                  .values(data)
                  .returning();
}

// Query to get all users in a cooperative only not all users in a system
export async function getUsers(cooperativeId: string) {
  return await db.select()
                  .from(Users)
                  .where(eq(Users.cooperativeId, cooperativeId));
}

// Query to fetch user by its ID
export async function getUserById(userId: string, cooperativeId: string) {
  const result = await db.select()
                          .from(Users)
                          .where(
                            and(
                              eq(Users.userId, userId),
                              eq(Users.cooperativeId, cooperativeId)
                            )
                          );
  return result[0]; 
}

// Query to fetch user by search keywords
export async function getUserBySearch(cooperativeId: string, query: string) {
  // Return empty array if no query found
  if (!query) return [];

  // Format search term to sql like value
  const searchTerm = `%${query}%`;
  return await db.select()
                  .from(Users)
                  .where(
                    and(
                      eq(Users.cooperativeId, cooperativeId),
                      or(
                        ilike(Users.firstName, searchTerm),
                        ilike(Users.lastName, searchTerm),
                        ilike(Users.email, searchTerm)
                      )
                    )
                  );
}

// Query to fetch user by their status
export async function getUserByStatus(status: string, cooperativeId: string) {
  return await db.select()
                  .from(Users)
                  .where(
                    and(
                      eq(Users.cooperativeId, cooperativeId),
                      eq(Users.status, status)
                    )
                  );
}

// Query to fetch user by their role
export async function getUserByRole(role: string, cooperativeId: string) {
  return await db.select()
                  .from(Users)
                  .where(
                    and(
                      eq(Users.cooperativeId, cooperativeId),
                      eq(Users.role, role)
                    )
                  )
}

// Query to update data of selected user
export async function updateUser(
  user: UpdateUserDTO, 
  userId: string, 
  cooperativeId: string
) {
  return await db.update(Users)
                  .set(user)
                  .where(
                    and(
                      eq(Users.userId, userId),
                      eq(Users.cooperativeId, cooperativeId)
                    )
                  )
                  .returning()
}

// Query to delete user by its ID
export async function deleteUser(userId: string, cooperativeId: string) {
  return await db.delete(Users)
                  .where(
                    and(
                      eq(Users.userId, userId),
                      eq(Users.cooperativeId, cooperativeId)
                    )
                  )
}