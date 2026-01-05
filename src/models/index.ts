import { sequelize } from '../config/db.config.ts';

import { User } from './user.model.ts';
import { Note } from './note.model.ts';
import { Version } from './version.model.ts';
import { Attachment } from './attachment.model.ts';
import { Collaborator } from './collaborator.model.ts';

// Define relationships to other models after initialization to prevent circular dependencies
User.associate();
Note.associate();
Version.associate();
Collaborator.associate();
Attachment.associate();

// Sync models to database
if (process.env.NODE_ENV === 'development') {
  try {
    await sequelize.sync({ force: true, logging: false });
    console.log('Database synchronization complete.');
  } catch (error) {
    console.error('Unable to sync to database:', error);
  }
}

export { User, Note, Version, Collaborator, Attachment };
