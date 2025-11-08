import Rating from "../models/Rating.js";

export const addRating = async (req, res) => {
  try {
    const { stars, comment = "", clientId } = req.body || {};
    const n = Number(stars);
    if (!Number.isFinite(n) || n < 1 || n > 5) {
      return res.status(400).json({ message: "stars must be between 1 and 5" });
    }
    let doc;
    if (clientId) {
      doc = await Rating.findOneAndUpdate(
        { clientId },
        { $set: { stars: n, comment, clientId } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } else {
      doc = await Rating.create({ stars: n, comment });
    }
    return res.status(201).json({ id: doc._id, stars: doc.stars, comment: doc.comment, createdAt: doc.createdAt });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const getSummary = async (_req, res) => {
  try {
    const agg = await Rating.aggregate([
      { $match: { clientId: { $exists: true, $ne: null } } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$clientId", stars: { $first: "$stars" } } },
      { $group: { _id: null, avg: { $avg: "$stars" }, count: { $sum: 1 } } }
    ]);
    const { avg = 0, count = 0 } = agg[0] || {};
    return res.json({ average: Number(avg.toFixed(2)), count });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const getRecent = async (req, res) => {
  try {
    const limit = Math.max(1, Math.min(20, Number(req.query.limit) || 5));
    const docs = await Rating.aggregate([
      { $match: { clientId: { $exists: true, $ne: null } } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$clientId", doc: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$doc" } },
      { $project: { _id: 1, stars: 1, comment: 1, createdAt: 1 } },
      { $sort: { createdAt: -1 } },
      { $limit: limit }
    ]);
    return res.json(docs.map(d => ({ id: d._id, stars: d.stars, comment: d.comment || "", createdAt: d.createdAt })));
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
