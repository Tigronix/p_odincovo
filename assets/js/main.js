'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parsley = function parsley() {
  var elems = document.querySelectorAll('.js-parsley-form');

  elems.forEach(function (elem) {
    $(elem).parsley({
      noFocus: false
    });
  });
};

var wow = function wow() {
  var wowInit = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 80,
    mobile: false,
    live: true
  });

  wowInit.init();
};

var masks = function masks() {
  $('.js-phone-mask').mask('+7 (000) 000-00-00');
  $('.js-number-mask').mask('000000');
  $('.js-card-mask').mask('0000-0000-0000-0000');
  $('.js-price-mask').mask('0 000 000 000');
};

var orderForm = function orderForm() {
  var elems = document.querySelectorAll('.js-order-form');

  elems.forEach(function (elem) {
    var btn = elem.querySelector('.js-btn');

    btn.addEventListener('click', function () {
      var isActive = elem.classList.contains('active');
      var mobile = window.matchMedia('(max-width: 980px)').matches;

      if (isActive) {
        elem.classList.remove('active');
        if (mobile) {
          OD.body.classList.remove('overflow');
        }
      } else {
        elem.classList.add('active');
        if (mobile) {
          OD.body.classList.add('overflow');
        }
      }
    });

    document.documentElement.addEventListener('click', function (event) {
      var isClickWithinOpenedDiv = top_walker(event.target, function (node) {
        return node === elem;
      });
      if (isClickWithinOpenedDiv) {} else {
        elem.classList.remove('active');
      }
    }, true);
  });
};

var tabs = function tabs() {
  var btns = document.querySelectorAll('[data-tabclass]');

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var contentData = btn.getAttribute('data-tabclass');
      var btnNumberData = btn.getAttribute('data-tabnumber');
      var contentNodes = document.querySelectorAll('.' + contentData);
      var btnSiblings = getSiblings(btn);

      // toggle btn class
      btnSiblings.forEach(function (btnSibling) {
        btnSibling.classList.remove('active');
      });

      btn.classList.add('active');

      // toggle contentNodes
      contentNodes.forEach(function (contentNode) {
        var items = Array.from(contentNode.children);

        items.forEach(function (item) {
          var itemNumberData = item.getAttribute('data-tabnumber');
          var isNumberEqual = itemNumberData == btnNumberData;

          if (isNumberEqual) {
            var siblings = getSiblings(item);

            siblings.forEach(function (sibling) {
              sibling.classList.remove('active');
            });

            item.classList.add('active');
          }
        });
      });
    });
  });
};

var mobileMenu = function mobileMenu() {
  var btnsOpen = document.querySelectorAll('.js-burger');
  var menus = document.querySelectorAll('.js-mobile-menu');

  btnsOpen.forEach(function (btnOpen) {
    btnOpen.addEventListener('click', function () {
      var menu = document.querySelector('.js-mobile-menu');
      var isActive = menu.classList.contains('active');

      if (isActive) {
        menu.classList.remove('active');
        OD.body.classList.remove('overflow');
        OD.warningNode.classList.remove('hide');
      } else {
        menu.classList.add('active');
        OD.body.classList.add('overflow');
        OD.warningNode.classList.add('hide');
      }
    });
  });

  menus.forEach(function (menu) {
    var btnsClose = menu.querySelectorAll('.js-close');

    btnsClose.forEach(function (btnClose) {
      btnClose.addEventListener('click', function () {
        var isActive = menu.classList.contains('active');

        if (isActive) {
          menu.classList.remove('active');
          OD.body.classList.remove('overflow');
          OD.warningNode.classList.remove('hide');
        } else {
          menu.classList.add('active');
          OD.body.classList.add('overflow');
          OD.warningNode.classList.add('hide');
        }
      });
    });
  });
};

