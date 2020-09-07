import { IEXCloudApi } from "./iex-api"

const ui = SpreadsheetApp.getUi()
const IEX_KEY = 'iex-cloud-api-key'

function onOpen() {
    ui.createMenu('Finance')
        .addItem('Get Stock Data', 'getStockData')
        .addItem('Update IEX Cloud API Key', 'updateApiKey')
        .addToUi()
}

function updateApiKey() {
    var scriptProps = PropertiesService.getScriptProperties()

    var userResp = ui
        .prompt(
            'Update IEX Cloud API Key',
            'Current key: ' + scriptProps.getProperty(IEX_KEY) + '\nPlease enter a new IEX Cloud API Key:',
            ui.ButtonSet.OK_CANCEL)

    // Process the user's response.
    var button = userResp.getSelectedButton()
    var text = userResp.getResponseText()
    if (button == ui.Button.OK && text && text.trim().length > 0) {
        scriptProps.setProperty(IEX_KEY, text.trim())
        ui.alert('API Key successfully updated to: ' + text.trim())
    }
}

function getStockData() {
    const stockSheet = SpreadsheetApp.getActive().getActiveSheet()
    const iexApi = new IEXCloudApi(PropertiesService.getScriptProperties().getProperty(IEX_KEY))

    const currentRow = stockSheet.getActiveRange().getRow()
    var activeRow = stockSheet.getRange(currentRow, 1, 1, stockSheet.getMaxColumns()).getValues()[0]
    var stockSymbol:string = activeRow[0]
    console.log('clicked on get stock data for', stockSymbol)
    const stockQuote = iexApi.getStockQuote(stockSymbol)
    console.log('stock quoteeee', stockQuote.peRatio)

    SpreadsheetApp.getActiveSpreadsheet().getRange(`B${currentRow}`).setValue(stockQuote.peRatio)
}