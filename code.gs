const getJSONData = () => {
  
  const URL = 'https://jsonplaceholder.typicode.com/users'

  const response = UrlFetchApp.fetch(URL).getContentText()
  const data = JSON.parse(response)

  const users = data.map((user) => {
    return [
      user['id'], 
      user['name'], 
      user['username'], 
      user['email'], 
      user['address']['city'], 
      user['phone'], 
      user['website'], 
      user['company']['name']
    ]
  })

  const headers = Object.keys(data[0]).map(header => header.toUpperCase())
  
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sh = ss.getSheetByName('Results')

  sh.getRange(1, 1, 1, headers.length).setValues([headers])
  sh.getRange(2, 1, users.length, users[0].length).setValues(users)
}