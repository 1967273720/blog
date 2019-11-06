$('#addCategory').on('submit',function () {
    var formData = $(this).serialize()
    $.ajax(
        {
            type:'post',
            url:'/categories',
            data:formData,
            success:function () {
                location.reload();
            }

        }
    )
    return false;
})
$.ajax({
    type:'get',
    url:'/categories',
    success:function (response) {
        // console.log(response)
       var html =   template('categoryListTpl',{data:response})

        // console.log(html)
        $('#categoryBox').html(html);
    }
})

//为编辑按钮添加点击事件
$('#categoryBox').on('click','.edit',function () {
        var id =  $(this).attr('data-id');
        $.ajax({
            type:'get',
            url:'/categories/' + id,
            success:function (response) {
                console.log(response);
               var html = template('modifyCategoryTpl',response);
               console.log(html);
                $('#formBox').html(html);
            }
        })
});
//修改
$('#formBox').on('submit','#modifyCategory',function () {
    // alert('id');
    var formData = $(this).serialize();
    var id =$(this).attr('data-id');

    $.ajax({
        type:'put',
        url:'/categories/'+ id,

        data:formData,
        success:function () {
            location.reload();
        }
    })
    return false;
});
// 10132986
$('#categoryBox').on('click','.delete',function () {
    if (confirm('确定要删除吗')){
        var id = $(this).attr('data-id');
        $.ajax({
            type:'delete',
            url:'/categories/'+ id,


            success:function () {
                location.reload();
            }
        })
    }

});