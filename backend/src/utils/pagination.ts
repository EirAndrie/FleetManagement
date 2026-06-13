/**
 * Pagination function
 * 
 * @param page - Defines the current page of the web
 * @param limit - Defines the limit of data to be rendered on the current page (e.g. 10, 12, 20...)
 * @returns - Offset and limit values
 */

export async function Pagination(
  page: number,
  limit: number
) {
  if (page < 1) {
    throw new Error("Page must be greater than 0");
  }

  if (limit < 1 || limit > 100) {
    throw new Error(
      "Limit must be between 1 and 100"
    );
  }

  return {
    offset: (page - 1) * limit,
    limit,
  };
}