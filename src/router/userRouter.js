import express from 'express';
import { 
  login,
  updateUsersPassword, 
  updateUsersEmail, 
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
  getOneUser,
  createAnonymousUser
} from '../controllers/userController.js';

const router = express.Router();

router.get('/user', getUsers);
router.get('/user/:id', getOneUser);
router.post('/register', createUsers);
router.post('/anonymous', createAnonymousUser); 
router.put('/user/:id', updateUsers);
router.delete('/user/:id', deleteUsers);
router.post('/login', login);
router.put('/user/email/:id', updateUsersEmail);
router.put('/user/password/:id', updateUsersPassword);

export const RouterUser = router;