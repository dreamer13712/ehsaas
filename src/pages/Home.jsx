
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Music, Star } from 'lucide-react';
import MusicPlayer from '../components/MusicPlayer';
import ProductCard from '../components/ProductCard';
import AudioWaveform3D from '../components/AudioWaveform3D';
import heroBg from '../assets/hero-bg.png';
import merch1 from '../assets/merch-1.png';
import merch2 from '../assets/merch-2.png';

const Home = () => {
    const { scrollYProgress } = useScroll();
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const yText = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    const letterContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.3 }
        }
    };

    const letterAnim = {
        hidden: { y: 50, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", damping: 12 } }
    };

    return (
        <div className="w-full overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* 3D Background */}
                <AudioWaveform3D />

                {/* Parallax Background Image (Layered) */}
                <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                    <img
                        src={heroBg}
                        alt="Ehsaas Soundwaves"
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Content */}
                <motion.div style={{ y: yText }} className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                    <motion.div
                        variants={letterContainer}
                        initial="hidden"
                        animate="show"
                        className="font-script text-6xl md:text-8xl lg:text-9xl text-ehsaas-dark mb-8 drop-shadow-xl"
                    >
                        {"Har Ek Ehsaas".split("").map((char, i) => (
                            <motion.span key={i} variants={letterAnim} className="inline-block">{char === " " ? "\u00A0" : char}</motion.span>
                        ))}
                        <br />
                        <motion.span className="text-ehsaas-gold inline-block mt-2">
                            {"Ki Ek Awaaz Hoti Hai".split("").map((char, i) => (
                                <motion.span key={i} variants={letterAnim} className="inline-block">{char === " " ? "\u00A0" : char}</motion.span>
                            ))}
                        </motion.span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                        className="text-lg md:text-2xl text-ehsaas-dark/80 tracking-[0.3em] uppercase mb-12 font-bold max-w-2xl mx-auto border-t border-b border-ehsaas-gold/30 py-4"
                    >
                        Where Emotions Finding Their Melody
                    </motion.p>

                    <motion.button
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: 2, type: "spring" }}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(197,160,89,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-ehsaas-dark text-ehsaas-cream px-10 py-4 rounded-full font-bold tracking-widest hover:bg-ehsaas-gold hover:text-ehsaas-dark transition-colors duration-300 flex items-center gap-3 mx-auto shadow-xl"
                    >
                        <Music className="w-5 h-5" /> Listen Now <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ehsaas-dark/50"
                >
                    <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-current rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Tracks Section */}
            <section className="py-32 bg-ehsaas-dark text-ehsaas-cream relative overflow-hidden">
                {/* Animated geometric decorations */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -left-1/4 w-full h-[200%] border-[2px] border-white/5 rounded-full pointer-events-none"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl font-bold font-script mb-6 text-ehsaas-gold">Latest Tracks</h2>
                        <div className="flex items-center justify-center gap-2 text-ehsaas-cream/30">
                            <div className="h-[1px] w-12 bg-current"></div>
                            <Star className="w-4 h-4" />
                            <div className="h-[1px] w-12 bg-current"></div>
                        </div>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-ehsaas-gold/5 blur-2xl -z-10 rounded-full"></div>
                        <MusicPlayer />
                    </div>
                </div>
            </section>

            {/* Shop Preview */}
            <section className="py-24 bg-ehsaas-cream">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-ehsaas-dark tracking-wide">Band Merchandise</h2>
                            <div className="w-12 h-1 bg-ehsaas-gold mt-2"></div>
                        </div>
                        <a href="/shop" className="text-ehsaas-dark hover:text-ehsaas-gold font-bold uppercase text-sm tracking-widest transition-colors">View All</a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <ProductCard
                            title="Official Merchandise I"
                            price="1200.00"
                            image={merch1}
                            delay={0.1}
                        />
                        <ProductCard
                            title="Official Merchandise II"
                            price="1500.00"
                            image={merch2}
                            delay={0.2}
                        />
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 bg-ehsaas-green relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold text-ehsaas-dark mb-8 tracking-wider">OUR JOURNEY</h2>
                    <div className="prose prose-lg mx-auto text-gray-700">
                        <p className="mb-6">
                            EHSAAS is a three-member music band built on emotions. We believe that music is more than sound — it is a feeling, a memory, and a voice for emotions that words often fail to express.
                        </p>
                        <p className="font-semibold text-ehsaas-dark">
                            Energetic Punjabi vibes • Deep Emotional Songs • Soft Romantic Melodies
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
