import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { MemoryItemData } from '../../../frontend/src/models/MemoryItem.model';
import jwt from 'jsonwebtoken';
import { generateHtmlEmail } from './html.service';

// Initialize environment variables
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const PORT = process.env.PORT;
const SERVER_DOMAIN = process.env.SERVER_DOMAIN;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Sends an email to the admins to approve/reject a request to add a new memory item.
 * @param memoryItemData Data of the requested memory to add.
 */
export async function sendEmailToAdmins(memoryItemData: MemoryItemData) {
  if (!SECRET_KEY) {
    throw new Error("ERROR: secret key for authorization is undefined.");
  }
  const token = jwt.sign({ memoryId: memoryItemData.id }, SECRET_KEY, { expiresIn: '24h' });

  const approveUrl = `${SERVER_DOMAIN}:${PORT}/api/approve-memory/${memoryItemData.id}?token=${token}`;
  const rejectUrl = `${SERVER_DOMAIN}:${PORT}/api/reject-memory/${memoryItemData.id}?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAILS,
    subject: 'זיכרון חדש לבדיקה - לזכרו של אסא',
    html: generateHtmlEmail(memoryItemData, approveUrl, rejectUrl)
  };

  await transporter.sendMail(mailOptions);
}