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
    role VARCHAR(10) NOT NULL DEFAULT 'user',
    password VARCHAR(255),
    metadata JSONB NOT NULL DEFAULT '{}',
    completed_quests INTEGER[] NOT NULL DEFAULT ARRAY[]::INTEGER[],
    oauth_provider VARCHAR(50), -- For OAuth integration (e.g., Google, Facebook)
    oauth_id VARCHAR(255) -- ID from the OAuth provider
);

-- Suggestions table
CREATE TABLE suggestions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    objectives TEXT[] NOT NULL
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
INSERT INTO users (username, role, completed_quests, metadata, password, oauth_provider, oauth_id) VALUES
('zcog', 'admin', ARRAY[1, 3, 6, 8], '{"sound": false}', '$2b$10$2iWlcbpf1MYROBYodo/4yufNXOpGzwiQenhLjyK3I/D4Y.q3V4aEu', NULL, NULL),
('littlefoot', 'user', ARRAY[2, 4, 7], '{"sound": true}', '$2b$10$2iWlcbpf1MYROBYodo/4yufNXOpGzwiQenhLjyK3I/D4Y.q3V4aEu', 'google', 'google-id-123'),
('Cattasaurus', 'user', ARRAY[5, 6], '{"sound": false}', '$2b$10$2iWlcbpf1MYROBYodo/4yufNXOpGzwiQenhLjyK3I/D4Y.q3V4aEu', NULL, NULL),
('HandsomeJack', 'user', ARRAY[1, 2, 8], '{"sound": true}', '$2b$10$2iWlcbpf1MYROBYodo/4yufNXOpGzwiQenhLjyK3I/D4Y.q3V4aEu', NULL, NULL),
('luna', 'user', ARRAY[3, 5, 7], '{"sound": false}', '$2b$10$2iWlcbpf1MYROBYodo/4yufNXOpGzwiQenhLjyK3I/D4Y.q3V4aEu', 'facebook', 'fb-id-456'),
('SugarCubeBlood', 'user', ARRAY[4, 6], '{"sound": true}', '$2b$10$2iWlcbpf1MYROBYodo/4yufNXOpGzwiQenhLjyK3I/D4Y.q3V4aEu', NULL, NULL),
('CaptainSparklez', 'user', ARRAY[7, 8], '{"sound": false}', '$2b$10$2iWlcbpf1MYROBYodo/4yufNXOpGzwiQenhLjyK3I/D4Y.q3V4aEu', 'twitter', 'tw-id-789'),
('zezima', 'admin', ARRAY[1, 3, 4], '{"sound": true}', '$2b$10$2iWlcbpf1MYROBYodo/4yufNXOpGzwiQenhLjyK3I/D4Y.q3V4aEu', NULL, NULL),
('pageinabook', 'user', ARRAY[2, 5, 6], '{"sound": false}', '$2b$10$2iWlcbpf1MYROBYodo/4yufNXOpGzwiQenhLjyK3I/D4Y.q3V4aEu', NULL, NULL),
('notacoconut', 'admin', ARRAY[7, 9], '{"sound": true}', '$2b$10$2iWlcbpf1MYROBYodo/4yufNXOpGzwiQenhLjyK3I/D4Y.q3V4aEu', 'google', 'google-id-234');

-- Insert 10 rows into suggestions table with defined objectives
INSERT INTO suggestions (user_id, title, description, objectives) VALUES
(4, 'expand the base', 'Add a second floor to your base', ARRAY[
    'Gather 1000 wood for construction',
    'Craft and place 20 floor tiles',
    'Install a metal door for added security'
]),
(5, 'scout for enemies', 'Check nearby areas for enemy players', ARRAY[
    'Travel to the nearest monument and observe activity',
    'Use binoculars to scan the surroundings for potential threats',
    'Report back to the team with findings'
]),
(6, 'gather supplies', 'Collect wood, stone, and metal ore for upgrades', ARRAY[
    'Chop down 50 trees for wood',
    'Mine 100 stone nodes',
    'Collect 200 metal ore from nearby rocks'
]),
(7, 'build a turret', 'Place an automated turret near your base entrance', ARRAY[
    'Craft the turret using 1000 metal fragments and 200 high-quality metal',
    'Gather and load 500 ammo rounds into the turret',
    'Position the turret at the base entrance for maximum coverage'
]),
(8, 'upgrade weapons', 'Craft better weapons for defense', ARRAY[
    'Collect 300 scrap for weapon blueprints',
    'Craft a semi-automatic rifle',
    'Gather 200 gunpowder for ammunition'
]),
(9, 'prepare for winter', 'Stockpile food and resources for the upcoming winter', ARRAY[
    'Hunt and store 50 pieces of cooked meat',
    'Gather 100 cloth for clothing and warmth',
    'Build 3 campfires for heating'
]),
(10, 'team up', 'Find other players to team up with for raids', ARRAY[
    'Visit the nearest outpost to meet potential allies',
    'Exchange resources to build trust',
    'Organize a raid schedule with new team members'
]);


-- Insert 10 rows into quests table
INSERT INTO quests (category_id, description, title, objectives, image_url) VALUES
((SELECT id FROM categories WHERE name='PVP'), 'Next locked crate that drops, contest it for yourself', 'Try to Claim a Locked Crate', ARRAY['kill_all_scientists','escape_with_the_loot'], 'https://questsandbox.s3.amazonaws.com/mission.png'),
((SELECT id FROM categories WHERE name='Survival'), 'Gather resources to survive the night', 'Survive the Night', ARRAY['gather_wood','find_shelter'], 'https://questsandbox.s3.amazonaws.com/mission.png'),
((SELECT id FROM categories WHERE name='Exploration'), 'Discover a new monument on the map', 'Find a New Monument', ARRAY['explore_map','mark_location'], 'https://questsandbox.s3.amazonaws.com/mission.png'),
((SELECT id FROM categories WHERE name='Crafting'), 'Craft advanced armor for better protection', 'Create Advanced Armor', ARRAY['gather_materials','craft_armor'], 'https://questsandbox.s3.amazonaws.com/mission.png'),
((SELECT id FROM categories WHERE name='PVE'), 'Clear out the bandit camp for resources', 'Clear the Bandit Camp', ARRAY['kill_bandits','loot_the_camp'], 'https://questsandbox.s3.amazonaws.com/mission.png'),
((SELECT id FROM categories WHERE name='Defense'), 'Reinforce your base with stronger walls and doors', 'Fortify Your Base', ARRAY['upgrade_walls','install_traps'], 'https://questsandbox.s3.amazonaws.com/mission.png'),
((SELECT id FROM categories WHERE name='Trade'), 'Trade resources with other players', 'Barter for Supplies', ARRAY['find_traders','negotiate_deals'], 'https://questsandbox.s3.amazonaws.com/mission.png'),
((SELECT id FROM categories WHERE name='PVP'), 'Defeat an enemy player in combat', 'Engage in PVP', ARRAY['locate_enemy','win_fight'], 'https://questsandbox.s3.amazonaws.com/mission.png'),
((SELECT id FROM categories WHERE name='Survival'), 'Stay alive during a harsh storm', 'Survive the Storm', ARRAY['find_shelter','keep_warm'], 'https://questsandbox.s3.amazonaws.com/mission.png'),
((SELECT id FROM categories WHERE name='Exploration'), 'Map out the entire island', 'Map the Island', ARRAY['explore_north','explore_south','explore_east','explore_west'], 'https://questsandbox.s3.amazonaws.com/mission.png');
