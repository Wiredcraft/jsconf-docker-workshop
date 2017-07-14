$(document).ready(() => {
  $.ajax({
    url: '/people/count',
    success: (res) => {
      $('#count').text(res.count)
    }
  })

  $('#button').on('click', () => {
    $.ajax({
      url: '/people/count',
      method: 'POST',
      dataType: 'json',
      data: { name: 'oliver' },
      success: (res) => {
        $('#count').text(res.count)
      }
    })
  })
})