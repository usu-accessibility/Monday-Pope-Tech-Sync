const mondayService = require('../services/monday-service');
const transformationService = require('../services/transformation-service');
const {  } = require('../constants/transformation');
const axios = require('axios');

let monday_api_key = process.env.MONDAY_API_KEY;

async function executeAction(req, res) {

  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    console.log("inputFields");
    console.log(inputFields);
    const { boardId, itemId, sourceColumnId, targetColumnId } = inputFields;
    console.log("boardId");
    console.log(boardId, itemId, sourceColumnId, targetColumnId);

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
    console.log(err);
    return res.status(200).send({});
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
    console.log(err);
    return res.status(200).send({});
  }
}

async function executeAllActionPoptech(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
    console.log("inputFields");
    console.log(inputFields);
    const { boardId, itemId} = inputFields;
    console.log("boardId");
    console.log(boardId, itemId);


    let getBoardDataQuery = `
        query {
            boards(ids:${boardId}) {
                name
                items_page {
                    cursor
                    items {
                        id
                        name
                        column_values {
                            id
                            column {
                                id
                                title
                            }
                            value
                        }
                    }
                }
            }
        }
    `;

    let url = "https://api.monday.com/v2";
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${monday_api_key}`
    };

    let data = {
        'query': getBoardDataQuery
    };

    let response = await axios.post(url, data, { headers });
    response = response.data;

    // Accumulate all items into a list
    var all_items = response['data']['boards'][0]['items_page']['items'];
    let cursor = response['data']['boards'][0]['items_page']['cursor'];

    // Continue paginating until there are no more items
    while (cursor) {
        let query = `
            query {
                next_items_page(limit:500, cursor:"${cursor}") {
                    cursor
                    items {
                        id
                        name
                        column_values {
                            id
                            column {
                                id
                                title
                            }
                            value
                        }
                    }
                }
            }
        `;

        data = { 'query': query };
        response = await axios.post(url, data, { headers });
        response = response.data;

        // Append items to the list
        all_items = all_items.concat(response["data"]["next_items_page"]["items"]);
        cursor = response["data"]["next_items_page"]['cursor'];
        console.log(all_items.length);
    }

    let dataOnBoard = all_items;
    let index = dataOnBoard.findIndex(row => row['id'] === String(itemId));
    console.log(index)
    let end_index = Math.min(index + 500, dataOnBoard.length);
    console.log(index, end_index)

    for (let idx = index; idx < end_index; idx++) {
      console.log(all_items[idx]['id'])
      try {
        await axios.post('http://applications.accessapps.link:3014/main', {'event' : {'pulseId' : all_items[idx]['id']}})
      }
      catch(err){
        console.log(err);
      }
      // axios.post('http://applications.accessapps.link:3014/main', {
      //   'event' : {'pulseId' : all_items[idx]['id']},
      // })
      // .then((response) => {
      //   // console.log(response);
      // }, (error) => {
      //   // console.log(error);
      // });
    }

    return res.status(200).send({});
  } catch (err) {
    console.log(err);
    return res.status(200).send({});
  }
}

async function getRemoteListOptions(req, res) {
  try {
    return res.status(200).send(TRANSFORMATION_TYPES);
  } catch (err) {
    console.log(err);
    return res.status(200).send({});
  }
}

module.exports = {
  executeAction,
  getRemoteListOptions,
  executeActionPoptech,
  executeAllActionPoptech
};
