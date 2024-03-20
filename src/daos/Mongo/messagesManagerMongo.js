const {messageModel} = require('../../models/messages.model.js');
const { logger } = require('../../utils/logger.js');

class MessageManager {
    getMessages = async () => {
        try {
          return await messageModel.find().lean();
        } catch (error) {
          return error;
        }
      }
    
  
    createMessage = async (message) => {
      if (message.user.trim() === '' || message.message.trim() === '') {
          // Evitar crear mensajes vacíos
          return null;
      }
  
      try {
          return await messageModel.create(message);
      } catch (error) {
          return error;
      }
  }
  
  deleteAllMessages = async () => {
    try {
        logger.info("Borrando todos los mensajes...");
        const result = await messageModel.deleteMany({});
        logger.info("Mensajes eliminados:", result);
        return result;
    } catch (error) {
        logger.error("Error al eliminar mensajes:", error);
        return error;
    }
}
}

module.exports = {
    MessageManager
}