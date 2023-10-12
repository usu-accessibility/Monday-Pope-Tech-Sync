const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller');

router.post('/monday/execute_action', authenticationMiddleware, mondayController.executeAction);
router.post('/monday/get_remote_list_options', authenticationMiddleware, mondayController.getRemoteListOptions);
router.post('/monday/execute_action_poptech', authenticationMiddleware, mondayController.executeActionPoptech);

module.exports = router;