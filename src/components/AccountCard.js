import React from 'react';  
import { motion } from 'framer-motion';  
import { Plus, Star } from 'lucide-react';  

const AccountCard = ({ account, onAddToCart = () => {} }) => {  
  return (  
    <motion.div  
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"  
      whileHover={{ y: -5 }}  
      initial={{ opacity: 0, y: 20 }}  
      animate={{ opacity: 1, y: 0 }}  
      transition={{ duration: 0.5 }}  
    >  
      <img  
        src={account.image}  
        alt={account.platform}  
        className="w-full h-48 object-cover"  
      />  
      <div className="p-6">  
        <h3 className="text-xl font-bold text-gray-900 mb-2">{account.platform}</h3>  
        <p className="text-gray-600 mb-4">{account.type}</p>  
        <ul className="space-y-2 mb-4">  
          {account.features.map((feature, index) => (  
            <li key={index} className="flex items-center gap-2 text-sm text-gray-700">  
              <Star className="w-4 h-4 text-yellow-400 fill-current" />  
              {feature}  
            </li>  
          ))}  
        </ul>  
        <div className="flex items-center justify-between">  
          <div>  
            <p className="text-2xl font-bold text-purple-600">${account.price}</p>  
            <p className="text-sm text-gray-500">{account.duration}</p>  
          </div>  
          <motion.button  
            onClick={() => onAddToCart(account)}  
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all"  
            whileHover={{ scale: 1.05 }}  
            whileTap={{ scale: 0.95 }}  
          >  
            <Plus className="w-5 h-5" />  
            Añadir  
          </motion.button>  
        </div>  
        {account.stock === 0 && (  
          <p className="text-red-500 text-sm mt-2 text-center">Sin stock</p>  
        )}  
      </div>  
    </motion.div>  
  );  
};  

export default AccountCard;