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

export {
  User,
  Note,
  Version,
  Collaborator,
  Attachment,
}