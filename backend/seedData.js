import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './src/models/MenuItem.js';
import Room from './src/models/Room.js';

dotenv.config();

const sampleMenuItems = [
  {
    name: 'Classic Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil on a crispy crust',
    price: 12.99,
    category: 'Veg',
    image: 'margherita.jpg'
  },
  {
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables',
    price: 22.99,
    category: 'Non-Veg',
    image: 'salmon.jpg'
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 8.99,
    category: 'Veg',
    image: 'lava-cake.jpg'
  }
];

const sampleRooms = [
  {
    name: 'Deluxe Room',
    type: 'Deluxe',
    description: 'Spacious room with a king-size bed and city view',
    price: 199.99,
    capacity: 2,
    image: 'deluxe-room.jpg',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar']
  },
  {
    name: 'Executive Suite',
    type: 'Suite',
    description: 'Luxurious suite with separate living area and kitchenette',
    price: 349.99,
    capacity: 4,
    image: 'executive-suite.jpg',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Kitchenette', 'Room Service']
  },
  {
    name: 'Family Room',
    type: 'Family',
    description: 'Comfortable room with two queen beds, perfect for families',
    price: 279.99,
    capacity: 4,
    image: 'family-room.jpg',
    amenities: ['Free WiFi', 'Air Conditioning', 'TV', 'Mini Fridge']
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/hotel');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await MenuItem.deleteMany({});
    await Room.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Insert sample data
    const createdMenuItems = await MenuItem.insertMany(sampleMenuItems);
    const createdRooms = await Room.insertMany(sampleRooms);
    
    console.log(`\n✅ Seeded ${createdMenuItems.length} menu items`);
    console.log(`✅ Seeded ${createdRooms.length} rooms`);

    console.log('\nSample Menu Items:');
    createdMenuItems.forEach(item => {
      console.log(`- ${item.name} (${item.category}): $${item.price}`);
    });

    console.log('\nSample Rooms:');
    createdRooms.forEach(room => {
      console.log(`- ${room.name}: $${room.price}/night (${room.capacity} people)`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
