const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// Middleware
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());

// API Endpoints
const bookings = [];
const dealerContacts = [];

app.post('/api/contact', (req, res) => {
  const { name, email, message, dealer } = req.body;
  console.log('New contact submission:', { name, email, message, dealer });
  dealerContacts.push({ name, email, message, dealer, date: new Date() });
  res.json({ success: true, message: 'Thank you for your message!' });
});

app.post('/api/book-test-drive', (req, res) => {
  const { name, email, phone, car, preferredDate, dealer } = req.body;
  
  if (!name || !email || !car) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const booking = {
    name,
    email, 
    phone,
    car,
    preferredDate,
    dealer,
    bookingDate: new Date(),
    status: 'pending'
  };
  
  bookings.push(booking);
  console.log('New test drive booking:', booking);
  
  res.json({ 
    success: true, 
    message: 'Test drive booked successfully!',
    bookingId: bookings.length
  });
});

app.get('/api/dealers', (req, res) => {
  const dealers = [
    { id: 1, name: 'Monaco Showroom', location: '123 Supercar Avenue, Monaco' },
    { id: 2, name: 'Paris Dealership', location: '456 Luxury Blvd, Paris' },
    { id: 3, name: 'London Branch', location: '789 Prestige Road, London' }
  ];
  res.json(dealers);
});

// Serve HTML files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, req.path));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});