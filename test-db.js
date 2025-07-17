import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const testDatabase = async () => {
  try {
    console.log('Testing database connection...');
    console.log('URL:', supabaseUrl);
    console.log('Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'NOT FOUND');
    
    // Test connection
    const { data, error } = await supabase.from('cards').select('*').limit(5);
    
    if (error) {
      console.error('Database error:', error);
      return;
    }
    
    console.log('✅ Database connection successful!');
    console.log('Number of cards found:', data?.length || 0);
    
    if (data && data.length > 0) {
      console.log('Sample card data:');
      console.log(JSON.stringify(data[0], null, 2));
      
      // Check required fields
      const firstCard = data[0];
      console.log('\nField analysis:');
      console.log('- content field:', firstCard.content ? '✅ Present' : '❌ Missing');
      console.log('- placeholders field:', firstCard.placeholders ? '✅ Present' : '❌ Missing');
      console.log('- is_active field:', firstCard.is_active !== undefined ? '✅ Present' : '❌ Missing');
    } else {
      console.log('❌ No cards found in database');
    }
    
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
};

testDatabase();
