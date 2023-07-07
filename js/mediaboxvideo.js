$(".mediabox").each(function () {
    var url = $(this).attr("href")
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        var id = match[2];
        var path = 'https://img.youtube.com/vi/' + id + '/0.jpg';
        $(this).addClass('').css('background-image', 'url(' + path + ')');
        $(this).append('');
    }
});


(function (root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.MediaBox = factory();
    }
}(this, function () {
    "use strict";

    var MediaBox = function (element) {
        if (!this || !(this instanceof MediaBox)) {
            return new MediaBox(element);
        }

        this.selector = document.querySelectorAll(element);
        this.root = document.querySelector('body');
        this.run();
    };

    MediaBox.prototype = {
        run: function () {
            Array.prototype.forEach.call(this.selector, function (el) {
                el.addEventListener('click', function (e) {
                    e.preventDefault();

                    var link = this.parseUrl(el.getAttribute('href'));
                    this.render(link);
                    this.close();
                }.bind(this), false);
            }.bind(this));
        },
        template: function (s, d) {
            var p;

            for (p in d) {
                if (d.hasOwnProperty(p)) {
                    s = s.replace(new RegExp('{' + p + '}', 'g'), d[p]);
                }
            }
            return s;
        },
        parseUrl: function (url) {
            var service = {},
                matches;

            if (matches = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)) {
                service.provider = "youtube";
                service.id = matches[2];
            } else if (matches = url.match(/https?:\/\/(?:www\.)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/)) {
                service.provider = "vimeo";
                service.id = matches[3];
            } else {
                service.provider = "Unknown";
                service.id = '';
            }

            return service;
        },
        render: function (service) {
            var embedLink,
                lightbox;

            if (service.provider === 'youtube') {
                embedLink = 'https://www.youtube.com/embed/' + service.id;
            } else if (service.provider === 'vimeo') {
                embedLink = 'https://player.vimeo.com/video/' + service.id;
            } else {
                throw new Error("Invalid video URL");
            }

            lightbox = this.template(
                '<div class="mediabox-wrap"><span class="mediabox-close-bg mediabox-close"><i class="fa fa-close fa-lg mediabox-close"></i></span><div class="mediabox-content"><iframe allow="autoplay" src="{embed}?autoplay=1&autohide=1&fs=1&rel=0&hd=1&wmode=transparent&enablejsapi=1&html5=1&modestbranding=1" frameborder="0" vspace="0" hspace="0" webkitallowfullscreen mozallowfullscreen allowfullscreen allowtransparency="true"></iframe></div></div>', {
                embed: embedLink
            });

            this.root.insertAdjacentHTML('beforeend', lightbox);
        },
        close: function () {
            var wrapper = document.querySelector('.mediabox-wrap');

            wrapper.addEventListener('click', function (e) {
                if (e.target && (e.target.nodeName === 'SPAN' || e.target.nodeName === 'I') && e.target.classList.contains('mediabox-close')) {
                    wrapper.classList.add('mediabox-hide');
                    setTimeout(function () {
                        this.root.removeChild(wrapper);
                    }.bind(this), 500);
                }
            }.bind(this), false);
        }
    };

    return MediaBox;
}));

MediaBox('.mediabox');