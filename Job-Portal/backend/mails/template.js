export const verify_email_template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
  <style>
    body, h1, p {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
    }

    body {
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f9;
    }

    .header {
      background: linear-gradient(to right, #7e5bef, #6a4cfa);
      padding: 25px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }

    .header h1 {
      color: white;
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }

    .content {
      background-color: white;
      padding: 25px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .content p {
      color: #333;
      font-size: 16px;
      margin-bottom: 15px;
    }

    .verification-code {
      text-align: center;
      margin: 30px 0;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 4px;
      color: #6a4cfa;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.85em;
    }

    .footer p {
      margin: 5px 0;
    }

    a {
      color: #7e5bef;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Verify Your Email</h1>
  </div>

  <div class="content">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>

    <div class="verification-code">
      {verificationCode}
    </div>

    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please <a href="#">ignore this email</a>.</p>

    <p>Best regards,<br>Your Job Portal Team</p>
  </div>

  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const welcome_email_template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Job Portal</title>
  <style>
    body, h1, p {
      margin: 0;
      padding: 0;
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
    }

    body {
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f9;
    }

    .header {
      background: linear-gradient(to right, #7e5bef, #6a4cfa);
      padding: 25px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }

    .header h1 {
      color: white;
      margin: 0;
      font-size: 28px;
      font-weight: bold;
    }

    .content {
      background-color: white;
      padding: 25px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .content p {
      color: #333;
      font-size: 16px;
      margin-bottom: 15px;
    }

    .cta-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #6a4cfa;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
      margin: 20px 0;
      text-align: center;
    }

    .cta-button:hover {
      background-color: #7e5bef;
    }

    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 0.85em;
    }

    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome to Our Job Portal!</h1>
  </div>

  <div class="content">
    <p>Hello, {fullName},</p>
    <p>Welcome to the community! We’re excited to have you on board. Whether you're looking for your next job or posting a new opportunity, we are here to help you connect with the best matches.</p>

    <p>To get started, please complete your profile details. This will help you get noticed by potential employers or find the perfect job for you!</p>

    <p>If you have any questions or need help, feel free to reach out to us anytime. We’re here to help you succeed!</p>

    <p>Best regards,<br>Your Job Portal Team</p>
  </div>

  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
