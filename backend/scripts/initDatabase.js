const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDatabase() {
  let connection;
  
  try {
    // Connect without database first
    // Handle quoted passwords from .env file
    let dbPassword = process.env.DB_PASSWORD || '';
    if (dbPassword.startsWith('"') && dbPassword.endsWith('"')) {
      dbPassword = dbPassword.slice(1, -1);
    }
    
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: dbPassword,
      port: process.env.DB_PORT || 3306
    });

    console.log('✅ Connected to MySQL server');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'globetrotter';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✅ Database '${dbName}' ready`);

    // Use the database
    await connection.query(`USE ${dbName}`);

    // Create tables
    console.log('📊 Creating tables...');

    // Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        avatar_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Users table created');

    // Interests table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS interests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        emoji VARCHAR(10),
        color VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Interests table created');

    // Trips table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS trips (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        destination VARCHAR(255) NOT NULL,
        trip_type VARCHAR(50) DEFAULT 'leisure',
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        travelers INT DEFAULT 1,
        budget DECIMAL(10, 2) DEFAULT 0,
        description TEXT,
        accommodation VARCHAR(100),
        transportation VARCHAR(100),
        status ENUM('planned', 'upcoming', 'in_progress', 'completed', 'cancelled') DEFAULT 'planned',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_user_id (user_id),
        INDEX idx_status (status),
        INDEX idx_dates (start_date, end_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Trips table created');

    // Trip interests junction table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS trip_interests (
        trip_id INT NOT NULL,
        interest_id INT NOT NULL,
        PRIMARY KEY (trip_id, interest_id),
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        FOREIGN KEY (interest_id) REFERENCES interests(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Trip interests table created');

    // Cities table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        country VARCHAR(100) NOT NULL,
        country_code VARCHAR(10),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        cost_index INT DEFAULT 3 CHECK (cost_index BETWEEN 1 AND 5),
        popularity INT DEFAULT 50 CHECK (popularity BETWEEN 0 AND 100),
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_country (country),
        INDEX idx_name (name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Cities table created');

    // Activities table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        location VARCHAR(255),
        city_id INT,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        price_range ENUM('free', 'budget', 'moderate', 'luxury') DEFAULT 'moderate',
        price_amount DECIMAL(10, 2) DEFAULT 0,
        rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
        review_count INT DEFAULT 0,
        duration VARCHAR(50),
        description TEXT,
        image_url VARCHAR(500),
        highlights JSON,
        tags JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
        INDEX idx_category (category),
        INDEX idx_city (city_id),
        INDEX idx_rating (rating),
        FULLTEXT idx_search (name, description)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Activities table created');

    // Itinerary days table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS itinerary_days (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trip_id INT NOT NULL,
        day_number INT NOT NULL,
        date DATE NOT NULL,
        title VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        UNIQUE KEY unique_trip_day (trip_id, day_number),
        INDEX idx_trip (trip_id),
        INDEX idx_date (date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Itinerary days table created');

    // Itinerary activities table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS itinerary_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        itinerary_day_id INT NOT NULL,
        activity_id INT,
        time TIME,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        location VARCHAR(255),
        notes TEXT,
        order_index INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (itinerary_day_id) REFERENCES itinerary_days(id) ON DELETE CASCADE,
        FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE SET NULL,
        INDEX idx_day (itinerary_day_id),
        INDEX idx_time (time)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Itinerary activities table created');

    // Budget categories table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS budget_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trip_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        allocated DECIMAL(10, 2) DEFAULT 0,
        spent DECIMAL(10, 2) DEFAULT 0,
        color VARCHAR(20),
        icon VARCHAR(10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        INDEX idx_trip (trip_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Budget categories table created');

    // Budget transactions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS budget_transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        budget_category_id INT NOT NULL,
        description VARCHAR(255) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        transaction_date DATE NOT NULL,
        type ENUM('expense', 'income') DEFAULT 'expense',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (budget_category_id) REFERENCES budget_categories(id) ON DELETE CASCADE,
        INDEX idx_category (budget_category_id),
        INDEX idx_date (transaction_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Budget transactions table created');

    // Expense splits table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS expense_splits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trip_id INT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        split_type ENUM('equal', 'percentage', 'custom') DEFAULT 'equal',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        INDEX idx_trip (trip_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Expense splits table created');

    // Expense split participants table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS expense_split_participants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        expense_split_id INT NOT NULL,
        user_id INT,
        name VARCHAR(255) NOT NULL,
        share DECIMAL(10, 2) DEFAULT 0,
        percentage DECIMAL(5, 2) DEFAULT 0,
        FOREIGN KEY (expense_split_id) REFERENCES expense_splits(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_split (expense_split_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Expense split participants table created');

    // Saved activities table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS saved_activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        activity_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_activity (user_id, activity_id),
        INDEX idx_user (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Saved activities table created');

    // Trip recommendations table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS trip_recommendations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        location VARCHAR(255),
        budget_range VARCHAR(50),
        duration VARCHAR(50),
        best_for JSON,
        image_url VARCHAR(500),
        rating DECIMAL(3, 2),
        match_score DECIMAL(5, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_user (user_id),
        INDEX idx_score (match_score)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Trip recommendations table created');

    // Shared trips table (Publicationary)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS shared_trips (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trip_id INT NOT NULL,
        user_id INT NOT NULL,
        is_public BOOLEAN DEFAULT FALSE,
        share_code VARCHAR(50) UNIQUE,
        views INT DEFAULT 0,
        likes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_trip (trip_id),
        INDEX idx_public (is_public),
        INDEX idx_code (share_code)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Shared trips table created');

    // Hotels table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS hotels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        city_id INT,
        address VARCHAR(500),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        price_per_night DECIMAL(10, 2),
        rating DECIMAL(3, 2),
        amenities JSON,
        image_url VARCHAR(500),
        booking_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL,
        INDEX idx_city (city_id),
        INDEX idx_rating (rating)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Hotels table created');

    // Flights table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS flights (
        id INT AUTO_INCREMENT PRIMARY KEY,
        origin_city_id INT,
        destination_city_id INT,
        airline VARCHAR(100),
        flight_number VARCHAR(50),
        departure_time DATETIME,
        arrival_time DATETIME,
        price DECIMAL(10, 2),
        duration_minutes INT,
        stops INT DEFAULT 0,
        booking_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (origin_city_id) REFERENCES cities(id) ON DELETE SET NULL,
        FOREIGN KEY (destination_city_id) REFERENCES cities(id) ON DELETE SET NULL,
        INDEX idx_origin (origin_city_id),
        INDEX idx_destination (destination_city_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Flights table created');

    // Insert default interests
    const defaultInterests = [
      { name: 'Food & Dining', emoji: '🍽️', color: '#FF9E7D' },
      { name: 'Culture & History', emoji: '🏛️', color: '#A3C4F3' },
      { name: 'Nature & Hiking', emoji: '🏞️', color: '#96E6A1' },
      { name: 'Beach & Relax', emoji: '🏖️', color: '#4ECDC4' },
      { name: 'Shopping', emoji: '🛍️', color: '#F0C987' },
      { name: 'Nightlife', emoji: '🌃', color: '#8B5CF6' }
    ];

    for (const interest of defaultInterests) {
      await connection.query(
        'INSERT IGNORE INTO interests (name, emoji, color) VALUES (?, ?, ?)',
        [interest.name, interest.emoji, interest.color]
      );
    }
    console.log('✅ Default interests inserted');

    // Insert sample cities
    const sampleCities = [
      { name: 'Paris', country: 'France', country_code: 'FR', cost_index: 4, popularity: 95, description: 'City of Light, known for art, fashion, and culture' },
      { name: 'Tokyo', country: 'Japan', country_code: 'JP', cost_index: 5, popularity: 92, description: 'Vibrant metropolis blending tradition and technology' },
      { name: 'New York', country: 'USA', country_code: 'US', cost_index: 5, popularity: 98, description: 'The city that never sleeps, cultural melting pot' },
      { name: 'Bali', country: 'Indonesia', country_code: 'ID', cost_index: 2, popularity: 88, description: 'Tropical paradise with beautiful beaches and temples' },
      { name: 'Rome', country: 'Italy', country_code: 'IT', cost_index: 3, popularity: 90, description: 'Eternal city with ancient history and delicious cuisine' },
      { name: 'Sydney', country: 'Australia', country_code: 'AU', cost_index: 4, popularity: 85, description: 'Coastal city famous for its harbor and iconic Opera House' },
      { name: 'Cape Town', country: 'South Africa', country_code: 'ZA', cost_index: 2, popularity: 82, description: 'Stunning coastal city with Table Mountain backdrop' },
      { name: 'Bangkok', country: 'Thailand', country_code: 'TH', cost_index: 2, popularity: 87, description: 'Vibrant city with street food, temples, and night markets' }
    ];

    for (const city of sampleCities) {
      await connection.query(
        'INSERT IGNORE INTO cities (name, country, country_code, cost_index, popularity, description) VALUES (?, ?, ?, ?, ?, ?)',
        [city.name, city.country, city.country_code, city.cost_index, city.popularity, city.description]
      );
    }
    console.log('✅ Sample cities inserted');

    console.log('\n🎉 Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run initialization
initDatabase();

