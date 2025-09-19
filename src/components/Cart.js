import React from 'react';  
import { motion, AnimatePresence } from 'framer-motion';  
import { Trash2, CreditCard, X } from 'lucide-react';  

const Cart = ({ cart = [], onRemoveFromCart = () => {}, onCheckout = () => {}, isOpen, onClose }) => {  
  const total = cart.reduce((sum, item) => sum + item.price, 0);  

  return (  
    <AnimatePresence>  
      {isOpen && (  
        <>  
          <motion.div  
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"  
            initial={{ opacity: 0 }}  
            animate={{ opacity: 1 }}  
            exit={{ opacity: 0 }}  
            onClick={onClose}  
          />  
          <motion.div  
            className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto"  
            initial={{ x: "100%" }}  
            animate={{ x: 0 }}  
            exit={{ x: "100%" }}  
            transition={{ type: "spring", damping: 25, stiffness: 500 }}  
          >  
            <div className="p-6">  
              <div className="flex items-center justify-between mb-6">  
                <h2 className="text-2xl font-bold text-gray-900">Carrito de Compras</h2>  
                <motion.button  
                  onClick={onClose}  
                  className="text-gray-400 hover:text-gray-600 md:hidden"  
                  whileHover={{ scale: 1.1 }}  
                  whileTap={{ scale: 0.9 }}  
                >  
                  <X className="w-6 h-6" />  
                </motion.button>  
              </div>  

              {cart.length === 0 ? (  
                <div className="text-center py-12">  
                  <p className="text-gray-500 text-lg mb-4">Tu carrito está vacío</p>  
                  <p className="text-gray-400">¡Empieza a agregar cuentas premium!</p>  
                </div>  
              ) : (  
                <>  
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">  
                    {cart.map((item) => (  
                      <motion.div  
                        key={item.id}  
                        className="flex items-center justify-between p-4 border-b border-gray-200"  
                        layout  
                      >  
                        <div className="flex items-center gap-4 flex-1">  
                          <img src={item.image} alt={item.platform} className="w-16 h-16 rounded-lg object-cover" />  
                          <div>  
                            <h4 className="font-semibold text-gray-900">{item.platform}</h4>  
                            <p className="text-sm text-gray-600">{item.type}</p>  
                          </div>  
                        </div>  
                        <div className="text-right">  
                          <p className="font-semibold text-gray-900">${item.price}</p>  
                          <motion.button  
                            onClick={() => onRemoveFromCart(item.id)}  
                            className="text-red-500 hover:text-red-700 mt-1"  
                            whileHover={{ scale: 1.2 }}  
                            whileTap={{ scale: 0.9 }}  
                          >  
                            <Trash2 className="w-5 h-5" />  
                          </motion.button>  
                        </div>  
                      </motion.div>  
                    ))}  
                  </div>  

                  <div className="border-t pt-4 space-y-4">  
                    <div className="flex justify-between items-center">  
                      <span className="text-lg font-semibold">Total:</span>  
                      <span className="text-2xl font-bold text-purple-600">${total.toFixed(2)}</span>  
                    </div>  
                    <motion.button  
                      onClick={onCheckout}  
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all"  
                      whileHover={{ scale: 1.02 }}  
                      whileTap={{ scale: 0.98 }}  
                    >  
                      <CreditCard className="w-5 h-5" />  
                      Proceder al Pago  
                    </motion.button>  
                  </div>  
                </>  
              )}  
            </div>  
          </motion.div>  
        </>  
      )}  
    </AnimatePresence>  
  );  
};  

export default Cart;