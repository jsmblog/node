import { QuoteModel } from "../models/quoteModel.js";
import { UserModel } from "../models/userModel.js";

export const createQuote = async (req, res) => {
    try {
        const { text, userId } = req.body;
        const newQuote = await QuoteModel.create({ text, userId });
        res.status(201).json(newQuote);
    } catch (error) {
        res.status(500).json({ message: 'Error creating quote', error });
    }
};

export const getQuotesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const quotes = await QuoteModel.findAll({ where: { userId } });
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quotes', error });
    }
}
export const getAllQuotes = async (req, res) => {
    try {
        const quotes = await QuoteModel.findAll();
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quotes', error });
    }
};

export const deleteQuote = async (req, res) => {
    try {
        const { id } = req.params;
        await QuoteModel.destroy({ where: { id } });
        res.status(200).json({ message: 'Quote deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quote', error });
    }
};

export const updateQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        await QuoteModel.update({ text }, { where: { id } });
        res.status(200).json({ message: 'Quote updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating quote', error });
    }
};

export const getRandomQuote = async (req, res) => {
    try {
        const quotes = await QuoteModel.findAll({
            include: [
                {
                    model: UserModel,
                    as:'user',
                    attributes: ['username', 'isAnonymous']

                }
            ]
        });
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        res.status(200).json(randomQuote);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching random quote', error });
    }
};