var select = function select() {
  var selects = document.querySelectorAll('.js-select');

  selects.forEach(function (select) {
    var btn = select.querySelector('.js-select-btn');

    var close = function close(select) {
      select.classList.remove('active');
      OD.globalDropdown.remove();
    };

    var open = function open() {
      select.classList.add('active');
    };

    btn.addEventListener('click', function (e) {
      var coords = getCoords(btn);
      OD.isSelectActive = select.classList.contains('active');

      if (OD.isSelectActive) {
        close(select);
      } else {
        selects.forEach(function (select) {
          select.classList.remove('active');
        });

        select.classList.add('active');
        if (OD.globalDropdown) {
          OD.globalDropdown.remove();
        }

        // clone list node & append it
        var cloneList = select.querySelector('.js-list').cloneNode(true);
        OD.dropdown.appendChild(cloneList);

        // set list position + make it visible
        var selectParams = select.getBoundingClientRect();
        var coordsY = coords.top + selectParams.height;
        OD.globalDropdown = OD.dropdown.querySelector('.js-list');
        OD.globalDropdown.setAttribute('style', 'left: ' + coords.left + 'px; top: ' + coordsY + 'px; width:' + selectParams.width + 'px;');
        OD.globalDropdown.classList.add('active');

        // options listener
        var options = OD.dropdown.querySelectorAll('.js-select-option');

        options.forEach(function (option) {
          option.addEventListener('click', function () {
            var activeSelects = document.querySelectorAll('.js-select.active');
            activeSelects.forEach(function (activeSelect) {
              var text = activeSelect.querySelector('.js-select-text');

              var value = option.innerText;
              text.innerText = value;

              close(select);
            });
          });
        });
      }
    });

    document.documentElement.addEventListener('click', function (event) {
      var isClickWithinOpenedDiv = top_walker(event.target, function (node) {
        return node === OD.globalDropdown;
      });
      if (isClickWithinOpenedDiv) {} else {
        var isActive = select.classList.contains('active');
        var isBtn = event.target.classList.contains('js-select-btn');

        if (isActive) {
          if (isBtn) {} else {
            close(select);
          }
        } else {}
      }
    }, true);
  });
};

var historySlider = function historySlider() {
  var sliders = document.querySelectorAll('.js-slider-history');

  sliders.forEach(function (slider) {
    var options = {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 400,
      variableWidth: true,
      centerMode: true,
      focusOnSelect: true
    };
    var section = slider.closest('.js-history');
    var msg = section.querySelector('.js-msg');

    $(slider).slick(options);

    $(slider).slick('slickGoTo', 4);

    $(slider).on('afterChange', function (event, slick, currentSlide, nextSlide) {
      var currentSlideNode = slick.$slides[currentSlide];
      var dataDesc = currentSlideNode.getAttribute('data-desc');
      msg.innerText = dataDesc;
    });

    setTimeout(function () {
      section.classList.add('init');
    }, 400);
  });
};

var accordion = function accordion() {
  var btns = document.querySelectorAll('.js-accordion-btn');

  btns.forEach(function (btn) {
    btn.addEventListener('click', function (evt) {
      evt.preventDefault();
      var parentItem = btn.closest('.js-accordion-item');
      var itemSiblings = getSiblings(parentItem);
      var isActive = parentItem.classList.contains('active');

      // show/hide accordion-content
      itemSiblings.forEach(function (itemSibling) {
        itemSibling.classList.remove('active');
      });

      if (isActive) {
        parentItem.classList.remove('active');
      } else {
        parentItem.classList.add('active');
      }

      // scroll to accordion-content
      var btnCoords = getCoords(btn);
      var scrollTop = btnCoords.top - 400;

      window.scroll({
        top: scrollTop,
        behavior: 'smooth'
      });
    });
  });
};

var map = function map() {
  var mapBlocks = document.querySelectorAll("#map");

  mapBlocks.forEach(function (mapBlock) {
    var dataCoords = mapBlock.getAttribute("data-coords");
    var latitude = dataCoords.split(',')[0];
    var longitude = dataCoords.split(',')[1];
    var coords = [];
    coords.push(latitude);
    coords.push(longitude);

    ymaps.ready(function () {
      var myMap = new ymaps.Map("map", {
        center: coords,
        zoom: 14
      }, {
        searchControlProvider: "yandex#search"
      }),
          MyIconContentLayout = ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'),
          myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {
        iconLayout: "default#image",
        iconImageHref: "../assets/img/css/pin.svg",
        iconImageSize: [71, 95],
        iconImageOffset: [-35.5, -47.5]
      });

      // myMap.setCenter(coords);
      myMap.options.set("scrollZoomSpeed", 0);
      myMap.behaviors.disable("scrollZoom");
      myMap.geoObjects.add(myPlacemark);

      // remove drag for mobile
      var mobile = window.matchMedia("(max-width: 980px)").matches;
      if (mobile) {
        myMap.behaviors.disable("drag");
      }

      // remove controls
      myMap.controls.remove("geolocationControl");
      myMap.controls.remove("searchControl");
      myMap.controls.remove("trafficControl");
      myMap.controls.remove("typeSelector");
      myMap.controls.remove("fullscreenControl");
      myMap.controls.remove("rulerControl");
      myMap.controls.remove("zoomControl");

      myMap.controls.add("zoomControl", {
        position: {
          top: "20px",
          right: "20px"
        }
      });
    });
  });
};

