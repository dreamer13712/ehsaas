import React from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/portfolio-1.png';
import img2 from '../assets/portfolio-2.png';
import img3 from '../assets/portfolio-3.png';

const Portfolio = () => {
    const items = [
        { id: 1, type: 'Photography', title: 'Studio Vibes', image: img1, size: 'large' },
        { id: 2, type: 'Production', title: 'Midnight Mix', image: img2, size: 'small' },
        { id: 3, type: 'Art', title: 'Sound & Vision', image: img3, size: 'wide' },
        { id: 4, type: 'Event', title: 'Live Performance', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=800', size: 'small' },
        { id: 5, type: 'Backstage', title: 'The Crew', image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&q=80&w=800', size: 'large' },
    ];

    return (
        <div className="pt-20 pb-24 bg-ehsaas-dark min-h-screen text-ehsaas-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl font-script text-ehsaas-gold mb-4"
                    >
                        Our Portfolio
                    </motion.h1>
                    <div className="w-24 h-1 bg-white/10 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group overflow-hidden rounded-lg ${item.size === 'wide' ? 'md:col-span-2' :
                                    item.size === 'large' ? 'row-span-2' : ''
                                }`}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="text-ehsaas-gold text-sm tracking-widest uppercase font-bold">{item.type}</p>
                                <h3 className="text-2xl font-bold">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
