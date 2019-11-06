$('#logout').on('click', function () {
    var isConfirm = confirm('您真的要退出吗?');
    if (isConfirm) {
      // alert('用户点击了确认按钮')
      $.ajax({
        type: 'post',
        url: '/logout',
        success: function () {
          location.href = 'login.html';
        },
        error: function () {
          alert('退出失败')
        }
      })
    }
  });
function formataDate(date) {
    //字符串转对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}