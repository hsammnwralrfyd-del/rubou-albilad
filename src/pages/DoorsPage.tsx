import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Shield, Clock, Award, TrendingUp } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { seoData, generateStructuredData } from "@/utils/seo/seoData";

const DoorsPage = () => {
  const seoInfo = seoData.doors;
  useSEO({
    ...seoInfo,
    structuredData: generateStructuredData('doors', seoInfo.title, seoInfo.description),
  });

  const services = [
    {
      title: "قراميد خرسانية",
      description: "قراميد خرسانية عالية الجودة للأسقف.",
    },
    {
      title: "قراميد مودرن",
      description: "قراميد بتصاميم عصرية للأسقف.",
    },
    {
      title: "أسقف قرميدية",
      description: "أسقف بقراميد متينة ومقاومة.",
    },
    {
      title: "قراميد جاهزة",
      description: "قراميد بمقاسات وتصاميم جاهزة.",
    },
    {
      title: "قراميد للفلل",
      description: "قراميد مخصصة للفلل والمنازل.",
    },
    {
      title: "تصميم مخصص",
      description: "تصميم قراميد مخصصة حسب المساحة.",
    },
  ];

  const detailedServices = [
    {
      title: "قرميد خرساني فاخر",
      image: "/roof-tiles/1.webp",
      alt: "تركيب قرميد خرساني فاخر في الرياض",
    },
    {
      title: "سقف قرميدي للفيلات",
      image: "/roof-tiles/2.webp",
      alt: "سقف قرميدي للفيلات في الرياض",
    },
    {
      title: "قرميد للمنازل",
      image: "/roof-tiles/3.webp",
      alt: "قرميد للمنازل في الرياض",
    },
    {
      title: "قرميد مودرن",
      image: "/roof-tiles/4.webp",
      alt: "قرميد مودرن في الرياض",
    },
  ];

  const features = [
    {
      icon: Award,
      title: "متانة عالية",
      description:
        "قراميد خرسانية بمتانة عالية ومقاومة للعوامل الجوية.",
    },
    {
      icon: Shield,
      title: "جودة مضمونة",
      description:
        "مواد عالية الجودة مناسبة للظروف المناخية.",
    },
    {
      icon: TrendingUp,
      title: "أسعار تنافسية",
      description:
        "أسعار مناسبة مع الحفاظ على الجودة.",
    },
    {
      icon: Clock,
      title: "تنفيذ سريع",
      description:
        "فريق متخصص في تنفيذ القراميد.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-24 overflow-hidden"
        style={{
          backgroundImage: 'url(/doors1/1.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl animate-fade-in-up">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-white font-bold text-lg">فن الأناقة والتجديد</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white drop-shadow-lg">
              تلبيس أبواب بديل الخشب
              <span className="block mt-2" style={{ color: '#d1a347' }}>في الرياض</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              اجعل باب منزلك عامرًا بالفن والأناقة - حلول متكاملة لتجديد أبوابك بأفضل المواد والأسعار
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 gap-3 font-bold shadow-2xl hover:scale-105 transition-all duration-300 border-2"
                style={{ backgroundColor: '#d1a347', borderColor: '#d1a347', color: '#fff' }}
                asChild
              >
                <a href="https://wa.me/966541210865" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-6 h-6" />
                  تواصل عبر واتساب
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 gap-3 font-bold bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-black shadow-2xl transition-all duration-300"
                asChild
              >
                <a href="tel:0536986956">
                  <Phone className="w-6 h-6" />
                  اتصل الآن
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#d1a347' }}>
              لماذا نحن الخيار الأفضل؟
            </h2>
            <div className="h-1 w-24 mx-auto rounded-full" style={{ backgroundColor: '#d1a347' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-[#d1a347] animate-fade-in-up bg-white"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(209, 163, 71, 0.1)' }}>
                    <Icon className="w-8 h-8" style={{ color: '#d1a347' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#d1a347' }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#d1a347' }}>
              خدماتنا المتخصصة
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم حلولًا متكاملة لجميع أنواع تلبيس الأبواب
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="group p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-[#d1a347] animate-fade-in-up overflow-hidden relative bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#d1a347]/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#d1a347' }}>
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#d1a347' }}>
              تفاصيل خدماتنا
            </h2>
            <div className="h-1 w-24 mx-auto rounded-full" style={{ backgroundColor: '#d1a347' }}></div>
          </div>

          <div className="space-y-8">
            {detailedServices.map((service, index) => (
              <Card 
                key={index}
                className="overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in-up border-2 hover:border-[#d1a347] bg-white"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 relative overflow-hidden group">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="font-bold" style={{ color: '#d1a347' }}>{index + 1}</span>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2 p-8 md:p-12">
                    <h3 className="text-3xl font-bold mb-4" style={{ color: '#d1a347' }}>
                      {service.title}
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {service.title}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-24 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/doors1/1.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/70"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              جاهزون لبدء مشروعك؟
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مناسب يلبي احتياجاتك
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-10 py-7 gap-3 font-bold shadow-2xl hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: '#d1a347', color: '#fff' }}
                asChild
              >
                <a href="https://wa.me/966541210865" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-6 h-6" />
                  تواصل عبر واتساب
                </a>
              </Button>
              
              <Button 
                size="lg" 
                className="text-lg px-10 py-7 gap-3 font-bold bg-white text-black hover:bg-gray-100 shadow-2xl transition-all duration-300"
                asChild
              >
                <a href="tel:0536986956">
                  <Phone className="w-6 h-6" />
                  0536986956
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoorsPage;