;(function() {

$(function() {

    $(".resList_each .res_sub_del").on("click", function(evt) {
        var $this  = $(this);
        var holder = $this.closest(".resList_each");
        var self   = holder.attr("data-self");

        if (self === "true") {
            $.ajax({
                type : 'DELETE',
                url  : '/thread/delete_res_ajax',
                data : {
                    res_id : holder.data("id")
                }
            })
            .done(function(data) {
                holder.fadeOut("slow");
                console.log(data);
            })
            .fail(function() {alert("failed");});
        } else {
            alert("他人の投稿は消せません");
        }
    });

    $(".resList_each .img_favorite").on("click", function(evt) {
        var $this  = $(this);
        var holder = $this.closest(".resList_each");
        var fav    = holder.attr("data-favorite");
        var options = {
                data : {
                    thread_id : $("#thread_id").attr("value"),
                    res_id    : holder.data("id")
                }
        };

        if (fav === "false") {
            $.extend(options, {
                type : 'POST',
                url  : '/thread/create_favorite_ajax',
            });
            $.ajax(options)
            .done(function(data) {
                holder.attr("data-favorite", true);
                $this.attr("src", "/images/9_heart_fill.png");
                var num_elem = holder.find(".res_sub_favorite_num");
                var num = +(num_elem.text());
                num_elem.text((++num) + '');
            })
            .fail(function() {
                alert("failed");
            });

        } else {
            $.extend(options, {
                type : 'DELETE',
                url  : '/thread/delete_favorite_ajax',
            });
            $.ajax(options)
            .done(function(data) {
                holder.attr("data-favorite", false);
                $this.attr("src", "/images/8_heart_stroke.png");
                var num_elem = holder.find(".res_sub_favorite_num");
                var num = +(num_elem.text());
                num_elem.text((--num) + '');
            })
            .fail(function() {
                alert("failed");
            });
        };
    });

});

})()
