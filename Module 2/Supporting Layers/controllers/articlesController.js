const service = require('./../services/articlesService');

// Plain async handlers — errors are forwarded by utils/asyncHandler in the routes.

exports.list = async (req, res) => {
  const articles = await service.getAll();
  res.json({ data: articles });
};

exports.create = async (req, res) => {
  const article = await service.create(req.body);
  res.status(201).json({ data: article });
};

exports.update = async (req, res) => {
  const article = await service.update(Number(req.params.id), req.body);
  res.json({ data: article });
};