import { User } from './user.model.ts';
import { Note } from './note.model.ts';
import { Version } from './version.model.ts';
import { Attachment } from './attachment.model.ts';
import { Permission } from './permission.model.ts';

// Define relationships to other models after initialization to prevent circular dependencies
User.setAssociations();
Note.setAssociations();
Version.setAssociations();
Permission.setAssociations();
Attachment.setAssociations();

export {
  User,
  Note,
  Version,
  Permission,
  Attachment,
}