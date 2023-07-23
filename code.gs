const ss = SpreadsheetApp.getActiveSpreadsheet();
const token = 'токен бота';

const getSheetById = (id) => SpreadsheetApp.getActive().getSheets().find(sheet => sheet.getSheetId() === id) || null;
const wsOrder = getSheetById(1141633445)

// відправка в телеграмм після заповнення форми (start)
function sendTelegram() {
  const lastRow = wsOrder.getLastRow();
  const headers = wsOrder.getRange('A1:K1').getValues()[0]
  const data = wsOrder.getRange('A' + lastRow + ':K' + lastRow).getDisplayValues()[0];

  const message = headers.map((header, index) => `${header}: ${data[index]}`).join('\n');
  const chatId = 'ID групового чату'

  const text = `

${message}
`
  console.log(text)

  sendText(chatId, text)
}
// відправка в телеграмм після заповнення форми (end)

function sendText(chatId, text) {
  const data = {
    method: 'sendMessage',
    chat_id: String(chatId),
    text: text,
    parse_mode: 'HTML'
  };
  const options = {
    method: 'post',
    payload: data
  };
  const resp = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', options)
  console.log(resp)
}
