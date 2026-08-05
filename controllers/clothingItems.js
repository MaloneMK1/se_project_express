const ClothingItem = require("../models/clothingItem");
const { FORBIDDEN, NOT_FOUND, handleError } = require("../utils/errors");

const getItems = (req, res) =>
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => handleError(res, err));

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  return ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => handleError(res, err));
};

const deleteItem = (req, res) =>
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(FORBIDDEN)
          .send({ message: "You cannot delete another user's item" });
      }
      return item.deleteOne().then(() => res.send(item));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      return handleError(res, err);
    });

const updateLikes = (req, res, update) =>
  ClothingItem.findByIdAndUpdate(req.params.itemId, update, { new: true })
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      return handleError(res, err);
    });

const likeItem = (req, res) =>
  updateLikes(req, res, { $addToSet: { likes: req.user._id } });

const dislikeItem = (req, res) =>
  updateLikes(req, res, { $pull: { likes: req.user._id } });

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
