import { useRef, useEffect } from 'react';
import { Award, Globe, Heart, Shield, Star, MapPin, Phone, Mail, ArrowRight, CheckCircle } from 'lucide-react';
import Navbar from '@/Component/Navbar';
import Footer from '@/Component/Footer';
import { useGSAP, useScrollAnimation } from '@/hooks/useGSAP';
import { pageTransitions, scrollAnimations } from '@/utils/animations';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import usamaImg from "@/assets/people/usamaPic.webp";
import faizanImg from "@/assets/people/faizan.webp";
import abdulImg from "@/assets/people/abdul.webp";
import haseebImg from "@/assets/people/haseeb.webp";

export default function AboutPage() {
    const heroRef = useRef(null);
    const statsRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null);
    const timelineRef = useRef(null);

    // Page entrance animation
    useGSAP(() => {
        if (heroRef.current) {
            pageTransitions.fadeSlideUp(heroRef.current);
        }
    }, []);

    // Scroll animations for sections
    useScrollAnimation((element) => {
        scrollAnimations.fadeInUp(element);
    }, []);

    // Stats counter animation with useRef for better control
    const statsCounterRefs = useRef([]);
    
    useEffect(() => {
        const animateCounter = (element, target, suffix = '') => {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString() + suffix;
            }, 20);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    const suffix = entry.target.dataset.suffix || '';
                    animateCounter(entry.target, target, suffix);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsCounterRefs.current.forEach(el => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const stats = [
        { number: 50000, label: "Happy Customers", suffix: "+" },
        { number: 10000, label: "Products Sold", suffix: "+" },
        { number: 25, label: "Countries Served", suffix: "" },
        { number: 99, label: "Customer Satisfaction", suffix: "%" }
    ];

    const values = [
        {
            icon: Shield,
            title: "Quality Assurance",
            description: "Every product undergoes rigorous quality checks before reaching our customers. We partner with certified manufacturers and conduct regular audits."
        },
        {
            icon: Heart,
            title: "Customer First",
            description: "Our customers are at the heart of everything we do. We listen, adapt, and continuously improve based on your feedback and needs."
        },
        {
            icon: Globe,
            title: "Global Reach",
            description: "From our headquarters in New York to customers worldwide, we've built a network that delivers excellence across continents."
        },
        {
            icon: Award,
            title: "Innovation",
            description: "We embrace cutting-edge technology and innovative solutions to enhance your shopping experience and stay ahead of trends."
        }
    ];

    const timeline = [
        {
            year: "2018",
            title: "The Beginning",
            description: "Started as a small family business in Brooklyn, NY, with just 50 products and a dream to serve our community."
        },
        {
            year: "2020",
            title: "Digital Transformation",
            description: "Launched our e-commerce platform during the pandemic, helping customers shop safely from home."
        },
        {
            year: "2022",
            title: "International Expansion",
            description: "Expanded to serve customers in 25 countries with localized shipping and customer support."
        },
        {
            year: "2024",
            title: "Sustainability Focus",
            description: "Launched our eco-friendly packaging initiative and partnered with sustainable brands."
        },
        {
            year: "2025",
            title: "AI-Powered Experience",
            description: "Introduced personalized recommendations and AI-powered customer service for better shopping experiences."
        }
    ];

    const team = [
        {
            id: 1,
            name: "Muhammad Faizan",
            role: "Software Engineer",
            image: faizanImg,
            bio: "Passionate full-stack developer with expertise in React, Node.js, and modern web technologies. Dedicated to creating seamless user experiences and scalable applications.",
            link: "https://www.instagram.com/faiz_ankhan9764/"
        },
        {
            id: 2,
            name: "Muhammad Osama",
            role: "Certified Kubernetes Application Developer | Staff Software Engineer",
            image: usamaImg,
            bio: "Expert in cloud infrastructure and containerization. Specializes in building scalable, reliable systems that can handle enterprise-level traffic and data processing.",
            link: "https://www.linkedin.com/in/xamqrexii/"
        },
        {
            id: 3,
            name: "Muhammad Haseeb",
            role: "Tech Enthusiast",
            image: haseebImg,
            bio: "Creative problem solver with a passion for emerging technologies. Focuses on user experience design and frontend development to create intuitive interfaces.",
            link: "/"
        },
        {
            id: 4,
            name: "Abdul Musavir",
            role: "Video Editor",
            image: abdulImg,
            bio: "Creative visual storyteller specializing in product photography and video content. Brings products to life through compelling multimedia experiences.",
            link: "/"
        }
    ];

    return (
        <>
            <Navbar />
            
            {/* Hero Section */}
            <section ref={heroRef} className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-purple-100 rounded-full opacity-20"></div>
                    <div className="absolute bottom-20 left-20 w-20 h-20 bg-green-100 rounded-full opacity-20"></div>
                    <div className="absolute bottom-40 right-10 w-28 h-28 bg-pink-100 rounded-full opacity-20"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.h1 
                            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Connecting People with 
                            <motion.span 
                                className="text-black bg-gradient-to-r from-gray-900 to-black bg-clip-text"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                {" "}Quality Products
                            </motion.span>
                        </motion.h1>
                        
                        <motion.p 
                            className="text-xl text-gray-600 mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Since 2018, we've been on a mission to make quality products accessible to everyone. 
                            From our humble beginnings to serving customers globally, 
                            we're committed to excellence in every interaction.
                        </motion.p>
                        
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <motion.button 
                                className="bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => document.getElementById('timeline-section')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                <CheckCircle size={18} />
                                Our Story
                            </motion.button>
                            <motion.button 
                                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                <ArrowRight size={18} />
                                Meet the Team
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
                
                {/* Floating elements */}
                <motion.div
                    className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20"
                    animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{ 
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-16 h-16 bg-purple-100 rounded-full opacity-20"
                    animate={{ 
                        y: [0, 20, 0],
                        rotate: [360, 180, 0]
                    }}
                    transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </section>

            {/* Stats Section */}
            <section ref={statsRef} className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div 
                                key={index} 
                                className="text-center group"
                                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2 group-hover:text-black transition-colors">
                                    <span 
                                        ref={el => statsCounterRefs.current[index] = el}
                                        className="stat-number" 
                                        data-target={stat.number}
                                        data-suffix={stat.suffix}
                                    >
                                        0{stat.suffix}
                                    </span>
                                </div>
                                <p className="text-gray-600 font-medium group-hover:text-gray-700 transition-colors">{stat.label}</p>
                                <motion.div 
                                    className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 48 }}
                                    transition={{ duration: 0.8, delay: (index * 0.1) + 0.5 }}
                                    viewport={{ once: true }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section ref={valuesRef} className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            What Drives Us
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our core values shape every decision we make and every product we offer
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div 
                                key={index} 
                                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 group"
                                initial={{ opacity: 0, y: 50, rotateY: -10 }}
                                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                                transition={{ 
                                    duration: 0.7, 
                                    delay: index * 0.15,
                                    type: "spring",
                                    stiffness: 80
                                }}
                                viewport={{ once: true }}
                                whileHover={{ 
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <motion.div 
                                    className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-6 group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-300"
                                    whileHover={{ 
                                        scale: 1.1,
                                        rotate: 5
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <value.icon size={24} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-black transition-colors">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">{value.description}</p>
                                <motion.div 
                                    className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: (index * 0.15) + 0.5 }}
                                    viewport={{ once: true }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section id="timeline-section" ref={timelineRef} className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Our Journey
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            From a local store to a global platform - here's how we've grown
                        </p>
                    </div>
                    
                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden lg:block"></div>
                        
                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${
                                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                }`}>
                                    <div className="flex-1 lg:text-right lg:pr-8">
                                        <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left lg:pl-8'}`}>
                                            <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                                                {item.year}
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Timeline dot */}
                                    <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>
                                    
                                    <div className="flex-1"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="team-section" ref={teamRef} className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The passionate people behind MyMart who work tirelessly to serve you better
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <motion.div 
                                key={member.id} 
                                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: index * 0.15,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                viewport={{ once: true }}
                                whileHover={{ 
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className="relative overflow-hidden">
                                    <motion.img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Social link overlay */}
                                    {member.link && member.link !== "/" && (
                                        <motion.div 
                                            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <a
                                                href={member.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                                            >
                                                <ArrowRight size={16} className="text-gray-700" />
                                            </a>
                                        </motion.div>
                                    )}
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="text-blue-600 font-medium mb-4 text-sm leading-tight">
                                        {member.role}
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                                        {member.bio}
                                    </p>
                                    
                                    {/* Animated bottom border */}
                                    <motion.div 
                                        className="w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        transition={{ duration: 0.8, delay: (index * 0.15) + 0.5 }}
                                        viewport={{ once: true }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Customer Testimonials */}
            <section className="py-20 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            What Our Team Says
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Meet the talented individuals behind MyMart and their thoughts on our mission
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                name: "Muhammad Faizan",
                                role: "Software Engineer",
                                image: faizanImg,
                                testimonial: "Building MyMart has been an incredible journey. We've focused on creating a platform that truly serves our customers' needs with cutting-edge technology and seamless user experience.",
                                link: "https://www.instagram.com/faiz_ankhan9764/"
                            },
                            {
                                name: "Muhammad Osama",
                                role: "Certified Kubernetes Application Developer | Staff Software Engineer",
                                image: usamaImg,
                                testimonial: "The scalability and reliability of MyMart's infrastructure is something I'm proud of. We've built a system that can handle growth while maintaining exceptional performance.",
                                link: "https://www.linkedin.com/in/xamqrexii/"
                            },
                            {
                                name: "Muhammad Haseeb",
                                role: "Tech Enthusiast",
                                image: haseebImg,
                                testimonial: "Working on MyMart has taught me the importance of user-centric design. Every feature we build is carefully crafted to enhance the shopping experience.",
                                link: "/"
                            },
                            {
                                name: "Abdul Musavir",
                                role: "Video Editor",
                                image: abdulImg,
                                testimonial: "Creating visual content for MyMart allows me to showcase products in their best light. Our multimedia approach helps customers make informed decisions.",
                                link: "/"
                            }
                        ].map((testimonial, index) => (
                            <motion.div 
                                key={index} 
                                className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200"
                                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ 
                                    duration: 0.6, 
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                viewport={{ once: true }}
                                whileHover={{ 
                                    y: -10,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                <div className="flex items-center mb-4">
                                    <motion.div
                                        className="relative"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-gray-200 group-hover:ring-gray-300 transition-all duration-300"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                    </motion.div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-black transition-colors">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-xs text-gray-600 leading-tight">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                                    "{testimonial.testimonial}"
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: (index * 0.1) + (i * 0.05) }}
                                                viewport={{ once: true }}
                                            >
                                                <Star size={14} className="text-yellow-400 fill-current" />
                                            </motion.div>
                                        ))}
                                    </div>
                                    {testimonial.link !== "/" && (
                                        <motion.a
                                            href={testimonial.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            whileHover={{ x: 3 }}
                                        >
                                            Connect <ArrowRight size={12} />
                                        </motion.a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA Section */}
            <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-20 right-20 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute bottom-20 left-20 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute bottom-40 right-10 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute top-40 left-1/2 w-2 h-2 bg-white rounded-full"></div>
                    <div className="absolute bottom-60 right-1/3 w-2 h-2 bg-white rounded-full"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            Ready to Experience the Difference?
                        </h2>
                        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                            Join thousands of satisfied customers who trust MyMart for their shopping needs
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <motion.div 
                            className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            transition={{ duration: 0.3 }}
                        >
                            <MapPin size={24} className="text-blue-400" />
                            <div className="text-center">
                                <h3 className="font-semibold text-white mb-1">Visit Us</h3>
                                <p className="text-gray-300 text-sm">
                                    Peshawar<br />
                                    Khyber Pakhtunkhwa<br />
                                    Pakistan
                                </p>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            transition={{ duration: 0.3 }}
                        >
                            <Phone size={24} className="text-green-400" />
                            <div className="text-center">
                                <h3 className="font-semibold text-white mb-1">Call Us</h3>
                                <p className="text-gray-300 text-sm">03164593159</p>
                                <p className="text-xs text-gray-400 mt-1">Mon-Fri: 9AM-6PM</p>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="flex flex-col items-center gap-3 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            transition={{ duration: 0.3 }}
                        >
                            <Mail size={24} className="text-purple-400" />
                            <div className="text-center">
                                <h3 className="font-semibold text-white mb-1">Email Us</h3>
                                <p className="text-gray-300 text-sm">junaid.aurangeb1@gmail.com</p>
                                <p className="text-xs text-gray-400 mt-1">We reply within 24hrs</p>
                            </div>
                        </motion.div>
                    </motion.div>
                    
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <motion.a
                            href="/shop"
                            className="bg-white text-black px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CheckCircle size={18} />
                            Start Shopping
                        </motion.a>
                        <motion.a
                            href="/contact"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowRight size={18} />
                            Get in Touch
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
}
