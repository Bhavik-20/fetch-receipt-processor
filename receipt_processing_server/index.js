const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));

const port = 3000;
const receiptProcessRoutes = require('./routes/processReceipt');
const welcomeRoutes = require('./routes/welcome');

app.use('/', welcomeRoutes);
app.use('/receipts', receiptProcessRoutes);


app.listen(port, () => {
    console.log(`Node Server is listening at http://localhost:${port}`);
});