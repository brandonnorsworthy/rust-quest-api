-- db-init/init.sql
-- postgresql database initialization script

-- Roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    role_id INTEGER REFERENCES roles(id) DEFAULT 1,
    password VARCHAR(255),
    metadata JSONB NOT NULL DEFAULT '{}',
    completed_quests INTEGER[] NOT NULL DEFAULT ARRAY[]::INTEGER[],
    oauth_provider VARCHAR(50), -- For OAuth integration (e.g., Google, Facebook)
    oauth_id VARCHAR(255), -- ID from the OAuth provider
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER REFERENCES users(id) DEFAULT NULL,
    last_login TIMESTAMP DEFAULT NULL,
    login_count INTEGER DEFAULT 1
);

-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER REFERENCES users(id) DEFAULT NULL,
    deleted_by INTEGER REFERENCES users(id) DEFAULT NULL
);

-- Suggestions table
CREATE TABLE suggestions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER REFERENCES users(id) DEFAULT NULL,
    deleted_by INTEGER REFERENCES users(id) DEFAULT NULL
);

-- Quests table
CREATE TABLE quests (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    description TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    objectives TEXT[] NOT NULL,
    image_url VARCHAR(255),
    suggested_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER REFERENCES users(id) DEFAULT NULL,
    deleted_by INTEGER REFERENCES users(id) DEFAULT NULL,
    soft_deleted BOOLEAN DEFAULT FALSE
);

INSERT INTO roles (name) VALUES
('user'),
('moderator'),
('admin'),
('guest');


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
INSERT INTO users (username, role_id, completed_quests, metadata, password, oauth_provider, oauth_id) VALUES
('zcog', 3, ARRAY[1, 3, 6, 8], '{"sound": false}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', NULL, NULL),
('littlefoot', 2, ARRAY[2, 4, 7], '{"sound": true}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', 'google', 'google-id-123'),
('Cattasaurus', 1, ARRAY[5, 6], '{"sound": false}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', NULL, NULL),
('HandsomeJack', 1, ARRAY[1, 2, 8], '{"sound": true}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', NULL, NULL),
('luna', 1, ARRAY[3, 5, 7], '{"sound": false}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', 'facebook', 'fb-id-456'),
('SugarCubeBlood', 1, ARRAY[4, 6], '{"sound": true}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', NULL, NULL),
('CaptainSparklez', 1, ARRAY[7, 8], '{"sound": false}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', 'twitter', 'tw-id-789'),
('zezima', 2, ARRAY[1, 3, 4], '{"sound": true}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', NULL, NULL),
('pageinabook', 1, ARRAY[2, 5, 6], '{"sound": false}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', NULL, NULL),
('notacoconut', 3, ARRAY[7, 9], '{"sound": true}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', 'google', 'google-id-234');

-- Insert 10 rows into suggestions table without objectives
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
