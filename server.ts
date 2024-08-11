import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'

import { executeQuery } from './database/connection';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, TypeScript with Express!');
});

app.get('/users', async (req: Request, res: Response) => {
	try {
		const users = await executeQuery('SELECT * FROM users');

		if (users.length === 0) {
			res.status(404).send('No users found');
			return;
		}

		res.send(users);
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred while fetching users');
	}
});

app.get('/quests', async (req: Request, res: Response) => {
	try {
		const quests = await executeQuery(`SELECT
				quests.id,
				quests.title,
        quests.description,
        quests.objectives,
        quests.image_url,
        categories.name AS category
    FROM
        quests
    JOIN
        categories ON quests.category_id = categories.id
    ORDER BY
        quests.id DESC;
    `);

		if (quests.length === 0) {
			res.status(404).send('No quests found');
			return;
		}

		res.send(quests);
	} catch (error) {
		console.error(error);
		res.status(500).send('An error occurred while fetching users');
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
