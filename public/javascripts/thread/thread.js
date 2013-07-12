;(function() {

$(function() {

    var delete_res = function(evt) {
        if (!checkLoginStatus()) return;

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
                var res_num_elem = $("#thread .thread_res span");
                var res_num = +(res_num_elem.text());
                res_num_elem.text((--res_num) + '');

                holder.fadeOut("slow");
            })
            .fail(function() {alert("failed");});
        } else {
            alert("他人の投稿は消せません");
        }
    }
    $(".resList_each .res_sub_del").on("click", delete_res);


    var change_fav = function(evt) {
        if (!checkLoginStatus()) return;

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
    }
    $(".resList_each .img_favorite").on("click", change_fav);

    var create_res = function(evt) {
        evt.preventDefault();
        if (!checkLoginStatus()) return;

        $.ajax({
            type : 'POST',
            url  : '/thread/create_res_ajax',
            data : {
                thread_id : $("#thread_id").val(),
                body : $("#resContent").val()
            }
        })
        .done(function(data) {
            var res_num_elem = $("#thread .thread_res span");
            var res_num = +(res_num_elem.text());
            res_num_elem.text((++res_num) + '');

            var res = data.response[0];
            var newRes = $('<li class="resList_each res" data-id="' + res.res_id  + '" data-favorite="false" data-self="true"><p class="res_main">' + res.body + '</p><ul class="res_sub clearfix"><li class="res_sub_name">' + res.name + '</li><li class="res_sub_time">' + res['DATE_FORMAT(res.created, "%Y-%m-%d %k:%i:%s")'] + '</li><li class="res_sub_favorite_num">0</li><li class="res_sub_favorite"><img class="img_favorite" src="/images/8_heart_stroke.png"></li><li class="res_sub_del"><img class="img_del" src="/images/7_batsu.png"></li></ul></li>');

            newRes.find(".img_favorite").on("click", change_fav);
            newRes.find(".res_sub_del").on("click", delete_res);
            newRes.hide();
            $("#resList").append(newRes);
            newRes.fadeIn("slow");
        })
        .fail(function() {alert("failed");});
    };
    $("#createRes").on("click", create_res);

    function checkLoginStatus() {
        var loginStatus = $("#loginStatus").val();
        if (loginStatus === "false") {
            alert("ログインが必要です");
            return false;
        } else {
            return true;
        };
    }
});

})()
