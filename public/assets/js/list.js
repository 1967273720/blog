var categoryId = getUrlParams('categoryId');
$.ajax({
    type:'get',
    url:'/posts/category/' + categoryId,
    success:function (response) {
        console.log(response)
       var html =  template('listTpl',{data:response});
        $('#listBox').html(html)
    }
});

//根据id获取文章分类
$.ajax({
    type:'get',
    url:'/categories/' + categoryId,
    success:function (response) {
        $('#categoryTitle').html(response.title)
    }
});