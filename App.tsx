import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Target, 
  Zap, 
  ShieldCheck, 
  Award,
  Clock,
  Heart,
  User,
  Star,
  Quote,
  TrendingUp,
  Globe
} from 'lucide-react';

const CHECKOUT_URL = "https://paystack.shop/pay/amme";

// Reusable Components
const Button: React.FC<{ 
  href?: string;
  onClick?: () => void; 
  className?: string; 
  children: React.ReactNode;
  pulse?: boolean;
}> = ({ href, onClick, className = "", children, pulse = false }) => {
  const styles = `
    inline-block bg-[#10B981] text-white px-8 py-4 rounded-xl font-poppins font-semibold text-lg
    shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:bg-[#F97316] transition-all duration-500 
    transform hover:scale-105 active:scale-95 border border-white/10 text-center
    ${pulse ? 'animate-pulse' : ''}
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={styles} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick}
      className={styles}
    >
      {children}
    </button>
  );
};

const Section: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  id?: string;
  bg?: string;
}> = ({ children, className = "", id, bg = "bg-transparent" }) => (
  <section id={id} className={`${bg} py-16 px-6 md:py-24 ${className}`}>
    <div className="max-w-2xl mx-auto">
      {children}
    </div>
  </section>
);

const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-3 mb-5 group">
    <div className="bg-[#10B981]/10 p-1 rounded-full group-hover:bg-[#10B981]/20 transition-colors">
      <CheckCircle className="text-[#10B981] shrink-0" size={20} />
    </div>
    <span className="text-lg text-white font-medium leading-tight">{text}</span>
  </div>
);

const BonusCard: React.FC<{ title: string; value: string; description: string }> = ({ title, value, description }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4 shadow-xl relative overflow-hidden backdrop-blur-md group hover:border-[#F97316]/50 transition-all duration-300">
    <div className="absolute -top-1 -right-1 bg-[#F97316] text-white px-4 py-1.5 text-[10px] font-black rounded-bl-xl uppercase tracking-widest shadow-lg">
      Bonus Included
    </div>
    <h4 className="text-[#10B981] font-poppins font-bold text-xl mb-1 group-hover:translate-x-1 transition-transform">{title}</h4>
    <p className="text-white/70 text-sm mb-3 leading-relaxed">{description}</p>
    <div className="flex items-center gap-2">
      <div className="h-px flex-1 bg-white/10"></div>
      <div className="text-[#F97316] font-bold text-xs uppercase tracking-widest bg-[#F97316]/10 px-2 py-1 rounded">
        Value: {value}
      </div>
    </div>
  </div>
);

const FeaturedResult: React.FC<{ icon: React.ReactNode; caption: React.ReactNode; imgSrc: string; imgAlt: string }> = ({ icon, caption, imgSrc, imgAlt }) => (
  <div className="mb-12 group max-w-lg mx-auto">
    <div className="mb-6 flex gap-4 items-start bg-white/5 p-6 rounded-2xl border border-white/5 shadow-lg backdrop-blur-sm">
      <div className="bg-[#F97316]/20 p-2 rounded-lg text-[#F97316] shrink-0">
        {icon}
      </div>
      <div className="text-white font-medium text-lg leading-relaxed">
        {caption}
      </div>
    </div>
    <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:border-[#F97316]/50 bg-black">
      <img 
        src={imgSrc} 
        alt={imgAlt} 
        className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ name: string; role: string; text: string; result: string }> = ({ name, role, text, result }) => (
  <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] relative group hover:border-[#10B981]/50 transition-all duration-500 backdrop-blur-sm mb-6">
    <div className="absolute -top-4 -left-4 bg-[#10B981] p-3 rounded-2xl shadow-lg">
      <Quote className="text-white" size={24} />
    </div>
    <div className="flex gap-1 mb-4 text-[#F97316]">
      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
    <p className="text-white/90 text-lg italic leading-relaxed mb-6">"{text}"</p>
    <div className="flex items-center justify-between border-t border-white/10 pt-4">
      <div>
        <h4 className="font-bold text-white text-lg">{name}</h4>
        <p className="text-white/50 text-sm">{role}</p>
      </div>
      <div className="text-[#10B981] font-black text-sm uppercase tracking-tighter bg-[#10B981]/10 px-3 py-1 rounded-full">
        {result}
      </div>
    </div>
  </div>
);

export default function App() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-[#F97316]/30">
      {/* Decorative Radial Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#10B981]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F97316]/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Header / Hero Section */}
      <header className="bg-transparent pt-24 pb-20 px-6 text-center border-b border-white/5 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] px-5 py-2 rounded-full text-xs font-black mb-8 tracking-[0.2em] uppercase">
            <Clock size={14} className="animate-pulse" /> Limited Time Enrollment
          </div>
          <h1 className="text-4xl md:text-6xl font-poppins font-black text-[#10B981] leading-[1.1] mb-8 drop-shadow-[0_4px_10px_rgba(16,185,129,0.2)]">
            He Was 22, Broke, Frustrated… And Quietly Losing Confidence in Himself
          </h1>
          <p className="text-xl md:text-2xl font-bold text-white/90 mb-10 italic max-w-2xl mx-auto">
            "Last month, David made <span className="text-[#10B981] underline decoration-[#10B981]/30">₦185,000</span> using AI tools on his phone — after years of failing at every online business he tried."
          </p>
          <div className="flex flex-col items-center gap-6">
            <Button href={CHECKOUT_URL} pulse className="w-full sm:w-auto px-12 py-5 text-xl uppercase">
              get access to the system now
            </Button>
          </div>
        </div>
      </header>

      {/* The Story Section */}
      <Section>
        <div className="space-y-8 text-white/90 text-lg leading-relaxed">
          <p>Six months ago, that sentence would have sounded like a joke.</p>
          <p>Because David was tired. Tired of trying. Tired of starting over. Tired of watching everybody else “blow” while he remained stuck in the same spot.</p>

          <h2 className="text-3xl font-poppins font-bold text-[#F97316] mb-6 mt-16 flex items-center gap-3">
            <Target className="text-[#10B981]" size={28} /> Just Like You
          </h2>
          
          <p>David is 22 years old. An undergraduate in a federal university in Nigeria.</p>
          <p>Smart. Curious. Ambitious. The type of guy that doesn’t just want to graduate — he wants to win early.</p>
          
          <div className="bg-white/5 border-l-4 border-[#F97316] p-8 italic text-white/80 rounded-r-2xl backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F97316]/5 to-transparent pointer-events-none"></div>
            <p className="relative z-10">
              "100 level — mini importation. Lost money.<br/>
              200 level — crypto trading. Blew his savings.<br/>
              Joined two different WhatsApp “make money online” groups.<br/>
              Bought one course for ₦35,000. Another for ₦20,000.<br/>
              What did he get? Screenshots. Motivation. Zero real income."
            </p>
          </div>

          <p>Seeing course mates posting soft life. Seeing 19-year-olds claiming $1,000 online. Watching motivational videos at 1am telling himself, “This year will be different.”</p>
          <p>But nothing changed. He started doubting himself. Maybe I’m not smart enough. Maybe online money is only for lucky people.</p>
          <p className="font-bold text-white text-xl">At 22… his parents still sent him ₦5,000 sometimes. That one used to pain him the most.</p>
        </div>
      </Section>

      {/* The Breaking Point */}
      <Section>
        <h2 className="text-4xl font-poppins font-black text-[#F97316] mb-8">The Breaking Point</h2>
        <div className="space-y-6 text-white/90 text-lg leading-relaxed">
          <p>One evening, after another failed “opportunity,” David just sat quietly on his hostel bed.</p>
          <p>No motivation this time. Just a heavy, sinking feeling. He was disappointed in himself.</p>
          
          <p className="text-2xl font-black text-[#F97316] italic border-l-4 border-[#F97316]/50 pl-6 my-10">
            “Am I actually learning real skills… or just chasing hype?”
          </p>
          
          <p className="mt-6">That was the moment things started to change. He stopped looking for "hacks" and started looking for <span className="text-[#10B981] font-bold">leverage</span>.</p>
        </div>
      </Section>

      {/* The Discovery */}
      <Section>
        <h2 className="text-4xl font-poppins font-black text-[#10B981] mb-8">The Discovery</h2>
        <div className="space-y-8 text-white/90 text-lg leading-relaxed">
          <p>A few days later, he came across a simple message that finally clicked:</p>
          <p className="text-3xl font-black text-[#F97316] leading-tight">“You don’t need to be technical to make money with AI. You just need to know what to tell it to do.”</p>
          <p>He almost ignored it. Still… this felt different. No rented cars. No fake screenshots. Just simple positioning:</p>
          <div className="space-y-1">
            <FeatureItem text="Master the 'Language of AI' (Prompt Engineering)." />
            <FeatureItem text="Offer high-demand digital services in minutes." />
            <FeatureItem text="Use a phone to deliver what pros do with laptops." />
          </div>
          <p className="font-bold text-xl mt-8 text-white">So he joined <span className="text-[#F97316] underline decoration-white/20">AI MONEY MADE EASY.</span></p>
        </div>
      </Section>

      {/* What He Actually Did */}
      <Section>
        <h2 className="text-4xl font-poppins font-black text-[#F97316] mb-8">The Strategy Revealed</h2>
        <p className="mb-8 text-lg text-white/80">The curriculum was different. No fluff. Just practical implementation:</p>
        
        <div className="grid grid-cols-1 gap-4 mb-12">
          {[
            "Mastering Gemini & ChatGPT logic",
            "Professional Prompt Engineering",
            "Premium AI Image Generation",
            "Viral Promo Video Creation",
            "High-Converting AI Copywriting",
            "Packaging Services for Businesses",
            "AI powered graphic design"
          ].map((text, idx) => (
            <div key={idx} className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl shadow-sm border border-white/5 hover:border-[#10B981]/30 transition-all group">
              <Zap className="text-[#F59E0B] group-hover:scale-125 transition-transform" size={24} />
              <span className="font-bold text-white text-lg">{text}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#10B981]/5 p-8 rounded-[2rem] shadow-2xl border border-[#10B981]/20 backdrop-blur-sm relative">
          <div className="absolute -top-4 left-8 bg-[#10B981] text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">The Timeline</div>
          <h3 className="text-2xl font-black mb-4 text-white">The Results?</h3>
          
          <div className="mb-6 space-y-3 text-white/90">
            <p className="font-bold text-lg">Within 5 days, he created:</p>
            <ul className="space-y-2 ml-1">
              <li className="flex items-center gap-2">
                <span className="text-[#10B981] font-bold">•</span>
                <span>A product image mockup for a skincare vendor</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#10B981] font-bold">•</span>
                <span>A short promo video for a real estate agent</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#10B981] font-bold">•</span>
                <span>A content plan for a fashion brand</span>
              </li>
            </ul>
            <div className="pt-2">
              <p className="text-[#10B981] font-bold">All with free AI tools.</p>
              <p className="text-[#10B981] font-bold">All with his smartphone.</p>
            </div>
          </div>

          <p className="mb-4 italic text-white/60 leading-relaxed">"On Day 9, a small real estate company paid him ₦20,000 for an AI video he made in 15 minutes."</p>
          <p className="text-[#10B981] font-black text-3xl">Within 30 days, he crossed ₦185,000 in total revenue.</p>
          <p className="text-sm text-white/40 mt-3 font-medium">zero experience. No laptop. Pure leverage</p>
        </div>
      </Section>

      {/* The Real Transformation Content Box */}
      <Section className="py-0">
        <div className="bg-gradient-to-br from-[#F97316]/10 to-[#10B981]/10 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Heart size={120} className="text-[#F97316]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-poppins font-black text-[#F97316] mb-8 flex items-center gap-4">
            The Real Transformation
          </h2>
          <div className="space-y-4 text-white/90 text-lg md:text-xl font-medium leading-relaxed italic">
            <p>It wasn’t just the money.</p>
            <p>It was the shift in identity.</p>
            <p>David stopped feeling behind.</p>
            <p>He stopped refreshing other people’s success stories.</p>
            <p>He started thinking:</p>
            <p className="text-[#10B981] font-black not-italic text-2xl">“What problem can I solve next?”</p>
            <p>He began contributing small money at home.</p>
            <p>He paid some of his own bills.</p>
            <p>He stopped feeling ashamed.</p>
            <p>He believed in himself again.</p>
            <p className="text-[#F97316] font-black not-italic text-2xl mt-6">And that confidence?</p>
            <p className="text-white font-black not-italic text-3xl border-b-4 border-[#10B981] inline-block">You can’t fake it.</p>
          </div>
        </div>
      </Section>

      {/* That Is Why AI MONEY MADE EASY Was Created Box */}
      <Section className="py-12">
        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-4 right-6 opacity-20 text-[#10B981]">
            <User size={64} />
          </div>
          <h2 className="text-3xl md:text-4xl font-poppins font-black text-[#10B981] mb-8 leading-tight">
            That Is Why AI MONEY MADE EASY Was Created
          </h2>
          
          <div className="space-y-6 text-white/80 text-lg leading-relaxed">
            <p className="text-white font-bold text-xl">Let me tell you something personal.</p>
            <p>My name is <span className="text-white font-black text-2xl">Abdulhafiz Ibrahim</span> known as <span className="text-[#10B981] font-black text-2xl underline decoration-[#10B981]/30">Mr Atom</span>.</p>
            <p>I spent 2 full years of my life learning copywriting, funnel building, video editing…</p>
            <p>Grinding the hard way every single day.</p>
            
            <p className="text-[#F97316] font-bold text-2xl py-2">Then I discovered AI.</p>
            
            <p>And I realized people were doing in minutes what took me days.</p>
            <p>I felt stupid at first. But I also felt free. Because now there was leverage.</p>
            <p>So I went all in. I mastered it. I started making money with it.</p>
            
            <div className="bg-white/5 border-l-4 border-[#10B981] p-6 my-8 rounded-r-xl">
              <p className="italic text-white">Then people started asking me: “Atom, can you teach me?”</p>
            </div>

            <div className="space-y-4">
              <p><span className="text-[#10B981] font-bold">•</span> A student from South Africa made <span className="text-white font-bold">R300</span> doing simple AI work.</p>
              <p><span className="text-[#10B981] font-bold">•</span> Another created flyers for a local business and immediately got referrals.</p>
            </div>

            <p className="text-xl font-bold text-white pt-4">That’s when I knew:</p>
            <p className="text-[#10B981] font-black text-2xl uppercase tracking-tight">If I package this properly… it will help beginners to win.</p>
            
            <div className="flex flex-wrap gap-4 pt-4 text-sm font-black uppercase tracking-widest text-[#F97316]">
              <span className="bg-[#F97316]/10 px-3 py-1 rounded">Phone or laptop</span>
              <span className="bg-[#F97316]/10 px-3 py-1 rounded">Kano or Lagos</span>
            </div>
            
            <p className="text-white font-black text-2xl mt-4 border-t border-white/10 pt-6">
              It doesn’t matter. That’s why I created AI MONEY MADE EASY.
            </p>
          </div>
        </div>
      </Section>

      {/* What You Will Get Inside Section */}
      <Section>
        <h2 className="text-3xl md:text-4xl font-poppins font-black text-[#10B981] mb-6 text-center leading-tight">
          What You Will Get Inside AI MONEY MADE EASY
        </h2>
        <div className="text-center mb-10 text-white/70 text-lg">
          <p>This is not theory. This is a practical system.</p>
          <p className="font-bold text-white mt-2">You’ll learn:</p>
        </div>
        <div className="grid grid-cols-1 gap-1">
          {[
            "How to create premium AI images (Gemini + free tools)",
            "How to create viral AI videos using Veo3",
            "How to write professionally using ChatGPT & Claude",
            "How to position yourself as an AI service provider",
            "How to build a personal brand that attracts clients",
            "How to get clients on Facebook & WhatsApp",
            "How to close deals confidently",
            "How to make your first ₦100k in 30 days",
            "How to scale to ₦300k+ with repeat clients"
          ].map((item, idx) => (
            <FeatureItem key={idx} text={item} />
          ))}
        </div>

        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/10"></div>
            <h3 className="text-2xl font-poppins font-black text-[#F97316] uppercase tracking-[0.2em]">Exclusive Bonuses</h3>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <BonusCard title="10 Cold DM Strategies" value="₦15,000" description="Proven templates to get clients fast." />
            <BonusCard title="Daily ₦100k Checklist" value="₦10,000" description="Exactly what to do every morning." />
            <BonusCard title="50 Proven Prompts" value="₦20,000" description="The 'magic words' for Gemini & ChatGPT." />
            <BonusCard title="VIP WhatsApp Support" value="Priceless" description="Direct access for help and questions." />
          </div>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-[#10B981]/5 border-y border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-black text-white mb-4">Real Stories. <span className="text-[#10B981]">Real Results.</span></h2>
          <p className="text-white/60 text-lg italic">Don't just take my word for it. Listen to those already winning.</p>
        </div>

        {/* Visual Testimonials List */}
        <div className="space-y-16 mb-20">
          {/* Featured Result 1: South Africa */}
          <FeaturedResult 
            icon={<TrendingUp size={24} />}
            caption={
              <p>My student from South Africa closed a <span className="text-[#F97316] font-black">R300 deal</span>. Which is over <span className="text-[#10B981] font-black underline">25,000 Naira</span>.</p>
            }
            imgSrc="https://i.ibb.co/N69HrQ7r/20260208-003448.jpg"
            imgAlt="South Africa Student Result"
          />

          {/* Featured Result 2: Germany Client */}
          <FeaturedResult 
            icon={<Globe size={24} />}
            caption={
              <p>A <span className="text-[#10B981] font-black underline">female student</span> got an <span className="text-[#F97316] font-black">international client from Germany</span> using these AI secrets.</p>
            }
            imgSrc="https://i.ibb.co/nqGmQbK8/Screenshot-20260206-115138-Whats-App.jpg"
            imgAlt="Germany Client Success"
          />
        </div>

        <div className="space-y-4">
          <TestimonialCard 
            name="Sarah O." 
            role="Student & Freelancer" 
            text="I was skeptical about AI at first, but Mr Atom's method changed everything. I made my first ₦15,000 for a simple AI video gig just 3 days after joining!" 
            result="₦15k in 72hrs" 
          />
          <TestimonialCard 
            name="Blessing A." 
            role="Undergraduate" 
            text="From having zero digital skills to making ₦50,000 in my first two weeks. The daily checklist keeps me focused. Best ₦3,000 I ever spent." 
            result="₦50k Earned" 
          />
        </div>
      </Section>

      {/* Pricing & Final CTA */}
      <Section id="cta-final" className="bg-[#10B981]/5 border-y border-white/5 my-24 relative overflow-hidden">
        {/* Glow effect for CTA section */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F97316]/10 to-transparent pointer-events-none opacity-50"></div>
        
        <div className="text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-poppins font-black mb-8 text-[#F97316]">Your New Chapter Starts Now</h2>
          <div className="bg-white/5 p-10 rounded-[2.5rem] mb-10 backdrop-blur-md border border-white/10 shadow-inner">
            <p className="text-white/50 text-xl mb-4 line-through">Total Value: ₦95,000</p>
            <p className="text-white/70 text-2xl mb-2 font-bold uppercase tracking-widest">Normal Price: ₦5,000</p>
            <div className="relative inline-block mb-6">
              <p className="text-xl text-white/80 font-medium mb-2">today you will get it for only</p>
              <p className="text-6xl md:text-8xl font-poppins font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">₦3,000</p>
              <div className="absolute -right-12 top-12 bg-[#F97316] text-white px-3 py-1 rounded-full text-sm font-black transform rotate-12 shadow-lg">Save 40%</div>
            </div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/60 font-black">ONE-TIME INVESTMENT • FOREVER ACCESS</p>
          </div>

          <div className="space-y-6 text-xl mb-12 text-left bg-white/5 p-8 rounded-3xl border border-white/5">
            <p className="font-bold text-white/100">You have two real options:</p>
            <ol className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0">1</span>
                <span className="text-white/80">Ignore this, keep doing what you've been doing, and hope for a different result (It rarely works).</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-[#10B981] w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0">2</span>
                <span className="font-black text-white">Join AI MONEY MADE EASY and build a future-proof income stream starting today.</span>
              </li>
            </ol>
          </div>

          <Button href={CHECKOUT_URL} className="w-full py-8 text-3xl font-black bg-[#10B981] hover:bg-white hover:text-[#10B981] shadow-2xl">
            CLAIM YOUR SPOT NOW FOR ₦3,000
          </Button>

          <div className="mt-10 flex flex-wrap justify-center gap-6 opacity-60">
            <div className="flex items-center gap-2 text-sm font-bold"><Award size={18} /> Verified Course</div>
            <div className="flex items-center gap-2 text-sm font-bold"><ShieldCheck size={18} /> Secure Checkout</div>
          </div>
        </div>
      </Section>

      {/* Footer / Author */}
      <footer className="bg-transparent py-20 px-6 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6 inline-block p-4 rounded-full bg-white/5 border border-white/10">
            <Target size={32} className="text-[#F97316]" />
          </div>
          <p className="text-2xl font-poppins font-black text-[#F97316] mb-3">— Mr Atom</p>
          <p className="text-white/60 italic text-lg leading-relaxed">
            "I don't teach theory. I teach structured leverage. If you follow direction, you win. Simple."
          </p>
          <div className="mt-12 flex justify-center gap-8 text-white/40 text-xs font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-[#F97316] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#F97316] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#F97316] transition-colors">Support</a>
          </div>
          <p className="mt-8 text-[10px] text-white/20 uppercase tracking-[0.5em] font-black">
            © {new Date().getFullYear()} AI Money Made Easy
          </p>
        </div>
      </footer>

      {/* Sticky Bottom CTA */}
      <div 
        className={`
          fixed bottom-0 left-0 right-0 p-4 bg-[#020617]/80 backdrop-blur-xl border-t border-white/10 z-50 transition-all duration-700 transform
          ${showStickyCTA ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
        `}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-[#F97316] font-black text-xs uppercase tracking-widest mb-0.5">Limited Deal</p>
            <p className="text-white font-black text-2xl">₦3,000</p>
          </div>
          <Button 
            href={CHECKOUT_URL} 
            className="flex-1 py-4 text-lg sm:w-auto font-black"
          >
            JOIN NOW <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
