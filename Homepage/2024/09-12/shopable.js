/* SHOPPABLE ENGINE */
const ct_initShopableImages = () => {
  ct_printProducts(fakeData);
  ct_HandleOnClickEvents();
};

const ct_printProducts = function (products) {
  // Shopping bag icon print
  for (let element in ct_page__products.elements) {
    let shoppingBag;
    if ($(window).width() > 1199) {
      shoppingBag = `<span class="ct_shopping-bag-icon icon-shopping-cart-o ${
        shoppingBagPosition[
          ct_page__products.elements[element][0].shop_icon_position.desk
        ]
      }"></span>`;
    }

    // Banner type structure control
    const dataElementId = `[data-element-id="${element}"]`;

    $(dataElementId).append(shoppingBag);

    const bannerElementIdSelector = $(dataElementId)
      .children()
      .hasClass("cm-hero__media-wrapper")
      ? `${dataElementId} .cm-hero__media-wrapper`
      : `${dataElementId} > a > div`;
    if (
      !$(bannerElementIdSelector).find(".ct_shopping-bag-icon").length
    ) {
      $(bannerElementIdSelector).append(shoppingBag);
    }

    // Desktop and mobile different behaviour
    if ($(window).width() < 768) {
      // ctas always clickables
      $(dataElementId + " a").css("pointerEvents", "auto");
      // Mobile pin show on scroll
      const banners = document.querySelectorAll(dataElementId);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("ct_show-pin");
            }
          });
        },

        { threshold: 0.2 }
      );

      banners.forEach((pin) => {
        observer.observe(pin);
      });

      // Desktop pin show on hover
    } else {
      $(dataElementId).addClass("ct_show-pin");
    }

    // Cycle on products inside each banner (we can have multiple products inside a single banner)

    for (let productIndex in ct_page__products.elements[element]) {
      const ct_productInfo =
        ct_page__products.elements[element][productIndex];

      // Check if an element/product already exist in the banner
      if (
        !$(
          `${bannerElementIdSelector} a[data-element-id="${element}-PIN${productIndex}"]`
        ).length
      ) {
        const ct_shopPin = ct_printPin(
          ct_productInfo,
          element,
          productIndex,
          products
        );

        $(bannerElementIdSelector).append(ct_shopPin);
      }
    }
  }
};

// Pin print and positioning inside banner

const ct_printPin = (pinInfo, dataElementId, productIndex, products) => {
  let pinStyleTop;
  let pinStyleLeft;
  let panelPosition;

  if ($(window).width() < 768) {
    pinStyleTop = pinInfo.top.mob;
    pinStyleLeft = pinInfo.left.mob;
    panelPosition = infoPanelPosition[pinInfo.panel_position.mob];
  } else {
    pinStyleTop = pinInfo.top.desk;
    pinStyleLeft = pinInfo.left.desk;
    panelPosition = infoPanelPosition[pinInfo.panel_position.desk];
  }

  const pinStyle = `top:${pinStyleTop + "%"};left:${pinStyleLeft + "%"};`;

  // Filtering JSON products <-> Products in page

  const productFilter = $(products.products).filter(function (index) {
    return pinInfo.upc === products.products[index].UPC;
  });

  if (productFilter[0] === undefined) return;

  const skuType = productFilter[0].skuType;

  let modelImage = productFilter[0].qtImage;

  const offerPrice = parseFloat(productFilter[0].offerPrice);

  const listPrice = parseFloat(productFilter[0].listPrice);

  const modelName = productFilter[0].modelName;

  const pdpURL = productFilter[0].pdpURL;

  const stock = productFilter[0].stock;

  let imageUrl = modelImage;

  const activePreviewDesktop = pinInfo.preview.desk;

  const activePreviewMobile = pinInfo.preview.mob;

  let previewClass;

  if (activePreviewMobile && activePreviewDesktop) {
    previewClass = "d-block";
  } else if (activePreviewMobile && !activePreviewDesktop) {
    previewClass = "d-block d-md-none";
  } else if (!activePreviewMobile && activePreviewDesktop) {
    previewClass = "d-none d-md-block";
  }

  // Currency

  const currency = "$";

  if (skuType === "AFA Accessories" || skuType === "AFA Apparel") {
    modelImage = productFilter[0].frontImage;

    imageUrl = modelImage

      .replace("CostaDelMar", "CDMAFA")

      .replace("__", "_main_");
  } else if (skuType === "Accessory") {
    imageUrl = modelImage

      .replace("CostaDelMar", "CDMACC")

      .replace("__", "_main_");
  }

  // Has offer price?

  const hasOfferPrice = listPrice !== offerPrice;

  // Is out of stock?

  const isOutOfStock = stock == "0";

  // Render based on different conditions (normal price | offer price | out of stock)

  const printPrice =
    hasOfferPrice && !isOutOfStock
      ? `<p class="ct_infoPanel_productPrice">${currency}<del style="font-size: 11px">${listPrice.toFixed(
          2
        )}</del> <span>${currency}${offerPrice.toFixed(2)}</span></p>`
      : `<p class="ct_infoPanel_productPrice">${currency}${listPrice.toFixed(
          2
        )}</p>`;

  if (isOutOfStock) {
    return `

    <div class="ct_pin-container ct_pin-container-not-clickable" style=${pinStyle}>

    <div class="ct_pin ct_pin-icon ct_pin-icon-light">

    </div>

    <div class="ct_infoPanel ${panelPosition}">

    <p class="ct_infoPanel_productName">${modelName}</p>

    <p class="ct_infoPanel_productPrice">Is Out of Stock</p>

    <img src="${imageUrl}?imwidth=220" alt="${modelName}" class="${previewClass}" />

    </div>

    </div>`;
  } else {
    return `

    <div class="ct_pin-container" style=${pinStyle}>

    <div class="ct_pin ct_pin-icon ct_pin-icon-light">

    </div>

    <a data-description="${modelName}" data-element-id="${dataElementId}-PIN${productIndex}" href="${pdpURL}" class="ct_infoPanel ${panelPosition} ct_infoPanel-hidden">

    <div>

    <p class="ct_infoPanel_productName">${modelName}</p>

    ${printPrice}

    </div>

    <img src="${imageUrl}?imwidth=220" alt="${modelName}" class="${previewClass}" />

    </a>

    </div>`;
  }
};

