const propertyModel = require("../Models/propertyModel");


exports.createProperty = async (req, res) => {
  try {
    req.body.ownerId = req.user.id;

    let imageArray = [];

    if (req.files && req.files.length > 0) {
      imageArray = req.files.map((file) => ({
        url: `uploads/${file.filename}`,
      }));
    }

    const property = await propertyModel.create({
      ...req.body,
      images: imageArray,
    });

    res.status(201).json({
      status: true,
      data: {
        id: property._id,
        ...property._doc,
      },
    });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { id } = req.body;

    const updated = await propertyModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ status: false, msg: "Property not found" });
    }

    res.status(200).json({
      status: true,
      data: {
        id: updated._id,
        ...updated._doc,
      },
    });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { id } = req.body;

    const deleted = await propertyModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ status: false, msg: "Property not found" });
    }

    res.status(200).json({
      status: true,
      msg: "Property deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.message });
  }
};

exports.deleteMultipleProperties = async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    await propertyModel.deleteMany({
      _id: { $in: ids },
    });

    res.status(200).json({
      status: true,
      msg: "Properties deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await propertyModel.find().sort({ createdAt: -1 });

    const formatted = properties.map((item) => ({
      id: item._id,
      ...item._doc,
    }));

    res.status(200).json({
      status: true,
      data: formatted,
    });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await propertyModel.findById(id);

    if (!property) {
      return res.status(404).json({ status: false, msg: "Property not found" });
    }

    res.status(200).json({
      status: true,
      data: {
        id: property._id,
        ...property._doc,
      },
    });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.message });
  }
};

exports.getMyProperties = async (req, res) => {
  try {
    const userId = req.user.id;

    const properties = await propertyModel.find({ ownerId: userId });

    const formatted = properties.map((item) => ({
      id: item._id,
      ...item._doc,
    }));

    res.status(200).json({
      status: true,
      data: formatted,
    });
  } catch (err) {
    res.status(400).json({ status: false, msg: err.message });
  }
};