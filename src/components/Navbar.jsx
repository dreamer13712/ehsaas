import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Blog', path: '/blog' },
        { name: 'Portfolio', path: '/portfolio' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-ehsaas-cream/80 backdrop-blur-md border-b border-ehsaas-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-3">
                        <img src={logo} alt="EHSAAS Logo" className="w-12 h-12 object-contain rounded-full border border-ehsaas-dark/10 shadow-sm" />
                        <span className="text-2xl font-bold tracking-widest text-ehsaas-dark">EHSAAS</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm tracking-widest uppercase transition-colors hover:text-ehsaas-gold ${location.pathname === link.path ? 'text-ehsaas-dark font-bold' : 'text-gray-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/shop" className="p-2 hover:text-ehsaas-gold transition-colors">
                            <ShoppingBag className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-ehsaas-dark focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-ehsaas-cream border-b border-ehsaas-gold/20 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-8 space-y-4 flex flex-col items-center">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg tracking-widest uppercase py-2 hover:text-ehsaas-gold"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
