import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { Ticket, Search, Zap, Shield, Star } from "lucide-react";

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const features = [
    { icon: <Ticket className="text-[#D80032]" size={32} />, title: "Easy Booking", desc: "Book tickets in seconds with a smooth, hassle-free process." },
    { icon: <Shield className="text-[#800080]" size={32} />, title: "Secure Payments", desc: "100% safe transactions via integrated trusted gateways." },
    { icon: <Star className="text-yellow-500" size={32} />, title: "Top Events", desc: "Discover the most premium concerts, sports, and festivals." },
  ];

  return (
    <>
      <SEO title="Home" description="Discover and book amazing events on EventHub." />
      
      <div className="pb-20">
        
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center pt-20 px-6">
          
          <motion.div 
            className="max-w-5xl mx-auto text-center z-10 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300">
              <span className="text-[#D80032] font-bold mr-2">NEW</span> 
              Discover the hottest events in your city
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter leading-tight mb-8">
              EXPERIENCE <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D80032] to-[#800080]">THE EXTRAORDINARY</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Your premium destination for concerts, festivals, sports, and exclusive gatherings. Secure your spot at the next big thing.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to="/events"
                className="flex items-center justify-center gap-2 bg-[#D80032] hover:bg-[#a60026] text-white px-8 py-4 rounded-full text-base font-bold transition-all w-full sm:w-auto shadow-[0_4px_20px_0_rgba(216,0,50,0.4)] hover:-translate-y-1"
              >
                <Search size={20} />
                Explore Events
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full text-base font-bold transition-all w-full sm:w-auto"
              >
                <Zap size={20} />
                Join EventHub
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Strip */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-sm"
          >
            {[
              { label: "Active Events", value: "100+" },
              { label: "Tickets Sold", value: "50K+" },
              { label: "Verified Users", value: "10K+" },
              { label: "Cities", value: "25+" }
            ].map((stat, i) => (
              <div key={i} className="bg-[#0b0b0b] p-8 text-center">
                <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-6 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Why EventHub?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We've reimagined the ticketing experience from the ground up to give you the most seamless way to find and book your favorite events.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#111111] border border-white/5 hover:border-white/20 p-8 rounded-[2rem] transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-5xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1a0006] to-[#1a001a] border border-[#D80032]/20 rounded-[2.5rem] p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Ready for your next adventure?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
                Join our community today and never miss out on the events that matter to you.
              </p>
              <Link
                to="/events"
                className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-200 px-10 py-4 rounded-full text-base font-bold transition-transform hover:scale-105"
              >
                <Ticket size={20} />
                Get Started Now
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
    </>
  );
}

export default Home;