$.ajax({
    url:'/categories',
    type:'get',
    success:function (response) {
        // console.log(response)
    var html = template('categoryTpl',{data:response});
    // console.log(html);
    $('#category').html(html);
    }
});
//选择文件时
$('#feature').on('change',function () {
    var file = this.files[0];
    // console.log(file);
    //创建formData对象，实线二进制图片上传
    var formData = new FormData();
    //把图片追加到formData对象中
    formData.append('cover',file);

   // 上传
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        //让 ajax不转换formData格式（表格数据会转换成 a=b格式）
        processData:false,
        //不要ajax设置参数类型（formData里已设置）
        contentType:false,
        success:function (response) {
            $('#thumbnail').val(response[0].cover);
        }
    })
});
//添加文章
$('#addForm').on('submit',function () {
   var formData = $(this).serialize();
   $.ajax({
       url:'/posts',
       type:'post',
       data:formData,
       success:function () {
           location.href = '/admin/posts.html'
       }
   })
    return false;
})
//10132990
var id = getUrlParams('id');
//修改文章
if (id != -1){
    $.ajax({
        type:'get',
        url:'/posts/' + id,
        success:function (response) {

            $.ajax({
                url:'/categories',
                type:'get',
                success:function (categories) {
                 response.categories = categories;
                 console.log(response);
                    var html =template('modifyTpl',response);
                    console.log(html);
                    $('#parentBox').html(html);
                }
            });
        }

    })
}
//从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
   var paramsAry = location.search.substr(1).split('&');
   for (var i = 0;i < paramsAry.length;i++) {
       var tmp = paramsAry[i].split('=');
       if (tmp[0]==name){
           return tmp[1];
       }
   }
   return -1;
}

$('#parentBox').on('submit','#modifyForm',function () {
    var formData = $(this).serialize();
var id = $(this).attr('data-id');
$.ajax({
    type:'put',
    url:'/posts/' + id,
    data:formData,
    success:function () {
        location.href = '/admin/posts.html';
    }
})
    return false;
});
