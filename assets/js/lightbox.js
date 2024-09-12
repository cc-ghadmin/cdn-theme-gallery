import PhotoSwipeLightbox from "./photoswipe/photoswipe-lightbox.esm.js";
import PhotoSwipe from "./photoswipe/photoswipe.esm.js";
import PhotoSwipeDynamicCaption from "./photoswipe/photoswipe-dynamic-caption-plugin.esm.min.js";
import * as params from "@params";

const gallery = document.getElementById("gallery");

if (gallery) {
  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: ".gallery-item",
    showHideAnimationType: "zoom",
    bgOpacity: 1,
    pswpModule: PhotoSwipe,
    imageClickAction: "close",
    paddingFn: (viewportSize) => {
      return viewportSize.x < 700
        ? {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }
        : {
            top: 30,
            bottom: 30,
            left: 0,
            right: 0,
          };
    },
    closeTitle: params.closeTitle,
    zoomTitle: params.zoomTitle,
    arrowPrevTitle: params.arrowPrevTitle,
    arrowNextTitle: params.arrowNextTitle,
    errorMsg: params.errorMsg,
  });

  //  Download Button
  lightbox.on("uiRegister", () => {
    lightbox.pswp.ui.registerElement({
      name: "download-button",
      order: 9,
      isButton: true,
      tagName: "a",
      html: {
        isCustomSVG: true,
        inner: '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
        outlineID: "pswp__icn-download",
      },
      onInit: (el, pswp) => {
        el.setAttribute("download", "");
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
        el.setAttribute("title", params.downloadTitle || "Download");
        pswp.on("change", () => {
          // el.href = pswp.currSlide.data.element.href;
          el.href = `${window.location.origin}/${pswp.currSlide.data.src}`;
          var copyText = el.href;
          /* Copy the text */
          if (window.isSecureContext){
            navigator.clipboard.writeText(copyText);
          }
          // Some debugging
          // console.log('[CC Logging] copyText:', copyText);
          // console.log('[CC Logging] pswpSrc:', pswp.currSlide.data.element.dataset.pswpSrc);
          // console.log('[CC Logging] href:', pswp.currSlide.data.element.href);
          // console.log('[CC Logging] src:', pswp.currSlide.data.src);
          // console.log(`[CC Logging] copyURL: ${window.location.origin}/${pswp.currSlide.data.src}`);
        });
      },
    });
  });

/*
  //  Copy to Clipboard Button
  lightbox.on("uiRegister", () => {
    lightbox.pswp.ui.registerElement({
      name: "copy-button",
      order: 8,
      isButton: true,
      tagName: "a",
      html: '<svg ria-hidden="true" class="pswp__icn-copy" viewBox="-17 -19 52 52"><path d="M15 17v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.2"/><rect width="12" height="14" x="7" y="3" data-name="primary" rx="1" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.2"/></svg>',
      onInit: (el, pswp) => {
        el.setAttribute("download", "");
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
        el.setAttribute("title", params.downloadTitle || "Copy to Clipboard");
        pswp.on("change", () => {
          var copyText = el.href;
          Copy the text
          if (window.isSecureContext){
            navigator.clipboard.writeText(copyText);
          }
          // Some debugging
          // console.log('[CC Logging] copyText:', copyText);
          // console.log('[CC Logging] pswpSrc:', pswp.currSlide.data.element.dataset.pswpSrc);
          // console.log('[CC Logging] href:', pswp.currSlide.data.element.href);
          // console.log('[CC Logging] src:', pswp.currSlide.data.src);
          // console.log(`[CC Logging] copyURL: ${window.location.origin}/${pswp.currSlide.data.src}`);
        });
      },
    });
  });
*/

  // Copy to Clipboard button
  lightbox.on("uiRegister", () => {
    lightbox.pswp.ui.registerElement({
      name: "info-button",
      order: 8,
      isButton: true,
      html: '<svg ria-hidden="true" class="pswp__icn-copy" viewBox="-17 -15 52 52"><path d="M15 17v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.2"/><rect width="12" height="14" x="7" y="3" data-name="primary" rx="1" style="fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2.2"/></svg>',
      onClick: (el, pswp) => {
        var copyText = window.location.origin + lightbox.pswp.currSlide.data.src;
        // console.log('[CC Logging] copyText:', copyText);
        if (window.isSecureContext){
          navigator.clipboard.writeText(copyText);
        }
        // Some debugging
        // console.log('[CC Logging] Original Image Name:', originalImage);
        // console.log('[CC Logging] Modified Image Name:', modifiedImage);
      },
    });
  });

  // Info button
  lightbox.on("uiRegister", () => {
    lightbox.pswp.ui.registerElement({
      name: "info-button",
      order: 7,
      isButton: true,
      html: '<svg ria-hidden="true" class="pswp__icn-info" viewBox="-13 -14 52 52"><circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2.2"/><path stroke="#fff" stroke-linecap="round" stroke-width="2.2" d="M12 17v-6"/><circle cx="1" cy="1" r="1" fill="#fff" transform="matrix(1 0 0 -1 11 9)"/></svg>',
      onClick: (el, pswp) => {
        var originalImage = lightbox.pswp.currSlide.data.element.pathname.split('/').pop();
        var modifiedImage = lightbox.pswp.currSlide.data.src.split('/').pop();
        confirm(`Original Image: ${originalImage}\n\nModified Image: ${modifiedImage}`);
        // Some debugging
        // console.log('[CC Logging] Original Image Name:', originalImage);
        // console.log('[CC Logging] Modified Image Name:', modifiedImage);
      },
    });
  });

  lightbox.on("change", () => {
    history.replaceState("", document.title, "#" + lightbox.pswp.currSlide.index);
  });

  lightbox.on("close", () => {
    history.replaceState("", document.title, window.location.pathname);
  });

  new PhotoSwipeDynamicCaption(lightbox, {
    mobileLayoutBreakpoint: 700,
    type: "auto",
    mobileCaptionOverlapRatio: 1,
  });

  lightbox.init();

  if (window.location.hash.substring(1).length > 0) {
    const index = parseInt(window.location.hash.substring(1), 10);
    if (!Number.isNaN(index) && index >= 0 && index < gallery.querySelectorAll("a").length) {
      lightbox.loadAndOpen(index, { gallery });
    }
  }
}