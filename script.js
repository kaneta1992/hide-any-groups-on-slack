document.body.appendChild(function() {
  var code = function() {
    var removeGroupNames = ["G0GAEGA3C"];

    // 通知系をフックして特定のグループは何もしない
    var growlImMessage = TS.ui.growls.growlImMessage
    var growlChannelOrGroupMessage = TS.ui.growls.growlChannelOrGroupMessage
    TS.ui.growls.growlChannelOrGroupMessage = function(t, i, n, a) {
      if (removeGroupNames.indexOf(t.id) == 0) {
        // nop
        console.log("test");
        return;
      }
      growlChannelOrGroupMessage(t, i, n, a);
    }
    TS.ui.growls.growlImMessage = function(t, i, n, a) {
      if (removeGroupNames.indexOf(t.id) == 0) {
        // nop
        console.log("test");
        return;
      }
      growlImMessage(t, i, n, a);
    }

    var removeGroupDOM = function(target) {
      // 消したい要素が親だったり親の親だったりするので最大で3世代まで遡ってrole属性の有無で判定
      for (var i = 0; i < 3; i++) {
        target = target.parent();
        if (!target.attr("role")) {
          target.remove();
          return;
        }
      }
    }

    // 苦肉の策で1分DOMを変更し続ける
    var timer = setInterval(function() {
      console.log("remove");
      removeGroupNames.forEach(function(group) {
        var targetDOM = $("a[href = '/messages/" + group + "']");
        removeGroupDOM(targetDOM);
      })

      // Direct Messages 無効
      $("button[aria-label = 'Open a direct message']").prop("disabled", true);
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
