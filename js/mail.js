$(document).ready(function () {
    var pageNameList = {
        "/": "Home",
        "/about.html": "About",
        "/book-a-demo.html": "Demo",
        "/contact.html": "Contact",
        "/index.html": "Home",
        "/blogs/different-levels-of-smartclass-solutions/": "Blog Smart Class Room Solutions",
        "/blogs/lfd-vs-projector/": "Blog LFD vs Projector",
        "/blogs/major-display-industry-trends-post-covid-19/": "Blog Display Trends Shift post COVID 19",
        "/blogs/things-to-consider-before-buying-digital-signage/": "Blog Before buying Digital Signage",
        "/blogs/what-all-you-should-know-about-mounting/": "Blog Mounting",
        "/industry/corporate-and-goverment/": "Corporate and Govt Industry",
        "/industry/education/": "Education Industry",
        "/industry/healthcare/": "Healthcare Industry",
        "/industry/hotel-restaurent/": "Hotal and Restaurent Industry",
        "/industry/retail/": "Retail Industry",
        "/products/audio-video-solutions/": "Audio Video Solutions",
        "/products/digital-signage/": "Digital Signage",
        "/products/digital-signage/indoor/": "Digital Signage Indoor",
        "/products/digital-signage/outdoor/": "Digital Signage Outdoor",
        "/products/digital-signage/semi-outdoor/": "Digital Signage Semi-Outdoor",
        "/products/interactive/": "Interactive",
        "/products/interactive/corporate/": "Interactive Corporate",
        "/products/interactive/retail/": "Interactive Retail",
        "/products/interactive/smart-classroom/": "Smart Class Room Solutions",
        "/products/mounting/": "Mounting",
        "/products/videowall/": "Video Wall",
        "/products/videowall/indoor/": " Video Wall Indoor",
        "/products/videowall/outdoor/": "Video Wall Outdoor",
        "/products/videowall/semi-outdoor/": "video Wall Semi Outdoor"
    };
    var cpage = document.createElement('a');
    cpage.href = document.URL;
    reqtype = pageNameList[cpage.pathname];
    var rpage = document.createElement('a');
    rpage.href = document.referrer;
    reqfrom = pageNameList[rpage.pathname];
    if (reqfrom === undefined) {
        reqfrom = rpage.pathname;
    }
    if (reqfrom != reqtype) {
        if (reqfrom === "Demo" || reqfrom === "Contact") {
            reqfrom = localStorage.getItem(reqfrom);
        }
        localStorage.setItem(reqtype, reqfrom);
    }
    $("#pageName").val(localStorage.getItem(reqtype));
    $("#reqtype").val(reqtype);
    $("#submit").click(function () {
        var name = $("#name").val();
        var phone = $("#phone").val();
        var email = $("#email").val();
        var company = $("#company").val();
        var city = $("#city").val();
        var message = $("#message").val();
        var subject = $("#subject").val();
        var reqtype = $("#reqtype").val();
        var pageName = $("#pageName").val();
        if (name === "" || city === "" || (reqtype === "Demo" && phone === "") || (reqtype === "Contact" && email === "")) {
            swal("Request you to fill all mandatory fields", " ", "warning");
        }
        else {
            $.ajax({
                url: "contact-handler/mail_handler.php",
                type: "POST",
                data: $('#submit_form').serialize(),
                error: function (data) {
                    swal("Sorry!", "Please try again.", "error");
                },
                success: function (data) {
                    $('#submit_form').trigger('reset');
                    swal("Your request has been received!", "Thank you for your interest/submitting the request.", "success");
                }
            })
        }
    });
});