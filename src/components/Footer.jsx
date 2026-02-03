import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-ehsaas-dark text-ehsaas-cream py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-widest">EHSAAS</h3>
                        <p className="text-gray-400 text-sm">
                            Har Ek Ehsaas Ki Ek Awaaz Hoti hai.<br />
                            Where music meets emotion.
                        </p>
                        <div className="flex space-x-4 pt-4">
                            <a href="#" className="hover:text-ehsaas-gold transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-ehsaas-gold transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-ehsaas-gold transition-colors"><Facebook className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-ehsaas-gold">Contact Us</h4>
                        <div className="flex items-center space-x-2 text-gray-400">
                            <Mail className="w-4 h-4" />
                            <a href="mailto:info@ehsaashub.com" className="hover:text-white transition-colors">info@ehsaashub.com</a>
                        </div>
                        <p className="text-gray-400">New Delhi, India</p>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-ehsaas-gold">Stay Connected</h4>
                        <p className="text-gray-400 text-sm">Subscribe to our newsletter for updates.</p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-ehsaas-gold rounded-sm"
                            />
                            <button className="bg-ehsaas-gold text-ehsaas-dark px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Ehsaas. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
