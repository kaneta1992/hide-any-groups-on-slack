document.body.appendChild(function() {
  var code = function() {
    var hideGroupNames = ["G0GAEGA3C"];

    // 通知系をフックして特定のグループは何もしない
    var growlImMessage = TS.ui.growls.growlImMessage
    var growlChannelOrGroupMessage = TS.ui.growls.growlChannelOrGroupMessage
    TS.ui.growls.growlChannelOrGroupMessage = function(t, i, n, a) {
      if (hideGroupNames.indexOf(t.id) == 0) {
        // nop
        console.log("test");
        return;
      }
      growlChannelOrGroupMessage(t, i, n, a);
    }
    TS.ui.growls.growlImMessage = function(t, i, n, a) {
      if (hideGroupNames.indexOf(t.id) == 0) {
        // nop
        console.log("test");
        return;
      }
      growlImMessage(t, i, n, a);
    }

    var hideGroupDOM = function(target) {
      // 消したい要素が親だったり親の親だったりするので最大で3世代まで遡ってclass属性の有無で判定
      for (var i = 0; i < 3; i++) {
        target = target.parent();
        if (!target.attr("class")) {
          // target.remove();
          target.css("display", "none");
          return;
        }
      }
    }

    // 苦肉の策で1分DOMを変更し続ける
    var timer = setInterval(function() {
      console.log("hide");
      hideGroupNames.forEach(function(group) {
        var targetDOM = $("a[href = '/messages/" + group + "']");
        hideGroupDOM(targetDOM);
      })

      // Direct Messages 無効
      var direct_messages_button = $("button[aria-label = 'Open a direct message']");
      direct_messages_button.replaceWith(function() {
          return $("<div>", {
                      "class": $(this).attr('class'),
                      html: $(this).html(),
                  });
      });
    }, 500);
    setTimeout(function() {
      clearInterval(timer);
    }, 60000);
  };

  var script = document.createElement("script");
  script.type = "text/javascript";
  script.text = "(" + code.toString() + ")()";
  return script;
}());
