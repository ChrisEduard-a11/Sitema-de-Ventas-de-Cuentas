import React from 'react';  
import { motion, AnimatePresence } from 'framer-motion';  
import { CheckCircle, CreditCard, X, ShoppingCart } from 'lucide-react';  

const CheckoutModal = ({ isOpen, onClose, cart = [], total = 0, onConfirm }) => {  
  return (  
    <AnimatePresence>  
      {isOpen && (  
        <motion.div  
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  
          initial={{ opacity: 0 }}  
          animate={{ opacity: 1 }}  
          exit={{ opacity: 0 }}  
        >  
          <motion.div  
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"  
            initial={{ scale: 0.9, opacity: 0 }}  
            animate={{ scale: 1, opacity: 1 }}  
            exit={{ scale: 0.9, opacity: 0 }}  
            transition={{ type: "spring", damping: 25, stiffness: 500 }}  
          >  
            <div className="p-6">  
              <div className="flex items-center justify-between mb-6">  
                <div className="flex items-center gap-3">  
                  <div className="p-2 bg-blue-100 rounded-lg">  
                    <ShoppingCart className="w-6 h-6 text-blue-600" />  
                  </div>  
                  <h2 className="text-2xl font-bold text-gray-900">Resumen de Compra</h2>  
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
                {cart.map((item) => (  
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">  
                    <div className="flex items-center gap-3">  
                      <img src={item.image} alt={item.platform} className="w-12 h-12 rounded-lg object-cover" />  
                      <span className="font-medium">{item.platform} - {item.type}</span>  
                    </div>  
                    <span className="text-green-600 font-semibold">${item.price}</span>  
                  </div>  
                ))}  
              </div>  

              <div className="border-t pt-4 mb-6">  
                <div className="flex justify-between items-center mb-4">  
                  <span className="text-lg font-semibold">Total:</span>  
                  <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>  
                </div>  
                <div className="flex items-center gap-2 text-green-600 mb-4">  
                  <CheckCircle className="w-5 h-5" />  
                  <span className="font-medium">Elige tu método de pago venezolano</span>  
                </div>  
              </div>  

              <motion.button  
                onClick={onConfirm}  
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all"  
                whileHover={{ scale: 1.02 }}  
                whileTap={{ scale: 0.98 }}  
              >  
                <CreditCard className="w-5 h-5" />  
                Seleccionar Método de Pago  
              </motion.button>  
            </div>  
          </motion.div>  
        </motion.div>  
      )}  
    </AnimatePresence>  
  );  
};  

export default CheckoutModal;