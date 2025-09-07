"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Wifi,
  Camera,
  User,
  Heart,
  MapPin,
  MessageCircle,
  Shield,
  AlertTriangle,
  Lock,
  Activity,
  Eye,
  CheckCircle,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useGeolocation } from "@/hooks/useGeolocation"

type AppStep = "landing" | "form" | "verification" | "preliminary" | "generating" | "result" | "offer"

// Messages de preuve sociale mis à jour
const SalesProofPopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState("")

  const salesMessages = [
    "✅ Jessica de Lyon a débloqué un rapport il y a 12 minutes",
    "✅ Sarah a récemment consulté un historique de conversation",
    "✅ Michelle vient d'accéder à des photos confidentielles",
    "✅ Jennifer a terminé une analyse complète à l'instant",
    "✅ Ashley a obtenu l'accès au rapport confidentiel il y a quelques instants",
    "✅ Rachel a effectué une vérification complète à l'instant",
  ]

  useEffect(() => {
    if (show) {
      const randomMessage = salesMessages[Math.floor(Math.random() * salesMessages.length)]
      setCurrentMessage(randomMessage)
    }
  }, [show])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: -20 }}
      className="fixed bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-xs z-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 sm:p-4"
      style={{
        fontSize: "13px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">{currentMessage}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 flex-shrink-0"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </motion.div>
  )
}

// Tableaux de photos organisés par genre et tranche d'âge
const malePhotos1824 = [
  "https://blobs.vusercontent.net/blob/male-25-34-male-andyreiddvip.jpg-JfW3WQX7spc75NBSfoH1ink8qFF9bg.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-franchescox.jpg-SSxdBZNDEbogmHbY6WPnSteKDSLnOy.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-augst_ts.jpg-nu4ttxScgp63AQU9M9uUAQw6ujbhmq.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-nanoargentino.jpg-MupFxTgua62ieJ17as9NXcynMYNbgN.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-shyguyishere.jpg-94TD8ArDNT2ZBDw0N2M0G9hJah6UKk.jpeg",
]
const malePhotos2534 = [
  "https://blobs.vusercontent.net/blob/male-25-34-male-carterlander08.jpg-yVyzRYbS0aGVhbvEX0Mjss5h51nySK.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-matthewteddy.jpg-gGny9NX0j88eVzP1iJqKZPEVWZ0Ogs.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-tomidiazj.jpg-uuVCkrFp6AHIQkyUkoUnQ4seoDKeL7.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-latinblondarg.jpg-erLXKeyVnCQFjS4QaZLFLFhu1I0yro.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-bushidoboy.jpg-Ye68jGO1s2usgp6AabdJo4bGpnxCTl.jpeg",
]
const malePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-morocholatino87.jpg-bam8DFyuAfzBux5zmL9lscgSfnbJ4w.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-ovalo-sex.jpg-TdxtGZRqBJy2V8x9kVfSml7x6QJpjt.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-josepbgfeet.jpg-f25HHQX8Dso5oQBIE1uCIP3oC3KYrd.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-thesuitedboss.jpg-3CFJKVgZyyuzeIPk0klRBy6ixqjsHF.jpeg",
]
const malePhotos4554 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-nicoink.jpg-0YCHbmDqw9dWCItx4Of9GbWBbpiZOZ.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-nicoalpalo22.jpg-bPAd1S83ZoBGkoJyaKZ0BSEveTVHG1.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-tunacho.jpg-2wHzLphZ2mKamlOeZmIfo1F09LM6pR.jpeg",
]
const femalePhotos1824 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-bustanutters.jpg-PfzSPm0cPx7xUL939wZRvkH6X4MnMI.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-megnut.jpg-JDM9fK1I9XwHyJHqn36CZyjwv55ycS.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-siswet.jpg-5Ovue3nSIBKAMGL74rU3Ct4qf7bpFN.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ThorriandJax.jpg-CZTrwFISinAcSSvxRrAcUWtMDYTaiO.jpeg",
]
const femalePhotos2534 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-juicyjade9.jpg-nOS27Xu6KrOgaCRuu9862Hk73NegAs.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ruth_lee.jpg-J5flhVFgEjhvJiSFhj0ZuBY3tGwjRI.jpeg",
  "https://blobs.vusercontent.net/blob/female-25-34-female-graciebon1.jpg-kfctbLLp6OUl4Kc0OhSYyglGCLl29f.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-brujita.roja.jpg-KZxlryBKf0XVbOHRNdGAMBpPQTa82Z.jpeg",
]
const femalePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-belle_oharaxxx.jpg-Pq9aUAbtUDVI9UrrzZJlkfEC0cxuQv.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-txhotwife84_free.jpg-QV1C6Nj4fbSzTRIyGs7p4kiqtozXCx.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-malmalloy.jpg-B7c4Pg36GwUFFIayybP0fiyWqkv51R.jpeg",
]
const femalePhotos4554 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-anialisimo.jpg-EcQ66PmaeU25fFT0xV8udt4mMqLwhC.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-syrenjaymes.jpg-N4w0IhzPmQNbX0BqZRFeTvdBdGNn3Y.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/AEJxds2OT7Gt-B4VLJXv4a/public/female/45-54/female-45-54-annikarose69.jpg",
]

// Noms français
const maleNames = {
  "18-24": ["Léo", "Gabriel", "Raphaël", "Louis", "Arthur", "Jules", "Maël", "Adam", "Hugo", "Noah"],
  "25-34": ["Lucas", "Thomas", "Maxime", "Alexandre", "Antoine", "Clément", "Romain", "Valentin", "Paul", "Enzo"],
  "35-44": ["Nicolas", "Julien", "Sébastien", "David", "Christophe", "Guillaume", "Matthieu", "Vincent", "Benoît", "Pierre"],
  "45-54": ["Philippe", "Laurent", "Stéphane", "Olivier", "Éric", "Frédéric", "Pascal", "Thierry", "Didier", "Marc"],
}

