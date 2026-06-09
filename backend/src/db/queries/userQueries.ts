import {eq, ilike, or} from "drizzle-orm";

import { db } from "../../config/connectDB";
import { Users } from "../schemas/User";
import { NewUsers } from "../schemas/User"; // inferred type

// Query to insert new user to the database
export async function insertUser(data: NewUsers) {
  return await db.insert(Users).values(data).returning();
}

// Query to get all users
export async function getUsers() {
  return await db.select().from(Users)
}

// Query to fetch user by its ID
export async function getUserById(userId: string) {
  return await db.select().from(Users).where(eq(Users.userId, userId))
}

// Query to fetch user by search keywords
export async function getUserBySearch(query: string) {
  // Return empty array if no query found
  if (!query) return [];

  // Format search term to sql like value
  const searchTerm = `%${query}%`;
  return await db.select().
                  from(Users).
                  where(
                    or(
                      ilike(Users.firstName, searchTerm),
                      ilike(Users.lastName, searchTerm),
                      ilike(Users.email, searchTerm)
                    )
                  );
}

// Query to fetch user by their status
export async function getUserByStatus(status: string) {
  return await db.select().from(Users).where(eq(Users.status, status))
}

// Query to fetch user by their role
export async function getUserByRole(role: string) {
  return await db.select().from(Users).where(eq(Users.role, role))
}

// Query to update data of selected user
export async function updateUser(data: NewUsers, userId: string) {
  return await db.update(Users)
                  .set(data)
                  .where(eq(Users.userId, userId))
                  .returning()
}

// Query to delete user by its ID
export async function deleteUser(userId: string) {
  return await db.delete(Users)
                  .where(eq(Users.userId, userId));
}