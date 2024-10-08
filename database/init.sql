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
    approved_suggestions INTEGER DEFAULT 0,
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
    weight INTEGER NOT NULL DEFAULT 1,
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

CREATE TABLE dlcs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
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
    required_dlc INTEGER REFERENCES dlcs(id) DEFAULT NULL,
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
INSERT INTO categories (name, weight) VALUES
('PVP', 3),
('PVE', 4),
('Monuments', 5),
('Exploration', 5),
('Crafting', 5),
('Gambling', 1),
('Roleplay', 5),
('Automation', 2),
('Trolling', 3),
('Survival', 5),
('Raiding', 1),
('Building', 5),
('Marketplace Items', 1);

-- Insert 10 rows into users table
INSERT INTO users (username, role_id, completed_quests, metadata, password, approved_suggestions, last_login) VALUES
('zcog', 3, ARRAY[1, 3, 6, 8], '{ "sound": false, "categoryFilters": [   8,   7,   6 ], "sunburnDLCQuests": false, "disableAnimations": false, "instrumentDLCQuests": false, "voicePropsDLCQuests": false}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', 0, NOW()),
('notacoconut', 3, ARRAY[7, 9], '{"sound": true}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', 0, NOW()),
('demouser1', 2, ARRAY[2, 4, 7], '{ "sound": false, "categoryFilters": [   1,   2,   3 ], "sunburnDLCQuests": false, "disableAnimations": false, "instrumentDLCQuests": true, "voicePropsDLCQuests": false}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', 2, NOW()),
('demouser2', 2, ARRAY[1, 3, 4], '{"sound": true}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', 1, NOW()),
('demouser3', 1, ARRAY[5, 6], '{"sound": false}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', 1, NOW()),
('demouser4', 1, ARRAY[1, 2, 8], '{"sound": true}', '$2b$10$ita5UtzrE2JBh.275g5i8ebBnnM99D9wZhRmcqfZYfgTjbt.baNyG', 1, NOW());

-- Insert 10 rows into suggestions table without objectives
INSERT INTO suggestions (user_id, title, description) VALUES
(3, 'Visit Mars', 'Travel to mars and explore the surface'),
(4, 'Build a spaceship', 'Create a spaceship to travel to other planets'),
(5, 'Fight the Giant Robot', 'Defeat the giant robot that is terrorizing the city'),
(6, 'Finish the Easter Egg', 'Complete the Easter egg quest in the game'),
(3, 'Get the diamond camo for the intervention', 'Complete all the tasks for the intervention and unlock the diamond camo');

INSERT INTO dlcs (name) VALUES
('Console Edition'),
('Sunburn Pack'),
('Voice Props Pack'),
('Instruments Pack');

-- Insert 10 rows into quests table
INSERT INTO quests (category_id, description, title, objectives) VALUES
(1, 'Next locked crate that drops, contest it for yourself', 'demo Try to Claim a Locked Crate', ARRAY['kill_all_scientists','escape_with_the_loot']),
(2, 'Gather resources to survive the night', 'demo Survive the Night', ARRAY['gather_wood','find_shelter']),
(3, 'Discover a new monument on the map', 'demo Find a New Monument', ARRAY['explore_map','mark_location']),
(4, 'Craft advanced armor for better protection', 'demo Create Advanced Armor', ARRAY['gather_materials','craft_armor']),
(5, 'Clear out the bandit camp for resources', 'demo Clear the Bandit Camp', ARRAY['kill_bandits','loot_the_camp']),
(4, 'Trade resources with other players', 'demo Barter for Supplies', ARRAY['find_traders','negotiate_deals']),
(3, 'Defeat an enemy player in combat', 'demo Engage in PVP', ARRAY['locate_enemy','win_fight']),
(2, 'Stay alive during a harsh storm', 'demo Survive the Storm', ARRAY['find_shelter','keep_warm']),
(1, 'Map out the entire island', 'demo Map the Island', ARRAY['explore_north','explore_south','explore_east','explore_west']);
