(function () {
  const devices = {
    desktop: { videos: 3 },
    tablet: { videos: 2 },
    mobile: { videos: 1 }
  };

  const navLinks = document.querySelectorAll('.nav a');
  const navEls = document.querySelectorAll('[id]');

  const hamburger = document.querySelector('.hamburger');

  const components = document.getElementById('components');

  let siema;
  let dots;

  setHandler(window, 'DOMContentLoaded', initOnReady);
  setHandler(window, 'load', initVideos);
  setHandler(window, 'resize', debounce(initVideos, 100));

  function setHandler(els, eventType, handler, options) {
    const setHandler = (el) => {
      el.removeEventListener(eventType, handler);
      el.addEventListener(eventType, handler, options);
    };

    if (els.length) {
      els.forEach(el => setHandler(el));
    } else {
      setHandler(els)
    }
  }

  function initOnReady() {
    const body = document.querySelector('body');

    setEffects();
    scrollSpy(navEls);
    setScrolled(body);

    setHandler(window, 'scroll', scrolledHandler(), { passive: true });
    setHandler([...navLinks], 'click', navigateTo, false);
    setHandler(window, 'hashchange', hashchangeHandler);
    setHandler(hamburger, 'click', toggleMenu);
    setHandler(components, 'click', componentsClick, false);

    setHandler(window, 'resize', componentsClick);
  }

  function initVideos() {
    if (siema) {
      siema.destroy(true);
    }
    if (dots) {
      dots.destroy();
    }

    const root = document.documentElement;
    const deviceType = getComputedStyle(root).getPropertyValue('--device-type').trim();
    const deviceSettings = devices[deviceType];
    const els = document.querySelectorAll('a.video');
    const isTouch = isTouchDevice();
    const videosLength = els.length;

    let slideIndex = 0;

    els.forEach(setPreview);

    dots = new Dots({ selector: '#how .dots', length: els.length });
    siema = new Siema({
      selector: '.videos',
      duration: 500,
      easing: 'ease-out',
      perPage: deviceSettings.videos,
      startIndex: 0,
      draggable: isTouch,
      multipleDrag: isTouch,
      threshold: 60,
      loop: true,
      rtl: false,
      onInit: () => {
        dots.setActive(slideIndex);
      },
      onChange: () => {
        slideIndex = siema.currentSlide < 0 ? videosLength + siema.currentSlide : siema.currentSlide
        dots.setActive(slideIndex);
      },
    });

    setHandler(document.querySelector(".control.prev"), "click", () => siema.prev());
    setHandler(document.querySelector(".control.next"), "click", () => siema.next());
  }

  function setPreview(el) {
    const foundPicture = el.querySelector('picture');
    if (foundPicture) {
      foundPicture.parentNode.removeChild(foundPicture);
    }
    const foundPlay = el.querySelector('.play');
    if (foundPlay) {
      foundPlay.parentNode.removeChild(foundPlay);
    }

    const id = getSearchParams(el.search).v;

    const imgSrc = `//img.youtube.com/vi/${id || ''}/0.jpg`;
    const imgSrcHD = `//img.youtube.com/vi/${id || ''}/maxresdefault.jpg`;
    const webpSrc = `//img.youtube.com/vi_webp/${id || ''}/0.webp`;
    const webpSrcHD = `//img.youtube.com/vi_webp/${id || ''}/maxresdefault.webp`;

    const medias = {
      source: [
        { srcset: `${webpSrc} 1x, ${webpSrcHD} 2x`, type: "image/webp" },
        { srcset: `${imgSrc} 1x, ${imgSrcHD} 2x` }
      ],
      img: { src: imgSrc, height: "100%" }
    };

    const playElement = document.createElement('span');
    playElement.classList.add('play');
    playElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"><use xlink:href="images/icons.svg#video-play"></use></svg>';

    el.appendChild(getPicture(medias));
    el.appendChild(playElement);
  }

  function Dots(options) {
    const dots = [];

    for (let i = 0; i < options.length; i++) {
      const dot = document.createElement('span')
      dot.setAttribute('class', 'dot');
      document.querySelector(options.selector).append(dot)
      dots.push(dot);
    }

    return {
      setActive: (index) => {
        dots.forEach(dot => dot.classList.remove('active'))
        dots[index].classList.add('active');
      },
      destroy: () => {
        dots.forEach(dot => {
          dot.parentNode.removeChild(dot)
        });
      }
    }
  }

  function getPicture(medias) {
    const picture = document.createElement('picture');

    medias.source.forEach(src => {
      const { srcset, type } = src;
      const source = document.createElement('source');

      source.srcset = srcset;

      if (type) {
        source.type = type;
      }

      picture.appendChild(source);
    });

    const image = document.createElement('img');
    image.setAttribute('src', medias.img.src);
    image.setAttribute('height', medias.img.height);
    image.setAttribute('alt', '');
    picture.appendChild(image);

    return picture;
  }

  function getSearchParams(search) {
    return search.slice(1).split('&').reduce((obj, part) => {
      const [key, value] = part.split('=');

      return { ...obj, [key]: value }
    }, {})
  }

  function componentsClick(e) {
    const current = e.target;
    current.dispatchEvent(new Event('hover'));
  }

  function toggleMenu() {
    const menuToggle = 'has-menu';
    const hasMenu = root.classList.contains(menuToggle);

    root.classList[hasMenu ? 'remove' : 'add'](menuToggle);
  }

  function navigateTo(e) {
    e.preventDefault();

    const destination = document.querySelector(e.target.hash);
    window.scrollTo(null, destination.offsetTop);
  }

  function hashchangeHandler() {
    navLinks.forEach(({ classList }) => classList.remove('current'));
    [...navLinks].filter(({ hash }) => hash === location.hash).forEach(el => el.classList.add('current'));
  }

  function scrolledHandler() {
    const body = document.querySelector('body');
    let scrolledTimeout;

    return () => {
      if (scrolledTimeout) {
        window.cancelAnimationFrame(scrolledTimeout);
      }

      scrolledTimeout = window.requestAnimationFrame(function () {
        setScrolled(body);
      });
    }
  }

  function setScrolled(el) {
    if (isDocumentScrolled()) {
      el.classList.add('scrolled');
    } else {
      el.classList.remove('scrolled');
    }
  }

  function isDocumentScrolled() {
    return Boolean(window.scrollY > 5);
  }

  function scrollSpy(navEls) {
    const onChange = (entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          history.pushState(null, null, '#' + entry.target.id);
          window.dispatchEvent(new Event('hashchange'));
        }
      });
    };
    const config = {
      root: null,
      rootMargin: '-30%',
      threshold: 0
    };

    const observer = new IntersectionObserver(onChange, config);

    IntersectionObserver.prototype.POLL_INTERVAL = 100;
    navEls.forEach(el => observer.observe(el))
  }

  function setEffects() {
    const levMaxDiff = 10;
    const levitateDur = 1;
    const opMaxDiff = 0.2;
    const opacityDur = 0.1;

    const getRndPos = () => (Math.random() * levMaxDiff).toFixed(1) - levMaxDiff + "px";
    const getRndOp = () => (1 - Math.random() * opMaxDiff).toFixed(3);

    const initInterval = (varName, fn, durVar, rnds) =>
      setInterval(
        () => rnds.forEach(el => el.style.setProperty(varName, fn() + "")),
        durVar * 1000 - 10
      );

    const rnds = document.querySelectorAll(".rnd");
    const root = document.documentElement;
    const levitate = getByClassName(rnds, 'levitate');
    const opacity = getByClassName(rnds, 'opacity');

    root.style.setProperty("--levDur", levitateDur + "s");
    root.style.setProperty("--opDur", opacityDur + "s");

    initInterval("--rndPos", getRndPos, levitateDur, levitate);
    initInterval("--rndOp", getRndOp, opacityDur, opacity);
  }

  function getByClassName(els, className) {
    return [...els].filter(el => el.classList.contains(className))
  }

  function debounce(func, delay) {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
  }

  function isTouchDevice() {
    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
    const mq = function (query) {
      return window.matchMedia(query).matches;
    };

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      return true;
    }

    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
  }
}());
