import { motion } from "framer-motion";
import { 
  Brain, 
  Heart, 
  BookOpen, 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  CheckCircle,
  Camera,
  Stethoscope, Activity, Zap, Shield, Target,
  UserPlus, UserCheck, UserX, UserCog, Sun, Moon, Sparkles,
  MessageCircle, MessageSquare, Mic, Volume2, TrendingUp, BarChart, PieChart, Gauge,
  Leaf, Flower, TreePine, Wind, Handshake, HelpCircle, LifeBuoy, Umbrella,
  Home, Gamepad2, Puzzle, Palette, Footprints, Waves, Mountain, Compass,
  Timer, Calendar, Hourglass
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Specialty } from "@shared/schema";
import { processTextWithGradient, processBadgeWithGradient } from "@/utils/textGradient";

export default function SpecialtiesSection() {
  // Todos os hooks devem ser chamados no topo, antes de qualquer retorno condicional
  const { data: specialties = [], isLoading, error } = useQuery({
    queryKey: ["/api/specialties"],
    queryFn: async () => {
      const response = await fetch("/api/specialties");
      if (!response.ok) {
        throw new Error('Falha ao carregar especialidades');
      }
      return response.json();
    },
  });

  const { data: configs } = useQuery({
    queryKey: ["/api/admin/config"],
    queryFn: async () => {
      const response = await fetch("/api/admin/config");
      return response.json();
    },
  });

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Loading state - agora após todos os hooks
  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  // Error state - agora após todos os hooks
  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Especialidades</h2>
          <p className="text-red-600">Erro ao carregar especialidades</p>
        </div>
      </section>
    );
  }

  // Mapeamento completo de ícones
  const iconMap: Record<string, any> = {
    Brain, Heart, BookOpen, Users, Award, Clock, MapPin, Phone, Mail, Star,
    CheckCircle, Camera, Stethoscope, Activity, Zap, Shield, Target,
    UserPlus, UserCheck, UserX, UserCog, Sun, Moon, Sparkles,
    MessageCircle, MessageSquare, Mic, Volume2, TrendingUp, BarChart, PieChart, Gauge,
    Leaf, Flower, TreePine, Wind, Handshake, HelpCircle, LifeBuoy, Umbrella,
    Home, Gamepad2, Puzzle, Palette, Footprints, Waves, Mountain, Compass,
    Timer, Calendar, Hourglass
  };

  // Função para converter cor hex em RGB com alpha
  const hexToRgba = (hex: string, alpha: number = 0.1) => {
    const hexValue = hex.replace('#', '');
    const r = parseInt(hexValue.substr(0, 2), 16);
    const g = parseInt(hexValue.substr(2, 2), 16);
    const b = parseInt(hexValue.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const activeSpecialties = specialties
    .filter((specialty: Specialty) => specialty.isActive)
    .sort((a: Specialty, b: Specialty) => a.order - b.order);

  // Se não há especialidades ativas, não renderiza a seção
  if (activeSpecialties.length === 0) {
    return null;
  }

  const specialtiesSection = configs?.find((c: any) => c.key === 'specialties_section')?.value || {};
  const badgeSettings = configs?.find((c: any) => c.key === 'badge_gradient')?.value || {};

  const sectionTexts = {
    title: specialtiesSection.title || "Minhas <gradient>Especialidades</gradient>",
    subtitle: specialtiesSection.subtitle || "Áreas de atuação onde posso te ajudar a encontrar bem-estar e equilíbrio emocional"
  };

  const badgeGradient = badgeSettings.specialties || "from-purple-500 to-pink-500";

  return (
    <section 
      ref={ref}
      className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-100 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-block mb-4">
            <span className={`text-xs font-medium text-white px-4 py-1.5 rounded-full ${badgeGradient ? `bg-gradient-to-r ${badgeGradient}` : 'text-purple-600 bg-purple-50 border border-purple-100'}`}>
              ESPECIALIDADES
            </span>
          </div>

          <motion.h2 
            className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-slate-800 mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {processTextWithGradient(sectionTexts.title)}
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={isVisible ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <motion.p 
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {sectionTexts.subtitle}
          </motion.p>
        </motion.div>

        {/* Specialties Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {activeSpecialties.map((specialty: Specialty, index: number) => {
            const IconComponent = iconMap[specialty.icon] || Brain;
            const bgColor = hexToRgba(specialty.iconColor, 0.08);
            const borderColor = hexToRgba(specialty.iconColor, 0.2);

            return (
              <motion.div
                key={specialty.id}
                className="group relative"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.8 + index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Card */}
                <div 
                  className="relative p-8 rounded-3xl border-2 transition-all duration-500 group-hover:shadow-2xl backdrop-blur-sm"
                  style={{ 
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                  }}
                >
                  {/* Hover Glow Effect */}
                  <div 
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
                    style={{ backgroundColor: specialty.iconColor }}
                  />

                  {/* Icon Container */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden"
                      style={{ backgroundColor: hexToRgba(specialty.iconColor, 0.15) }}
                    >
                      {/* Icon Background Gradient */}
                      <div 
                        className="absolute inset-0 opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${specialty.iconColor}20, ${specialty.iconColor}10)`
                        }}
                      />

                      <IconComponent 
                        className="w-8 h-8 relative z-10 transition-transform duration-300 group-hover:scale-110" 
                        style={{ color: specialty.iconColor }}
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors duration-300">
                      {specialty.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                      {specialty.description}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full opacity-60" style={{ backgroundColor: specialty.iconColor }} />
                  <div className="absolute bottom-4 left-4 w-1 h-1 rounded-full opacity-40" style={{ backgroundColor: specialty.iconColor }} />
                </div>

                {/* Floating Particles */}
                <motion.div
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full opacity-0 group-hover:opacity-60"
                  style={{ backgroundColor: specialty.iconColor }}
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200 shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-slate-700 font-medium">
              Pronta para te ajudar em cada etapa
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}