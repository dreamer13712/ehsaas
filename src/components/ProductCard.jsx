import React from 'react';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const ProductCard = ({ title, price, image, delay = 0 }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const springConfig = { damping: 25, stiffness: 300 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: "backOut" }}
            className="perspective-1000"
        >
            <motion.div
                style={{ rotateX: rotateXSpring, rotateY: rotateYSpring }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative bg-white/50 backdrop-blur-sm border border-ehsaas-gold/10 overflow-hidden rounded-xl hover:shadow-2xl transition-shadow duration-500 transform-style-3d cursor-pointer"
            >
                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                    <motion.img
                        src={image}
                        alt={title}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-ehsaas-gold text-ehsaas-dark px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                            <ShoppingBag className="w-5 h-5" /> View Details
                        </motion.button>
                    </div>

                    <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                        <ArrowUpRight className="w-5 h-5 text-ehsaas-dark" />
                    </div>
                </div>

                <div className="p-5 text-center bg-gradient-to-b from-transparent to-white/40">
                    <h3 className="font-semibold text-ehsaas-dark text-lg group-hover:text-ehsaas-gold transition-colors">{title}</h3>
                    <p className="text-ehsaas-gold font-bold mt-1 text-xl">₹{price}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProductCard;
