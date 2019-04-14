(function () {
  let scrolledTimeout;
  const body = document.querySelector('body');
  setScrolled(body);

  const navLinks = document.querySelectorAll('.nav a');
  const navEls = document.querySelectorAll('[id]');

  scrollSpy(navEls);

  setHandler(window, 'scroll', scrolledHandler, false);
  setHandler(window, 'hashchange', hashchangeHandler);

  setEffects();

  function setHandler(el, eventType, handler, options) {
    el.removeEventListener(eventType, handler);
    el.addEventListener(eventType, handler, options);
  }

  function hashchangeHandler() {
    navLinks.forEach(el => el.getAttribute('href') === location.hash ? el.classList.add('current') : el.classList.remove('current'));
  }

  function scrolledHandler() {
    if (scrolledTimeout) {
      window.cancelAnimationFrame(scrolledTimeout);
    }

    scrolledTimeout = window.requestAnimationFrame(function () {
      setScrolled(body);
    });
  }

  function isDocumentScrolled() {
    return Boolean(window.scrollY);
  }

  function setScrolled(el) {
    if (isDocumentScrolled()) {
      el.classList.add('scrolled');
    } else {
      el.classList.remove('scrolled');
    }
  }

  function scrollSpy(navEls) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          history.pushState(null, null, '#' + entry.target.id);
          window.dispatchEvent(new Event('hashchange'));
        }
      });
    });

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

    root.style.setProperty("--levDur", levitateDur + "s");
    root.style.setProperty("--opDur", opacityDur + "s");

    initInterval("--rndPos", getRndPos, levitateDur, rnds);
    initInterval("--rndOp", getRndOp, opacityDur, rnds);
  }

}());
