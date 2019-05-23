var windowHeight =  Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    lastTop;

window.addEventListener('scroll', function(event) {
  var title1 = document.getElementById('title1'),
      top = title1.getBoundingClientRect().top,
      offset = top - windowHeight;

      if (offset > 0) {
        title1.classList.remove('parallax');
        return;
      }

      if (top < windowHeight / 2 && top > lastTop) {
        title1.classList.remove('parallax');
      }

      if (title1.className.indexOf('parallax') === -1 && top < lastTop) {
        title1.classList.add('parallax');
      }

      lastTop = top;

});
