import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './src/models/MenuItem.js';

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

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/hotel');
    console.log('Connected to MongoDB');

    // Clear existing data
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu items');

    // Insert sample data
    const createdItems = await MenuItem.insertMany(sampleMenuItems);
    console.log(`Inserted ${createdItems.length} menu items`);

    // Print sample data
    console.log('\nSample Menu Items:');
    createdItems.forEach(item => {
      console.log(`- ${item.name} (${item.category}): $${item.price}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
