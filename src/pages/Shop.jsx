import React from 'react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import merch1 from '../assets/merch-1.png';
import merch2 from '../assets/merch-2.png';

const Shop = () => {
    const products = [
        {
            id: 1,
            title: "Official Merchandise I",
            price: "1200.00",
            image: merch1
        },
        {
            id: 2,
            title: "Official Merchandise II",
            price: "1500.00",
            image: merch2
        }
    ];

    return (
        <div className="pt-20 pb-24 bg-ehsaas-cream min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-script text-ehsaas-dark mb-4"
                    >
                        Shop Merchandise
                    </motion.h1>
                    <p className="text-gray-600 tracking-wider uppercase text-sm">Carry the rhythm with you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Shop;
