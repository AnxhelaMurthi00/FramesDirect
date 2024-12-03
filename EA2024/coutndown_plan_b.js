<script>
    fdFncs.vars = fdFncs.vars || {};
    fdFncs.countBnr = function() {
      var endDateLong = '01/01/1900', winURL = window.location.href.toLowerCase(), showCountdown = false, countHTML = '', countBnrMsg = '', bgColor = 'black', lnkStart = '', lnkEnd = '', digitBg = '',
          showBanner = window.location.href.indexOf('shopping') === -1 && //Shopping
                       window.location.href.indexOf('password_email.aspx') === -1 && //Password
                       window.location.href.indexOf('login.aspx') === -1 && //Login
                       window.location.href.indexOf('checkout.aspx') === -1 && //Checkout
                       window.location.href.indexOf('lens_selection') === -1 && window.location.href.indexOf('eyewear-lens-selector') === -1,
          bnrLnkClasses = 'size-12 text-center color-white weight-black',
          countBnr = (function () {
              if ((checkDate >= '241223' && checkDate <= '241231') || (fdFncs.vars.isTest >= '241223' && fdFncs.vars.isTest <= '241231')) {
                if (checkDate >= '241230' || fdFncs.vars.isTest >= '241230') {
                  endDateLong = '01/01/2025';
                  showCountdown = true;
                }
                if (pgURLPath('/knowledge-center/do-you-have-flex-spending-dollars')) {
                  $('#landing-content').prepend('<div class="p-3 size-24 align-center weight-bold">Your FSA Dollars Could Expire Dec 31st!</div>');
                }
                countBnrMsg = '<a href="/collections/fsa-hsa-eligible-eyewear-dp" class="weight-bold '+bnrLnkClasses+'">Don\'t Lose Your FSA Dollars!</a>';
              }
              else if ((checkDate >= '241203' && checkDate <= '241206') || (fdFncs.vars.isTest >= '241203' && fdFncs.vars.isTest <= '241206')) {
                if (checkDate >= '241205' || fdFncs.vars.isTest >= '241205') {
                  endDateLong = '12/07/2024';
                  showCountdown = true;
                }
                countBnrMsg = '<a href="/email/cyber-sale-dp" class="'+bnrLnkClasses+' decoration-none">Cyber Sale<span class="d-none d-lg-inline-block">: <span class="weight-bold">20% off frames</span> + <span class="weight-bold color-white"> 60% off lenses </span></a>';
              }
              else if ((checkDate === '241202') || fdFncs.vars.isTest === '241202') {
                var msg = 'Weekend',
                    fullMsg = 'Up to <span class="weight-bold">50% off frames</span> + up to <span class="weight-bold color-white"> 60% off lenses </span> ends 12/02';
                endDateLong = '12/03/2024';
                showCountdown = true;
                countBnrMsg = '<a href="/email/black-friday-dp" class="'+bnrLnkClasses+' decoration-none">Cyber Monday<span class="d-none d-lg-inline-block">: An extra <b>up to 10% off frames</b> is ending</a>';
              }
              else if ((checkDate >= '241124' && checkDate <= '241129') || (fdFncs.vars.isTest >= '241124' && fdFncs.vars.isTest <= '241129')) {
                var msg = ' Week',
                    fullMsg = 'Up to <span class="weight-bold">50% off frames</span> + up to <span class="weight-bold color-white"> 60% off lenses </span> ends 11/29';
                if (checkDate === '241129' || fdFncs.vars.isTest === '241129') {
                  endDateLong = '11/30/2024';
                  showCountdown = true;
                  msg = '';
                  fullMsg = 'An extra <span class="weight-bold">up to 10% off frames</span> is ending';
                }
                countBnrMsg = '<a href="/email/black-friday-dp" class="'+bnrLnkClasses+' decoration-none">Black Friday'+msg+'<span class="d-none d-lg-inline-block">: '+fullMsg+'</a>';
              }
              else if ((checkDate >= '241121' && checkDate <= '241123') || (fdFncs.vars.isTest >= '241121' && fdFncs.vars.isTest <= '241123')) {
                if (getCookie('fdRecognized') === undefined) {
                  countBnrMsg = '<div class="'+bnrLnkClasses+'">Early Black Friday: <a href="#" class="emailSignUp color-white weight-bold decoration-underline">Sign up</a> or <a class="d-inline-block siteSignIn color-white weight-bold decoration-underline" href="#">log in</a> now</div>';
                } else {
                  if (checkDate >= '241122' || fdFncs.vars.isTest >= '241122') {
                    endDateLong = '11/24/2024';
                    showCountdown = true;
                  }
                  countBnrMsg = '<a href="/email/black-friday-dp" class="'+bnrLnkClasses+' decoration-none">Early Black Friday<span class="d-none d-lg-inline-block">: Up to <span class="weight-bold">50% off frames</span> + up to <span class="weight-bold color-white"> 60% off lenses </span> ends 11/23</a>';
                }
              }
              /*
              else if (checkDate > '240226' && checkDate < '240316') {
                if (checkDate > '240305') {
                  endDateLong = '03/16/2024';
                  showCountdown = true;
                 // bnrLnkClasses = bnrLnkClasses + ' col-lg-7 text-lg-left';
                }
                if (pgURLPath('/knowledge-center/do-you-have-flex-spending-dollars')) {
                  $('#landing-content').prepend('<div class="p-3 size-24 align-center weight-bold">FSA Dollars May Expire March 15th! Use Yours Today!</div>');
                }
                countBnrMsg = '<a href="/collections/fsa-hsa-eligible-eyewear-dp" class="'+bnrLnkClasses+'">FSA Dollars&nbsp;may expire 3/15</a>';
              }
              else if (checkDate > '240525' && checkDate < '240528') {
                if (checkDate > '240525') {
                  endDateLong = '05/28/2024';
                  showCountdown = true;
                  //bnrLnkClasses = bnrLnkClasses + ' col-lg-7 text-lg-left';
                }
                countBnrMsg = '<a href="/email/memorial-day-dp" class="'+bnrLnkClasses+'">Memorial Day Sale Ends Soon</a>';
              }
              else if (checkDate > '240403' && checkDate < '240415') {
                var msgTime = 'Private Week Sale: ',
                    isRecognized = '';
                bnrLnkClasses = bnrLnkClasses + ' color-white';
                bgColor = 'black';
                digitBg = ' white';
                if (checkDate > '240412') {
                  endDateLong = '04/15/2024';
                  showCountdown = true;
                  if ($(window).width() > 992) {
                    bnrLnkClasses = bnrLnkClasses;
                  } else {
                    showCountdown = false;
                    if (checkDate > '230420') {
                      msgTime = 'Appreciation Sale';
                    }
                  }
                  msgTime += checkDate === '230430' ? ' Ends Tomorrow' : (checkDate === '230501' ? ' Ends Today' : '');
                }
                if (getCookie('fdRecognized') === undefined) {
                  isRecognized = ' <a href="javascript:addWelcomeLayer();fdFncs.vars.allowEmPop = false;" id="recSignUp" class="color-white weight-bold">Sign Up</a> or <a href="#" id="recSignIn" class="color-white weight-bold">Sign In</a>';
                } else {
                  isRecognized = '<a href="/email/customer-appreciation-dp" class="color-white weight-bold">Save Now</a>';
                }
                countBnrMsg = '<div class="'+bnrLnkClasses+'">'+msgTime + ' ' + isRecognized+'</div>';
              }
              */
              if (showCountdown === true) {
                countHTML = '<div id="countdown" class="d-flex justify-content-end pr-3"><div id="countdown-clockworks-holder" class="d-flex"></div></div>';
              }
              return lnkStart+'<div id="count-bnr-inner" style="min-height: 37px;" class="background-'+bgColor+' d-flex flex-wrap justify-content-center align-items-center cursor-pointer weight-bold">'+countHTML+countBnrMsg+'</div>'+lnkEnd;
          })();
      if (showBanner && ((checkDate >= '241121' && checkDate <= '241206') || (fdFncs.vars.isTest >= '241121' && fdFncs.vars.isTest <= '241206'))) {
        //Add CSS header padding when banner is running
        var css = '#header-top { padding-top: 37px; } #count-bnr-inner a { text-decoration: none; } @media screen and (max-width: 992px) { .scrollingHeader #header,.scrollingHeader #header-in { height: 133px; } .scrollingHeader #header-in.hide { transform : translateY(-133px); } }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        //End CSS Addition
        $('#count-bnr-inner').remove();
        if ($('#countdown').length === 0 && $(window).width() > 1300) {
          $(countBnr).insertBefore('#header');
          $('#header-top').css('padding-top',0);
          $('body').addClass('changeSticky')
        }
        else if ($('#countdown').length === 0) {
          $(countBnr).prependTo('#header-in');
          $('#header-top').css('padding-top',0);
        } else {
          $(countBnr).prependTo('#header-in');
        }
        $('#count-bnr-inner').on('click',function(){
          var $this = $(this);
          if ($this.find('a').length === 1) {
            var linkLoc = $this.find('a').attr('href');
            window.location.href = linkLoc;
          }
        });
        if (endDateLong === '01/01/1900') {
          $('#count-bnr-inner > div:first-child').removeClass('col-lg-6 justify-content-lg-start m-0').addClass('m-auto');
        }
      }
      if ($('#countdown').length > 0) {
        $('#countdown-clockworks-holder').countdown(endDateLong, function(event) {
          var $this = $(this);
          var totalHours = event.offset.totalDays * 24 + event.offset.hours;
          //This is for Hours only
          $this.html(event.strftime('<div class="dash hours_dash"> <div class="countdown-digit-wrapper'+digitBg+'"> <div class="digit">'+totalHours+'</div> <div class="time-label">hours</div> </div> <div class="colon">:</div></div><div class="dash minutes_dash"> <div class="countdown-digit-wrapper'+digitBg+'"> <div class="digit">%M</div> <div class="time-label">min</div> </div> <div class="colon">:</div></div><div class="dash seconds_dash"> <div class="countdown-digit-wrapper'+digitBg+'"> <div class="digit">%S</div> <div class="time-label">sec</div> </div></div>'));  
          //This is for days and hours
          //$this.html(event.strftime('<div class="dash days_dash"> <div class="countdown-digit-wrapper'+digitBg+'"> <div class="digit">%n</div> <div class="time-label">days</div> </div> <div class="colon">:</div></div><div class="dash hours_dash"> <div class="countdown-digit-wrapper'+digitBg+'"> <div class="digit">%H</div> <div class="time-label">hours</div> </div> <div class="colon">:</div></div><div class="dash minutes_dash"> <div class="countdown-digit-wrapper'+digitBg+'"> <div class="digit">%M</div> <div class="time-label">min</div> </div> <div class="colon">:</div></div><div class="dash seconds_dash"> <div class="countdown-digit-wrapper'+digitBg+'"> <div class="digit">%S</div> <div class="time-label">sec</div> </div></div>'));
        });
      }
    }
    fdFncs.countBnr();
  </script>