$(function () {
    //获取所有的items
    var items = $('.carousel-inner  .item')
    //监听屏幕大小的改变
    $(window).on('resize',function () {
        //    获取当前屏幕的宽度
        var width = $(window).width();
        // 判断屏幕的宽度
        if(width >= 768){
        //为每一个item添加子元素
            $(items).each(function (index , value) {
                var item = $(this)
            // 添加非移动端的子元素
                item.html('<a href="javascript:;" class="mobileImg hidden-lg hidden-md hidden-sm">\n' +
                    '                <img src="" alt="...">\n' +
                    '            </a>')
            })
        }
        
    })
})