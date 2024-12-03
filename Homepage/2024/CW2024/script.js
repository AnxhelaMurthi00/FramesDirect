<script>
    fdFncs.vars = fdFncs.vars || {};
    fdFncs.vars.discNoBrands = '80';
    fdFncs.vars.add50 = '50';
    fdFncs.vars.setLuxMSRP = '';
    fdFncs.vars.showEmailCountdown = typeof getCookie('showEmailCountdown') !== 'undefined' ? getCookie('showEmailCountdown') : '';
    if (getParameterByName('countdown_exp') !== 'undefined') { 
      setCookie('showEmailCountdown',getParameterByName('countdown_exp'));
      fdFncs.vars.showEmailCountdown = getParameterByName('countdown_exp');
    }
    fdFncs.countBnr = function() {
      var endDateLong = '01/01/1900', winURL = window.location.href.toLowerCase(), showCountdown = false, countHTML = '', countBnrMsg = '', bgColor = 'black', lnkStart = '', lnkEnd = '', digitBg = '',
          showBanner = window.location.href.indexOf('shopping') === -1 && //Shopping
                       window.location.href.indexOf('password_email.aspx') === -1 && //Password
                       window.location.href.indexOf('login.aspx') === -1 && //Login
                       window.location.href.indexOf('checkout.aspx') === -1 && //Checkout
                       window.location.href.indexOf('lens_selection') === -1 && window.location.href.indexOf('eyewear-lens-selector') === -1,
                       
          bnrLnkClasses = 'size-12 text-center weight-bold color-white',
          countBnr = (function () {
              if (checkDate >= '240708' && checkDate <= '241103') {
                if (checkDate >= '240711') {
                  endDateLong = '11/13/2024';
                  showCountdown = true;
                  //bnrLnkClasses = bnrLnkClasses + ' col-lg-7 text-lg-left';
                }
                countBnrMsg = '<a href="/email/flash-sale-dp" class="'+bnrLnkClasses+'">Early Black Friday: Up to 50% off frames + up to 60% off lenses ends 11/23';
              }
              else if (checkDate > '241028' && checkDate < '241103' && getCookie('fdRecognized') === undefined) {
                countBnrMsg = '<a id="email-signup-global" href="#" class="'+bnrLnkClasses+' decoration-none">Early Black Friday: <span class="decoration-underline px-0">Sign up</span> or <span class="decoration-underline px-0">log in</span> now</a>';
                $(document).on('click', '#email-signup-global', function(e) {
                  e.preventDefault();
                  if (window.isCountry !== undefined) {
                    addCountryLayer(); 
                  } 
                  else { 
                    addWelcomeLayer(); 
                  }
                });
              }
              else if (checkDate > '241028' && checkDate < '241103') {
                countBnrMsg = '<a href="/email/black-friday-dp" class="'+bnrLnkClasses+'">Early Black Friday: Up to 50% off frames + up to 60% off lenses ends 11/23</a>';
              }
              else if (checkDate > '231118' && checkDate < '231125') {
                var msgPart = 'Starts Now';
                if (checkDate > '231123') {
                  msgPart = 'Deals';
                  endDateLong = '11/25/2023';
                  //bgColor = 'neon-pink';
                  showCountdown = true;
                  //bnrLnkClasses = bnrLnkClasses + ';
                }
                countBnrMsg = '<a href="/email/black-friday-dp" class="'+bnrLnkClasses+'">Black Friday '+msgPart+'</a>';
              }
              else if (checkDate > '231124' && checkDate < '231128') {
                var msgPart = 'Starts Now';
                //bgColor = 'neon-blue';
                if (checkDate > '231126') {
                  msgPart = 'Deals';
                  endDateLong = '11/28/2023';
                  showCountdown = true;
                  //bnrLnkClasses = bnrLnkClasses + ' col-lg-7 text-lg-left';
                }
                countBnrMsg = '<a href="/email/cyber-monday-deals-dp" class="'+bnrLnkClasses+'">Cyber Monday '+msgPart+'</a>';
              }
              else if (checkDate > '231223' && checkDate < '240101') {
                if (checkDate > '231229') {
                  endDateLong = '01/01/2024';
                  showCountdown = true;
                }
                  //bnrLnkClasses = bnrLnkClasses + ' col-lg-7 text-lg-left';
                if (pgURLPath('/knowledge-center/do-you-have-flex-spending-dollars')) {
                  $('#landing-content').prepend('<div class="p-3 size-24 align-center weight-bold">Your FSA Dollars Could Expire Dec 31st!</div>');
                }
                //$('body').addClass('countdown');
                countBnrMsg = '<a href="/collections/fsa-hsa-eligible-eyewear-dp" class="weight-bold '+bnrLnkClasses+'">Don\'t Lose Your FSA Dollars!</a>';
              }
              else if (checkDate > '211225' && checkDate < '211230') {
                if (checkDate > '211128') {
                  endDateLong = '01/01/2022';
                  showCountdown = true;
                }
                if (pgURLPath('/knowledge-center/do-you-have-flex-spending-dollars')) {
                  $('#landing-content').prepend('<div class="p-3 size-24 align-center weight-bold">Your FSA Dollars Could Expire Dec 31st!</div>');
                }
                countBnrMsg = '<a href="/collections/fsa-hsa-eligible-eyewear-dp" class="'+bnrLnkClasses+'">FSA Dollars Expire on 12/31!</a>';
              }
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
                $(document).on('click','#recSignIn',function(e) {
                  e.preventDefault();
                  $('#ctl00_lnkNewLogin').trigger('click');
                });
                countBnrMsg = '<div class="'+bnrLnkClasses+'">'+msgTime + ' ' + isRecognized+'</div>';
              }
              if (showCountdown === true) {
                countHTML = '<div id="countdown" class="d-flex justify-content-end pr-3"><div id="countdown-clockworks-holder" class="d-flex"></div></div>';
              }
              return lnkStart+'<div id="count-bnr-inner" style="min-height: 37px;" class="background-'+bgColor+' d-flex flex-wrap justify-content-center align-items-center cursor-pointer weight-bold">'+countHTML+countBnrMsg+'</div>'+lnkEnd;
          })();
      if (showBanner && checkDate >= '240708' && checkDate <= '240713') {
        //Add CSS header padding when banner is running
        var css = '#header-top { padding-top: 37px; }',
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