-- db-init/init.sql

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    completed_quests INTEGER[] NOT NULL DEFAULT ARRAY[]::INTEGER[],
    metadata JSONB NOT NULL DEFAULT '{}',
    password VARCHAR(255),
    oauth_provider VARCHAR(50), -- For OAuth integration (e.g., Google, Facebook)
    oauth_id VARCHAR(255) -- ID from the OAuth provider
);

-- Suggestions table
CREATE TABLE suggestions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);

-- Quests table
CREATE TABLE quests (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    description TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    objectives TEXT[] NOT NULL,
    image_url VARCHAR(255)
);

-- Insert categories into categories table
INSERT INTO categories (name) VALUES
('PVP'),
('Survival'),
('Exploration'),
('Crafting'),
('PVE'),
('Defense'),
('Trade');

-- Insert 10 rows into users table
INSERT INTO users (username, completed_quests, metadata, password, oauth_provider, oauth_id) VALUES
('zcog', ARRAY[1, 3, 6, 8], '{"sound": false}', '$2b$10$XEzscKa8BkSW5EKw5dLkFOlLa6IYRkoykOG2LlYImtIYDG4.6tfu6', NULL, NULL),
('player2', ARRAY[2, 4, 7], '{"sound": true}', '$2b$10$XEzscKa8BkSW5EKw5dLkFOlLa6IYRkoykOG2LlYImtIYDG4.6tfu6.', 'google', 'google-id-123'),
('player3', ARRAY[5, 6], '{"sound": false}', '$2b$10$XEzscKa8BkSW5EKw5dLkFOlLa6IYRkoykOG2LlYImtIYDG4.6tfu6', NULL, NULL),
('player4', ARRAY[1, 2, 8], '{"sound": true}', '$2b$10$XEzscKa8BkSW5EKw5dLkFOlLa6IYRkoykOG2LlYImtIYDG4.6tfu6', NULL, NULL),
('player5', ARRAY[3, 5, 7], '{"sound": false}', '$2b$10$XEzscKa8BkSW5EKw5dLkFOlLa6IYRkoykOG2LlYImtIYDG4.6tfu6', 'facebook', 'fb-id-456'),
('player6', ARRAY[4, 6], '{"sound": true}', '$2b$10$XEzscKa8BkSW5EKw5dLkFOlLa6IYRkoykOG2LlYImtIYDG4.6tfu6', NULL, NULL),
('player7', ARRAY[7, 8], '{"sound": false}', '$2b$10$XEzscKa8BkSW5EKw5dLkFOlLa6IYRkoykOG2LlYImtIYDG4.6tfu6', 'twitter', 'tw-id-789'),
('player8', ARRAY[1, 3, 4], '{"sound": true}', '$2b$10$XEzscKa8BkSW5EKw5dLkFOlLa6IYRkoykOG2LlYImtIYDG4.6tfu6', NULL, NULL),
('player9', ARRAY[2, 5, 6], '{"sound": false}', '$2b$10$XEzscKa8BkSW5EKw5dLkFOlLa6IYRkoykOG2LlYImtIYDG4.6tfu6', NULL, NULL),
('player10', ARRAY[7, 9], '{"sound": true}', '$2b$10$XEzscKa8BkSW5EKw5dLkFOlLa6IYRkoykOG2LlYImtIYDG4.6tfu6', 'google', 'google-id-234');

-- Insert 10 rows into suggestions table
INSERT INTO suggestions (user_id, title, description) VALUES
(4, 'expand the base', 'Add a second floor to your base'),
(5, 'scout for enemies', 'Check nearby areas for enemy players'),
(6, 'gather supplies', 'Collect wood, stone, and metal ore for upgrades'),
(7, 'build a turret', 'Place an automated turret near your base entrance'),
(8, 'upgrade weapons', 'Craft better weapons for defense'),
(9, 'prepare for winter', 'Stockpile food and resources for the upcoming winter'),
(10, 'team up', 'Find other players to team up with for raids');

-- Insert 10 rows into quests table
INSERT INTO quests (category_id, description, title, objectives, image_url) VALUES
((SELECT id FROM categories WHERE name='PVP'), 'Next locked crate that drops, contest it for yourself', 'Try to Claim a Locked Crate', ARRAY['kill_all_scientists','escape_with_the_loot'], 'https://fakeimg.pl/600x400'),
((SELECT id FROM categories WHERE name='Survival'), 'Gather resources to survive the night', 'Survive the Night', ARRAY['gather_wood','find_shelter'], 'https://fakeimg.pl/600x400'),
((SELECT id FROM categories WHERE name='Exploration'), 'Discover a new monument on the map', 'Find a New Monument', ARRAY['explore_map','mark_location'], 'https://fakeimg.pl/600x400'),
((SELECT id FROM categories WHERE name='Crafting'), 'Craft advanced armor for better protection', 'Create Advanced Armor', ARRAY['gather_materials','craft_armor'], 'https://fakeimg.pl/600x400'),
((SELECT id FROM categories WHERE name='PVE'), 'Clear out the bandit camp for resources', 'Clear the Bandit Camp', ARRAY['kill_bandits','loot_the_camp'], 'https://fakeimg.pl/600x400'),
((SELECT id FROM categories WHERE name='Defense'), 'Reinforce your base with stronger walls and doors', 'Fortify Your Base', ARRAY['upgrade_walls','install_traps'], 'https://fakeimg.pl/600x400'),
((SELECT id FROM categories WHERE name='Trade'), 'Trade resources with other players', 'Barter for Supplies', ARRAY['find_traders','negotiate_deals'], 'https://fakeimg.pl/600x400'),
((SELECT id FROM categories WHERE name='PVP'), 'Defeat an enemy player in combat', 'Engage in PVP', ARRAY['locate_enemy','win_fight'], 'https://fakeimg.pl/600x400'),
((SELECT id FROM categories WHERE name='Survival'), 'Stay alive during a harsh storm', 'Survive the Storm', ARRAY['find_shelter','keep_warm'], 'https://fakeimg.pl/600x400'),
((SELECT id FROM categories WHERE name='Exploration'), 'Map out the entire island', 'Map the Island', ARRAY['explore_north','explore_south','explore_east','explore_west'], 'https://fakeimg.pl/600x400');
