/**
 * One response contract for the whole API.
 *
 * Success:  { "data": <resource or array>, "meta": { ... } }   (meta only on lists)
 * Error:    { "error": { "code": "NOT_FOUND", "message": "Post not found" } }
 */

function sendData(res, status, data) {
  return res.status(status).json({ data });
}

function sendList(res, data, meta) {
  return res.status(200).json({ data, meta });
}

function sendError(res, status, code, message) {
  return res.status(status).json({ error: { code, message } });
}

module.exports = {
  sendData,
  sendList,
  sendError
};
