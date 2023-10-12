const initMondayClient = require('monday-sdk-js');

const getColumnValue = async (token, itemId, columnId, boardId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    // const query = `query($itemId: [Int], $columnId: [String]) {
    //     items (ids: $itemId) {
    //       column_values(ids:$columnId) {
    //         value
    //       }
    //     }
    //   }`;

    const query = `query($boardId:[Int], $itemId: [Int], $columnId: [String]) {
      boards (ids:$boardId){
        name
          items (ids:$itemId){
              id
              name
              column_values(ids:$columnId) {
                  id
                  title
                  value
                  additional_info
              }
          }
      }
    }`
    
    const variables = {boardId, itemId, columnId};

    const response = await mondayClient.api(query, { variables });
    var responseData = response.data.boards[0].items[0].column_values[0];
    if(responseData['title'] === "Redirect"){
      console.log(JSON.parse(responseData.additional_info).label)
      return {  
        'columnTitle' : responseData['title'], 
        'columnValue': JSON.parse(responseData.additional_info).label,
        'boardId' : boardId,
        'itemId' : itemId,
        'columnId': columnId
        }
    }
    return None
  } catch (err) {
    console.error(err);
  }
};

const changeColumnValue = async (token, boardId, itemId, columnId, value) => {
  try {
    const mondayClient = initMondayClient({ token });

    const query = `mutation change_column_value($boardId: Int!, $itemId: Int!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
    const variables = { boardId, columnId, itemId, value };

    const response = await mondayClient.api(query, { variables });
    return response;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getColumnValue,
  changeColumnValue,
};
