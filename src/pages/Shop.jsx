import React from 'react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Shop = () => {
    const products = [
        {
            id: 1,
            title: "The Journey Journal",
            price: "500.00",
            image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "EHSAAS Tumbler",
            price: "900.00",
            image: "https://images.unsplash.com/photo-1570589253243-d345c2eb716d?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Limited Edition Hoodie",
            price: "1500.00",
            image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 4,
            title: "Signed Poster",
            price: "350.00",
            image: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 5,
            title: "Music Box Set",
            price: "2500.00",
            image: "https://images.unsplash.com/photo-1507838153414-b4b713384ebd?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 6,
            title: "Tote Bag",
            price: "450.00",
            image: "https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="pt-12 pb-24 bg-ehsaas-cream min-h-screen">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
