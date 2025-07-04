const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors()); // باش يقبل الطلبات من أي موقع
app.use(express.json());

const token = '8043905417:AAHJDAMmonye5JZVtcrxePZi3e1IHwIz4j4';
const chatId = '-4879210313';

app.post('/send', async (req, res) => {
    const { message } = req.body;

    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        res.json({ status: 'success' });
    } catch (error) {
        console.error('Telegram error:', error);
        res.status(500).json({ status: 'error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
