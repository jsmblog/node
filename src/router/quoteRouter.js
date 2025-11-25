import express from "express";
import { createQuote, updateQuote, deleteQuote, getAllQuotes, getQuotesByUser, getRandomQuote } from "../controllers/quoteController.js";
const router = express.Router();

router.get("/quotes", getAllQuotes);
router.get("/quotes/:userId", getQuotesByUser);
router.post("/quotes", createQuote);
router.put("/quotes/:id", updateQuote);
router.delete("/quotes/:id", deleteQuote);
router.get("/quote/random", getRandomQuote);

export const QuoteRouter = router;