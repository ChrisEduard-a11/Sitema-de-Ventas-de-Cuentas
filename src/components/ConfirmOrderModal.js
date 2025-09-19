import React from 'react';  
import { motion, AnimatePresence } from 'framer-motion';  
import { CreditCard, X, ShoppingCart } from 'lucide-react';  

const ConfirmOrderModal = ({ isOpen, onClose, cart = [], total = 0, onConfirm }) => {  
  return (  
    <AnimatePresence>  
      {isOpen && (  
        <motion.div  
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          exit={{ opacity: 0 }}  
          onClick={onClose}  
        >  
          <motion.div  
            className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl"  
            initial={{ scale: 0.95, opacity: 0 }}  
            animate={{ scale: 1, opacity: 1 }}  
            exit={{ scale: 0.95, opacity: 0 }}  
            transition={{ type: "spring", damping: 25, stiffness: 500 }}  
            onClick={(e) => e.stopPropagation()}  
          >  
            <div className="p-6">  
              <div className="flex items-center justify-between mb-6">  
                <div className="flex items-center gap-3">  
                  <div className="p-2 bg-blue-100 rounded-lg">  
                    <ShoppingCart className="w-6 h-6 text-blue-600" />  
                  </div>  
                  <h2 className="text-2xl font-bold text-gray-900">Confirmar Pedido</h2>  
                </div>  
                <motion.button  
                  onClick={onClose}  
                  className="text-gray-400 hover:text-gray-600"  
                  whileHover={{ scale: 1.1 }}  
                  whileTap={{ scale: 0.9 }}  
                >  
                  <X className="w-6 h-6" />  
                </motion.button>  
              </div>  

              <div className="space-y-4 mb-6">  
                <p className="text-gray-600">Estás a punto de comprar {cart.length} cuenta{cart.length !== 1 ? 's' : ''}:</p>  
                {cart.map((item) => (  
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">  
                    <div className="flex items-center gap-3">  
                      <img src={item.image} alt={item.platform} className="w-10 h-10 rounded object-cover" />  
                      <span className="font-medium">{item.platform} - {item.type}</span>  
                    </div>  
                    <span className="text-gray-900 font-semibold">${item.price}</span>  
                  </div>  
                ))}  
              </div>  

              <div className="border-t pt-4 mb-6">  
                <div className="flex justify-between items-center mb-4">  
                  <span className="text-lg font-semibold text-gray-900">Total a pagar:</span>  
                  <span className="text-2xl font-bold text-purple-600">${total.toFixed(2)}</span>  
                </div>  
                <p className="text-sm text-gray-500 mb-4">Las cuentas se enviarán inmediatamente por email después del pago.</p>  
              </div>  

              <div className="flex gap-3">  
                <motion.button  
                  onClick={onClose}  
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all"  
                  whileHover={{ scale: 1.02 }}  
                  whileTap={{ scale: 0.98 }}  
                >  
                  Cancelar  
                </motion.button>  
                <motion.button  
                  onClick={onConfirm}  
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all"  
                  whileHover={{ scale: 1.02 }}  
                  whileTap={{ scale: 0.98 }}  
                >  
                  <CreditCard className="w-5 h-5" />  
                  Confirmar y Pagar  
                </motion.button>  
              </div>  
            </div>  
          </motion.div>  
        </motion.div>  
      )}  
    </AnimatePresence>  
  );  
};  

export default ConfirmOrderModal;