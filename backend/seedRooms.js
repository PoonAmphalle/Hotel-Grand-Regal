import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './src/models/Room.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/hotel'; // Using Docker service name

const sampleRooms = [
  {
    name: 'Deluxe Room',
    type: 'Deluxe',
    price: 5000,
    available: true,
    image: '/images/rooms/deluxe.jpg',
    description: 'Spacious deluxe room with a king-size bed and city view',
    capacity: 2,
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Room Service']
  },
  {
    name: 'Executive Suite',
    type: 'Suite',
    price: 8000,
    available: true,
    image: '/images/rooms/executive.jpg',
    description: 'Luxurious suite with separate living area and premium amenities',
    capacity: 2,
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Room Service', 'Jacuzzi']
  },
  {
    name: 'Family Room',
    type: 'Family',
    price: 7000,
    available: true,
    image: '/images/rooms/family.jpg',
    description: 'Comfortable family room with two queen beds',
    capacity: 4,
    amenities: ['Free WiFi', 'Air Conditioning', 'Flat-screen TV', 'Mini Fridge', 'Room Service']
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing rooms
    await Room.deleteMany({});
    console.log('Cleared existing rooms');

    // Insert sample rooms
    const createdRooms = await Room.insertMany(sampleRooms);
    console.log(`Added ${createdRooms.length} rooms to the database`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
