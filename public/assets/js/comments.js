//10133006 未找到评论数据库数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        var html = template('commentsTpl', response);
        // console.log(response);
        // console.log(html);
        $('#commentsBox').html(html);
        var pageHTML = template('pageTpl', response);
        $('#pageBox').html(pageHTML);
    }
});

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function (response) {
            var html = template('commentsTpl', response);
            // console.log(response);
            // console.log(html);
            $('#commentsBox').html(html);
            var pageHTML = template('pageTpl', response);
            $('#pageBox').html(pageHTML);
        }
    });
}

//审批 驳回功能
$('#commentsBox').on('click', '.status', function () {
    var status = $(this).attr('data-status');
    var id = $(this).attr('data-id');

    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function () {
            location.reload()
        }
    })
});
//删除功能
$('#commentsBox').on('click', '.delete', function () {
    if (confirm('确定要删除吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function () {
                location.reload()
            }
        })
    }
});

// // 手动增加评论
// function coMents () {
// $.ajax({
//         type:'post',
//         url:'/comments',
//         data: { content: "整挺好", post: "5daea891e85ce7118c3dc5e7" ,state:"1"},
//         success:function (response) {
//
//             console.log(response);
//
//         }
//     });
// }
// for (var num =1; num<=10; num++) {
//     coMents();
//     console.log('gao');
//
// }
