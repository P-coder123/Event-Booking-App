import express from 'express';

import dotenv from 'dotenv';
import connectDB from './connection/connection';
import eventRouter from './routes/eventRoute';
import userRoutes from './routes/userRoutes';
import bookingRoutes from './routes/bookingRoutes'
import cors from 'cors';



dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

// Mount API routes
app.use('/api', eventRouter);
app.use('/api',userRoutes);
app.use('/api',bookingRoutes)



// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

