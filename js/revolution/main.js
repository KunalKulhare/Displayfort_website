jQuery(document).ready(function($){
    "use strict";
    //
        $('#industry-slider').owlCarousel({
            loop:true,
            center:true,
            margin:10,
            nav:true,
            autoplay:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:5
                }
            }
        })
    })