const femaleNames = {
  "18-24": ["Jade", "Louise", "Ambre", "Alba", "Emma", "Rose", "Alice", "Lina", "Chloé", "Mia"],
  "25-34": ["Léa", "Manon", "Camille", "Inès", "Sarah", "Juliette", "Lucie", "Clara", "Eva", "Marie"],
  "35-44": ["Stéphanie", "Céline", "Julie", "Aurélie", "Élodie", "Laetitia", "Virginie", "Audrey", "Émilie", "Anne"],
  "45-54": ["Nathalie", "Isabelle", "Valérie", "Sandrine", "Sophie", "Catherine", "Sylvie", "Corinne", "Véronique", "Karine"],
}


export default function SigiloX() {
  const [currentStep, setCurrentStep] = useState<AppStep>("landing")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedGender, setSelectedGender] = useState("")
  const [lastTinderUse, setLastTinderUse] = useState("")
  const [cityChange, setCityChange] = useState("")
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)
  const [photoError, setPhotoError] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [isPhotoPrivate, setIsPhotoPrivate] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationMessage, setVerificationMessage] = useState("Démarrage de l'analyse...")
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generatingMessage, setGeneratingMessage] = useState("Analyse des photos de profil...")
  const [stepCompleted, setStepCompleted] = useState({
    profilePhotos: false,
    conversations: false,
    finalizing: false,
  })
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 50) // 9:50
  const [showSalesPopup, setShowSalesPopup] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showSalesProof, setShowSalesProof] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
  const [ageRange, setAgeRange] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [generatedProfiles, setGeneratedProfiles] = useState<any[]>([])
  const [selectedRandomPhoto, setSelectedRandomPhoto] = useState<string | null>(null)

  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const [selectedCountry, setSelectedCountry] = useState({
    code: "+33",
    name: "France",
    flag: "🇫🇷",
    placeholder: "06 12 34 56 78",
  })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")

  const countries = [
    { code: "+33", name: "France", flag: "🇫🇷", placeholder: "06 12 34 56 78" },
    { code: "+32", name: "Belgique", flag: "🇧🇪", placeholder: "0470 12 34 56" },
    { code: "+41", name: "Suisse", flag: "🇨🇭", placeholder: "078 123 45 67" },
    { code: "+352", name: "Luxembourg", flag: "🇱🇺", placeholder: "621 123 456" },
    { code: "+377", name: "Monaco", flag: "🇲🇨", placeholder: "06 12 34 56 78" },
    { code: "+1", name: "États-Unis", flag: "🇺🇸", placeholder: "(555) 123-4567" },
    { code: "+1", name: "Canada", flag: "🇨🇦", placeholder: "(555) 123-4567" },
    { code: "+44", name: "Royaume-Uni", flag: "🇬🇧", placeholder: "07911 123456" },
    { code: "+49", name: "Allemagne", flag: "🇩🇪", placeholder: "01512 3456789" },
    { code: "+39", name: "Italie", flag: "🇮🇹", placeholder: "312 345 6789" },
    { code: "+34", name: "Espagne", flag: "🇪🇸", placeholder: "612 34 56 78" },
    { code: "+351", name: "Portugal", flag: "🇵🇹", placeholder: "912 345 678" },
  ]

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) || country.code.includes(countrySearch),
  )

  const { city, loading: geoLoading, error: geoError } = useGeolocation()

  const matrixCodes = [
    "4bda7c", "x1f801", "uSr9ub", "r31sw", "3cqvt", "ebwvi", "4qd1tu", "str5y4", "ect2So", "xfnpBj", "kqjJu",
    "2v46yn", "q619ma", "wdtqdo", "14mkee", "pbb3eu", "vbncg8", "begaSh", "7rq", "dcboeu", "keyxs", "3Qehu"
  ]

  const getProgressSteps = () => {
    const steps = [
      {
        id: "form",
        label: "Infos",
        fullLabel: "Informations",
        mobileLabel: "Infos",
        completed: ["form", "verification", "preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "verification",
        label: "Vérif.",
        fullLabel: "Vérification",
        mobileLabel: "Vérif.",
        completed: ["verification", "preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "preliminary",
        label: "Résultat",
        fullLabel: "Résultat",
        mobileLabel: "Résultat",
        completed: ["preliminary", "generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "generating",
        label: "Rapport",
        fullLabel: "Rapport",
        mobileLabel: "Rapport",
        completed: ["generating", "result", "offer"].includes(currentStep),
      },
      {
        id: "offer",
        label: "Accès",
        fullLabel: "Déblocage",
        mobileLabel: "Accès",
        completed: currentStep === "offer",
      },
    ]
    return steps
  }

  useEffect(() => {
    if (currentStep === "result" || currentStep === "offer") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [currentStep])

  useEffect(() => {
    if (currentStep === "verification") {
      const messages = [
        { progress: 0, message: "Vérification de l'activité Tinder dans votre région..." },
        { progress: 15, message: "Croisement des données de reconnaissance faciale..." },
        { progress: 30, message: "Analyse des schémas de connexion récents..." },
        { progress: 45, message: "Scan de Bumble, Hinge et d'autres plateformes..." },
        { progress: 60, message: "Détection d'activité de localisation suspecte..." },
        { progress: 75, message: "Compilation des preuves confidentielles..." },
        { progress: 90, message: "Presque terminé - finalisation de votre rapport..." },
        { progress: 100, message: "Enquête terminée avec succès !" },
      ]

      const interval = setInterval(() => {
        setVerificationProgress((prev) => {
          const newProgress = prev + Math.random() * 8 + 2
          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 25)
          if (currentMessage) {
            setVerificationMessage(currentMessage.message)
          }
          if (newProgress >= 100) {
            setTimeout(() => setCurrentStep("preliminary"), 1000)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  useEffect(() => {
    if (currentStep === "generating") {
      const baseMessages = [
        { progress: 0, message: "Analyse des photos de profil..." },
        { progress: 20, message: "Traitement de l'historique des messages..." },
        { progress: 40, message: "Vérification des derniers lieux d'accès..." },
        { progress: 60, message: "Compilation des données d'activité..." },
        { progress: 80, message: "Chiffrement des informations sensibles..." },
        { progress: 95, message: "Finalisation du rapport complet..." },
        { progress: 100, message: "Rapport généré avec succès !" },
      ]

      const messages = city
        ? [
            ...baseMessages.slice(0, 2),
            { progress: 30, message: `Analyse des activités récentes dans la région de ${city}...` },
            ...baseMessages.slice(2),
          ]
        : baseMessages

      const interval = setInterval(() => {
        setGeneratingProgress((prev) => {
          const newProgress = prev + 100 / 75
          if (newProgress >= 33 && !stepCompleted.profilePhotos) {
            setStepCompleted((prev) => ({ ...prev, profilePhotos: true }))
          }
          if (newProgress >= 66 && !stepCompleted.conversations) {
            setStepCompleted((prev) => ({ ...prev, conversations: true }))
          }
          if (newProgress >= 90 && !stepCompleted.finalizing) {
            setStepCompleted((prev) => ({ ...prev, finalizing: true }))
          }
          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 20)
          if (currentMessage) {
            setGeneratingMessage(currentMessage.message)
          }
          if (newProgress >= 100) {
            setTimeout(() => {
              if (stepCompleted.profilePhotos && stepCompleted.conversations && stepCompleted.finalizing) {
                setCurrentStep("result")
              }
            }, 1500)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep, city, stepCompleted])

  useEffect(() => {
    if (currentStep === "generating" || currentStep === "result" || currentStep === "offer") {
      const showProof = () => {
        if (Math.random() < 0.7) {
          setShowSalesProof(true)
          setTimeout(() => setShowSalesProof(false), 6000)
        }
      }
      const initialTimeout = setTimeout(showProof, 5000)
      const interval = setInterval(showProof, 25000)
      return () => {
        clearTimeout(initialTimeout)
        clearInterval(interval)
      }
    }
  }, [currentStep])

  const fetchWhatsAppPhoto = async (phone: string) => {
    if (phone.length < 10) return
    setIsLoadingPhoto(true)
    setPhotoError("")
    try {
      // Simulating API call
      setTimeout(() => {
        if (Math.random() > 0.3) { // 70% success rate
          setProfilePhoto("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80")
          setIsPhotoPrivate(false)
        } else {
          setProfilePhoto("https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=")
          setIsPhotoPrivate(true)
        }
        setIsLoadingPhoto(false)
      }, 1500)
    } catch (error) {
      console.error("Erreur lors de la récupération de la photo:", error)
      setProfilePhoto(
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      )
      setIsPhotoPrivate(true)
      setPhotoError("Erreur lors du chargement de la photo")
      setIsLoadingPhoto(false)
    }
  }

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value)
    const cleanPhone = value.replace(/[^0-9]/g, "")
    if (cleanPhone.length >= 10) {
      fetchWhatsAppPhoto(cleanPhone)
    } else {
      setProfilePhoto(null)
      setIsPhotoPrivate(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".country-dropdown")
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setShowCountryDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const blockedImages = [
    "https://i.ibb.co/PZmmjcxb/CHAT1.png",
    "https://i.ibb.co/20581vtC/CHAT2.png",
    "https://i.ibb.co/LzFZdXXH/CHAT3.png",
    "https://i.ibb.co/kvWFRct/CHAT4.png",
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % blockedImages.length)
  }, [blockedImages.length])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blockedImages.length) % blockedImages.length)
  }

  useEffect(() => {
    if (currentStep === "result") {
      const interval = setInterval(nextSlide, 4000)
      return () => clearInterval(interval)
    }
  }, [currentStep, nextSlide])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedPhoto(e.target?.result as string)
        setProfilePhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  
  const generateFakeProfiles = useCallback(() => {
    const profiles: any[] = []
    const usedNames = new Set()
    const usedImages = new Set()

    const getUniqueItem = (sourceArray: string[], usedSet: Set<string>) => {
        if (!sourceArray || sourceArray.length === 0) return "/placeholder.svg";
        let availableItems = sourceArray.filter(item => !usedSet.has(item));
        if (availableItems.length === 0) {
            usedSet.clear(); // Reset if all items have been used
            availableItems = sourceArray;
        }
        const selectedItem = availableItems[Math.floor(Math.random() * availableItems.length)];
        usedSet.add(selectedItem);
        return selectedItem;
    }
    
    const matchLocation = city || ["Paris", "Marseille", "Lyon", "Nice"][Math.floor(Math.random() * 4)];

    const sampleBios = [
        "Aventurier dans l'âme, amateur de café et passionné de chiens. Cherche quelqu'un pour explorer la ville !",
        "Passionné de fitness le jour, expert Netflix la nuit. On prend un smoothie et on refait le monde ?",
        "Artiste, rêveur et philosophe à temps partiel. Je crois aux bonnes ondes et aux super conversations.",
        "Mi-comédien, mi-patate de canapé. J'apporte les blagues, tu apportes les snacks, ça marche ?",
        "Explorateur de nouveaux lieux et de vieilles pizzerias. Trouvons la meilleure part de la ville.",
        "Accro à la salle le matin, fan de tacos le soir. Tu veux te joindre à moi pour l'un ou l'autre ?",
        "Rêveur avec une playlist pour chaque humeur. Partage ta chanson préférée et voyons si ça matche.",
    ];
    
    const personalityTags = [
        ["Capricorne", "INTJ", "Chat"], ["Lion", "ENFP", "Chien"], ["Vierge", "ISFJ", "Café"], ["Gémeaux", "ENTP", "Voyage"],
        ["Bélier", "ESTP", "Aventure"], ["Taureau", "INFJ", "Livres"], ["Scorpion", "INTP", "Musique"], ["Balance", "ESFJ", "Art"],
    ];
    
    const interestTags = [
        ["Cuisine", "Café", "Voyages", "Tatouages"], ["Yoga", "Écologie", "Photographie", "Cuisine"],
        ["Fitness", "Méditation", "Livres", "Vin"], ["Voyage", "Musique", "Cinéma", "Randonnée"],
        ["Art", "Séries TV", "Concerts", "Aventure"],
    ];
    
    const orientations = ["Hétéro", "Bisexuel(le)", "Pansexuel(le)", "Queer"];

    for (let i = 0; i < 3; i++) {
        let profileGender: 'masculino' | 'feminino';
        let profileAgeRange: keyof typeof maleNames;

        if (selectedGender === "nao-binario") {
            profileGender = Math.random() < 0.5 ? "masculino" : "feminino";
            const ageRanges: (keyof typeof maleNames)[] = ["18-24", "25-34", "35-44", "45-54"];
            profileAgeRange = ageRanges[Math.floor(Math.random() * ageRanges.length)];
        } else {
            profileGender = selectedGender === "masculino" ? "feminino" : "masculino";
            profileAgeRange = ageRange as keyof typeof maleNames;
        }

        let names: string[];
        let photoArray: string[];

        if (profileGender === 'masculino') {
            names = maleNames[profileAgeRange] || [];
            switch (profileAgeRange) {
                case "18-24": photoArray = malePhotos1824; break;
                case "25-34": photoArray = malePhotos2534; break;
                case "35-44": photoArray = malePhotos3544; break;
                case "45-54": photoArray = malePhotos4554; break;
                default: photoArray = malePhotos2534;
            }
        } else {
            names = femaleNames[profileAgeRange] || [];
            switch (profileAgeRange) {
                case "18-24": photoArray = femalePhotos1824; break;
                case "25-34": photoArray = femalePhotos2534; break;
                case "35-44": photoArray = femalePhotos3544; break;
                case "45-54": photoArray = femalePhotos4554; break;
                default: photoArray = femalePhotos2534;
            }
        }
      
        const name = getUniqueItem(names, usedNames);
        const profileImage = getUniqueItem(photoArray, usedImages);
        const [minAgeStr, maxAgeStr] = profileAgeRange.split('-');
        const minAge = parseInt(minAgeStr);
        const maxAge = parseInt(maxAgeStr);
        const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;

        profiles.push({
            name,
            age,
            lastSeen: `il y a ${Math.floor(Math.random() * 24)}h`,
            description: "Utilisateur actif, fréquemment en ligne",
            image: profileImage,
            bio: sampleBios[Math.floor(Math.random() * sampleBios.length)],
            location: `Habite à ${matchLocation}`,
            distance: `à ${Math.floor(Math.random() * 15) + 1} km`,
            orientation: orientations[Math.floor(Math.random() * orientations.length)],
            personality: personalityTags[Math.floor(Math.random() * personalityTags.length)],
            interests: interestTags[Math.floor(Math.random() * interestTags.length)],
            verified: Math.random() > 0.5,
        });
    }

    setGeneratedProfiles(profiles);
  }, [selectedGender, ageRange, city]);


  const openProfileModal = (profile: any) => {
    setSelectedProfile(profile)
    setIsProfileModalOpen(true)
  }

  const closeProfileModal = () => {
    setIsProfileModalOpen(false)
    setSelectedProfile(null)
  }

  useEffect(() => {
    if (currentStep === "result") {
      generateFakeProfiles()
    }
  }, [currentStep, generateFakeProfiles])

  const canVerify =
    phoneNumber.length >= 10 &&
    selectedGender &&
    profilePhoto &&
    lastTinderUse &&
    cityChange &&
    ageRange &&
    userEmail.includes("@")

  const handleSubmitForm = async () => {
    if (!canVerify) return

    setIsSubmittingEmail(true)
    try {
      // Endpoint de webhook simulé
      console.log("Envoi des données:", {
        tag: "tinder check fr - utilisateur créé",
        evento: "Utilisateur Créé",
        email: userEmail,
        phone: phoneNumber,
      });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un délai réseau
    } catch (error) {
      console.error("Erreur lors de la soumission de l'email:", error)
    } finally {
      setIsSubmittingEmail(false)
      setCurrentStep("verification")
    }
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {currentStep !== "landing" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="stepper-container overflow-x-auto px-3 py-3">
            <div className="flex items-center gap-2 min-w-max">
              {getProgressSteps().map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="stepper-step flex items-center gap-2 min-w-[80px] sm:min-w-[100px]">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                        step.completed
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.completed ? "✓" : index + 1}
                    </div>
                    <span
                      className={`font-medium transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap ${
                        step.completed ? "text-green-600" : "text-gray-500"
                      }`}
                    >
                      <span className="block sm:hidden">{step.mobileLabel}</span>
                      <span className="hidden sm:block">{step.fullLabel}</span>
                    </span>
                  </div>
                  {index < getProgressSteps().length - 1 && (
                    <div className="w-6 sm:w-8 h-px bg-gray-300 mx-2 sm:mx-3 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showSalesProof && (currentStep === "generating" || currentStep === "result" || currentStep === "offer") && (
          <SalesProofPopup show={showSalesProof} onClose={() => setShowSalesProof(false)} />
        )}
      </AnimatePresence>

      <div className={currentStep !== "landing" ? "pt-16 sm:pt-20" : ""}>
        <AnimatePresence mode="wait">
          {currentStep === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 sm:opacity-20">
                {matrixCodes.map((code, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-green-400 text-xs font-mono"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                  >
                    {code}
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
                <div className="text-center mb-12 sm:mb-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#FF0066] to-[#FF3333] rounded-2xl mb-6 sm:mb-8 shadow-2xl"
                  >
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 px-2 leading-tight"
                  >
                    Cette intuition ne vous quitte pas...
                    <br />
                    <span className="text-[#FF3B30] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold">
                      Et vous avez raison de lui faire confiance
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#CCCCCC] mb-6 text-base sm:text-lg md:text-xl px-4 max-w-3xl mx-auto font-medium"
                  >
                    Arrêtez de perdre le sommeil en vous demandant s'ils continuent de swiper. Obtenez les réponses dont vous avez besoin - de manière totalement anonyme.
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center gap-2 bg-green-600/20 text-green-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm mt-4 border border-green-500/30"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">Système de Détection Avancé - Mis à jour en Juin 2025</span>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">✅ Voyez leur dernière connexion (même quand ils disent en avoir 'fini' avec les applis)</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">✅ Découvrez d'où ils swipent réellement</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">✅ Accédez aux conversations qu'ils ne veulent pas que vous voyiez</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">✅ Votre enquête reste entièrement privée</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-center mb-12 sm:mb-16 px-4"
                >
                  <Button
                    onClick={() => setCurrentStep("form")}
                    className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 px-6 sm:px-8 text-sm sm:text-base md:text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 w-full max-w-md mx-auto flex items-center justify-center text-center overflow-hidden"
                  >
                    <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                      🔍 OBTENEZ LA VÉRITÉ – LANCEZ LA RECHERCHE ANONYME
                    </span>
                  </Button>
                  <p className="text-sm text-gray-300 mt-4 font-medium">Enquête 100% anonyme. Ils ne sauront jamais que vous avez vérifié.</p>
                </motion.div>
              </div>

              <div className="bg-white py-12 sm:py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#333333] mb-4">Vous n'êtes pas paranoïaque -</h2>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] to-[#FF3333] mb-6">Vous vous protégez</h3>
                    <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                      Arrêtez de douter de votre instinct. Obtenez la clarté nécessaire pour prendre des décisions éclairées sur votre relation.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">ACTIVITÉ RÉCENTE</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Voyez quand ils ont utilisé les applis de rencontre pour la dernière fois</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">LOCALISATION EXACTE</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Où ils ont swipé</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">PHOTOS CACHÉES</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Les photos qu'ils ne veulent pas que vous voyiez</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">CONVERSATIONS PRIVÉES</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Ce qu'ils disent vraiment aux autres</p>
                    </div>
                  </div>

                  <div className="text-center mb-8 sm:mb-12">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#333333] mb-6 sm:mb-8 px-2">
                      Vous n'êtes pas seul(e) - Voyez ce que d'autres ont découvert
                    </h3>
                    <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 mb-6 sm:mb-8">
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                          alt="Photo de Sarah L."
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Sarah L., 32</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Utilisatrice Vérifiée</p>
                          </div>
                          <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal italic">
                            "Je savais que quelque chose n'allait pas. Le rapport a confirmé mes pires craintes, mais au moins maintenant, je peux prendre une décision éclairée au lieu de vivre dans une anxiété constante."
                          </p>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1 mt-2">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0"
                          alt="Photo de Jennifer M."
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Jennifer M., 28</p>
                            <p className="text-xs sm:text-sm text-blue-600 font-medium">Enquête terminée Juin 2025</p>
                          </div>
                          <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal italic">
                            "Les meilleurs 17€ que j'ai jamais dépensés. Ça m'a épargné des mois de doutes et m'a apporté la paix d'esprit dont j'avais besoin. Mon instinct avait raison depuis le début."
                          </p>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1 mt-2">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => setCurrentStep("form")}
                      className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full max-w-sm mx-auto flex items-center justify-center text-center overflow-hidden"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔍 COMMENCER MON ENQUÊTE ANONYME
                      </span>
                    </Button>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-2 font-medium">
                      <Shield className="w-4 h-4" />
                      100% anonyme - Votre enquête reste entièrement privée
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* --- SECTION FORMULAIRE CORRIGÉE --- */}
          {currentStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-[#6C63FF] relative overflow-hidden"
            >
              {/* Floating dots */}
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                  />
                ))}
              </div>

              <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-lg">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl">
                      <Wifi className="w-8 h-8 sm:w-10 sm:h-10 text-[#6C63FF]" />
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                      🔍 Aidez-nous à trouver ce qu'ils cachent
                    </h1>
                    <p className="text-gray-200 text-sm sm:text-base px-4 leading-relaxed">
                      Plus vous fournissez de détails, plus notre enquête sera précise. Tout reste 100% anonyme.
                    </p>
                  </div>

                  <Card className="bg-white rounded-2xl shadow-lg border-0">
                    <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">
                          1. Téléchargez leur photo pour la reconnaissance faciale
                        </label>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          {uploadedPhoto ? (
                            <div className="relative inline-block">
                              <img src={uploadedPhoto} alt="Téléchargé" className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-blue-500 shadow-lg" />
                              <button onClick={() => {setUploadedPhoto(null); setProfilePhoto(null);}} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">×</button>
                            </div>
                          ) : (
                            <div className="w-full h-28 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mx-auto cursor-pointer hover:border-blue-500 transition-colors relative">
                              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                              <div className="text-center text-gray-500">
                                <Camera className="w-8 h-8 mx-auto" />
                                <span className="text-sm mt-1 block">Cliquez pour choisir un fichier</span>
                              </div>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-3 font-medium">Nous scannons toutes les plateformes de rencontre pour trouver les profils correspondants.</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">2. Leur numéro de téléphone (WhatsApp)</label>
                        <div className="flex gap-2 sm:gap-3">
                          <div className="relative country-dropdown">
                            <button type="button" onClick={() => setShowCountryDropdown(!showCountryDropdown)} className="bg-gray-100 px-3 sm:px-4 h-full rounded-xl border text-gray-600 flex-shrink-0 font-medium text-sm sm:text-base flex items-center gap-2 hover:bg-gray-200 transition-colors duration-200">
                              <span className="text-lg">{selectedCountry.flag}</span>
                              <span>{selectedCountry.code}</span>
                            </button>
                            {showCountryDropdown && (
                              <div className="absolute top-full left-0 mt-1 bg-white border rounded-xl shadow-lg z-50 w-80 max-h-60 overflow-y-auto">
                                <div className="p-2 sticky top-0 bg-white"><input type="text" placeholder="Rechercher..." value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                                {filteredCountries.map((country) => (
                                  <button key={country.name + country.code} type="button" onClick={() => { setSelectedCountry(country); setShowCountryDropdown(false); setCountrySearch(""); }} className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                                    <span className="text-lg">{country.flag}</span>
                                    <span className="font-medium">{country.code}</span>
                                    <span className="text-gray-600">{country.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <Input type="tel" placeholder={selectedCountry.placeholder} value={phoneNumber} onChange={(e) => handlePhoneChange(e.target.value)} className="flex-1 py-3 px-4 text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 font-medium">Aide à suivre l'activité de l'appareil et à la croiser avec les applis de rencontre.</p>
                        {(profilePhoto || isLoadingPhoto) && (
                          <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3 sm:gap-4">
                              {isLoadingPhoto ? <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-xl animate-pulse" /> : <img src={profilePhoto || ''} alt="Profil WhatsApp" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border-2 border-gray-200" />}
                              <div className="flex-1">
                                <p className="font-semibold text-gray-800 text-sm sm:text-base">Profil WhatsApp Trouvé</p>
                                <p className="text-xs sm:text-sm text-gray-600">{isPhotoPrivate ? "Photo privée détectée" : "Photo de profil chargée"}</p>
                              </div>
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">3. Quel est leur genre ?</label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {[{ value: "masculino", label: "Homme", icon: "👨" }, { value: "feminino", label: "Femme", icon: "👩" }, { value: "nao-binario", label: "Non-binaire", icon: "🧑" }].map((option) => (
                            <button key={option.value} type="button" onClick={() => setSelectedGender(option.value)} className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${selectedGender === option.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}>
                              <div className="text-lg sm:text-xl mb-1 sm:mb-2">{option.icon}</div>
                              <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">4. Quelle est leur tranche d'âge ?</label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          {[{ value: "18-24", label: "18-24 ans" }, { value: "25-34", label: "25-34 ans" }, { value: "35-44", label: "35-44 ans" }, { value: "45-54", label: "45+ ans" }].map((option) => (
                            <button key={option.value} type="button" onClick={() => setAgeRange(option.value)} className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${ageRange === option.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}>
                              <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">5. Quand avez-vous commencé à avoir des soupçons ?</label>
                        <div className="space-y-2 sm:space-y-3">
                          {[{ value: "week", label: "Cette semaine", desc: "(changements de comportement récents)" }, { value: "month", label: "Ce mois-ci", desc: "(distance, cache son téléphone)" }, { value: "longer", label: "Il y a plus d'un mois", desc: "(mauvais pressentiment persistant)" }].map((option) => (
                            <button key={option.value} type="button" onClick={() => setLastTinderUse(option.value)} className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${lastTinderUse === option.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}>
                              <div className="font-medium text-sm sm:text-base">{option.label}</div>
                              {option.desc && <div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">6. Ont-ils "travaillé tard" ou voyagé récemment ?</label>
                        <div className="space-y-2 sm:space-y-3">
                          {[{ value: "yes", label: "Oui", desc: '"Nouvelles exigences pro" ou voyages inexpliqués' }, { value: "no", label: "Non", desc: "Le changement de comportement a eu lieu à la maison" }, { value: "unknown", label: "Je ne sais pas", desc: "Secret sur son emploi du temps" }].map((option) => (
                            <button key={option.value} type="button" onClick={() => setCityChange(option.value)} className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${cityChange === option.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}>
                              <div className="font-medium text-sm sm:text-base">{option.label}</div>
                              <div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2 sm:mb-3">7. Votre adresse e-mail</label>
                        <Input type="email" placeholder="votre.email@exemple.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="py-3 px-4 text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                        <p className="text-xs text-gray-500 mt-2 font-medium">Nous enverrons le rapport complet à cet email. 100% confidentiel.</p>
                      </div>
                      
                      <Button onClick={handleSubmitForm} disabled={!canVerify || isSubmittingEmail} className={`w-full py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold rounded-xl transition-all duration-300 overflow-hidden ${canVerify && !isSubmittingEmail ? "bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white shadow-lg hover:shadow-xl transform hover:scale-105" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                        <span className="block text-center leading-tight px-2">{isSubmittingEmail ? "Traitement..." : "🔍 COMMENCER L'ENQUÊTE - DÉCOUVREZ LA VÉRITÉ"}</span>
                      </Button>
                      
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                          <Lock className="w-4 h-4" /> Vos données sont chiffrées et supprimées après 24 heures.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === "verification" && (
             <motion.div
             key="verification"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8"
           >
             <div className="w-full max-w-md">
               <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                 <CardContent className="p-6 sm:p-8 text-center">
                   <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                     <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                   </div>
                   <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                     🔍 Analyse de toutes les plateformes...
                   </h2>
                   <div className="mb-6 sm:mb-8">
                     <Progress value={verificationProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                     <p className="text-sm sm:text-base text-gray-600 font-medium h-5">{verificationMessage}</p>
                   </div>
                   <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-left">
                       <div className="flex items-center gap-3 sm:gap-4 p-3 bg-gray-50 rounded-xl">
                           <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                           <span className="text-xs sm:text-sm text-gray-700 font-medium">Analyse de Tinder, Bumble, Hinge...</span>
                       </div>
                       <div className="flex items-center gap-3 sm:gap-4 p-3 bg-gray-50 rounded-xl">
                           <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
                           <span className="text-xs sm:text-sm text-gray-700 font-medium">Traitement par reconnaissance faciale...</span>
                       </div>
                       <div className="flex items-center gap-3 sm:gap-4 p-3 bg-gray-50 rounded-xl">
                           <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse" />
                           <span className="text-xs sm:text-sm text-gray-700 font-medium">Analyse des données de localisation...</span>
                       </div>
                   </div>
                   <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                     <Lock className="w-4 h-4" /> Connexion sécurisée et chiffrée.
                   </p>
                 </CardContent>
               </Card>
             </div>
           </motion.div>
          )}

          {currentStep === "preliminary" && (
            <motion.div
            key="preliminary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8"
          >
            <div className="w-full max-w-lg">
              <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg animate-pulse">
                      <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                      Nous avons trouvé ce que vous cherchiez...
                    </h2>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
                      <h3 className="text-lg sm:text-xl font-bold text-red-700">PROFILS DE RENCONTRE ACTIFS DÉTECTÉS</h3>
                    </div>
                    <p className="text-sm sm:text-base text-red-600 font-medium leading-relaxed">
                      Notre système a découvert plusieurs profils actifs liés à cette personne sur 3 plateformes de rencontre différentes.
                    </p>
                  </div>
                  <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                    <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">Dernière activité : il y a 18 heures</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Même s'ils prétendent avoir "tout supprimé"...</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">3 applications de rencontre actives</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Tinder, Bumble, et une plateforme premium.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1 sm:mb-2">Conversations récentes détectées</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Messagerie active avec plusieurs matchs cette semaine.</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setCurrentStep("generating")}
                    className="w-full bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden flex items-center justify-center text-center"
                  >
                    <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                      🔓 DÉBLOQUER LES PREUVES COMPLÈTES – TOUT VOIR
                    </span>
                  </Button>
                  <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                    <Lock className="w-4 h-4" /> Anonymat complet garanti.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
          )}

          {currentStep === "generating" && (
            <motion.div
            key="generating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8"
          >
            <div className="w-full max-w-md">
              <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                    📊 Génération du rapport complet...
                  </h2>
                  <div className="mb-6 sm:mb-8">
                    <Progress value={generatingProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                    <p className="text-sm sm:text-base text-gray-600 font-medium h-5">{generatingMessage}</p>
                  </div>
                  <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-left">
                    <div className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl transition-colors ${stepCompleted.profilePhotos ? "bg-green-50" : "bg-blue-50"}`}>
                      {stepCompleted.profilePhotos ? <CheckCircle className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
                      <span className="text-xs sm:text-sm text-gray-700 font-medium">Photos de profil analysées</span>
                    </div>
                    <div className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl transition-colors ${stepCompleted.conversations ? "bg-green-50" : (stepCompleted.profilePhotos ? "bg-blue-50" : "bg-gray-100")}`}>
                      {stepCompleted.conversations ? <CheckCircle className="w-5 h-5 text-green-500" /> : (stepCompleted.profilePhotos ? <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /> : <div className="w-5 h-5 bg-gray-300 rounded-full" />)}
                      <span className={`text-xs sm:text-sm font-medium ${stepCompleted.profilePhotos ? "text-gray-700" : "text-gray-500"}`}>Traitement des conversations...</span>
                    </div>
                    <div className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl transition-colors ${stepCompleted.finalizing ? "bg-green-50" : (stepCompleted.conversations ? "bg-blue-50" : "bg-gray-100")}`}>
                      {stepCompleted.finalizing ? <CheckCircle className="w-5 h-5 text-green-500" /> : (stepCompleted.conversations ? <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /> : <div className="w-5 h-5 bg-gray-300 rounded-full" />)}
                      <span className={`text-xs sm:text-sm font-medium ${stepCompleted.conversations ? "text-gray-700" : "text-gray-500"}`}>Finalisation du rapport...</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                    <Lock className="w-4 h-4" /> Chiffrement des données sensibles pour votre confidentialité.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
          )}

          {currentStep === "result" && (
            <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-100 px-4 py-6 sm:py-8"
            >
            <div className="container mx-auto max-w-4xl">
                {(profilePhoto || uploadedPhoto) && (
                <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="relative">
                    <img
                        src={uploadedPhoto || profilePhoto || ""}
                        alt="Profil"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    {isPhotoPrivate && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                    )}
                    </div>
                </div>
                )}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                    <div>
                        <h3 className="font-bold text-sm sm:text-base">🚨 PROFIL TROUVÉ - ILS SONT ACTIFS SUR TINDER</h3>
                        <p className="text-xs sm:text-sm opacity-90">Dernière connexion : En ligne maintenant</p>
                    </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <div className="flex items-center gap-2 sm:gap-3">
                    <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
                    <div>
                        <h3 className="font-bold text-sm sm:text-base">⚠️ ATTENTION : PROFIL ACTIF TROUVÉ !</h3>
                        <p className="text-xs sm:text-sm opacity-90">
                        Nous confirmons que ce numéro est lié à un profil Tinder ACTIF. Activité détectée à {city || "votre région"}.
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-red-500 mb-1">6</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">MATCHS (7 JOURS)</div>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500 mb-1">30</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">LIKES (7 JOURS)</div>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-500 mb-1">4</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">CHATS ACTIFS</div>
                </div>
                <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg">
                    <div className="text-xl sm:text-2xl font-bold text-green-500 mb-1">18h</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">DERNIÈRE ACTIVITÉ</div>
                </div>
                </div>
                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">🔥 MATCHS RÉCENTS TROUVÉS</h3>
                    <p className="text-sm text-gray-600 mb-4">Cliquez sur un match pour plus d'informations.</p>
                    <div className="space-y-4">
                    {generatedProfiles.map((profile, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => openProfileModal(profile)}>
                        <div className="relative">
                            <img src={profile.image} alt={profile.name} className="w-12 h-12 rounded-full object-cover" />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">{profile.name}, {profile.age}</h4>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <p className="text-sm text-gray-600">Dernière connexion : {profile.lastSeen}</p>
                            <p className="text-sm text-green-600">{profile.description}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                </CardContent>
                </Card>
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mb-4 sm:mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                        🔓 DÉBLOQUER LE RAPPORT COMPLET
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                        Obtenez un accès instantané au rapport complet avec photos non censurées et historique complet des conversations.
                    </p>
                    </div>
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-xl shadow-lg mb-4 sm:mb-6">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
                        <span className="font-bold text-lg sm:text-xl">LE RAPPORT SERA SUPPRIMÉ DANS :</span>
                    </div>
                    <div className="text-center mb-3">
                        <div className="text-3xl sm:text-4xl font-bold mb-2">{formatTime(timeLeft)}</div>
                    </div>
                    <p className="text-sm sm:text-base text-center leading-relaxed opacity-90">
                        Après expiration, ce rapport sera définitivement supprimé pour des raisons de confidentialité. Cette offre est unique.
                    </p>
                    </div>
                    <Button onClick={() => (window.location.href = "https://pay.mundpay.com/0198e6dd-3163-7105-86fe-753d6c937c57?ref=")} className="w-full bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden">
                        <span className="block text-center leading-tight px-2">🔓 DÉBLOQUER MON RAPPORT - 17,00€</span>
                    </Button>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <p className="text-sm sm:text-base text-blue-700 font-medium leading-relaxed">
                        Vous ne violez pas leur vie privée, vous protégez votre bien-être émotionnel. Vous avez le droit de prendre des décisions éclairées.
                    </p>
                    </div>
                </CardContent>
                </Card>
                {isProfileModalOpen && selectedProfile && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
                    <button onClick={closeProfileModal} className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
                        <X className="w-5 h-5 text-gray-700" />
                    </button>
                    <div className="relative h-96 bg-gray-200 rounded-t-2xl overflow-hidden">
                        <img src={selectedProfile.image} alt={selectedProfile.name} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-2 mb-1">
                            <h2 className="text-3xl font-bold">{selectedProfile.name}</h2>
                            {selectedProfile.verified && (
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center" title="Vérifié">
                                <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-sm opacity-90">
                            <div className="flex items-center gap-1"><User className="w-4 h-4" /><span>{selectedProfile.orientation}</span></div>
                            <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /><span>{selectedProfile.distance}</span></div>
                        </div>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">À propos de moi</h3>
                        <p className="text-gray-700 leading-relaxed">{selectedProfile.bio}</p>
                        </div>
                        {selectedProfile.personality && (
                        <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Ma personnalité</h3>
                            <div className="flex flex-wrap gap-2">
                            {selectedProfile.personality.map((tag: string, index: number) => (
                                <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-300">{tag}</span>
                            ))}
                            </div>
                        </div>
                        )}
                        {selectedProfile.interests && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Mes centres d'intérêt</h3>
                            <div className="flex flex-wrap gap-2">
                            {selectedProfile.interests.map((interest: string, index: number) => (
                                <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-300">{interest}</span>
                            ))}
                            </div>
                        </div>
                        )}
                    </div>
                    </motion.div>
                </div>
                )}
            </div>
            </motion.div>
          )}
          
          {currentStep === "offer" && (
            <motion.div
              key="offer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gray-100 px-4 py-6 sm:py-8"
            >
              <div className="container mx-auto max-w-2xl">
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
                        Vous méritez de connaître toute la vérité
                      </h1>
                      <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                        Arrêtez de douter. Arrêtez de perdre le sommeil. Obtenez chaque détail - en toute confidentialité.
                      </p>
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-red-700 font-semibold leading-relaxed">
                          Votre instinct avait raison. Voyez maintenant exactement ce qu'ils ont caché tout en vous regardant dans les yeux.
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8">
                      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="text-2xl sm:text-3xl text-gray-400 line-through">47,00€</div>
                        <div className="text-4xl sm:text-5xl font-bold text-[#FF0066]">17,00€</div>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold mb-4">
                        🔥 64% DE RÉDUCTION - OFFRE LIMITÉE
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 font-medium">
                        Paiement unique pour un accès à vie à votre rapport complet.
                      </p>
                    </div>

                    <div className="text-left mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                        Ce que vous allez débloquer :
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium">
                            Chaque photo de profil (y compris celles que vous n'avez jamais vues).
                          </span>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium">
                            L'historique complet des conversations (voyez exactement ce qu'ils disent aux autres).
                          </span>
                        </div>
                         <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium">
                            La localisation exacte de leurs dernières activités de swipe.
                          </span>
                        </div>
                         <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium">
                            La chronologie complète de leur activité sur les applications.
                          </span>
                        </div>
                      </div>
                    </div>
                     <Button onClick={() => (window.location.href = "https://pay.mundpay.com/0198e6dd-3163-7105-86fe-753d6c937c57?ref=")} className="w-full bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden">
                        <span className="block text-center leading-tight px-2">JE SUIS PRÊT(E) POUR LA VÉRITÉ - PAYER 17,00€</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
