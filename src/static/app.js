$(document).ready(() => {
  $.ajax({
    url: '/people/count',
    success: (res) => {
      $('#count').text(res.count)
    }
  })

  $('#button').on('click', () => {
    var name = $('#nameInput').val()
    $.ajax({
      url: '/people/count',
      method: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ name: name }),
      success: (res) => {
        $('#count').text(res.count)
      }
    }).fail((err) => {
      alert(err.status + ' ' + err.statusText)
    })
  })
})
