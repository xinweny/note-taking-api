import { app } from './app.ts';

import { syncDb } from './config/db.config.ts';
import { connectCache } from './config/redis.config.ts';

connectCache();
syncDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
