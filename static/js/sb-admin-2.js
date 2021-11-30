(function($) {
"use strict"; // Start of use strict

// Toggle the side navigation
$("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
  $("body").toggleClass("sidebar-toggled");
  $(".sidebar").toggleClass("toggled");
  if ($(".sidebar").hasClass("toggled")) {
    $('.sidebar .collapse').collapse('hide');
  };
});

// Close any open menu accordions when window is resized below 768px
$(window).resize(function() {
  if ($(window).width() < 768) {
    $('.sidebar .collapse').collapse('hide');
  };

  // Toggle the side navigation when window is resized below 480px
  if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
    $("body").addClass("sidebar-toggled");
    $(".sidebar").addClass("toggled");
    $('.sidebar .collapse').collapse('hide');
  };
});

// Prevent the content wrapper from scrolling when the fixed side navigation hovered over
$('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
  if ($(window).width() > 768) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  }
});

// Scroll to top button appear
$(document).on('scroll', function() {
  var scrollDistance = $(this).scrollTop();
  if (scrollDistance > 100) {
    $('.scroll-to-top').fadeIn();
  } else {
    $('.scroll-to-top').fadeOut();
  }
});

// Smooth scrolling using jQuery easing
$(document).on('click', 'a.scroll-to-top', function(e) {
  var $anchor = $(this);
  $('html, body').stop().animate({
    scrollTop: ($($anchor.attr('href')).offset().top)
  }, 1000, 'easeInOutExpo');
  e.preventDefault();
});

$(document).ready(function() {
    $.ajax({ // 처음 웹페이지 로딩시 표시하기 위해
        type: 'GET',
        dataType: 'text',
        url: '/index/time1',
        cache : false,
        success: function (result) {
            document.getElementById("timetest1").innerText = result;
        }
    })
    setInterval(function () {
        $.ajax({
            type: 'GET',
            dataType: 'text',
            url: '/index/time1',
            cache : false,
            success: function (result) {
                document.getElementById("timetest1").innerText = result;
            }
        })
    }, 1000);
});

$(document).ready(function() {
  var frames

  $.ajax({ // video 출력 
      context: document.body,
      type: 'POST',
      dataType : 'json',
      url: '/index/video_feed',
      success: function (result) {
        frames = result;
      }
  })
  //여기부터 
  function buildVideo(selector) {
    // $(selector).empty(); // video initiate
    console.log(frames) //정상 출력 확인
    // console.log(frames['0'])
    
    // var imageUrl = "data:image/png;base64," + Base64.encode(frames[0][0]);
    var imageUrl = "data:image/png;base64," + frames;
    console.log('img: '+imageUrl);
    if (document.getElementById("frame") == null)
      console.log("img tag is null")
    document.getElementById("frame").src =imageUrl;
    $("frame").attr('src', imageUrl);
  }
  
  setInterval(function () {
    $.ajax({
      type: 'POST',
      dataType : 'json',
      url: '/index/video_feed',
      cache: false,
      success: function (result) {
        frames = result;
        buildVideo(document.getElementById('streaming'));
      }
    })
  }, 50);
});


$(document).ready(function() {
    $.ajax({ // 처음 웹페이지 로딩시 표시하기 위해
        type: 'GET',
        dataType: 'text',
        url: '/index/time2',
        cache : false,
        success: function (result) {
            document.getElementById("timetest2").innerText = result;
        }
    })
    setInterval(function () {
        $.ajax({
            type: 'GET',
            dataType: 'text',
            url: '/index/time2',
            cache : false,
            success: function (result) {
                document.getElementById("timetest2").innerText = result;
            }
        })
    }, 1000);
});


$(document).ready(function () {
  var myList;
  $.ajax({ // 처음 웹페이지 로딩시 표시하기 위해
    type: 'GET',
    dataType: 'text',
    url: '/index/table',
    cache: false,
    success: function (result) {
      myList = result;
    }
  })

  // Builds the HTML Table out of myList.
  function buildHtmlTable(selector) {
    $(selector).empty(); // table initiate
    var jsonData = JSON.parse(myList) //string to JSON parsing
    var jsonDataRows = Object.keys(jsonData)
    var jsonDataKeys = Object.keys(jsonData[jsonDataRows[0]])
    addAllColumnHeaders(jsonDataKeys, selector);

    // console.log(jsonDataRows, jsonDataKeys)


    for (var i = 0; i < jsonDataRows.length; i++) { // total number of json data (rows)
      var row$ = $('<tr/>');
      $.each(jsonData[jsonDataRows[i]], function (key, value) { // add rows 
        // console.log('키 : ' + key + ', 값 :' + value);
        var cellValue = value
        if (cellValue == null) cellValue = "";
        row$.append($('<td/>').html(cellValue));
      });
      $(selector).append(row$);
    }
  }

  // Adds a header row to the table and returns the set of columns.
  // Need to do union of keys from all records as some records may not contain
  // all records.
  function addAllColumnHeaders(collist, selector) {
    var row$ = $('<thead>');
    $.each(collist, function (index, key) {
      var cellValue = key;
      row$.append($('<td/>').html(cellValue));
    })
    row$.append($('<tr/><thead/>'));
    $(selector).append(row$);
  }
  setInterval(function () {
    $.ajax({
      type: 'GET',
      dataType: 'text',
      url: '/index/table',
      cache: false,
      success: function (result) {
        myList = result;
      }
    })
  }, 1000);
  setInterval(function () {
    buildHtmlTable(document.getElementById('dataTable'));
  }, 1000);
});

})(jQuery); // End of use strict