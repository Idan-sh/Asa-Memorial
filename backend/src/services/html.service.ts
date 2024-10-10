import { MemoryItemData } from "../../../frontend/src/models/MemoryItem.model";

/**
 * Generates an HTML response for approve/reject requests.
 * @param title Title of the HTML response.
 * @param message Message of the HTML response.
 * @param success true authorization was successful, false if unsuccessful.
 * @returns HTMLl string for sending as a response.
 */
export function generateHtmlResponse(title: string, message: string, success: boolean) {
  const style = `
    body {
      font-family: Arial, sans-serif;
      background-color: ${success ? '#e0ffe0' : '#ffe0e0'};
      color: ${success ? '#008000' : '#ff0000'};
      text-align: center;
      padding: 20px;
    }
    h1 {
      font-size: 24px;
      margin-bottom: 10px;
    }
    p {
      font-size: 18px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `;

  return `
    <html>
      <head>
        <style>${style}</style>
      </head>
      <body>
        <div class="container">
          <h1>${title}</h1>
          <p>${message}</p>
        </div>
      </body>
    </html>
  `;
}

export function generateHtmlEmail(memoryItemData: MemoryItemData, approveUrl: string, rejectUrl: string) {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 90%; margin: 0 auto; border: 1px solid #dddddd; border-radius: 6px; overflow: hidden; direction: rtl;">
        <div style="background-color: #f7f7f7; padding: 20px; text-align: center;">
          <h1 style="margin: 0; color: #333;">זיכרון חדש - לזכרו של אסא</h1>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #555;">זיכרון חדש הועלה. אנא עבור על הפרטים ואשר/דחה בעזרת הכפתורים מטה.</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 10px; table-layout: fixed;">
            <colgroup>
              <col style="width: 150px;"> <!-- Adjust this width as necessary -->
              <col style="width: auto;">
            </colgroup>
            <tr>
              <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #dddddd;">שם פרטי:</td>
              <td style="padding: 8px; border-bottom: 1px solid #dddddd;">${memoryItemData.first_name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #dddddd;">שם משפחה:</td>
              <td style="padding: 8px; border-bottom: 1px solid #dddddd;">${memoryItemData.last_name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #dddddd;">כינוי:</td>
              <td style="padding: 8px; border-bottom: 1px solid #dddddd;">${memoryItemData.nickname}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #dddddd;">מערכת יחסים:</td>
              <td style="padding: 8px; border-bottom: 1px solid #dddddd;">${memoryItemData.relation}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px; border-bottom: 1px solid #dddddd;">תיאור:</td>
              <td style="padding: 8px; border-bottom: 1px solid #dddddd;">${memoryItemData.message}</td>
            </tr>
          </table>

          <div style="text-align: center; margin-top: 30px; margin-bottom: 10px;">
            <a href="${approveUrl}" style="padding: 12px 24px; background-color: #28a745; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; margin-left: 10px;">אשר</a>
            <a href="${rejectUrl}" style="padding: 12px 24px; background-color: #dc3545; color: white; text-decoration: none; font-weight: bold; border-radius: 5px; margin-right: 10px;">דחה</a>
          </div>
        </div>;
        <div style="background-color: #f7f7f7; padding: 10px; text-align: center; font-size: 12px; color: #777;">
          <p>הודעה זו נשלח אוטומטית על ידי מערכת הודעות אוטומטית, אין להשיב להודעה זו.</p>
        </div>
      </div>
    `
}