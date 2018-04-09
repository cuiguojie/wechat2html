$(function(){
  var $selectedImage;
  var $articleContainer = $('.article');
  var $codeContainer = $('#code');
  var $tipsContainer = $('.tips');

  var asyncHTML = function(domString) {
    $codeContainer.val(domString);
    $articleContainer.html(domString);

    updateWaitingReplaceImageCount();
    $tipsContainer.show();
  };

  var updateWaitingReplaceImageCount = function () {
    var count = $articleContainer.find('img[src^="https://mmbiz.qpic.cn/"]').length;
    $tipsContainer.find('span').text(count);
  };

  var showDialog = function () {
    $('body').css({
      'overflow': 'hidden'
    });
    $('.dialog').find('input[type="text"]').val('');
    $('.dialog, .overlay').show();
  };

  var hideDialog = function () {
    $('body').css({
      'overflow': 'auto'
    });
    $('.dialog, .overlay').hide();
  };

  // Tab 组件
  $('.tabs-nav').find('li').click(function(){
    var index = $('.tabs-nav li').index($(this));
    var $tabsContent = $('.tabs-content.hide');

    if ($(this).hasClass('selected')) {
      return;
    }

    $(this).addClass('selected');
    $(this).siblings().removeClass('selected');

    $tabsContent.removeClass('hide');
    $tabsContent.siblings('.tabs-content').addClass('hide');
  });

  // 抓取微信文章HTML代码
  $('#opt form').submit(function() {
    var api = $('#opt').find('input[type="text"]').val();

    $.ajax({
      url: '/api/',
      type: 'POST',
      dataType: 'json',
      data: {
        url: api,
      },
    })
    .done(function(res) {
      if ($('.wrapper').hasClass('hasContent') === false) {
        $('.wrapper').addClass('hasContent');
      }

      asyncHTML(res.html);
      $('.tab').show();
    })
    .fail(function() {
      console.log("error");
    });

    return false;
  });


  $('.article').on('click', 'img', function() {
    $selectedImage = $(this);

    showDialog();
  })

  $('.dialog').find('input[type="submit"]').click(function(){
    var newurl = $('.dialog').find('input[type="text"]').val();

    var image = new Image();

    image.onload = function () {
      $selectedImage.attr('src', newurl);

      updateWaitingReplaceImageCount();

      $codeContainer.val($articleContainer.html());

      hideDialog();
    };

    image.src = newurl;

    return false;
  })

  $('.dialog').find('.remove').click(function(){
    $selectedImage.remove();

    updateWaitingReplaceImageCount();
    $codeContainer.val($articleContainer.html());

    hideDialog();

    return false;
  })

  $('.dialog').find('.close').click(function() {
    hideDialog();
  });
})

