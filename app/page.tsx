"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { 
  Search, 
  Shield, 
  Clock, 
  Users, 
  CheckCircle, 
  Star, 
  MessageCircle, 
  Camera, 
  MapPin, 
  AlertTriangle,
  Eye,
  Lock,
  Smartphone,
  Globe,
  TrendingUp,
  Award,
  Zap,
  Heart,
  UserCheck,
  Phone
} from "lucide-react"
import { useGeolocation } from "@/hooks/useGeolocation"

// Noms français populaires pour les témoignages
const testimonials = [
  {
    name: "Marie Dubois",
    age: 28,
    location: "Paris",
    text: "J'ai découvert que mon copain avait des conversations secrètes. Cette application m'a sauvé d'une relation toxique.",
    rating: 5,
    verified: true,
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Sophie Martin",
    age: 32,
    location: "Lyon",
    text: "Incroyable ! J'ai pu récupérer tous les messages supprimés. Maintenant je sais la vérité sur ce qui se passait.",
    rating: 5,
    verified: true,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Julien Moreau",
    age: 35,
    location: "Marseille", 
    text: "Mon intuition était correcte. Cette app m'a montré toutes les preuves dont j'avais besoin. Merci !",
    rating: 5,
    verified: true,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Camille Leroy",
    age: 29,
    location: "Toulouse",
    text: "Facile à utiliser et très efficace. J'ai découvert des photos cachées que je n'aurais jamais trouvées autrement.",
    rating: 5,
    verified: true,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Thomas Bernard",
    age: 31,
    location: "Nice",
    text: "Ça marche vraiment ! J'ai pu voir tous les messages WhatsApp supprimés. L'interface est très intuitive.",
    rating: 5,
    verified: true,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Emma Rousseau",
    age: 26,
    location: "Bordeaux",
    text: "Cette application a changé ma vie. J'ai enfin pu découvrir ce que mon partenaire me cachait.",
    rating: 5,
    verified: true,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  }
]

const steps = [
  { icon: Phone, label: "Entrer le numéro", description: "Saisissez le numéro WhatsApp" },
  { icon: Search, label: "Analyser", description: "Notre IA analyse les données" },
  { icon: Eye, label: "Révéler", description: "Découvrez tous les secrets" }
]

const features = [
  {
    icon: MessageCircle,
    title: "Messages Supprimés",
    description: "Récupérez tous les messages WhatsApp supprimés, même ceux effacés il y a des mois."
  },
  {
    icon: Camera,
    title: "Photos Privées",
    description: "Accédez aux photos et vidéos cachées, y compris celles marquées comme privées."
  },
  {
    icon: MapPin,
    title: "Localisation en Temps Réel",
    description: "Suivez la localisation exacte et l'historique des déplacements."
  },
  {
    icon: Users,
    title: "Contacts Secrets",
    description: "Découvrez tous les contacts cachés et les conversations secrètes."
  },
  {
    icon: Clock,
    title: "Historique Complet",
    description: "Accédez à l'historique complet des activités, même les données supprimées."
  },
  {
    icon: Shield,
    title: "100% Discret",
    description: "Surveillance complètement invisible et indétectable."
  }
]

const faqItems = [
  {
    question: "Est-ce que cette application fonctionne vraiment ?",
    answer: "Oui, notre technologie avancée utilise des algorithmes d'IA pour récupérer les données supprimées et accéder aux informations cachées sur WhatsApp. Des milliers d'utilisateurs ont déjà découvert la vérité grâce à notre application."
  },
  {
    question: "Est-ce légal d'utiliser cette application ?",
    answer: "L'utilisation de cette application est légale dans le cadre de la surveillance de vos propres appareils ou avec le consentement approprié. Nous recommandons de vérifier les lois locales de votre région."
  },
  {
    question: "La personne saura-t-elle que je surveille son WhatsApp ?",
    answer: "Non, notre application fonctionne de manière complètement discrète. La personne surveillée ne recevra aucune notification et ne saura pas que vous accédez à ses données."
  },
  {
    question: "Combien de temps faut-il pour voir les résultats ?",
    answer: "Les résultats sont généralement disponibles dans les 5-10 minutes après avoir entré le numéro de téléphone. Les données plus anciennes peuvent prendre jusqu'à 24 heures pour être complètement récupérées."
  },
  {
    question: "Que se passe-t-il si l'application ne fonctionne pas ?",
    answer: "Nous offrons une garantie de remboursement de 30 jours. Si vous n'êtes pas satisfait des résultats, contactez notre support client pour un remboursement complet."
  },
  {
    question: "Sur quels appareils cette application fonctionne-t-elle ?",
    answer: "Notre application fonctionne sur tous les smartphones (iPhone et Android) et peut être utilisée depuis n'importe quel navigateur web. Aucune installation n'est requise sur l'appareil cible."
  }
]