var tag = function tag() {
  var tags = document.querySelectorAll('.js-tag');

  tags.forEach(function (tag) {
    tag.addEventListener('click', function () {
      var isActive = tag.classList.contains('active');

      if (isActive) {
        tag.classList.remove('active');
      } else {
        tag.classList.add('active');
      }
    });
  });
};

var cardChannel = function cardChannel() {
  var cards = document.querySelectorAll('.js-card-channel');

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      var cardObj = {};
      cardObj.imgSrc = card.getAttribute('data-imgSrc');
      cardObj.imgSrcWebp = card.getAttribute('data-imgsrcwebp');
      cardObj.title = card.getAttribute('data-title');
      cardObj.titleDesc = card.getAttribute('data-title-desc');
      cardObj.number = card.getAttribute('data-number');
      cardObj.desc = card.getAttribute('data-desc');

      var isCardPopup = document.querySelector('.js-popup-channel') != null;

      if (isCardPopup) {
        var cardPopup = document.querySelector('.js-popup-channel');

        var img = cardPopup.querySelector('.js-img');
        var imgSourceWebp = img.querySelector('.js-source-webp');
        var imgSourcePng = img.querySelector('.js-source-png');
        var imgSourceImg = img.querySelector('.js-source-img');
        var title = cardPopup.querySelector('.js-title');
        var isTitleDesc = cardPopup.querySelectorAll('.js-title-desc').length != 0;
        var titleDesc = cardPopup.querySelector('.js-title-desc');
        var numbers = cardPopup.querySelectorAll('.js-number');
        var desc = cardPopup.querySelector('.js-desc');
        var dataImgType = cardObj.imgSrc.split('.')[1];

        cardPopup.classList.add('active');
        OD.body.classList.add('overflow');
        OD.warningNode.classList.add('hide');

        imgSourceWebp.setAttribute('srcset', '' + cardObj.imgSrcWebp);
        imgSourcePng.setAttribute('srcset', '' + cardObj.imgSrc);
        imgSourcePng.setAttribute('type', 'image/' + dataImgType);
        imgSourceImg.setAttribute('src', '' + cardObj.imgSrc);
        title.innerText = cardObj.title;
        if (isTitleDesc) {
          titleDesc.innerText = cardObj.titleDesc;
        }
        numbers.forEach(function (number) {
          number.innerText = cardObj.number;
        });
        desc.innerText = cardObj.desc;
      }
    });
  });
};

