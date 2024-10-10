
<!DOCTYPE html>
<html>
<head>
    <title>Subscription Confirmation</title>
</head>
<body>
    <h1>Confirm Your Subscription</h1>
    <p>Hello,</p>
    <p>Thank you for subscribing! Please click the link below to confirm your subscription:</p>
    <a href="{{ url('/api/subscriber/confirm/' . $token) }}">Confirm Subscription</a>
    <p>If you did not subscribe, please ignore this email.</p>
</body>
</html>
