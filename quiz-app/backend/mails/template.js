export const resetTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f2f2f2; margin: 0; padding: 0;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #333333;text-align: center; font-size: 1.8rem; margin-top: 0;">Password Reset Request</h2>
      <p style="color: #666666; line-height: 1.6;">Hi [User's Name],</p>
      <p style="color: #666666; line-height: 1.6;">We received a request to reset your password. Click the button below to reset it:</p>
      <div style="width: 100%; display: flex; justify-content: center; align-items: center;"><a href="" style="display: inline-block;  padding: 12px 24px; margin: auto 10px; color: #ffffff; background-color: #007BFF; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a></div>
      <p style="color: #666666; line-height: 1.6; margin-top: 20px;">If you did not request this, please ignore this email. Your password will remain unchanged.</p>
      <div style="margin-top: 20px; font-size: 12px; color: #aaaaaa; text-align: center;">
        <p>If you need further assistance, please contact our support team.</p>
        <p>Thank you, <br/> Quiz</p>
      </div>
    </div>
  </body>
</html>`;

export const verifyEmailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
