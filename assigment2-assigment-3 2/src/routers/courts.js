const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const validateCourt = require('../middleware/validateCourt');

const { 
  createCourt, 
  getCourts, 
  getCourtById, 
  updateCourt, 
  deleteCourt 
} = require('../controllers/courtController');

router.post('/', validateCourt, createCourt);
router.get('/', getCourts);
router.get('/:id', validateObjectId, getCourtById);
router.put('/:id', validateObjectId, validateCourt, updateCourt);
router.patch('/:id', validateObjectId, validateCourt, updateCourt);
router.delete('/:id', validateObjectId, deleteCourt);

module.exports = router;

