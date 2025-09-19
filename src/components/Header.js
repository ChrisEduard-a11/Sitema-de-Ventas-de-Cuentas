import React from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, User, X } from 'lucide-react';

const Header = ({ cartCount = 0, isCartOpen, onToggleCart, onLoginClick, isAuthenticated }) => { 
  return ( 
    <motion.header 
      className="bg-white shadow-lg sticky top-0 z-50" 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.5 }} 
    > 
      <div className="container mx-auto px-4 py-4 flex items-center justify-between"> 
        <motion.div 
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent" 
          whileHover={{ scale: 1.05 }} 
        > 
          StreamSell 
        </motion.div> 
        <div className="flex items-center gap-6"> 
          <div className="relative hidden md:flex"> 
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" /> 
            <input 
              type="text" 
              placeholder="Buscar plataformas..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64" 
            /> 
          </div> 
          {/* Botón de Acceder/Cerrar Sesión */}
          {!isAuthenticated && (
            <motion.button
              onClick={onLoginClick}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Acceder
            </motion.button>
          )}
          {isAuthenticated && (
            <motion.button
              onClick={() => {}} // Añade la lógica para cerrar sesión aquí
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cerrar Sesión
            </motion.button>
          )}
          <motion.div 
            className="relative cursor-pointer" 
            onClick={onToggleCart} 
            whileHover={{ scale: 1.1 }} 
          > 
            <ShoppingCart className="w-6 h-6 text-gray-700" /> 
            {cartCount > 0 && ( 
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"> 
                {cartCount} 
              </span> 
            )} 
          </motion.div> 
        </div> 
      </div> 
    </motion.header> 
  ); 
}; 

export default Header;