const mondayService = require('../services/monday-service');
const transformationService = require('../services/transformation-service');
const {  } = require('../constants/transformation');
const axios = require('axios');

async function executeAction(req, res) {

  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    console.log("inputFields");
    console.log(inputFields);
    const { boardId, itemId, sourceColumnId, targetColumnId } = inputFields;
    console.log("boardId");
    console.log(boardId, itemId, sourceColumnId, targetColumnId,);

      axios.post('http://applications.accessapps.link:3012/main', {
        update_board:inputFields,
      })
      .then((response) => {
        // console.log(response);
      }, (error) => {
        // console.log(error);
      });

      return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

async function executeActionPoptech(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    console.log("inputFields");
    console.log(inputFields);
    const { boardId, itemId} = inputFields;
    console.log("boardId");
    console.log(boardId, itemId);

      axios.post('http://applications.accessapps.link:3014/main', {
        'event' : {'pulseId' : itemId},
      })
      .then((response) => {
        // console.log(response);
      }, (error) => {
        // console.log(error);
      });

      return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

async function getRemoteListOptions(req, res) {
  try {
    return res.status(200).send(TRANSFORMATION_TYPES);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

module.exports = {
  executeAction,
  getRemoteListOptions,
  executeActionPoptech
};
