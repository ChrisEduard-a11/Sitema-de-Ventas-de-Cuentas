import React from 'react';  
import { motion, AnimatePresence } from 'framer-motion';  
import { X, CreditCard, Smartphone, Banknote, Send } from 'lucide-react';  

const PaymentMethodsModal = ({ isOpen, onClose, total = 0, onSelectPayment = () => {} }) => {  
  const paymentMethods = [  
    {  
      id: 'pago-movil',  
      name: 'Pago Móvil',  
      description: 'Paga con tu banco venezolano (Banesco, Provincial, BNC, etc.)',  
      icon: Smartphone,  
      steps: ['Selecciona tu banco', 'Ingresa el número de teléfono', 'Confirma el monto']  
    },  
    {  
      id: 'zelle',  
      name: 'Zelle',  
      description: 'Transferencia rápida desde EE.UU. o cuentas asociadas',  
      icon: Send,  
      steps: ['Ingresa tu email o teléfono Zelle', 'Envía el monto', 'Recibe confirmación instantánea']  
    },  
    {  
      id: 'transferencia',  
      name: 'Transferencia Bancaria',  
      description: 'Depósito directo a nuestra cuenta en banco venezolano',  
      icon: Banknote,  
      steps: ['Copia los datos bancarios', 'Realiza la transferencia', 'Envía el comprobante']  
    },  
    {  
      id: 'tarjeta',  
      name: 'Tarjeta de Crédito/Débito',  
      description: 'Visa, Mastercard o locales (simulado para Venezuela)',  
      icon: CreditCard,  
      steps: ['Ingresa datos de tarjeta', 'Verifica código de seguridad', 'Autoriza el pago']  
    }  
  ];  

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
            className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"  
            initial={{ scale: 0.95, opacity: 0 }}  
            animate={{ scale: 1, opacity: 1 }}  
            exit={{ scale: 0.95, opacity: 0 }}  
            transition={{ type: "spring", damping: 25, stiffness: 500 }}  
            onClick={(e) => e.stopPropagation()}  
          >  
            <div className="p-6">  
              <div className="flex items-center justify-between mb-6">  
                <h2 className="text-2xl font-bold text-gray-900">Métodos de Pago (Venezuela)</h2>  
                <motion.button  
                  onClick={onClose}  
                  className="text-gray-400 hover:text-gray-600"  
                  whileHover={{ scale: 1.1 }}  
                  whileTap={{ scale: 0.9 }}  
                >  
                  <X className="w-6 h-6" />  
                </motion.button>  
              </div>  

              <div className="mb-6">  
                <p className="text-gray-600 mb-2">Total a pagar: <span className="font-bold text-purple-600">${total.toFixed(2)}</span></p>  
                <p className="text-sm text-gray-500">Elige tu método preferido para Venezuela:</p>  
              </div>  

              <div className="space-y-4 mb-6">  
                {paymentMethods.map((method) => {  
                  const Icon = method.icon;  
                  return (  
                    <motion.button  
                      key={method.id}  
                      onClick={() => onSelectPayment(method)}  
                      className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all"  
                      whileHover={{ scale: 1.02 }}  
                      whileTap={{ scale: 0.98 }}  
                    >  
                      <div className="p-3 bg-purple-100 rounded-lg">  
                        <Icon className="w-6 h-6 text-purple-600" />  
                      </div>  
                      <div className="flex-1">  
                        <h3 className="font-semibold text-gray-900">{method.name}</h3>  
                        <p className="text-sm text-gray-600">{method.description}</p>  
                      </div>  
                      <div className="text-right">  
                        <span className="text-xs text-gray-500">Selecciona</span>  
                      </div>  
                    </motion.button>  
                  );  
                })}  
              </div>  

              <p className="text-xs text-gray-500 text-center">Procesamos pagos seguros con bancos venezolanos. Recibirás confirmación inmediata.</p>  
            </div>  
          </motion.div>  
        </motion.div>  
      )}  
    </AnimatePresence>  
  );  
};  

export default PaymentMethodsModal;