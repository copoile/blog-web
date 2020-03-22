function renderTip(template, context) {
  var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g
  return template.replace(tokenReg, function (word, slash1, token, slash2) {
    if (slash1 || slash2) {
      return word.replace('\\', '')
    }
    var variables = token.replace(/\s/g, '').split('.')
    var currentObject = context
    var i, length, variable
    for (i = 0, length = variables.length; i < length; ++i) {
      variable = variables[i]
      currentObject = currentObject[variable]
      if (currentObject === undefined || currentObject === null) return ''
    }
    return currentObject;
  })
}

String.prototype.renderTip = function (context) {
  return renderTip(this, context)
}


function initTips() {
  $.ajax({
    cache: true,
    url: 'live2d-message.json',
    dataType: "json",
    success: function (result) {
      $.each(result.mouseover, function (index, tips) {
        $(tips.selector).mouseover(function () {
          var text = tips.text
          if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1]
          text = text.renderTip({ text: $(this).text() })
          showMessage(text, 5000)
        })
      })
      $.each(result.click, function (index, tips) {
        $(tips.selector).click(function () {
          var text = tips.text
          if (Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1]
          text = text.renderTip({ text: $(this).text() })
          showMessage(text, 5000)
        })
      })
    }
  })
}

setTimeout(function () {
  var text = '欢迎使用个人悦读分享！'
  showMessage(text, 7000)
}, 1000)

initTips()

// 时间消息提醒
function showDateTip() {
  var text;
  var now = (new Date()).getHours()
  if (now > 23 || now <= 5) {
    text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？'
  } else if (now > 5 && now <= 7) {
    text = '早上好！一日之计在于晨，美好的一天就要开始了！'
  } else if (now > 7 && now <= 11) {
    text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！'
  } else if (now > 11 && now <= 14) {
    text = '中午了，工作了一个上午，现在是午餐时间！'
  } else if (now > 14 && now <= 17) {
    text = '午后很容易犯困呢，今天的运动目标完成了吗？'
  } else if (now > 17 && now <= 19) {
    text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~'
  } else if (now > 19 && now <= 21) {
    text = '晚上好，今天过得怎么样？'
  } else if (now > 21 && now <= 23) {
    text = '已经这么晚了呀，早点休息吧，晚安~~'
  } else {
    text = '嗨~ 快来逗我玩吧！'
  }
  showMessage(text, 5000)
}
// 每两小时
window.setInterval(showDateTip, 7200000)
// 每20秒
window.setInterval(showHitokoto, 20000)

function showHitokoto() {
  $.getJSON('https://v1.hitokoto.cn/', function (result) {
    showMessage(result.hitokoto, 5000)
  });
}
// 显示消息
function showMessage(text, timeout) {
  if (Array.isArray(text)) {
    text = text[Math.floor(Math.random() * text.length + 1) - 1]
  }
  if (text.length <= 45) {
    var msg = $('.live2d-msg')
    var messageBox = $('.message-box')
    messageBox.stop();
    msg.html(text).fadeTo(200, 1)
    if (timeout === null) timeout = 5000
    hideMessage(timeout)
  }
}
// 隐藏消息
function hideMessage(timeout) {
  var messageBox = $('.message-box')
  messageBox.stop().css('opacity', 1)
  if (timeout === null) timeout = 5000
  messageBox.delay(timeout).fadeTo(200, 0)
}