const ct_HandleOnClickEvents = () => {
  const infoPanels = document.querySelectorAll(".ct_infoPanel");

  const pins = document.querySelectorAll(".ct_pin");

  const shoppingBags = document.querySelectorAll(".ct_shopping-bag-icon");

  // Banner behavior -> Click on image with panels closed redirect

  if (banner_behavior !== "custom") {
    $(document).on("click", function (e) {
      pins.forEach((el) => {
        el.classList.add("ct_pin-icon-light");
        el.classList.remove("ct_pin-icon-dark");
      });

      infoPanels.forEach((el) => {
        el.classList.add("ct_infoPanel-hidden");
        el.classList.remove("ct_infoPanel-visible");
      });

      for (let element in ct_page__products.elements) {
        const dataElementId = `[data-element-id="${element}"]`;

        const banners = document.querySelectorAll(dataElementId);

        banners.forEach((el) => {
          el.classList.remove("ct_preventBannerClick");
        });
      }
    });
  }

  const ct_PanelOpeningLogic = (e, target) => {
    const targetElement = target[0];

    let IsVisible = $(targetElement).hasClass("ct_infoPanel-visible")
      ? true
      : false;

    if (!IsVisible) {
      targetElement.classList.remove("ct_infoPanel-hidden");
      targetElement.classList.add("ct_infoPanel-visible");
    } else {
      targetElement.classList.remove("ct_infoPanel-visible");
      targetElement.classList.add("ct_infoPanel-hidden");
    }

    e.stopPropagation();
    e.stopImmediatePropagation();
  };

  infoPanels.forEach((el) => {
    $(`.ct_infoPanel`).click((e) => {
      e.stopPropagation();

      e.stopImmediatePropagation();
    });

    if ($(window).width() > 767) {
      $(`.ct_infoPanel`).mouseenter((e) => {
        const ct_infoPanels = $(e.currentTarget);

        ct_infoPanels[0].classList.add("ct_infoPanel-visible");

        ct_infoPanels[0].classList.remove("ct_infoPanel-hidden");

        const pin = ct_infoPanels[0].previousElementSibling;

        pin.classList.add("ct_pin-icon-dark");

        pin.classList.remove("ct_pin-icon-light");
      });

      $(`.ct_infoPanel`).mouseleave((e) => {
        const ct_infoPanels = $(e.currentTarget);

        ct_infoPanels[0].classList.remove("ct_infoPanel-visible");

        ct_infoPanels[0].classList.add("ct_infoPanel-hidden");

        const pin = ct_infoPanels[0].previousElementSibling;

        pin.classList.add("ct_pin-icon-light");

        pin.classList.remove("ct_pin-icon-dark");
      });

      $(`.ct_show-pin`).mouseleave((e) => {
        el.classList.remove("ct_infoPanel-visible");

        el.classList.add("ct_infoPanel-hidden");

        const pin = el.previousElementSibling;

        pin.classList.remove("ct_pin-icon-dark");

        pin.classList.add("ct_pin-icon-light");
      });

      $(`.ct_pin`).mouseenter((e) => {
        const ct_pin = $(e.currentTarget);

        ct_pin[0].classList.add("ct_pin-icon-dark");

        ct_pin[0].classList.remove("ct_pin-icon-light");
      });

      $(`.ct_pin`).mouseleave((e) => {
        const ct_pin = $(e.currentTarget);

        ct_pin[0].classList.add("ct_pin-icon-light");

        ct_pin[0].classList.remove("ct_pin-icon-dark");
      });
    }
  });

  pins.forEach((pin) => {
    if ($(window).width() > 767) {
      $(pin).click((e) => {
        e.stopPropagation();

        e.stopImmediatePropagation();
      });

      $(pin).mouseenter((e) => {
        const ct_infoPanels = $(e.currentTarget)
          .next()
          .addClass("ct_infoPanel-visible")
          .removeClass("ct_infoPanel-hidden");
      });

      $(pin).mouseleave((e) => {
        const ct_infoPanels = $(e.currentTarget)
          .next()
          .addClass("ct_infoPanel-hidden")
          .removeClass("ct_infoPanel-visible");
      });
    } else if ($(window).width() < 768) {
      $(pin).click((e) => {
        let banner = $(e.target).closest("[data-element-id]");

        console.log("banner", banner);

        let IsVisible = $(e.target).hasClass("ct_pin-icon-dark")
          ? true
          : false;

        if (IsVisible) {
          $(e.target)
            .addClass("ct_pin-icon-light")

            .removeClass("ct_pin-icon-dark");
        } else {
          $(e.target)
            .addClass("ct_pin-icon-dark")

            .removeClass("ct_pin-icon-light");
        }

        const ct_infoPanels = $(e.target).next();

        ct_PanelOpeningLogic(e, ct_infoPanels);

        // Banner behavior -> Click on image with panels closed redirect

        if (banner_behavior !== "custom") {
          const ct_infoPanelsActive = banner[0].querySelectorAll(
            ".ct_infoPanel.ct_infoPanel-visible"
          );

          const ct_infoPanelsHidden = banner[0].querySelectorAll(
            ".ct_infoPanel.ct_infoPanel-hidden"
          );

          if (ct_infoPanelsActive.length > 0) {
            $(banner[0]).addClass("ct_preventBannerClick");
          } else {
            $(banner[0]).removeClass("ct_preventBannerClick");
          }
        }
      });
    }
  });

  shoppingBags.forEach((shoppingBag) => {
    // Banner behavior -> Click on image with panels closed redirect
    let bannerSelector;

    if (banner_behavior !== "custom") {
      bannerSelector = shoppingBag;
    } else {
      bannerSelector = $(shoppingBag).parent();
    }

    $(bannerSelector).click((e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      let ct_pinContainers;

      let banner;

      if (banner_behavior !== "custom") {
        ct_pinContainers = $(e.target).parent();

        banner = $(e.target).closest("[data-element-id]");
      } else {
        ct_pinContainers = bannerSelector;

        banner = $(e.target).closest("[data-element-id]");
      }

      const ct_infoPanelsActive = ct_pinContainers[0].querySelectorAll(
        ".ct_infoPanel.ct_infoPanel-visible"
      );

      const ct_infoPanelsHidden = ct_pinContainers[0].querySelectorAll(
        ".ct_infoPanel.ct_infoPanel-hidden"
      );

      const ct_infoPanels =
        ct_infoPanelsActive.length === 0 ||
        ct_infoPanelsHidden.length === 0
          ? ct_pinContainers[0].querySelectorAll(".ct_infoPanel")
          : ct_infoPanelsHidden;

      for (let i = 0; i < ct_infoPanels.length; i++) {
        ct_infoPanels[i].classList.toggle("ct_infoPanel-hidden");

        ct_infoPanels[i].classList.toggle("ct_infoPanel-visible");
      }

      const ct_pinActive = ct_pinContainers[0].querySelectorAll(
        ".ct_pin.ct_pin-icon-dark"
      );

      const ct_pinHidden = ct_pinContainers[0].querySelectorAll(
        ".ct_pin.ct_pin-icon-light"
      );

      const ct_pinIcons =
        ct_pinActive.length === 0 || ct_pinHidden.length === 0
          ? ct_pinContainers[0].querySelectorAll(".ct_pin")
          : ct_pinHidden;

      for (let i = 0; i < ct_pinIcons.length; i++) {
        ct_pinIcons[i].classList.toggle("ct_pin-icon-light");

        ct_pinIcons[i].classList.toggle("ct_pin-icon-dark");
      }

      // Banner behavior -> Click on image with panels closed redirect

      if (banner_behavior !== "custom") {
        if ($(window).width() < 768) {
          if (ct_infoPanelsHidden.length > 0) {
            $(banner[0]).addClass("ct_preventBannerClick");
          } else {
            $(banner[0]).removeClass("ct_preventBannerClick");
          }
        }
      }
    });
  });
};

ct_initShopableImages();