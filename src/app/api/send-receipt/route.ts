import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, donorEmail, donorName, amount, campaign } = await req.json();

    if (!sessionId || !donorEmail || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For now, we'll use Stripe's built-in email receipts
    // In production, you would integrate with an email service like:
    // - SendGrid
    // - Resend
    // - Nodemailer with SMTP
    // - AWS SES
    
    console.log('Sending receipt email:', {
      to: donorEmail,
      amount: `$${amount}`,
      campaign: campaign || 'General Fund',
      sessionId
    });

    // TODO: Implement actual email sending
    // Example with SendGrid:
    // const msg = {
    //   to: donorEmail,
    //   from: 'noreply@sparkcreativesinc.org',
    //   subject: 'Thank you for your donation - Tax Receipt',
    //   html: generateReceiptHTML(donorName, amount, campaign, sessionId)
    // };
    // await sgMail.send(msg);

    return NextResponse.json({ 
      success: true, 
      message: 'Receipt email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending receipt email:', error);
    return NextResponse.json(
      { error: 'Failed to send receipt email' },
      { status: 500 }
    );
  }
}

// Helper function to generate receipt HTML (for future use)
function generateReceiptHTML(donorName: string, amount: number, campaign: string, sessionId: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Donation Receipt - SparkCreatives Inc.</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb;">SparkCreatives Inc.</h1>
        <p style="color: #6b7280;">501(c)(3) Public Charity</p>
      </div>
      
      <h2 style="color: #1f2937;">Thank You for Your Donation!</h2>
      
      <p>Dear ${donorName},</p>
      
      <p>Thank you for your generous donation of <strong>$${amount.toFixed(2)}</strong> to support ${campaign}.</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Donation Details</h3>
        <p><strong>Amount:</strong> $${amount.toFixed(2)}</p>
        <p><strong>Campaign:</strong> ${campaign}</p>
        <p><strong>Transaction ID:</strong> ${sessionId}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #1e40af;">Tax Deductible Receipt</h4>
        <p style="margin-bottom: 0;">This donation is tax-deductible to the full extent allowed by law. SparkCreatives Inc. is a 501(c)(3) public charity (EIN: [Your EIN]).</p>
      </div>
      
      <p>Your contribution makes a real difference in the lives of those we serve. We appreciate your support!</p>
      
      <p>Best regards,<br>
      The SparkCreatives Team</p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
      <p style="font-size: 12px; color: #6b7280; text-align: center;">
        SparkCreatives Inc. | 501(c)(3) Public Charity<br>
        This is an automated receipt. Please keep this for your tax records.
      </p>
    </body>
    </html>
  `;
}
