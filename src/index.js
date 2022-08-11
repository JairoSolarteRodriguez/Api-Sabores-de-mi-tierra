import app from './app.js';
import { sequelize } from './db/db.js';

const PORT = 3000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
      console.log('Server is running on port 3000');
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}
main();