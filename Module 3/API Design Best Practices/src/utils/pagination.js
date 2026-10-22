const DEFAULT_LIMIT = 2;
const MAX_LIMIT = 10;
const DEFAULT_PAGE = 1;

/** Turn a query value into a positive integer, or fall back to a default. */
function toPositiveInt(value, fallback) {
  const n = Number.parseInt(value, 10);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}

/**
 * Read page/limit from the query string.
 * The client may ask for any limit, but the server caps it at MAX_LIMIT
 * so one request can never pull the whole store.
 */
function parsePagination(query = {}) {
  const page = toPositiveInt(query.page, DEFAULT_PAGE);
  const limit = Math.min(toPositiveInt(query.limit, DEFAULT_LIMIT), MAX_LIMIT);
  return { page, limit };
}

/** Slice one page out of `items` and describe where the client is. */
function paginate(items, { page, limit }) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;

  return {
    data: items.slice(start, start + limit),
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
}

module.exports = {
  DEFAULT_LIMIT,
  MAX_LIMIT,
  parsePagination,
  paginate
};
