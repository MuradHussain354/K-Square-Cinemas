(function () {
  var cfg = window.NIRAM_CONFIG || {};
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");

  // nav: solid background after scrolling
  function onScroll() { nav.classList.toggle("is-solid", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // mobile menu
  function setMenu(open) {
    nav.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  burger.addEventListener("click", function () { setMenu(!nav.classList.contains("menu-open")); });
  document.querySelectorAll("#navLinks a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // trailer: load YouTube only when asked
  var player = document.getElementById("player");
  var playBtn = document.getElementById("playBtn");
  function playTrailer() {
    if (player.querySelector("iframe")) return;
    var id = player.getAttribute("data-video-id");
    var f = document.createElement("iframe");
    f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
    f.title = "NIRAM official trailer";
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    f.allowFullscreen = true;
    player.appendChild(f);
    playBtn.hidden = true;
    var label = player.querySelector(".player__label"); if (label) label.hidden = true;
  }
  playBtn.addEventListener("click", playTrailer);
  document.querySelectorAll("[data-trailer-link]").forEach(function (a) {
    a.addEventListener("click", function () { setTimeout(playTrailer, 450); });
  });
  if (cfg.trailerUrl) document.querySelectorAll("[data-trailer-url]").forEach(function (a) { a.href = cfg.trailerUrl; });

  // contact details from config
  var shown = 0;
  function show(field, fn) {
    var li = document.querySelector("[data-field=" + field + "]");
    if (!cfg[field] || !li) return;
    fn(li); li.hidden = false; shown++;
  }
  show("email", function () { var a = document.getElementById("cEmail"); a.textContent = cfg.email; a.href = "mailto:" + cfg.email; });
  show("phone", function () { var a = document.getElementById("cPhone"); a.textContent = cfg.phone; a.href = "tel:" + cfg.phone.replace(/[^+\d]/g, ""); });
  show("address", function () { document.getElementById("cAddress").textContent = cfg.address; });

  var socials = 0;
  ["instagram", "youtube", "facebook"].forEach(function (k) {
    var a = document.querySelector("[data-social=" + k + "]");
    if (a && cfg[k]) { a.href = cfg[k]; a.hidden = false; socials++; }
  });
  if (socials) { document.getElementById("social").hidden = false; shown++; }
  if (shown) document.getElementById("contactEmpty").hidden = true;
})();