var popupChannel = function popupChannel() {
  var popups = document.querySelectorAll('.js-popup-channel');

  popups.forEach(function (popup) {
    var btnClose = popup.querySelector('.js-close');
    var img = popup.querySelector('.js-img');
    var imgSourceWebp = img.querySelector('.js-source-webp');
    var imgSourcePng = img.querySelector('.js-source-png');
    var imgSourceImg = img.querySelector('.js-source-img');
    var title = popup.querySelector('.js-title');
    var desc = popup.querySelector('.js-desc');
    var content = popup.querySelector('.popup-channel__container');
    var isTitleDesc = popup.querySelectorAll('.js-title-desc').length != 0;
    var isNumber = popup.querySelectorAll('.js-number').length != 0;
    if (isNumber) {
      var _number = popup.querySelector('.js-number');
    }

    var close = function close() {
      popup.classList.remove('active');
      OD.body.classList.remove('overflow');
      OD.warningNode.classList.remove('hide');

      imgSourceWebp.setAttribute('srcset', '');
      imgSourcePng.setAttribute('srcset', '');
      imgSourceImg.setAttribute('src', '');
      title.innerText = '';
      if (isNumber) {
        number.innerText = '';
      }

      if (isTitleDesc) {
        var titleDesc = popup.querySelector('.js-title-desc');
        titleDesc.innerText = '';
      }
      desc.innerText = '';
    };

    btnClose.addEventListener('click', function () {
      close();
    });

    document.addEventListener('keyup', function (e) {
      var isEsc = e.keyCode == OD.ESC_CODE;
      var isActive = popup.classList.contains('active');

      if (isEsc && isActive) {
        close();
      }
    });

    document.documentElement.addEventListener('click', function (event) {
      var isPopupActive = popup.classList.contains('active');
      var isClickWithinOpenedDiv = top_walker(event.target, function (node) {
        return node === content;
      });
      if (isClickWithinOpenedDiv) {} else {
        if (isPopupActive) {
          close();
        }
      }
    }, true);
  });
};

var swiper = function swiper() {
  var swiper = new Swiper('.swiper-container', {
    parallax: true,
    speed: 700,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.js-slider-arrow-prev',
      prevEl: '.js-slider-arrow-next'
    }
  });
};

var toggle = function toggle() {
  var elems = document.querySelectorAll('.js-toggle');
  var toggleBtns = document.querySelectorAll('.js-toggle-btn');

  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var toggle = btn.querySelector('.js-toggle');
      var isActive = toggle.classList.contains('active');

      if (isActive) {
        toggle.classList.remove('active');
      } else {
        toggle.classList.add('active');
      }
    });
  });

  elems.forEach(function (elem) {
    elem.addEventListener('click', function () {
      var isActive = elem.classList.contains('active');

      if (isActive) {
        elem.classList.remove('active');
      } else {
        elem.classList.add('active');
      }
    });
  });
};

var tariffSlider = function tariffSlider() {
  var sliders = document.querySelectorAll('.js-slider-tariff');
  var items = document.querySelectorAll('.js-type-item');

  sliders.forEach(function (slider) {
    var options = {
      dots: true,
      arrows: true,
      infinite: false,
      speed: 400,
      variableWidth: true,
      prevArrow: '<button type="button" class="arrow arrow--prev news-slider__btn news-slider__btn--prev">\n            <svg class="icon icon--circle-arrow-prev">\n              <use xlink:href="#circle-arrow-prev"></use>\n            </svg>\n          </button>',
      nextArrow: '<button type="button" class="arrow arrow--next news-slider__btn news-slider__btn--next">\n        <svg class="icon icon--circle-arrow-next">\n          <use xlink:href="#circle-arrow-next"></use>\n        </svg>\n      </button>',
      responsive: [{
        breakpoint: 980,
        settings: {
          arrows: false
        }
      }]
    };

    $(slider).slick(options);
  });
};

var services = function services() {
  var elems = document.querySelectorAll('.js-services');

  elems.forEach(function (elem) {
    var btn = elem.querySelector('.js-btn');
    var btnClose = elem.querySelector('.js-close');

    btn.addEventListener('click', function () {
      var isActive = elem.classList.contains('active');

      if (isActive) {
        elem.classList.remove('active');
      } else {
        elem.classList.add('active');
      }
    });

    btnClose.addEventListener('click', function () {
      elem.classList.remove('active');
    });
  });
};

