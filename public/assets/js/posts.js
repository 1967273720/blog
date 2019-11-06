$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        // console.log(response)
        var html = template('postsTpl', {data: response});
        // console.log(html);
        $('#postsBox').html(html);
        var page = template('pageTpl', response);
        $('#page').html(page);
    }
});

//处理日期格式的方法
function formataDate(date) {
    //字符串转对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

//翻页方法
function changePage (page){
    $.ajax({
        type: 'get',
        url: '/posts',
        data:{
            page:page
        },
        success: function (response) {
            // console.log(response)
            var html = template('postsTpl', {data: response});
            // console.log(html);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
}

//分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function (response) {
       var html =  template('categoryTpl',{data:response});
       $('#categoryBox').html(html);
    }
});

$("#filterForm").on('submit',function () {
   var formData = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data:formData,
        success: function (response) {
            // console.log(response)
            var html = template('postsTpl', {data: response});
            // console.log(html);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
    return false;
})
$('#postsBox').on('click','.delete',function () {
   if(confirm('确定删除吗')){
       var id = $(this).attr('data-id');
       $.ajax({
           type:'delete',
           url:'/posts/' + id,
           success:function () {
               location.reload();
               
           }
       })
   }
});

