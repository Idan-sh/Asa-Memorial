import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { MemoryItemData } from '../../../frontend/src/models/MemoryItem.model';
import jwt from 'jsonwebtoken';
import { generateHtmlEmail, generateHtmlMemoryUpprovedEmail } from './html.service';

// Initialize environment variables
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN;
const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN;

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
  const secretKey = validateJwtSecretKey();
  const token = jwt.sign({ memoryId: memoryItemData.id }, secretKey, { expiresIn: '24h' });

  const approveUrl = `${BACKEND_DOMAIN}/api/approve-memory/${memoryItemData.id}?token=${token}`;
  const rejectUrl = `${BACKEND_DOMAIN}/api/reject-memory/${memoryItemData.id}?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAILS,
    subject: 'הועלה זיכרון חדש לבדיקה לזכרו של אסא',
    html: generateHtmlEmail(memoryItemData, approveUrl, rejectUrl)
  };

  await transporter.sendMail(mailOptions);
}

function validateJwtSecretKey() {
  if (!JWT_SECRET_KEY) {
    throw new Error("ERROR: secret key for authorization is undefined.");
  }
  return JWT_SECRET_KEY;
}

export async function sendMemoryUpprovedEmail(memoryItemData: MemoryItemData) {
  if(!memoryItemData.contact_email) {
    console.log("No contact email provided for memory item '" + memoryItemData.id + "'.");
    return;
  }
  console.log("Sending upproved email to contact email '" + memoryItemData.contact_email + "' for memory item '" + memoryItemData.id + "'.");

  const memoryUrl = `${FRONTEND_DOMAIN}/memories/${memoryItemData.id}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: memoryItemData.contact_email,
    subject: 'הזיכרון שהעלת לזכרו של אסא אושר',
    html: generateHtmlMemoryUpprovedEmail(memoryItemData, memoryUrl)
  };

  await transporter.sendMail(mailOptions);
}

