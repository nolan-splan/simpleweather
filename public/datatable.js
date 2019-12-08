
$.ajax({
  url: '/weatherdata',
  type: 'GET',
  success: (json) => onSuccess(json),
  fail: () => console.log('failed fetching json'),
  error: (e) => console.log(e),
})

function onSuccess(json) {
  const timestamps = Object.keys(json)
  let headers = Object.keys(json[Object.keys(json)[0]])

  console.log(headers)
  renderTableHeader(headers)
  renderTableBody(Object.values(json))
}

function renderTableHeader(headers) {
  var table = $(`<table>
    <thead class='table-head'></thead>
    <tbody class='table-body'></tbody>
  </table>`)
  $('.answer-div').after(table)
  headers.forEach((header) => {
    let th = $(`<th>
      ${header}
    </th>`)
    $('.table-head').append(th)
  })
}

function renderTableBody(data) {
  console.log(data)
  data.forEach((entry) => {
    console.log(entry)
    let tr = $('<tr></tr>')
    $('.table-body').append(tr)
    Object.keys(entry).forEach((key) => {
      console.log(key, entry[key])
      let td = $(`<td>${entry[key]}</td>`)
      $('.table-body').find('tr').last().append(td)
    })
  })
}