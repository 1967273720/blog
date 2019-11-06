$('#logo').on('change',function () {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('logo',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function (response) {
            console.log(response)
            $('#hiddenLogo').val(response[0].logo)
            $('#preview').attr('src',response[0].logo)
        }
    })
})

// $('#settingsForm').on('submit',function () {
//     var formData = $(this).serialize();
//     $.ajax({
//         type:'post',
//         url:'/settings',
//         data:formData,
//         success:function () {
//             location.reload();
//         }
//     })
//     return false;
// })
$('#settingsForm').on('submit', function () {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // alert(1);
    // console.log(formData);
    // 向服务器端发送请求 实现网站设置数据添加功能
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function () {
            location.reload();
        }
    })
    // 阻止表单默认提交行为
    return false;
});
$.ajax({
    type:'get',
    url:'/settings',
    success:function (response) {
        if(response){
            $('#hiddenLogo').val(response.logo);
            $('#preview').attr('src',response.logo);
            $('input[name="title"]').val(response.title);
            $('input[name="comment"]').prop('checked',response.comment);
            $('input[name="review"]').prop('checked',response.review)
        }
        
    }
})