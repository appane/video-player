# Appane YouTube Video Player
This plugin enables you to quickly activate a fancy video play on your website.

## How to Install
After cloning this plugin, simple add the following css link to your __head__ tag


    <link rel="stylesheet" href="./path/to/css/player.p.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

Add the following HTML code to the bottom of your page. Just **before** the closing **body** tag

    <!-- Video Player -->
    <div id="mask" class="hide-element">
        <div id="videoPlayer"></div>
        <i id="closePlayer" class="material-icons">close</i>
    </div>

And finally include the JavaScript that knits it all together at bottom **after** your closing **body** tag.

    <script src="./path/to/js/player.js"></script>

## Playing Video from Button
Copy the sample button to the location where you want to place your play video button on your web page. Customize to suit your branding. Replace ccl-video-src with your youtube video embed link.

Sample button:

    <button id="playVideoBtn" ccl-video-src="https://www.youtube.com/embed/OmLoMDHcBns">Watch Cecula API Tour</button>

## Playing Video from Thumbnail
Copy the sample code below to the section on your web page where you want to display the video thumbnail.

Sample Thumbnail:

    <div class="launch-image-holder">
        <div id="thumb1" class="launch-image1 videoThumb">
            <div class="launch-image-inner" ccl-video-src="https://www.youtube.com/embed/OmLoMDHcBns">
                <div class="launch-image-playhead" ccl-video-src="https://www.youtube.com/embed/OmLoMDHcBns"></div>
            </div>
        </div>
    </div>

Add the thumbnail ID in the __thumbnailElements__ array __js/player.js__ script.

## Adding Thumbnail
To add a new thumbnail to your video, save your designed thumbnail to the **media** folder, create a css file to generate the background image and attach the image class to you videoThumb class.  

## Conclusion
Congratulations!!! Your website should be playing your YouTube videos by now. Feel free to fork this repo and let's make it work better.