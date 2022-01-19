import createTable from './createTable';

const API_PARAMS = {
  'apiKey': 'AIzaSyAUAfvITHm6rfXD5hYwsGA-AYjc2onrm1g',
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
};

const SHEET_PARAMS = {
  spreadsheetId: '17ukuvzzSSEdUEwq9nnO4FuGQnkFyEUmCG5625hNQn0Y',
  range: 'Sheet1'
};

function loadScript(path, callback) {
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = path;
  script.onload = () => callback(script);
  document.head.append(script);
}

function fetchSheetsData() {
  Promise.resolve()
    .then(() => loadScript('https://apis.google.com/js/api.js', (script) => {
      gapi.load('client', () => {
        gapi.client.init(API_PARAMS).then(() => {
          return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS);
        }).then(response => {
          return createTable(response);
        }).catch(err => console.error(`Error in gapi JS, ${err}`,err))
      })
    }))
  
}

export default fetchSheetsData;