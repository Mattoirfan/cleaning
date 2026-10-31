import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json({ limit: '1mb' }));

// Simple in-memory rate limiter for spam protection
const ipRequests = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 15;

const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();
  const current = ipRequests.get(ip);

  if (!current || now > current.resetTime) {
    ipRequests.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a moment before trying again.',
    });
  }

  current.count++;
  next();
};

// Database persistence path
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'enquiries.json');

// Ensure data directory and initial seed data exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface StoredEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceId: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  zipCode: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Quoted' | 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt: string;
  internalNotes?: string;
}

const INITIAL_SEED: StoredEnquiry[] = [
  {
    id: 'PN-10482',
    fullName: 'Charlotte Sterling',
    email: 'c.sterling@luxemail.com',
    phone: '(503) 555-0192',
    serviceId: 'deep-cleaning',
    propertyType: 'single-family',
    bedrooms: '3',
    bathrooms: '2',
    preferredDate: '2026-11-04',
    preferredTime: 'morning',
    address: '2840 NW Cumberland Rd',
    zipCode: '97210',
    message: 'Preparing home for hosting Thanksgiving guests. Need heavy attention to oven and hardwood baseboards.',
    status: 'New',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'PN-10481',
    fullName: 'Alexander Wright',
    email: 'alex@wrightarchitects.io',
    phone: '(503) 555-8831',
    serviceId: 'commercial-office',
    propertyType: 'commercial',
    bedrooms: '1',
    bathrooms: '2',
    preferredDate: '2026-11-02',
    preferredTime: 'after-hours',
    address: '1120 NW Couch St, 5th Floor',
    zipCode: '97209',
    message: 'Looking for twice-weekly evening janitorial service for our 45-person architectural studio.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 3600000 * 22).toISOString(),
  },
  {
    id: 'PN-10480',
    fullName: 'Sophia Martinez',
    email: 'smartinez@gmail.com',
    phone: '(503) 555-4299',
    serviceId: 'move-in-out',
    propertyType: 'apartment',
    bedrooms: '2',
    bathrooms: '2',
    preferredDate: '2026-10-31',
    preferredTime: 'morning',
    address: '633 NW 14th Ave, Unit 302',
    zipCode: '97209',
    message: 'Move-out clean needed for deposit return inspection.',
    status: 'Scheduled',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_SEED, null, 2), 'utf-8');
}

const getEnquiries = (): StoredEnquiry[] => {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading enquiries database', err);
    return [];
  }
};

const saveEnquiries = (data: StoredEnquiry[]) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing enquiries database', err);
  }
};

// Admin authentication tokens
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'purenest2026';
const activeTokens = new Set<string>();

const requireAdminAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication required.' });
  }

  const token = authHeader.split(' ')[1];
  if (!activeTokens.has(token)) {
    return res.status(401).json({ success: false, error: 'Invalid or expired session token.' });
  }

  next();
};

/* --- API ROUTES --- */

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'PureNest Backend API', timestamp: new Date().toISOString() });
});

// Admin Login
app.post('/api/admin/auth', (req, res) => {
  const { passcode } = req.body;
  if (passcode === ADMIN_PASSCODE) {
    const token = crypto.randomBytes(24).toString('hex');
    activeTokens.add(token);
    // Expire token in 24 hours
    setTimeout(() => activeTokens.delete(token), 24 * 60 * 60 * 1000);
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, error: 'Incorrect administrator passcode.' });
});

// Public Customer Enquiry Submission
app.post('/api/enquiries', rateLimiter, (req, res) => {
  const {
    fullName,
    email,
    phone,
    serviceId,
    propertyType,
    bedrooms,
    bathrooms,
    preferredDate,
    preferredTime,
    address,
    zipCode,
    message,
  } = req.body;

  // Validation
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Valid full name is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, error: 'Valid email address is required.' });
  }

  const cleanPhone = (phone || '').replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return res.status(400).json({ success: false, error: 'Valid 10-digit phone number is required.' });
  }

  if (!preferredDate) {
    return res.status(400).json({ success: false, error: 'Preferred date is required.' });
  }

  if (!address || typeof address !== 'string' || address.trim().length < 3) {
    return res.status(400).json({ success: false, error: 'Service address is required.' });
  }

  // Generate Reference ID (e.g. PN-74921)
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const id = `PN-${randomNum}`;

  const newEnquiry: StoredEnquiry = {
    id,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    serviceId: serviceId || 'residential-regular',
    propertyType: propertyType || 'apartment',
    bedrooms: String(bedrooms || '2'),
    bathrooms: String(bathrooms || '2'),
    preferredDate,
    preferredTime: preferredTime || 'morning',
    address: address.trim(),
    zipCode: (zipCode || '').trim(),
    message: message ? message.trim() : '',
    status: 'New',
    createdAt: new Date().toISOString(),
  };

  const enquiries = getEnquiries();
  enquiries.unshift(newEnquiry);
  saveEnquiries(enquiries);

  // Return only sanitized confirmation data to the public user
  return res.status(201).json({
    success: true,
    enquiry: {
      id: newEnquiry.id,
      fullName: newEnquiry.fullName,
      email: newEnquiry.email,
      serviceId: newEnquiry.serviceId,
      preferredDate: newEnquiry.preferredDate,
    },
  });
});

// Protected: Get all enquiries (Admin only)
app.get('/api/enquiries', requireAdminAuth, (req, res) => {
  const enquiries = getEnquiries();
  res.json({ success: true, enquiries });
});

// Protected: Update enquiry status (Admin only)
app.patch('/api/enquiries/:id/status', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status, internalNotes } = req.body;

  const validStatuses = ['New', 'Contacted', 'Quoted', 'Scheduled', 'Completed', 'Cancelled'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid status code.' });
  }

  const enquiries = getEnquiries();
  const index = enquiries.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Enquiry not found.' });
  }

  if (status) enquiries[index].status = status;
  if (internalNotes !== undefined) enquiries[index].internalNotes = internalNotes;

  saveEnquiries(enquiries);

  res.json({ success: true, enquiry: enquiries[index] });
});

// Mount Vite or static server
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[PureNest] Server running at http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[PureNest] Failed to start server:', err);
  process.exit(1);
});
