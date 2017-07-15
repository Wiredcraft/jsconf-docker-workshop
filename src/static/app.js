$(document).ready(() => {
  $.ajax({
    url: '/people/count',
    success: (res) => {
      $('#count').text(res.count)
    }
  })

  $('#button').on('click', () => {
    const name = $('#nameInput').val()
    $.ajax({
      url: '/people/count',
      method: 'POST',
      dataType: 'json',
      data: { name },
      success: (res) => {
        $('#count').text(res.count)
      }
    })
  })
})
