function isNumberKey(e) {
    var unicode = e.charCode ? e.charCode : e.keyCode
    if (unicode != 8) {
      var addchar = [9,13,14,15,35,127]
      if ((unicode < 40 || unicode > 46) && (unicode < 48 || unicode > 57) && !addchar.includes(unicode))
        return false
    }
  }
  $(document).ready(function() {
    console.log('data is ---');
    var err = '';
    $(document).on('click', '#contactSubmit', function() {
      console.log('data is ---');
      var err = '';
        document.getElementById("name").classList.remove("fieldatt");
        document.getElementById("phone").classList.remove("fieldatt");
        document.getElementById("email").classList.remove("fieldatt");
      var temp = $('#name').val();
      if (temp == '') {
        err += '* Your Name \n';
        document.getElementById("name").classList.add("fieldatt");
      }
      var reg = /[1-9]{1}[0-9]{9}/;
      var temp = $('#phone').val();
      if (temp == '') {
        err += '* Your Contact Number \n';
        document.getElementById("phone").classList.add("fieldatt");
      } else if (reg.test(temp) == false) {
        err += '* Your 10 Digit Contact Number \n';
        document.getElementById("phone").classList.add("fieldatt");
      }
      var regs = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
      var temp = $('#email').val();
      if (temp == '') {
        err += '* Your Email \n';
        document.getElementById("email").classList.add("fieldatt");
      } else if (regs.test(temp) == false) {
        err += '* Your Valid Email ID \n';
        document.getElementById("email").classList.add("fieldatt");
      }
      if (err != '') {
        console.log('Please Enter :- \n' + err);
        return false;
      } else {
        //gtag_report_conversion();
        //document.getElementById('successMsg').style.display = 'block';
        $('#contactSubmit').html('Sending...');
        $.ajax({
          type: "POST",
          url: 'https://www.displayfort.com/landing-page/contact_email.php',
          data: $('#contactForm').serialize(),
          // dataType: 'json',
          success: function(data) {
  //        document.getElementById('successMsg').style.display = 'block';
            console.log('data is ---', data);
            setTimeout(function() {
              $('#contactForm')[0].reset();
              $('#contactSubmit').html('Submit Now');
            }, 2000);
            return false;
          }
        });
      }
    });
  });