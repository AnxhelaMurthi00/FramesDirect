
  if ((checkDate >= 250203 && checkDate <= 250205) || (+fdFncs.vars.isTest >= 250203 && fdFncs.vars.isTest <= 250205)) {
    var locName = ['/eyeglasses/', '/sunglasses/', '/prescription-sunglasses/', '/men/eyewear-dp', '/women/eyewear-dp', '/eyeglasses/mens', '/eyeglasses/womens', '/sunglasses/mens', '/sunglasses/womens', '/prescription-sunglasses/mens', '/prescription-sunglasses/womens'],
        imgPath = '';

    if (fdFncs.vars.fdRecognized) {
      // User is recognized
      for (x = 0, y = locName.length; x < y; ++x) {
        if (location.pathname === locName[x]) {
          imgPath = 'v1736932545/landing-pages/FD_PLP_ANNIVERSARY_SALE.png';
          $("#bnr-dyn-holder").html('<a href="/email/anniversary-dp"><img alt="Anniversary Sale: Get exclusive 29% off luxury frames and up to 60% off lenses" src="https://images.framesdirect.com/image/upload/'+imgPath+'" width="2100" height="431" title="Anniversary Sale: Get exclusive 29% off luxury frames and up to 60% off lenses"></a>');
          break;
        }
      }

      if (pgURLPath('/email/anniversary-dp')) {
        $("#bnr-dyn-holder").html('<img alt="Anniversary Sale: Get exclusive 29% off luxury frames and up to 60% off lenses" src="https://images.framesdirect.com/image/upload/v1736932545/landing-pages/FD_PLP_ANNIVERSARY_SALE.png" width="2100" height="431" title="Anniversary Sale: Get exclusive 29% off luxury frames and up to 60% off lenses">');
        $('h1').html("It's our 29th Anniversary Flash Sale! 29% Off Top Luxury Brands");
        $("#cata_desc").html('<p>We’re celebrating 29 years of Frames Direct with savings and you’re invited! Get 29% off top luxury brands like Versace, Burberry, Dolce&Gabbana, and many more. Plus! Save an additional 60% off lenses.  <a id="flash-disc-link" href="#">Details <i></i></a></p><p id="flash-disclaimer" style="display:none">Get 29% off the purchase price of full-priced Eyeglasses, Sunglasses, and Prescription Sunglasses from these luxury brands: Armani Exchange, Arnette, Brooks Brothers, Burberry, Coach, Dolce&Gabbana, Dolce&Gabbana Kids, Emporio Armani, Emporio Armani Kids, Giorgio Armani, Polo, Polo Kids, Ralph Lauren, RALPH, Sferoflex, Swarovski, Tory Burch, Versace, Versace Kids, Vogue, Vogue Junior. Frame purchase required. Other exclusions may apply. Valid on order amount before any shipping costs and/or any applicable taxes are added. Cannot be used in conjunction with price match guarantee. Free Shipping on domestic orders only. Offer ends January 25, 2025.</p>');
      }
    } else {
      // User is NOT recognized (fdRecognized is false or undefined)
      for (x = 0, y = locName.length; x < y; ++x) {
        if (location.pathname === locName[x]) {
          imgPath = 'v1738079376/landing-pages/PLP_EA_D.png'; // Alternative banner for non-recognized users
          $("#bnr-dyn-holder").html('<img alt="Join Our Sale! Sign up for exclusive offers" src="https://images.framesdirect.com/image/upload/'+imgPath+'" width="2100" height="431" title="Join Our Sale! Sign up for exclusive offers" usemap="#image-map"><map name="image-map" id="image-map"><area alt="Sign Up for Emails" title="Sign Up for Emails" href="javascript:addWelcomeLayer();fdFncs.vars.allowEmPop = false;" coords="83,314,252,379" shape="rect"><area class="siteSignIn" alt="Log Into Your Account" title="Log Into Your Account" href="#" coords="284,316,440,379" shape="rect"></map>');
          break;
        }
      }
    }
  }

