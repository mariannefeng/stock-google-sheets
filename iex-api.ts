export class IEXCloudApi {
    apiKey: string
    static readonly BaseUrl = "https://cloud.iexapis.com/v1/"
    static readonly ERROR_RESP = {
        containsErr: true
    }

    constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    //returns stock quote data based on ticker
    getStockQuote(symbol: string) {
        var options = {
            'muteHttpExceptions': true,
        }

        var quoteUrl = IEXCloudApi.BaseUrl 
            + `stock/${symbol}/quote`
            + '?token=' + this.apiKey

        var quoteResp: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(quoteUrl, options)
        var resp = quoteResp.getContentText()
        if (quoteResp.getResponseCode() != 200) {
            return IEXCloudApi.ERROR_RESP
        }

        return JSON.parse(resp)
    }

    getCompanyProfile(symbol: string) {

    }

}