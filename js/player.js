window.addEventListener('DOMContentLoaded', vereafy)
;

function vereafy () {
    // Add list of play buttons to this array
    const playButtonSelectors = [
        "#playVideoBtn",
        "#new-in-js",
        "#steve-jobs-video",
        "#playIcon",
        "#thumbOverlay",
        "#playIcon2",
        "#thumbOverlay2"
    ];
    const ua = navigator.userAgent;
    const isIOSSafari = /AppleWebKit.*Safari\//i.test(ua) && !ua.includes('Chrome');
    if (isIOSSafari) {
        var h1 = document.getElementById('main-caption');
        var att = document.createAttribute('class');
        att.value = 'ios-safari-patch';
        h1.setAttributeNode(att);
    }

    var modal = document.querySelector('#modal');
    // Video Thumbnail holder
    const playerMaskClass = 'hover-inner-image';
    const hideElementClass = 'hide-element';
    const videoThumb = document.querySelector('#videoThumb');
    const playerDiv = document.querySelector('#videoPlayer');
    const maskDiv = document.querySelector('#mask');
    let videoActive = false;

    // Setting up to listen for play click from several buttons
    const btnTriggers = [];
    const totalPlayButtons = playButtonSelectors.length
    if (totalPlayButtons > 0) {
        for (let i = 0; i < totalPlayButtons; i++) {
            btnTriggers.push(document.querySelector(playButtonSelectors[i]))
        }
    }

    // Calculate Video Player Position
    function calculateVideoPlayerPositionAndDimension () {
        // Get window
        let playerWidth = window.innerWidth > 1080 ? 1080 : (window.innerWidth - (0.1 * window.innerWidth));
        // Calculate player height
        let playerHeight = Math.round(playerWidth * 9 / 16);
        let outerHeight = window.innerHeight;
        playerHeight = playerHeight > outerHeight ? outerHeight - 80 : playerHeight;
        playerWidth = playerHeight * 16 / 9;
        const leftPosition = ((window.innerWidth - playerWidth) / 2);
        const topPosition = ((outerHeight - playerHeight) / 2);
        var leftPositionPercentage = leftPosition * 100 / window.innerWidth;
        return {
            width: playerWidth,
            height: playerHeight,
            leftPx: leftPosition,
            topPx: topPosition,
            leftPercentage: leftPositionPercentage
        };
    }

    window.addEventListener('resize', e => {
        if (videoActive) {
            let playerDimension = calculateVideoPlayerPositionAndDimension();
            playerDiv.setAttribute('style', `left: ${playerDimension.leftPercentage}%; top: ${playerDimension.topPx}px; height: ${playerDimension.height}px`);
            playerDimension = calculateVideoPlayerPositionAndDimension();
            const playerFrame = document.querySelector('#videoIframe');
            playerFrame.setAttribute('width', playerDimension.width);
            playerFrame.setAttribute('height', playerDimension.height);
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }

        // If a button is clicked to begin the video play
        if (btnTriggers.indexOf(e.target) > -1) {
            launchPlayer(e.target.getAttribute("ccl-video-src"))
        }

        // Launches Player and Starts playing the video
        function launchPlayer(videoSrc) {
            // Show video when launched
            let playerDimension = calculateVideoPlayerPositionAndDimension();
            playerDiv.setAttribute('style', `left: ${playerDimension.leftPercentage}%; top: ${playerDimension.topPx}px; height: ${playerDimension.height}px`);
            
            playerDiv.innerHTML = `<iframe id="videoIframe" width="${playerDimension.width}" height="${playerDimension.height}" src="${videoSrc}?rel=0&amp;showinfo=0&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            maskDiv.classList.remove(hideElementClass);
            videoActive = true;

            const closeBtn = document.querySelector('#closePlayer');
            document.addEventListener('click', e => {
                if ([closeBtn, maskDiv].indexOf(e.target) > -1) {
                    playerDiv.innerHTML = '';
                    maskDiv.classList.add(hideElementClass);
                    videoActive = false;
                }
            });
        }
    });

    // Listen for mouseover on the thumbnail
    document.addEventListener('mouseover', (e) => {
        if ([videoThumb, playIcon].indexOf(e.target) > -1 && thumbOverlay.classList.contains(playerMaskClass) === false) {
            thumbOverlay.classList.add(playerMaskClass);
        }
    });

    // Listen for when mouse leaves the thumbnail
    document.addEventListener('mouseout', (e) => {
        if ([videoThumb, playIcon].indexOf(e.target) > -1 && thumbOverlay.classList.contains(playerMaskClass)) {
            thumbOverlay.classList.remove(playerMaskClass);
        }
    });
}