var popupGallery = function popupGallery() {
  var popupGalleryObj = {
    slides: [],
    movePrev: function movePrev() {
      var _this = this;

      this.slides.forEach(function (slide, index) {
        var isActive = slide.active == true;
        slide.active = false;

        if (isActive) {
          var prevIndex = index - 1;
          if (prevIndex <= 0) {
            prevIndex = 0;
          }
          var prevSlide = _this.slides[prevIndex];
          prevSlide.active = true;

          _this.changePopup(prevSlide);
        }
      });
    },
    moveNext: function moveNext() {
      var lastIndex = this.slides.length - 1;
      var currentItem = popupGalleryObj.slides.map(function (e) {
        return e.active;
      }).indexOf(true);
      if (currentItem >= lastIndex) {
        currentItem = lastIndex - 1;
      }

      var nextItem = this.slides[currentItem + 1];

      this.slides.forEach(function (slide) {
        slide.active = false;
      });
      nextItem.active = true;

      this.changePopup(nextItem);
    },
    changePopup: function changePopup(slide) {
      var popup = document.querySelector('.js-popup-gallery');
      var img = popup.querySelector('.js-img');
      var imgSourceWebp = img.querySelector('.js-source-webp');
      var imgSourcePng = img.querySelector('.js-source-png');
      var imgSourceImg = img.querySelector('.js-source-img');
      var header = popup.querySelector('.js-header');

      imgSourceWebp.setAttribute('srcset', '' + slide.img);
      imgSourcePng.setAttribute('srcset', '' + slide.img);
      imgSourceImg.setAttribute('src', '' + slide.img);
      header.innerText = slide.header;

      var dataImgType = imgSourcePng.srcset.split('.')[1];

      imgSourcePng.setAttribute('type', 'image/' + dataImgType);
    }
  };
  var openBtns = document.querySelectorAll('.js-popup-gallery-open');
  var isOpenBtn = document.querySelectorAll('.js-popup-gallery-open').length != 0;

  if (isOpenBtn) {
    var btnPrev = document.querySelector('.js-popup-btn--prev');
    var btnNext = document.querySelector('.js-popup-btn--next');
    var isImgFocus = document.querySelector('.js-is-img-focus');

    if (isImgFocus) {
      var popup = document.querySelector('.js-popup-gallery');
      popup.classList.add('popup-gallery--img-focus');
    }

    btnPrev.addEventListener('click', function () {
      popupGalleryObj.movePrev();
    });

    btnNext.addEventListener('click', function () {
      popupGalleryObj.moveNext();
    });

    openBtns.forEach(function (btn) {
      var popup = document.querySelector('.js-popup-gallery');
      var galleryItems = document.querySelectorAll('.js-gallery-item');
      var closeBtn = popup.querySelector('.js-close');
      var img = popup.querySelector('.js-img');
      var imgSourceWebp = img.querySelector('.js-source-webp');
      var imgSourcePng = img.querySelector('.js-source-png');
      var imgSourceImg = img.querySelector('.js-source-img');
      var header = popup.querySelector('.js-header');
      var content = popup.querySelector('.js-content');

      var open = function open(dataImg, dataImgWebp, dataHeader) {
        var itemObj = {};
        var dataImgType = dataImg.split('.')[1];

        OD.body.classList.add('overflow');
        popup.classList.add('active');
        imgSourceWebp.setAttribute('srcset', '' + dataImgWebp);
        imgSourcePng.setAttribute('srcset', '' + dataImg);
        imgSourcePng.setAttribute('type', 'image/' + dataImgType);

        imgSourceImg.setAttribute('src', '' + dataImgWebp);
        header.innerText = dataHeader;

        var currentItem = btn.closest('.js-gallery-item');
        if (currentItem) {
          currentItem.classList.add('active');
        } else {
          var firstItem = document.querySelector('.js-gallery-item');
          firstItem.classList.add('active');
        }

        galleryItems.forEach(function (galleryItem, index) {
          var isActive = galleryItem.classList.contains('active');
          var itemObj = {};
          var dataImg = galleryItem.getAttribute('data-img');
          var dataHeader = galleryItem.getAttribute('data-header');
          itemObj.id = index;
          itemObj.img = dataImg;
          itemObj.header = dataHeader;
          itemObj.active = false;
          if (isActive) {
            itemObj.active = true;
          }
          popupGalleryObj.slides.push(itemObj);
        });
      };

      var close = function close() {
        OD.body.classList.remove('overflow');
        popup.classList.remove('active');
        imgSourceWebp.setAttribute('srcset', '');
        imgSourcePng.setAttribute('srcset', '');
        imgSourceImg.setAttribute('src', '');
        header.innerText = '';

        popupGalleryObj.slides = [];
        galleryItems.forEach(function (galleryItem) {
          galleryItem.classList.remove('active');
        });
      };

      btn.addEventListener('click', function () {
        var dataImg = btn.getAttribute('data-img');
        var dataImgWebp = btn.getAttribute('data-imgwebp');
        var dataHeader = btn.getAttribute('data-header');

        open(dataImg, dataImgWebp, dataHeader);
      });

      closeBtn.addEventListener('click', function () {
        close();
      });

      document.addEventListener('keyup', function (e) {
        var isEsc = e.keyCode == OD.ESC_CODE;
        var isActive = popup.classList.contains('active');

        if (isEsc && isActive) {
          close();
        }
      });

      document.documentElement.addEventListener('click', function (event) {
        var isClickWithinOpenedDiv = top_walker(event.target, function (node) {
          return node === content;
        });
        if (isClickWithinOpenedDiv) {} else {
          close();
        }
      }, true);
    });
  }
};

