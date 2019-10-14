// websiteadress/?search=value
// Parse the URL parameter
window.addEventListener("load", () => {

	function getParameterByName(name, url) {
	if (!url) {
	url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	//Example https://dothingsyourway.com/recources/?video=https://www.youtube.com/embed/5tJW01BqFtI?feature=oembed&?heading=How%20to%20start%20an%20online%20business&?t=testingtrackingmfs&?sfm=false
	//get parameters
	let heading = getParameterByName("heading");
	let tracking = getParameterByName("t");
	let videoUrl = getParameterByName("video");
	let sfm = getParameterByName("sfm");

	//get Id's from page
  let embeddedVideo = document.getElementById("embeddedVideo");
  let sfmVideo = document.getElementById("sfm-video");
	let headingText =	document.getElementById("headingText")
	let ctaBtn = document.getElementById("ctaBtn")

	//set heading text
 	headingText.innerHTML = heading;

	if ( tracking != null ) {
		let urlBefore = ctaBtn.getAttribute("href");
		ctaBtn.setAttribute("href", urlBefore + tracking);
	};

  if ( sfm == "true" ) {
    //sfm-video-id="z2pusPLT5BH9UQjNSut2xAwL" class="playButton volumeControl fullscreenButton
    embeddedVideo.parentNode.removeChild(embeddedVideo);
    sfmVideo.setAttribute("sfm-video-id", videoUrl);
    sfmVideo.classList.add("playButton", "volumeControl", "fullscreenButton");
    //START code from https://sfm.video/watch.js
    /*jslint browser: true */
    /*global $ */
    /*global ActiveXObject */
    'use strict';
    (function () {

        function runAjax(container, hash, options) {

            var xhttpRequest = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

            // Sets videoToken session for authorizing video delivery
            xhttpRequest.onreadystatechange = function () {
                if (xhttpRequest.readyState === 4 && xhttpRequest.status === 500) {
                    console.log(hash);
                    console.log(index);
                }
                if (xhttpRequest.readyState === 4 && xhttpRequest.status === 200) {
                    var iframe = document.createElement('iframe'),
                        outsideContainer = document.createElement('div'),
                        insideContainer = document.createElement('div'),
                        data = JSON.parse(xhttpRequest.responseText);
                    outsideContainer.style = 'padding:56.25% 0 0 0;position:relative;height:0;';
                    insideContainer.style = 'height:100%;left:0;position:absolute;top:0;width:100%;';
                    iframe.frameBorder = 0;
                    iframe.src = data.domain + '?watch=' + hash + '&token=' + data.token + '&options=' + options;
                    iframe.width = '100%';
                    iframe.height = '100%';
                    if (options.includes('fullscreenButton')) {
                        iframe.setAttribute('allowfullscreen', '');
                        iframe.setAttribute('mozallowfullscreen', '');
                        iframe.setAttribute('webkitallowfullscreen', '');
                        iframe.setAttribute('oallowfullscreen', '');
                        iframe.setAttribute('msallowfullscreen', '');
                    }
                    // Put it all together
                    insideContainer.appendChild(iframe);
                    outsideContainer.appendChild(insideContainer);
                    container.parentNode.insertBefore(outsideContainer, container.nextSibling);
                    // container.remove();
                }
            };
            xhttpRequest.open("POST", "https://sfm.video/token", true);
            xhttpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttpRequest.send('domain=' + window.location.hostname + '&uri=' + window.location.pathname + '&hash=' + hash);
        }

        var videos = document.querySelectorAll('[sfm-video-id]'),
            index = videos.length - 1,
            container = videos[index],
            hash = container.getAttribute('sfm-video-id'),
            options = container.getAttribute('class').split(' ');

        window.setTimeout(function () {
            runAjax(container, hash, options);
        }, 500 * index);
    }());
    //END code from https://sfm.video/watch.js
  } else {
    sfmVideo.parentNode.removeChild(sfmVideo);
    if ( videoUrl != null ) {
  		document.getElementsByTagName("iframe")[0].setAttribute("src", videoUrl);

  		setTimeout(function(){
  			embeddedVideo.style.opacity = 1;
  		}, 1000);

  	};
  }
});
