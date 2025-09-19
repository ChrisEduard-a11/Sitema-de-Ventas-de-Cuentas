import React, { useEffect } from 'react';  
import { motion, AnimatePresence } from 'framer-motion';  
import { CheckCircle, AlertCircle, X } from 'lucide-react';  

const Toast = ({ message, type = 'success', id, onRemove }) => {  
  useEffect(() => {  
    const timer = setTimeout(() => {  
      onRemove(id);  
    }, 4000);  

    return () => clearTimeout(timer);  
  }, [id, onRemove]);  

  const icons = {  
    success: <CheckCircle className="w-5 h-5 text-green-500" />,  
    error: <AlertCircle className="w-5 h-5 text-red-500" />,  
    info: <X className="w-5 h-5 text-blue-500" />  
  };  

  const bgColors = {  
    success: 'bg-green-500',  
    error: 'bg-red-500',  
    info: 'bg-blue-500'  
  };  

  return (  
    <motion.div  
      key={id}  
      className={`flex items-center gap-3 p-4 rounded-xl shadow-lg text-white max-w-sm ${bgColors[type]}`}  
      initial={{ opacity: 0, y: -50, scale: 0.9 }}  
      animate={{ opacity: 1, y: 0, scale: 1 }}  
      exit={{ opacity: 0, y: -50, scale: 0.9 }}  
      transition={{ duration: 0.3 }}  
    >  
      <div className="flex-shrink-0">{icons[type]}</div>  
      <span className="flex-1 text-sm font-medium">{message}</span>  
      <motion.button  
        onClick={() => onRemove(id)}  
        className="ml-2 text-white hover:text-gray-200"  
        whileHover={{ scale: 1.1 }}  
        whileTap={{ scale: 0.9 }}  
      >  
        <X className="w-4 h-4" />  
      </motion.button>  
    </motion.div>  
  );  
};  

export default Toast;