var mobileForm = function mobileForm() {
  var openBtns = document.querySelectorAll('.js-open-order-form');
  var orderForm = document.querySelector('.js-order-form');

  openBtns.forEach(function (openBtn) {
    var open = function open() {

      orderForm.classList.add('active');
      OD.body.classList.add('overflow');
    };

    var close = function close() {
      orderForm.classList.remove('active');
      OD.body.classList.remove('overflow');
    };

    openBtn.addEventListener('click', function () {
      var isActive = orderForm.classList.contains('active');

      if (isActive) {
        close();
      } else {
        open();
      }
    });
  });
};

var basketPopup = function basketPopup() {
  var openBtns = document.querySelectorAll('.js-basket-open');
  var openBtnsMob = document.querySelectorAll('.js-basket-open-mob');
  var section = document.querySelector('.js-basket');
  var sectionMobile = document.querySelector('.js-basket-mobile');
  var closeBtns = document.querySelectorAll('.js-close-basket');

  var open = function open() {
    section.classList.add('active');
  };

  var close = function close() {
    section.classList.remove('active');
  };

  var openMob = function openMob() {
    sectionMobile.classList.add('active');
    OD.body.classList.add('overflow');
  };

  var closeMob = function closeMob() {
    sectionMobile.classList.remove('active');
    OD.body.classList.remove('overflow');
  };

  openBtns.forEach(function (openBtn) {
    openBtn.addEventListener('click', function () {
      var isActive = section.classList.contains('active');

      if (isActive) {
        close();
      } else {
        open();
      }
    });
  });

  openBtnsMob.forEach(function (openBtnMob) {
    openBtnMob.addEventListener('click', function () {
      var isActive = sectionMobile.classList.contains('active');

      if (isActive) {
        closeMob();
      } else {
        openMob();
      }
    });
  });

  closeBtns.forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
      var basket = closeBtn.closest('.js-basket-mobile');
      basket.classList.remove('active');
      OD.body.classList.remove('overflow');
    });
  });

  document.documentElement.addEventListener('click', function (event) {
    var isClickWithinOpenedDiv = top_walker(event.target, function (node) {
      return node === section;
    });
    var btn = event.target.classList.contains('js-basket-open');

    if (isClickWithinOpenedDiv && !btn) {} else {
      if (!btn) {
        close();
      }
    }
  }, true);
};

var newsSlider = function newsSlider() {
  var sliders = document.querySelectorAll('.js-news-slider');

  sliders.forEach(function (slider) {
    var options = _defineProperty({
      dots: false,
      arrows: true,
      infinite: true,
      speed: 400,
      prevArrow: '<button type="button" class="news-slider__btn news-slider__btn--prev">\n            <svg class="icon icon--circle-arrow-prev">\n              <use xlink:href="#circle-arrow-prev"></use>\n            </svg>\n          </button>',
      nextArrow: '<button type="button" class="news-slider__btn news-slider__btn--next">\n        <svg class="icon icon--circle-arrow-next">\n          <use xlink:href="#circle-arrow-next"></use>\n        </svg>\n      </button>'
    }, 'dots', true);

    $(slider).slick(options);
  });
};

var subTag = function subTag() {
  var btns = document.querySelectorAll('.js-subtag-btn');

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.classList.toggle('active');
    });
  });
};

