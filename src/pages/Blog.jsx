import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
    const posts = [
        {
            id: 1,
            title: "Discover Emotional Depth in Ehsaas' Original Songs",
            excerpt: "Music has the power to heal, to inspire, and to connect us. In our latest album, we explore the depths of human emotion...",
            date: "Oct 12, 2023",
            author: "Navya K.",
            image: "https://images.unsplash.com/photo-1514320291940-bfc96f60fa63?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Behind the Scenes: Making of 'The Journey'",
            excerpt: "Step into our studio and see how we blend traditional instruments with modern AI technology to create our unique sound.",
            date: "Sep 28, 2023",
            author: "Team Ehsaas",
            image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "The Future of AI in Music Production",
            excerpt: "How we're using generative AI to assist in composing melodies that resonate with the soul, without losing the human touch.",
            date: "Aug 15, 2023",
            author: "Tech Lead",
            image: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="pt-20 pb-24 bg-ehsaas-cream min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-script text-ehsaas-dark mb-4">Our Blog</h1>
                    <p className="text-gray-600">Stories, updates, and thoughts from the band.</p>
                </div>

                <div className="space-y-12">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="md:flex">
                                <div className="md:w-1/3 h-64 md:h-auto">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-8 md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                                            <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                                        </div>
                                        <h2 className="text-2xl font-bold text-ehsaas-dark mb-3 hover:text-ehsaas-gold transition-colors cursor-pointer">
                                            {post.title}
                                        </h2>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                    <button className="text-ehsaas-gold font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:gap-3 transition-all">
                                        Read More <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
