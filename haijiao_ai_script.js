
// ==UserScript==
// @name           haijiao-ai-script
// @namespace      haijiao-ai-script
// @version        0.0.1
// @author         forgetme8
// @description    破解 海角社区破解版(https://haijiao.ai) VIP,免登录观看视频, TG频道:@svip_nav.本插件完全免费,请注意甄别,避免上当受骗.
// @run-at         document-end
// @match          https://haijiao.com/*
// @match          https://haijiao.ai/topic/*
// @match          https://hjai.cc/*
// @match          https://*/topic/*
// @require        https://cdn.jsdelivr.net/npm/hls.js@1
// @homepage       https://github.com/sex2048/haijiao_ai_script#readme
// @supportURL     https://github.com/sex2048/haijiao_ai_script/issues
// ==/UserScript==
(function () {
  'use strict';

  function inject() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].type == "application/ld+json") {
        var json = JSON.parse(scripts[i].innerText);
        replace_dom(json);
      }
    }
  }
  function replace_dom(data) {
    console.log(data);
    const titleDom = document.querySelector("h1.my-4.text-xl.font-medium");
    const span = document.createElement("span");
    span.innerHTML = "已破解";
    span.className = "text-xl px-2 font-bold text-danger-500";
    titleDom.appendChild(span);
    const videoContainer = document.querySelector("div.relative.aspect-video.w-full");
    const hls = new Hls();
    const videoDom = document.createElement("video");
    videoDom.poster = data.thumbnailUrl;
    videoDom.controls = true;
    videoDom.className = "video aspect-video h-full w-full rounded-md object-contain";
    hls.loadSource(data.contentUrl);
    hls.attachMedia(videoDom);
    videoContainer.innerHTML = "";
    videoContainer.appendChild(videoDom);
  }
  setTimeout(inject, 1000);

})();
