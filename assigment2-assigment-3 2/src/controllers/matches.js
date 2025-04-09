const Match = require('../models/match');
const validKeys = ['court', 'player1', 'player2', 'winner', 'sets'];

exports.createOne = async (req, res) => {
  try {
    const { court, player1, player2, winner, sets, date } = req.body;

    const newMatch = new Match({
      court,
      player1,
      player2,
      winner,
      sets,
      date
    });

    await newMatch.save();
    res.status(201).json(newMatch);

  } catch (error) {
    res.status(500).json({ message: 'Error creating match', error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const matches = await Match.find().populate('court'); 
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching matches', error });
  }
};

exports.getOne = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    
    if (!match) return res.status(404).send('Match not found'); 

    res.json(match);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving match', error });
  }
};


exports.replaceOne = async (req, res) => {
  try {
    const matchId = req.params.id;

    const match = await Match.findById(matchId);  
    if (!match) return res.status(404).send('Match not found'); 

    const updatedMatch = await Match.findByIdAndUpdate(matchId, req.body, { new: true });
    res.json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: 'Error replacing match', error });
  }
};



exports.updateOne = async (req, res) => {
  try {
    const matchId = req.params.id;
    const updates = req.body;

    const filteredUpdates = Object.keys(updates)
      .filter(key => validKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});

    if (Object.keys(filteredUpdates).length === 0) {
      return res.status(404).json({ message: 'No valid fields to update' });
    }

    if (!match) return res.status(404).send('Match not found');  

    const updatedMatch = await Match.findByIdAndUpdate(matchId, req.body, { new: true });
    res.json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: 'Error updating match', error });
  }
};


exports.deleteOne = async (req, res) => {
  try {
    const matchId = req.params.id;

    const match = await Match.findById(matchId);
    if (!match) return res.status(404).send('Match not found'); 

    await Match.findByIdAndDelete(matchId);
    res.status(200).send();  
  } catch (error) {
    res.status(404).json({ message: 'Error deleting match', error });
  }
};