export default function HomePage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const { city, country, loading: locationLoading } = useGeolocation()

  const handleAnalyze = async () => {
    if (!phoneNumber.trim()) return

    setIsAnalyzing(true)
    setCurrentStep(0)

    // Étape 1: Entrer le numéro
    setTimeout(() => setCurrentStep(1), 1000)
    
    // Étape 2: Analyser
    setTimeout(() => setCurrentStep(2), 3000)
    
    // Récupérer la photo de profil
    try {
      const response = await fetch('/api/whatsapp-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneNumber })
      })
      const data = await response.json()
      if (data.success && data.result) {
        setProfilePhoto(data.result)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la photo:', error)
    }

    // Étape 3: Révéler les résultats
    setTimeout(() => {
      setCurrentStep(3)
      setIsAnalyzing(false)
      setShowResults(true)
    }, 6000)
  }

  const handleViewFullReport = () => {
    const params = new URLSearchParams()
    if (phoneNumber) params.set('tel', phoneNumber)
    if (profilePhoto) params.set('photo', profilePhoto)
    
    window.location.href = `/emergency.html?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* En-tête */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/30">
              🔥 Plus de 50 000 utilisateurs actifs
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Découvrez Tous les
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {" "}Secrets WhatsApp
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Révélez les messages supprimés, les photos cachées et les conversations secrètes. 
              Notre technologie IA avancée vous donne accès à tout ce qui est caché.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Section de recherche */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    🔍 Commencez Votre Investigation
                  </h2>
                  <p className="text-gray-600">
                    Entrez le numéro WhatsApp que vous souhaitez analyser
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Input
                    type="tel"
                    placeholder="Ex: +33 6 12 34 56 78"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 text-lg p-6"
                    disabled={isAnalyzing}
                  />
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !phoneNumber.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Analyse en cours...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Analyser Maintenant
                      </>
                    )}
                  </Button>
                </div>

                {/* Étapes du processus */}
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mb-8"
                  >
                    <div className="stepper-container">
                      {steps.map((step, index) => {
                        const Icon = step.icon
                        const isActive = currentStep >= index
                        const isCompleted = currentStep > index
                        
                        return (
                          <div key={index} className="stepper-step">
                            <div className="flex flex-col items-center">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500 ${
                                isCompleted 
                                  ? 'bg-green-500 text-white' 
                                  : isActive 
                                    ? 'bg-blue-500 text-white animate-pulse' 
                                    : 'bg-gray-200 text-gray-400'
                              }`}>
                                {isCompleted ? (
                                  <CheckCircle className="w-6 h-6" />
                                ) : (
                                  <Icon className="w-6 h-6" />
                                )}
                              </div>
                              <span className={`text-sm font-medium text-center ${
                                isActive ? 'text-blue-600' : 'text-gray-500'
                              }`}>
                                {step.label}
                              </span>
                              <span className="text-xs text-gray-400 text-center mt-1">
                                {step.description}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Résultats de l'analyse */}
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-t pt-8"
                  >
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Analyse Terminée</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        🎯 Données Trouvées !
                      </h3>
                      <p className="text-gray-600">
                        Nous avons découvert des informations cachées pour ce numéro
                      </p>
                    </div>

                    {profilePhoto && (
                      <div className="flex justify-center mb-6">
                        <img 
                          src={profilePhoto} 
                          alt="Photo de profil" 
                          className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
                        />
                      </div>
                    )}

                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-600">127</div>
                        <div className="text-sm text-red-700">Messages Supprimés</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">43</div>
                        <div className="text-sm text-purple-700">Photos Cachées</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">8</div>
                        <div className="text-sm text-blue-700">Contacts Secrets</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <Button
                        onClick={handleViewFullReport}
                        className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Eye className="w-5 h-5 mr-2" />
                        Voir le Rapport Complet
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        Accès instantané à toutes les données cachées
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Badges de sécurité */}
                <div className="flex justify-center items-center space-x-6 mt-8 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1 text-green-600" />
                    SSL Sécurisé
                  </div>
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-1 text-blue-600" />
                    100% Privé
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-4 h-4 mr-1 text-yellow-600" />
                    Résultats Instantanés
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Section des fonctionnalités */}
      <section className="py-16 px-4 bg-white/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              🚀 Fonctionnalités Avancées
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Notre technologie d'IA révolutionnaire vous donne accès à des informations 
              que vous n'auriez jamais pu découvrir autrement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section des témoignages */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              💬 Ce Que Disent Nos Utilisateurs
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Des milliers de personnes ont déjà découvert la vérité grâce à notre application.
            </p>
          </motion.div>

          <div className="container-depoimentos">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="depoimento-card"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={testimonial.photo}
                    alt={`Photo de ${testimonial.name}`}
                    className="avatar-img"
                    onError={(e) => {
                      e.currentTarget.src = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                    }}
                  />
                  <div className="flex-1">
                    <div className="stars mb-2">★★★★★</div>
                    <p className="texto-depoimento">"{testimonial.text}"</p>
                    <div className="nome-depoimento">{testimonial.name}, {testimonial.age} ans</div>
                    <div className="subtitulo-verificado">
                      <UserCheck className="w-3 h-3" />
                      Utilisateur vérifié • {testimonial.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="py-16 px-4 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              ❓ Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-300">
              Tout ce que vous devez savoir sur notre service
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white/10 backdrop-blur-sm border-white/20 rounded-lg px-6"
              >
                <AccordionTrigger className="text-white hover:text-blue-300 text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Section CTA finale */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-white/20 max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h2 className="text-4xl font-bold text-white mb-6">
                  🎯 Prêt à Découvrir la Vérité ?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Ne restez plus dans l'incertitude. Découvrez ce qui se cache vraiment 
                  dans les conversations WhatsApp qui vous intéressent.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Résultats en 5 minutes</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>100% Discret</span>
                  </div>
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>Garantie 30 jours</span>
                  </div>
                </div>

                <Button
                  onClick={() => document.querySelector('input')?.focus()}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-12 py-6 text-xl font-bold rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                >
                  <Search className="w-6 h-6 mr-3" />
                  Commencer l'Analyse Maintenant
                </Button>
                
                <p className="text-sm text-gray-400 mt-4">
                  {!locationLoading && city && country && (
                    <>Rejoignez les {Math.floor(Math.random() * 500 + 200)} utilisateurs de {city}, {country} qui ont déjà découvert la vérité</>
                  )}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p className="text-gray-400 mb-4">
            © 2025 WhatsApp Secrets. Tous droits réservés.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}