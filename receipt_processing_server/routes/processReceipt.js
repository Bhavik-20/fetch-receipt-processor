const express = require('express');
const router = express.Router();

let cache = {};

// Helper function to calculate points based on retailer name
function retailerNameToPoints(retailer) {
    let retailer_points = 0;

    for (let i = 0; i < retailer.length; i++) {
        const char = retailer[i];
        if (/^[a-z0-9]+$/i.test(char)) {
            retailer_points += 1;
        } 
    }

    console.log("Points based on retailer name: ", retailer_points);
    return retailer_points;
}

// Helper function to calculate points based on total
function totalToPoints(total) {
    let total_points = 0;

    const total_value = parseFloat(total);
    if (total_value % 1 == 0) {
        total_points += 50;
    } 

    if (total_value % 0.25 == 0) {
        total_points += 25;
    }

    console.log("Points based on total: ", total_points);
    return total_points;
}

// Helper function to calculate points based on purchase date and time
function purchaseDateTimeToPoints(purchaseDate, purchaseTime) {
    let date_time_points = 0;

    const date = new Date(purchaseDate);
    
    const [hours, minutes] = purchaseTime.split(":").map(Number); // Split the string and convert to numbers
    const time = new Date(); // Create a new Date object
    time.setHours(hours, minutes, 0, 0); // Set the hours, minutes, seconds and milliseconds

    // if purchase day is odd
    if (date.getDay() % 2 != 0) {
        date_time_points += 6;
    }

    // if purchase time is between 2pm and 4pm
    if (time.getHours() >= 14 && time.getHours() <= 16) {
        date_time_points += 10;
    }

    console.log("Points based on purchase date and time: ", date_time_points);
    return date_time_points;
}

// Helper function to calculate points based on items
function itemsToPoints(items) { 
    let items_points = 0;

    let item_counts = 0;

    for (let i = 0; i < items.length; i++) {
        item_counts += 1;

        // 5 points for every two items on the receipt.
        if (item_counts % 2 == 0) {
            items_points += 5;
        }

        const item = items[i];
        const item_description = item.shortDescription.trim();
        const item_price = item.price;

        // 20% of the item price if the length of the item description is divisible by 3.
        if(item_description.length % 3 == 0) {
            console.log("Item description: ", item_description, Math.ceil(item_price * 0.2));
            items_points += Math.ceil(item_price * 0.2);
        }
    }

    console.log("Points based on items: ", items_points);
    return items_points;
}

// Helper function to generate a random alphanumeric ID
function generateRandomAlphaNumericID(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-----------------';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        result += charset[randomIndex];
    }
    return result;
}

// This route will be used to process the receipt
router.post('/process', (req, res) => {
    // Access the receipt from the request body
    const receipt = req.body;
    
    // Process the receipt based on the requirements
    const retailer = receipt.retailer;
    const total = receipt.total;
    const items = receipt.items;
    const purchaseDate = receipt.purchaseDate;
    const purchaseTime = receipt.purchaseTime;

    let points = 0;

    // Calculate points based on retailer name
    points += retailerNameToPoints(retailer);

    // Calculate points based on total
    points += totalToPoints(total);

    // Calculate points based on items
    points += itemsToPoints(items);

    // Calculate points based on purchase date and time
    points += purchaseDateTimeToPoints(purchaseDate, purchaseTime);

    // Generate a random id for the receipt
    let id = generateRandomAlphaNumericID(20);
    while(cache[id] !== undefined) {
        id = generateRandomAlphaNumericID(20);
    }

    cache[id] = points;

    // Send the points as a response
    res.json({
        id: id,
    });
});

// This route will be used to get the points of a receipt
router.get('/:id/points', (req, res) => {
    const id = req.params.id;
    console.log("GET ID: ", id);
    const points = cache[id];

    if (points === undefined) {
        res.status(404).json({
            error: 'Receipt not found',
        });
    } else {
        res.json({
            points: points,
        });
    }
});

module.exports = router;