var switcher = function switcher() {
  var elems = document.querySelectorAll('.js-switcher');
  var cardsContainers = document.querySelectorAll('.js-card-channel-col');

  elems.forEach(function (elem) {
    var btns = elem.querySelectorAll('.js-switcher-btn');

    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isRow = btn.classList.contains('row');

        if (isRow) {
          cardsContainers.forEach(function (cardsContainer) {
            cardsContainer.classList.remove('column');
          });
        } else {
          cardsContainers.forEach(function (cardsContainer) {
            cardsContainer.classList.add('column');
          });
        }
      });
    });
  });
};

var tariffThemeSwitch = function tariffThemeSwitch() {
  var isSection = document.querySelectorAll('.js-tariffs').length != 0;

  if (isSection) {
    var section = document.querySelector('.js-tariffs');
    var elems = section.querySelectorAll('.js-type-li');
    var tabBtns = section.querySelectorAll('.tab-list__li');

    tabBtns.forEach(function (tabBtn) {
      tabBtn.addEventListener('click', function () {
        var tabItemActive = tabBtn.closest('.js-tariffs').querySelector('.js-tab-item.active');
        var activeThemeColor = tabItemActive.querySelector('.js-type-li.active').getAttribute('data-themecolor');

        var imgCol = tabItemActive.querySelector('.js-img-col');
        var typeLi = tabItemActive.querySelectorAll('.js-type-li');

        imgCol.style = 'background: ' + activeThemeColor;
        typeLi.forEach(function (typeLi) {
          var typeItem = typeLi.querySelector('.js-type-item');
          typeItem.style = 'border-color: ' + activeThemeColor;
        });
      });
    });

    elems.forEach(function (elem) {
      elem.addEventListener('click', function () {
        var dataTheme = elem.getAttribute('data-themecolor');

        var tariffCard = elem.closest('.js-tariff-card');
        var imgCol = tariffCard.querySelector('.js-img-col');
        var typeLi = tariffCard.querySelectorAll('.js-type-li');

        imgCol.style = 'background: ' + dataTheme;
        typeLi.forEach(function (typeLi) {
          var typeItem = typeLi.querySelector('.js-type-item');
          typeItem.style = 'border-color: ' + dataTheme;
        });
      });
    });
  }
};

var productAnimate = function productAnimate() {
  var elems = document.querySelectorAll('.js-product-animate');

  elems.forEach(function (elem) {
    var icon = document.querySelector('.js-icon-animate');
    var iconMobile = document.querySelector('.js-icon-animate-mobile');

    elem.addEventListener('click', function () {
      var isActive = elem.querySelector('.js-toggle').classList.contains('active');
      var basket = document.querySelector('.js-basket-open');
      var basketMobile = document.querySelector('.js-basket-open-mob');
      var basketCoords = getCoords(basket);
      var basketCoordsMobile = getCoords(basketMobile);
      var btnCoords = getCoords(elem.querySelector('.icon'));

      if (isActive) {
        icon.animate([{ left: btnCoords.left + 'px', top: btnCoords.top + 'px', opacity: 1 }, { left: basketCoords.left + 37 + 'px', top: basketCoords.top + 10 + 'px', opacity: 0.5 }, { left: basketCoords.left + 37 + 'px', top: basketCoords.top + 10 + 'px', opacity: 0 }], {
          duration: 800,
          easing: 'ease-in'
        });

        iconMobile.animate([{ left: btnCoords.left + 'px', top: btnCoords.top + 'px', opacity: 1 }, { left: basketCoordsMobile.left - 2 + 'px', top: basketCoordsMobile.top - 6 + 'px', opacity: .5 }, { left: basketCoordsMobile.left - 2 + 'px', top: basketCoordsMobile.top - 6 + 'px', opacity: 0 }], {
          duration: 800,
          easing: 'ease-in'
        });
      } else {}
    });
  });
};

var tariffSwitcher = function tariffSwitcher() {
  var btns = document.querySelectorAll('.js-make-tariff');

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isActive = btn.querySelector('.js-toggle').classList.contains('active');
      var currentItem = btn.closest('.js-tariff-item');
      var toggles = currentItem.querySelectorAll('.js-tariff-services .js-toggle');

      var open = function open() {
        toggles.forEach(function (toggle) {
          toggle.classList.add('disabled');
        });
      };

      var close = function close() {
        toggles.forEach(function (toggle) {
          toggle.classList.remove('disabled');
        });
      };

      if (isActive) {
        close();
      } else {
        open();
      }
    });
  });
};

