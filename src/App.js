import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import AccountCard from './components/AccountCard';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import PaymentModal from './components/PaymentModal';
import Toast from './components/Toast';
import LoginModal from './components/LoginModal'; // Importa el nuevo componente de modal de login
import { streamingAccounts } from './mock/streamingAccounts';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); // Nuevo estado para el modal de login
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleAddToCart = (account) => {
    if (!isAuthenticated) {
      addToast('Debes iniciar sesión para comprar.', 'error');
      setIsLoginOpen(true); // Abre el modal de login
      return;
    }

    if (account.stock > 0 && !cart.find(item => item.id === account.id)) {
      setCart(prev => [...prev, { ...account, stock: account.stock - 1 }]);
      addToast(`${account.platform} añadido al carrito!`, 'success');
    } else if (account.stock === 0) {
      addToast('Lo sentimos, sin stock disponible', 'error');
    } else {
      addToast('Ya tienes esta cuenta en el carrito', 'info');
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    addToast('Item removido del carrito', 'info');
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      setIsCartOpen(false);
      setIsModalOpen(true);
    } else {
      addToast('Tu carrito está vacío', 'info');
    }
  };

  const handleStartPayment = () => {
    setIsModalOpen(false);
    setIsPaymentOpen(true);
  };

  const handleConfirmPayment = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    addToast(`¡Pago exitoso! Total: $${total.toFixed(2)}. Tus cuentas por email en minutos.`, 'success');
    setCart([]);
    setIsPaymentOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginOpen(false);
    addToast('¡Bienvenido de nuevo!', 'success');
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 relative">
      <Header
        cartCount={cart.length}
        isCartOpen={isCartOpen}
        onToggleCart={toggleCart}
        onLoginClick={() => setIsLoginOpen(true)}
        isAuthenticated={isAuthenticated}
      />
      <main className="container mx-auto px-4 py-8">
        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Cuentas de Streaming Premium
          </h1>
          <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
            Accede a tus plataformas favoritas con cuentas seguras y al mejor precio. ¡Calidad garantizada!
          </p>
        </motion.section>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {streamingAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccountCard
                  account={account}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Cart
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onClose={toggleCart}
      />

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cart={cart}
        total={total}
        onConfirm={handleStartPayment}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        total={total}
        onConfirm={handleConfirmPayment}
      />

      {/* Modal de Login (condicional) */}
      <AnimatePresence>
        {isLoginOpen && (
          <LoginModal
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setIsLoginOpen(false)}
            addToast={addToast}
          />
        )}
      </AnimatePresence>

      {/* Sistema de Toasts */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onRemove={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
