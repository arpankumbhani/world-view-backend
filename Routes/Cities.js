const express = require("express");
const router = express.Router();

const {
  addCities,
  getAllCities,
  getCityById,
  deleteCityById,
} = require("../Controllers/Cities");

const { verifyToken } = require("../middleware/authmiddleware");

//define API router
router.post("/addCities", verifyToken, addCities);
router.get("/getAllCities", verifyToken, getAllCities);
router.post("/getCityById/:id", verifyToken, getCityById);
router.delete("/deleteCityById/:id", verifyToken, deleteCityById);

module.exports = router;
