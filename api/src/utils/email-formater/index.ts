import { configs } from 'src/configs';

export function emailFormat(type: string, otp: number): string {
  if (type && type === 'email-OTP') {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Code</title>
  <style>
    /* Inline CSS */
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .logo {
      text-align: center;
      margin-bottom: 20px;
    }
    .logo img {
      max-width: 200px;
      height: auto;
    }
    h2 {
      color: #333333;
    }
    p {
      color: #666666;
    }
    .otp-code {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    .verify-link {
      color: #007bff;
      text-decoration: none;
    }
    .verify-link:hover {
      text-decoration: underline;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
    }
    .footer p {
      font-size: 12px;
    }
  </style>
  </head>
  <body>
  <div class="container">
    
    
    ${type === 'email-OTP' ? '<h2>Email Verification</h2>' : `<h2>OTP Code</h2>`}
    ${type === 'email-OTP' ? '' : `<p>Your OTP code is:</p>`}
    ${type === 'email-OTP' ? '' : `<p class="otp-code">${otp}</p>`}
    ${type === 'email-OTP' ? `'<p>Please click <a href="${configs.Backend_url}/verify-otp/${otp}" class="verify-link">here</a> to verify your OTP.</p>'` : ''}
    <div class="footer">
    ${type === 'email-OTP' ? '' : `<p>This OTP code is valid for 5 minutes. Please do not share this code with anyone.</p>`}
      
    </div>
  </div>
  </body>
  </html>
  `;
  }
}
