const Court = require('../models/court');

exports.createCourt = async (req, res) => {
  try {
    const court = new Court(req.body);
    await court.save();
    res.status(201).json({ data: court });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCourts = async (req, res) => {
  const courts = await Court.find();
  res.status(200).json({ data: courts });
};

exports.getCourtById = async (req, res) => {
  const court = await Court.findById(req.params.id);
  if (!court) return res.status(404).json({ error: 'Court not found' });
  res.status(200).json({ data: court });
};

exports.updateCourt = async (req, res) => {
  const court = await Court.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ data: court });
};

exports.deleteCourt = async (req, res) => {
  await Court.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
