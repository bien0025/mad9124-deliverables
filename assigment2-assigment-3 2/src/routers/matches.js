const { Router } = require('express');
const matchController = require('../controllers/matches');
const validateObjectId = require('../middleware/validateObjectId');
const validateMatch = require('../middleware/validateMatch');  

const router = Router();

router.post('/', validateMatch, matchController.createOne);
router.get('/', matchController.getAll);
router.get('/:id', validateObjectId, matchController.getOne);
router.put('/:id', validateObjectId, validateMatch, matchController.replaceOne);
router.patch('/:id', validateObjectId, validateMatch, matchController.updateOne);
router.delete('/:id', validateObjectId, matchController.deleteOne);

module.exports = router;
