(function () {
  const root = document.documentElement;
  const body = document.querySelector('body');

  const navLinks = document.querySelectorAll('.nav a');
  const navEls = document.querySelectorAll('[id]');

  const hamburger = document.getElementById('hamburger');

  const components = document.getElementById('components');

  setHandler(window, 'DOMContentLoaded', init);

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

  function init() {
    const deviceType = getComputedStyle(root).getPropertyValue('--device-type').trim();

    setHandler(window, 'scroll', scrolledHandler(), false);
    setHandler([...navLinks], 'click', navigateTo, false);
    setHandler(window, 'hashchange', hashchangeHandler);
    setHandler(hamburger, 'click', toggleMenu);
    setHandler(components, 'click', componentsClick, false);

    setHandler(window, 'resize', componentsClick);

    setEffects();
    scrollSpy(navEls);
    setScrolled(body);

    let galleryPageSize;

    switch (deviceType) {
      case 'desktop':
        galleryPageSize = 3;
        break;
      case 'tablet':
        galleryPageSize = 2;
        break;
      default:
        galleryPageSize = 1;
    }

    initVideos();

    new Siema({
      selector: '.videos',
      duration: 500,
      easing: 'ease-out',
      perPage: galleryPageSize,
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
    els.forEach(el => el.style.backgroundImage = `url(//img.youtube.com/vi/${getSearchParams(el.search).v || ''}/0.jpg)`);
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

    console.log(e.target.hash, destination.offsetTop, window.screenTop);

    window.scrollTo(null, destination.offsetTop);
  }

  function hashchangeHandler() {
    navLinks.forEach(({classList}) => classList.remove('current'));
    [...navLinks].filter(({hash}) => hash === location.hash).forEach(el => el.classList.add('current'));
  }

  function scrolledHandler() {
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
