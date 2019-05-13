(function () {
  const videosByDevice = {
    desktop: 3,
    tablet: 2,
    mobile: 1
  };

  const navLinks = document.querySelectorAll('.nav a');
  const navEls = document.querySelectorAll('[id]');

  const hamburger = document.querySelector('.hamburger');

  const components = document.getElementById('components');

  setHandler(window, 'DOMContentLoaded', initOnReady);
  setHandler(window, 'load', initOnLoad);

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

    setHandler(window, 'scroll', scrolledHandler(), {passive: true});
    setHandler([...navLinks], 'click', navigateTo, false);
    setHandler(window, 'hashchange', hashchangeHandler);
    setHandler(hamburger, 'click', toggleMenu);
    setHandler(components, 'click', componentsClick, false);

    setHandler(window, 'resize', componentsClick);
  }

  function initOnLoad() {
    const root = document.documentElement;
    const deviceType = getComputedStyle(root).getPropertyValue('--device-type').trim();

    initVideos();

    new Siema({
      selector: '.videos',
      duration: 500,
      easing: 'ease-out',
      perPage: videosByDevice[deviceType],
      startIndex: 0,
      draggable: true,
      multipleDrag: true,
      threshold: 60,
      loop: true,
      rtl: false,
      onInit: () => {
      },
      onChange: () => {
      },
    });
  }

  function initVideos() {
    const els = document.querySelectorAll('a.video');
    const carouselState = {scrolled: false, pressed: false};

    els.forEach(el => {
      const foundPicture = el.querySelector('picture');
      if (foundPicture) {
        el.removeChild(foundPicture);
      }

      const id = getSearchParams(el.search).v;

      const imgSrc = `//img.youtube.com/vi/${id || ''}/0.jpg`;
      const imgSrcHD = `//img.youtube.com/vi/${id || ''}/maxresdefault.jpg`;
      const webpSrc = `//img.youtube.com/vi_webp/${id || ''}/0.webp`;
      const webpSrcHD = `//img.youtube.com/vi_webp/${id || ''}/maxresdefault.webp`;

      const medias = {
        source: [
          {srcset: `${webpSrc} 1x, ${webpSrcHD} 2x`, type: "image/webp"},
          {srcset: `${imgSrc} 1x, ${imgSrcHD} 2x`}
        ],
        img: {src: imgSrc}
      };

      el.appendChild(getPicture(medias));

      setHandler(el, 'mousedown', handleMouseDown);
      setHandler(el, 'mousemove', handleMouseMove);
      setHandler(el, 'click', handleClick);
      setHandler(el.querySelector('svg'), 'click', preventToParent);
    });

    function preventToParent(e) {
      e.target.parentElement.dispatchEvent(e);
    }

    function handleMouseDown() {
      carouselState.pressed = true;
    }

    function handleMouseMove() {
      if (carouselState.pressed) {
        carouselState.scrolled = true;
      }
    }

    function handleClick(e) {
      if (carouselState.scrolled) {
        console.log('scrolled');
        carouselState.scrolled = false;
        carouselState.pressed = false;

        e.preventDefault();
        e.stopPropagation();
      }
    }
  }

  function getPicture(medias) {
    const picture = document.createElement('picture');

    medias.source.forEach(src => {
      const {srcset, type} = src;
      const source = document.createElement('source');

      source.srcset = srcset;

      if (type) {
        source.type = type;
      }

      picture.appendChild(source);
    });

    const image = document.createElement('img');
    image.alt = '';
    image.src = medias.img.src;
    picture.appendChild(image);

    return picture;
  }


  function getSearchParams(search) {
    return search.slice(1).split('&').reduce((obj, part) => {
      const [key, value] = part.split('=');

      return {...obj, [key]: value}
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
    navLinks.forEach(({classList}) => classList.remove('current'));
    [...navLinks].filter(({hash}) => hash === location.hash).forEach(el => el.classList.add('current'));
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
}());
