import jwt from 'jsonwebtoken';

import { User } from '../models/user.js';

const user = await User.create();