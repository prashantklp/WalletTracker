const Income = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        // Validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        const income = new Income({
            title,
            amount,
            category,
            description,
            date
        });

        await income.save();
        console.log("✅ Saved Income:", income);
        res.status(200).json({ message: 'Income Added' });

    } catch (error) {
        console.error("❌ Server Error (addIncome):", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error("❌ Server Error (getIncomes):", error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        await Income.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income Deleted' });
    } catch (error) {
        console.error("❌ Server Error (deleteIncome):", error);
        res.status(500).json({ message: 'Server Error' });
    }
};
