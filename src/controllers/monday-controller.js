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
    const mondayData = await mondayService.getColumnValue(shortLivedToken, itemId, sourceColumnId, boardId);
    console.log("mondayData");
    console.log(mondayData);
    if (mondayData) {
      axios.post('https://ix67rnfag5.execute-api.us-east-1.amazonaws.com/default/', {
        update_board:mondayData,
      })
      .then((response) => {
        // console.log(response);
      }, (error) => {
        // console.log(error);
      });

      return res.status(200).send({});
    }
    // const transformedText = transformationService.transformText(
    //   text,
    //   transformationType ? transformationType.value : 'TO_UPPER_CASE'
    // );

    // await mondayService.changeColumnValue(shortLivedToken, boardId, itemId, targetColumnId, transformedText);

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
    // const mondayData = await mondayService.getColumnValue(shortLivedToken, itemId, sourceColumnId, boardId);
    // console.log("mondayData");
    // console.log(mondayData);
      axios.post('https://r6i15ludv6.execute-api.us-east-1.amazonaws.com/prod/run', {
        'event' : {'pulseId' : itemId},
      })
      .then((response) => {
        // console.log(response);
      }, (error) => {
        // console.log(error);
      });

      return res.status(200).send({});
    // const transformedText = transformationService.transformText(
    //   text,
    //   transformationType ? transformationType.value : 'TO_UPPER_CASE'
    // );

    // await mondayService.changeColumnValue(shortLivedToken, boardId, itemId, targetColumnId, transformedText);

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
