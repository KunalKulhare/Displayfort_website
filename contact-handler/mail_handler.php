<?php

header('Access-Control-Allow-Origin: *');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPmailer/src/Exception.php';
require 'PHPmailer/src/PHPMailer.php';
require 'PHPmailer/src/SMTP.php';

$mail = new PHPMailer();

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$company = $_POST['company'];
$city = $_POST['city'];
$message = $_POST['message'];
$reqtype = $_POST['reqtype'];
$pagename = $_POST['pageName'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['g-recaptcha-response'])) {
  $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
  $recaptcha_secret = '6Le5L0scAAAAAOA7b4L9wiWcF-bLuBVn8UjfTCmf';
  $recaptcha_response = $_POST['g-recaptcha-response'];

  $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
  $recaptcha = json_decode($recaptcha);

  if ($recaptcha->score < 0.5) {
    echo var_dump($recaptcha);
    http_response_code(406);
    die();
  }
} else {
  http_response_code(400);
  die();
}

$body = '
          <h4>Name: ' . $name . '</h4>
          <h4>Phone: ' . $phone . '</h4>
          <h4>Email: ' . $email . '</h4>
          <h4>Company: ' . $company . '</h4>
          <h4>City: ' . $city . '</h4>
          <h4>Message: ' . $message . '</h4>
          <h4>Request Type: ' . $reqtype . '</h4>
          <h4>Page Name: ' . $pagename . '</h4>
';

$mail->Host = 'email-smtp.ap-south-1.amazonaws.com';
$mail->Port = 465;

$mail->isSMTP();
$mail->SMTPSecure = 'ssl';
$mail->SMTPAuth = true;

$mail->Username = 'AKIA35R6EY2MFY5S753O';
$mail->Password = 'BOGpEwtLzdvD26/yfozAvv2+kNhm5iRgtJY3TLI/tN9x';

$address = array('digitalmarketing@displayfort.com');

$mail->setFrom('no-reply@displayfort.com', 'DisplayFort LandingPage');
$mail->addReplyTo('contact@displayfort.com', 'DisplayFort');

$mail->Subject = $reqtype . ': ' . $pagename;
$mail->msgHTML($body);

while (list($key, $val) = each($address)) {
  $mail->AddAddress($val);
}

if (!$mail->send()) {
  $stat = "Mailer Error: " . $mail->ErrorInfo;
} else {
  $stat = 'Mail sent!';
}
echo '<script>alert("' . $stat . '");</script>';
error_log("Mail status: " . $stat . " :: " . print_r($_REQUEST, 1));

$servername = "localhost";
$username = "displayfortweb";
$password = "P@ssw)rd";
$dbname = "df_inquiry";

try {

  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $sql = "INSERT INTO landing_page_inquiry (name, mobile_no, email_id, company, city, viewer_comment, reqtype, source)
    VALUES ('$name','$phone','$email','$company','$city','$message','$reqtype','$pagename')";
  $conn->exec($sql);
  $statdb = 'Thanks DB';
} catch (PDOException $e) {
  $statdb = $sql . "<br>" . $e->getMessage();
}

echo '<script>alert("' . $stat . '");</script>';
error_log("DB status: " . $stat . " :: " . print_r($_REQUEST, 1));