var warning = function warning() {
  var isWarning = document.querySelectorAll('.js-warning').length != 0;

  if (isWarning) {
    var _warning = document.querySelector('.js-warning');
    var btnClose = _warning.querySelector('.js-close');

    btnClose.addEventListener('click', function () {
      var isActive = _warning.classList.contains('active');

      if (isActive) {
        _warning.classList.remove('active');
      } else {
        _warning.classList.add('active');
      }
    });
  }
};

var tariffDetailSlider = function tariffDetailSlider() {
  var sliders = document.querySelectorAll('.js-tariff-detail-slider');

  sliders.forEach(function (slider) {
    var isSlideToIndex = slider.querySelectorAll('.slideTo').length != 0;
    var mobile = window.matchMedia('(max-width: 980px)').matches;
    var slideToIndex = 0;

    if (isSlideToIndex) {
      var slides = slider.querySelectorAll('.js-tariff-item');
      slides.forEach(function (slide, index) {
        var isSlideTo = slide.classList.contains('slideTo');

        if (isSlideTo) {
          if (mobile) {
            slideToIndex = index;
          } else {
            slideToIndex = index - 1;
          }
        }
      });
    }

    console.log(slideToIndex);

    var options = {
      initialSlide: slideToIndex,
      dots: true,
      arrows: true,
      infinite: true,
      speed: 400,
      variableWidth: true,
      prevArrow: '<button type="button" class="arrow arrow--prev news-slider__btn news-slider__btn--prev">\n            <svg class="icon icon--circle-arrow-prev">\n              <use xlink:href="#circle-arrow-prev"></use>\n            </svg>\n          </button>',
      nextArrow: '<button type="button" class="arrow arrow--next news-slider__btn news-slider__btn--next">\n        <svg class="icon icon--circle-arrow-next">\n          <use xlink:href="#circle-arrow-next"></use>\n        </svg>\n      </button>'
    };

    $(slider).slick(options);

    var changeArrowPosition = function changeArrowPosition() {
      var fromMobile = window.matchMedia('(min-width: 981px)').matches;
      if (fromMobile) {
        clearInterval(timer);
        var timer = setTimeout(function () {
          var arrowPrev = slider.closest('div').querySelector('.arrow--prev');
          var arrowNext = slider.closest('div').querySelector('.arrow--next');
          var imgHeight = slider.querySelector('.tariff-detail__img-col').offsetHeight / 2;

          arrowPrev.style.top = imgHeight + 'px';
          arrowNext.style.top = imgHeight + 'px';
        }, 300);
      }
    };

    changeArrowPosition();

    window.addEventListener('resize', function () {
      changeArrowPosition();
    });
  });
};

var OD = {};
OD.body = document.querySelector('body');
OD.ESC_CODE = 27;
OD.siteContent = document.querySelector('.site-content');
OD.footer = document.querySelector('.page-footer');
OD.isIe11 = !!window.MSInputMethodContext && !!document.documentMode;
OD.dropdown = document.querySelector('.js-global-dropdown');
OD.globalDropdown = '';

if (OD.isIe11) {
  OD.body.classList.add('ie11');
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

function top_walker(node, test_func, last_parent) {
  while (node && node !== last_parent) {
    if (test_func(node)) {
      return node;
    }
    node = node.parentNode;
  }
}

// siblings
var getSiblings = function getSiblings(elem) {
  var siblings = [];
  var sibling = elem.parentNode.firstChild;

  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }

  return siblings;
};

var isWarning = document.querySelectorAll('.js-warning').length != 0;
if (isWarning) {
  OD.warningNode = document.querySelector('.js-warning');
}

// utility
masks();
parsley();
wow();
tabs();
select();
accordion();
toggle();
popupGallery();
productAnimate();
tariffSwitcher();

// specific
orderForm();
mobileMenu();
map();
tag();
cardChannel();
popupChannel();
services();
mobileForm();
basketPopup();
subTag();
switcher();
tariffThemeSwitch();
warning();

// sliders
swiper();
historySlider();
tariffSlider();
newsSlider();
tariffDetailSlider();
//# sourceMappingURL=main.js.map
