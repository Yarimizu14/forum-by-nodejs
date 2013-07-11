;(function() {

$(function() {

    $(".resList_each > .resList_del").on("click", function(evt) {
        var $this = $(this);
        var self  = $this.parent().attr("data-self");
        var $this = $(this);

        if (self === "true") {
            $.ajax({
                type : 'DELETE',
                url  : '/thread/delete_res_ajax',
                data : {
                    res_id : $this.parent().data("id")
                }
            })
            .done(function(data) {
                $this.parent().hide();
                console.log(data);
            })
            .fail(function() {alert("failed");});
        } else {
            alert("他人の投稿は消せません");
        }
    });

    $(".resList_each > .resList_favorite").on("click", function(evt) {
        var $this = $(this);
        var fav   = $this.parent().attr("data-favorite");
        var options = {};

        if (fav === "false") {
            options = {
                type : 'POST',
                url  : '/thread/create_favorite_ajax',
                data : {
                    thread_id : $("#thread_id").attr("value"),
                    res_id    : $this.parent().data("id")
                }
            }
            $.ajax(options)
            .done(function(data) {
                $this.parent().attr("data-favorite", true);
                var num_elem = $this.parent().find(".resList_favoriteNum");
                var num = +(num_elem.text());
                num_elem.text((++num).toString());
            })
            .fail(function() {
                alert("failed");
            });

        } else {
            options = {
                type : 'DELETE',
                url  : '/thread/delete_favorite_ajax',
                data : {
                    thread_id : $("#thread_id").attr("value"),
                    res_id    : $this.parent().data("id")
                }
            }
            $.ajax(options)
            .done(function(data) {
                $this.parent().attr("data-favorite", false);
                var num_elem = $this.parent().find(".resList_favoriteNum");
                var num = +(num_elem.text());
                num_elem.text((--num).toString());
            })
            .fail(function() {
                alert("failed");
            });
        };
    });


});

})()
