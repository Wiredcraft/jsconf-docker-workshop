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
      success: (res) => {
        $('#count').text(res.count)
      }
    })
  })
})