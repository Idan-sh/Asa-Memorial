import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { MemoryItemData } from '../../../frontend/src/models/MemoryItem.model';
import jwt from 'jsonwebtoken';
import { generateHtmlEmail, generateHtmlMemoryUpprovedEmail } from './html.service';

// Initialize environment variables
dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN;
const BACKEND_PORT = process.env.BACKEND_PORT;

const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN;
const FRONTEND_PORT = process.env.FRONTEND_PORT;

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

  const approveUrl = `${BACKEND_DOMAIN}:${BACKEND_PORT}/api/approve-memory/${memoryItemData.id}?token=${token}`;
  const rejectUrl = `${BACKEND_DOMAIN}:${BACKEND_PORT}/api/reject-memory/${memoryItemData.id}?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAILS,
    subject: 'זיכרון חדש לבדיקה לזכרו של אסא',
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
  const memoryUrl = `${FRONTEND_DOMAIN}:${FRONTEND_PORT}/memories/${memoryItemData.id}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: memoryItemData.contactEmail,
    subject: 'זיכרון חדש לבדיקה לזכרו של אסא',
    html: generateHtmlMemoryUpprovedEmail(memoryItemData, memoryUrl)
  };

  await transporter.sendMail(mailOptions);
}

