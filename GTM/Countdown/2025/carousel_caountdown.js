<script>
  // Add CSS dynamically to the document
  var css = [
    '#count-bnr-inner {',
    '  position: relative;',
    '  overflow: hidden;',
    '  width: 100%;',
    '  background-color: black;',
    '  color: white;',
    '}',
    '#count-bnr-inner .carousel-item {',
    '  display: none;',
    '  padding: 10px;',
    '  text-align: center;',
    '  opacity: 0;',
    '  transition: opacity 0.5s ease-in-out;',
    '}',
    '#count-bnr-inner .carousel-item.active {',
    '  display: block;',
    '  opacity: 1;',
    '}',
    '.carousel-control-prev,',
    '.carousel-control-next {',
    '  position: absolute;',
    '  top: 50%;',
    '  transform: translateY(-50%);',
    '  font-size: 30px;',
    '  color: white;',
    '  cursor: pointer;',
    '  z-index: 10;',
    '}',
    '.carousel-control-prev {',
    '  left: 10px;',
    '}',
    '.carousel-control-next {',
    '  right: 10px;',
    '}',
    '#count-bnr-inner a {',
    '  color: white;',
    '  font-weight: bold;',
    '}',
    '.countdown {',
    '  display: flex;',
    '  justify-content: center;',
    '  margin-top: 10px;',
    '}',
    '.countdown .dash {',
    '  display: inline-block;',
    '  margin: 0 10px;',
    '}',
    '.countdown .digit {',
    '  font-size: 36px;',
    '  font-weight: bold;',
    '  color: white;',
    '}',
    '.time-label {',
    '  font-size: 14px;',
    '  color: white;',
    '}'
  ].join(' ');

  // Creating the <style> element and appending it to <head>
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;  // For older IE versions
  } else {
    style.appendChild(document.createTextNode(css));  // For modern browsers
  }
  document.head.appendChild(style);

  // Banner logic for carousel and countdown
  fdFncs.countBnr = function () {
    var endDateLong = '01/01/1900',
        winURL = window.location.href.toLowerCase(),
        showCountdown = false,
        isRecognized = getCookie('fdRecognized') !== undefined ? true : false,
        countHTML = '',
        countBnrMsg = '',
        bnrLnkClasses = 'size-12 text-center weight-normal color-white',
        countBnr = function () {
          // Example messages for carousel
          var messages = [
            {
              msg: '<a href="/sale" class="color-white weight-bold">Up to 50% off frames + 65% off lenses</a>',
              date: '250313'
            },
            {
              msg: '<a href="/email/presidents-dp" class="color-white weight-bold">Up to 30% off frames + 65% off lenses ends 02/18</a>',
              date: '250213'
            },
            {
              msg: '<a href="/email/valentine-day-dp" class="color-white weight-bold">20% off frames + up to 65% off lenses</a>',
              date: '250203'
            }
          ];

          // Get the current message based on the date or condition
          var currentMsg = null;
          for (var i = 0; i < messages.length; i++) {
            if (checkDate >= messages[i].date) {
              currentMsg = messages[i];
              break;
            }
          }

          if (currentMsg) {
            countBnrMsg = '<div class="' + bnrLnkClasses + '">' + currentMsg.msg + '</div>';
            showCountdown = true;
            endDateLong = '03/12/2025'; // Example end date for countdown
          }

          // Carousel HTML structure
          var carouselHTML = '<div id="count-bnr-inner" style="height: 150px;" class="background-black d-flex justify-content-center align-items-center">';
          carouselHTML += '<div class="carousel-item active">' + countBnrMsg + '</div>';
          carouselHTML += '<div class="carousel-item">' + countBnrMsg + '</div>';
          carouselHTML += '<div class="carousel-item">' + countBnrMsg + '</div>';
          carouselHTML += '<span class="carousel-control-prev">&#10094;</span>';
          carouselHTML += '<span class="carousel-control-next">&#10095;</span>';
          carouselHTML += '</div>';
          return carouselHTML;
        };

    // Show the banner with carousel if conditions are met
    if (showBanner) {
      $('#count-bnr-inner').remove();
      if ($('#countdown').length === 0 && $(window).width() > 1300) {
        $(countBnr()).insertBefore('#header');
        $('body').addClass('changeSticky');
      } else {
        $(countBnr()).prependTo('#header-in');
      }

      $('#count-bnr-inner').on('click', function () {
        var $this = $(this);
        if ($this.find('a').length === 1) {
          var linkLoc = $this.find('a').attr('href');
          window.location.href = linkLoc;
        }
      });

      // Countdown logic
      if (showCountdown) {
        countHTML = '<div id="countdown" class="countdown"></div>';
        $('#count-bnr-inner').append(countHTML);
        $('#countdown').countdown(endDateLong, function (event) {
          var $this = $(this),
              totalHours = event.offset.totalDays * 24 + event.offset.hours;
          $this.html('<div class="dash hours_dash"> <div class="countdown-digit-wrapper"> <div class="digit">' + totalHours + '</div> <div class="time-label">hours</div> </div> </div>'
            + '<div class="dash minutes_dash"> <div class="countdown-digit-wrapper"> <div class="digit">%M</div> <div class="time-label">min</div> </div>'
            + '</div><div class="dash seconds_dash"> <div class="countdown-digit-wrapper"> <div class="digit">%S</div> <div class="time-label">sec</div> </div></div>');
        });
      }

      // Carousel functionality
      var currentIndex = 0;
      var items = $('#count-bnr-inner .carousel-item');
      var totalItems = items.length;

      var showSlide = function(index) {
        items.removeClass('active');
        items.eq(index).addClass('active');
      };
      

      // Next and Previous buttons
      $('.carousel-control-next').on('click', function () {
        currentIndex = (currentIndex + 1) % totalItems;
        showSlide(currentIndex);
      });

      $('.carousel-control-prev').on('click', function () {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showSlide(currentIndex);
      });
    }
  }

  // Call the function to initialize the banner
  fdFncs.countBnr();
</script>
