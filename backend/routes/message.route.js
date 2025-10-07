import express from 'express';
import messageController from '../controllers/message.controller.js'
import authorize from '../middlewares/authorize.js'
const router = express.Router();



router.get('/:id', authorize, messageController.getMessages)
router.post('/send/:id', authorize, messageController.sendMessage)




export default router;