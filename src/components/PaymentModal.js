import React, { useState } from 'react';  
import { motion, AnimatePresence } from 'framer-motion';  
import { X, CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react';  

const PaymentModal = ({ isOpen, onClose, total = 0, onConfirm }) => {  
  const [selectedMethod, setSelectedMethod] = useState('pago-movil');  
  const [paymentData, setPaymentData] = useState({});  

  const paymentMethods = [  
    {  
      id: 'pago-movil',  
      title: 'Pago Móvil',  
      description: 'Paga con tu banco venezolano (Banesco, Mercantil, Provincial, BOV, etc.)',  
      icon: Smartphone,  
      Icon: Smartphone  
    },  
    {  
      id: 'transferencia',  
      title: 'Transferencia Bancaria',  
      description: 'Transfiere a nuestra cuenta Banesco o Mercantil',  
      icon: Banknote,  
      Icon: Banknote  
    },  
    {  
      id: 'tarjeta',  
      title: 'Tarjeta de Crédito/Débito',  
      description: 'Visa, Mastercard o tarjetas venezolanas',  
      icon: CreditCard,  
      Icon: CreditCard  
    }  
  ];  

  const handleMethodSelect = (method) => {  
    setSelectedMethod(method.id);  
    setPaymentData({});  
  };  

  const handleInputChange = (e, field) => {  
    setPaymentData(prev => ({ ...prev, [field]: e.target.value }));  
  };  

  const getPaymentForm = () => {  
    switch (selectedMethod) {  
      case 'pago-movil':  
        return (  
          <div className="space-y-4">  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Banco Emisor</label>  
              <select  
                value={paymentData.bank || ''}  
                onChange={(e) => handleInputChange(e, 'bank')}  
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"  
              >  
                <option value="">Selecciona tu banco</option>  
                <option value="banesco">Banesco</option>  
                <option value="mercantil">Banco Mercantil</option>  
                <option value="provincial">Banco Provincial</option>  
                <option value="bov">Banco de Venezuela</option>  
                <option value="bicentenario">Banco Bicentenario</option>  
              </select>  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Número de Teléfono (para Pago Móvil)</label>  
              <input  
                type="tel"  
                placeholder="0412-XXX-XXXX"  
                value={paymentData.phone || ''}  
                onChange={(e) => handleInputChange(e, 'phone')}  
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"  
              />  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Referencia (Cédula o Memo)</label>  
              <input  
                type="text"  
                placeholder="V-12.345.678"  
                value={paymentData.ref || ''}  
                onChange={(e) => handleInputChange(e, 'ref')}  
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"  
              />  
            </div>  
          </div>  
        );  
      case 'transferencia':  
        return (  
          <div className="space-y-4">  
            <div className="bg-yellow-50 p-4 rounded-lg">  
              <p className="text-sm text-yellow-800">Cuenta destino: 0134-1234-56-7890123 (Banesco) - StreamSell Premium</p>  
              <p className="text-sm text-yellow-800">Referencia: Tu cédula o email de compra</p>  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Banco Emisor</label>  
              <select  
                value={paymentData.bank || ''}  
                onChange={(e) => handleInputChange(e, 'bank')}  
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"  
              >  
                <option value="">Selecciona tu banco</option>  
                <option value="banesco">Banesco</option>  
                <option value="mercantil">Mercantil</option>  
                <option value="provincial">Provincial</option>  
              </select>  
            </div>  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Referencia de Transferencia</label>  
              <input  
                type="text"  
                placeholder="Número de transacción"  
                value={paymentData.ref || ''}  
                onChange={(e) => handleInputChange(e, 'ref')}  
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"  
              />  
            </div>  
          </div>  
        );  
      case 'tarjeta':  
        return (  
          <div className="space-y-4">  
            <div>  
              <label className="block text-sm font-medium text-gray-700 mb-2">Número de Tarjeta</label>  
              <input  
                type="text"  
                placeholder="1234 5678 9012 3456"  
                value={paymentData.cardNumber || ''}  
                onChange={(e) => handleInputChange(e, 'cardNumber')}  
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"  
              />  
            </div>  
            <div className="grid grid-cols-2 gap-4">  
              <div>  
                <label className="block text-sm font-medium text-gray-700 mb-2">Fecha Expiración</label>  
                <input  
                  type="text"  
                  placeholder="MM/AA"  
                  value={paymentData.expiry || ''}  
                  onChange={(e) => handleInputChange(e, 'expiry')}  
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"  
                />  
              </div>  
              <div>  
                <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>  
                <input  
                  type="text"  
                  placeholder="123"  
                  value={paymentData.cvv || ''}  
                  onChange={(e) => handleInputChange(e, 'cvv')}  
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"  
                />  
              </div>  
            </div>  
          </div>  
        );  
      default:  
        return null;  
    }  
  };  

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
                <div className="flex items-center gap-3">  
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg text-white">  
                    <CreditCard className="w-6 h-6" />  
                  </div>  
                  <h2 className="text-2xl font-bold text-gray-900">Método de Pago</h2>  
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

              <div className="mb-6">  
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">  
                  {paymentMethods.map((method) => (  
                    <motion.button  
                      key={method.id}  
                      onClick={() => handleMethodSelect(method)}  
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${  
                        selectedMethod === method.id  
                          ? 'border-purple-500 bg-purple-50 shadow-md'  
                          : 'border-gray-200 hover:border-purple-300'  
                      }`}  
                      whileHover={{ scale: 1.05 }}  
                      whileTap={{ scale: 0.95 }}  
                    >  
                      <method.Icon className="w-8 h-8 text-purple-600" />  
                      <div className="text-center">  
                        <h3 className="font-semibold text-gray-900">{method.title}</h3>  
                        <p className="text-sm text-gray-600">{method.description}</p>  
                      </div>  
                    </motion.button>  
                  ))}  
                </div>  

                {selectedMethod && (  
                  <div className="border-t pt-4">  
                    <h3 className="text-lg font-semibold mb-4">Detalles del Pago</h3>  
                    {getPaymentForm()}  
                  </div>  
                )}  
              </div>  

              <div className="border-t pt-4">  
                <div className="flex justify-between items-center mb-4">  
                  <span className="text-lg font-semibold text-gray-900">Total a pagar:</span>  
                  <span className="text-2xl font-bold text-purple-600">Bs. {total.toFixed(2)}</span>  
                </div>  
                <motion.button  
                  onClick={onConfirm}  
                  disabled={!selectedMethod || Object.keys(paymentData).length < 2}  
                  className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-green-700 hover:to-emerald-700 transition-all"  
                  whileHover={{ scale: 1.02 }}  
                  whileTap={{ scale: 0.98 }}  
                >  
                  <CheckCircle className="w-5 h-5" />  
                  Confirmar Pago  
                </motion.button>  
              </div>  
            </div>  
          </motion.div>  
        </motion.div>  
      )}  
    </AnimatePresence>  
  );  
};  

export default PaymentModal;