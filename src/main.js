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

  const videoContainer = document.querySelector(
    "div.relative.aspect-video.w-full"
  );
  const hls = new Hls();
  const videoDom = document.createElement("video");
  videoDom.poster = data.thumbnailUrl;
  videoDom.controls = true;
  videoDom.className =
    "video aspect-video h-full w-full rounded-md object-contain";

  hls.loadSource(data.contentUrl);
  hls.attachMedia(videoDom);

  videoContainer.innerHTML = "";
  videoContainer.appendChild(videoDom);
}

setTimeout(inject, 1000);
