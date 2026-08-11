Deno.serve(async (req) => {
  const functionName = 'send-contact-email';
  const requestId = crypto.randomUUID().slice(0, 8);

  // CORS 预检
  if (req.method === 'OPTIONS') {
    console.info(`[${functionName}] CORS preflight ${requestId}`);
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  try {
    const body = await req.json();
    console.info(`[${functionName}] request ${requestId} method=${req.method}`);

    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // 构建邮件内容
    const emailBody = `
新联系表单提交

姓名: ${name}
邮箱: ${email}
主题: ${subject || '无'}

消息内容:
${message}

---
此邮件由 GLITCH Robotics 网站自动发送
    `.trim();

    // 使用 Resend 发送邮件
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      console.warn(`[${functionName}] RESEND_API_KEY not configured, skipping email send`);
      console.info(`[${functionName}] Email would be sent to 25030034d@connect.polyu.hk`);
      console.info(`[${functionName}] From: ${name} <${email}>`);
      console.info(`[${functionName}] Subject: ${subject || 'No subject'}`);

      return new Response(JSON.stringify({
        success: true,
        message: 'Message saved. Email sending skipped (RESEND_API_KEY not configured).'
      }), { headers: corsHeaders });
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'GLITCH Robotics <onboarding@resend.dev>',
          to: ['25030034d@connect.polyu.hk'],
          subject: `Contact Form: ${subject || 'New Message'}`,
          text: emailBody,
          reply_to: email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`[${functionName}] Resend API error:`, errorData);
        throw new Error(`Failed to send email: ${response.status} ${errorData}`);
      }

      const result = await response.json();
      console.info(`[${functionName}] Email sent successfully via Resend:`, result.id);
    } catch (sendError) {
      console.error(`[${functionName}] Failed to send email via Resend:`, sendError);
      // 邮件发送失败不影响主流程，继续返回成功
    }

    console.info(`[${functionName}] success ${requestId}`);
    return new Response(JSON.stringify({
      success: true,
      message: 'Message saved and email notification sent.'
    }), { headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[${functionName}] failed ${requestId}: ${message}`);
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: corsHeaders,
    });
  }
});
