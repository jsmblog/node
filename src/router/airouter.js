import express from 'express';
import { sendRequestToAI } from '../ai/sendRequestToAI.js';
const router = express.Router();
router.post('/ai', sendRequestToAI);
export const aiRouter = router;