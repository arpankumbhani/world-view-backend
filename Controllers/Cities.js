const { json } = require("express");
const Cities = require("../Models/Cities");
require("dotenv").config();

exports.addCities = async (req, res) => {
  try {
    const { cityName, country, emoji, date, notes, lat, lng } = req.body;

    if (!cityName || !country || !emoji || !date || !notes || !lat || !lng) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const CitiesList = await Cities.create({
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: lat, lng: lng },
    });

    return res.status(200).json({
      success: true,
      message: "City added successfully",
      data: CitiesList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCities = async (req, res) => {
  try {
    const cities = await Cities.find();

    if (!cities || cities.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No cities found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cities retrieved successfully",
      data: cities,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCityById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "City ID is required",
      });
    }

    const city = await Cities.findById(id);

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "City retrieved successfully",
      data: city,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCityById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "City ID is required",
      });
    }

    const city = await Cities.findByIdAndDelete(id); // Delete the city by its ID

    if (!city) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "City deleted successfully",
      data: city, // Returning the deleted city data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
