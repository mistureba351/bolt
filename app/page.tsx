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

// Messages de preuve de vente mis à jour sans villes/états spécifiques
const SalesProofPopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState("")

  const salesMessages = [
    "✅ Camille a déverrouillé un rapport il y a 12 minutes",
    "✅ Léa a récemment consulté l'historique des conversations",
    "✅ Chloé vient d'accéder à des photos confidentielles",
    "✅ Manon a terminé une analyse complète à l'instant",
    "✅ Emma a accédé au rapport confidentiel il y a quelques instants",
    "✅ Inès a effectué une vérification complète à l'instant",
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

// Tableaux organisés par genre et tranche d'âge
const malePhotos1824 = [
  "https://blobs.vusercontent.net/blob/male-25-34-male-andyreiddvip.jpg-JfW3WQX7spc75NBSfoH1ink8qFF9bg.jpeg", // male-25-34-male-andyreiddvip.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-franchescox.jpg-SSxdBZNDEbogmHbY6WPnSteKDSLnOy.jpeg", // male-25-34-male-franchescox.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-augst_ts.jpg-nu4ttxScgp63AQU9M9uUAQw6ujbhmq.jpeg", // male-25-34-male-augst_ts.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-nanoargentino.jpg-MupFxTgua62ieJ17as9NXcynMYNbgN.jpeg", // male-25-34-male-nanoargentino.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-shyguyishere.jpg-94TD8ArDNT2ZBDw0N2M0G9hJah6UKk.jpeg", // male-25-34-male-shyguyishere.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-carterlander08.jpg-yVyzRYbS0aGVhbvEX0Mjss5h51nySK.jpeg", // male-25-34-male-carterlander08.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-matthewteddy.jpg-gGny9NX0j88eVzP1iJqKZPEVWZ0Ogs.jpeg", // male-25-34-male-matthewteddy.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-tomidiazj.jpg-uuVCkrFp6AHIQkyUkoUnQ4seoDKeL7.jpeg", // male-25-34-male-tomidiazj.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-latinblondarg.jpg-erLXKeyVnCQFjS4QaZLFLFhu1I0yro.jpeg", // male-25-34-male-latinblondarg.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-bushidoboy.jpg-Ye68jGO1s2usgp6AabdJo4bGpnxCTl.jpeg", // male-25-34-male-bushidoboy.jpg
]

const malePhotos2534 = [
  "https://blobs.vusercontent.net/blob/male-25-34-male-andyreiddvip.jpg-JfW3WQX7spc75NBSfoH1ink8qFF9bg.jpeg", // male-25-34-male-andyreiddvip.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-franchescox.jpg-SSxdBZNDEbogmHbY6WPnSteKDSLnOy.jpeg", // male-25-34-male-franchescox.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-augst_ts.jpg-nu4ttxScgp63AQU9M9uUAQw6ujbhmq.jpeg", // male-25-34-male-augst_ts.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-nanoargentino.jpg-MupFxTgua62ieJ17as9NXcynMYNbgN.jpeg", // male-25-34-male-nanoargentino.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-shyguyishere.jpg-94TD8ArDNT2ZBDw0N2M0G9hJah6UKk.jpeg", // male-25-34-male-shyguyishere.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-carterlander08.jpg-yVyzRYbS0aGVhbvEX0Mjss5h51nySK.jpeg", // male-25-34-male-carterlander08.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-matthewteddy.jpg-gGny9NX0j88eVzP1iJqKZPEVWZ0Ogs.jpeg", // male-25-34-male-matthewteddy.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-tomidiazj.jpg-uuVCkrFp6AHIQkyUkoUnQ4seoDKeL7.jpeg", // male-25-34-male-tomidiazj.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-latinblondarg.jpg-erLXKeyVnCQFjS4QaZLFLFhu1I0yro.jpeg", // male-25-34-male-latinblondarg.jpg
  "https://blobs.vusercontent.net/blob/male-25-34-male-bushidoboy.jpg-Ye68jGO1s2usgp6AabdJo4bGpnxCTl.jpeg", // male-25-34-male-bushidoboy.jpg
]

const malePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-morocholatino87.jpg-bam8DFyuAfzBux5zmL9lscgSfnbJ4w.jpeg", // male-35-44-male-morocholatino87.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-ovalo-sex.jpg-TdxtGZRqBJy2V8x9kVfSml7x6QJpjt.jpeg", // male-35-44-male-ovalo-sex.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-josepbgfeet.jpg-f25HHQX8Dso5oQBIE1uCIP3oC3KYrd.jpeg", // male-35-44-male-josepbgfeet.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-thesuitedboss.jpg-3CFJKVgZyyuzeIPk0klRBy6ixqjsHF.jpeg", // male-35-44-male-thesuitedboss.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-nicoink.jpg-0YCHbmDqw9dWCItx4Of9GbWBbpiZOZ.jpeg", // male-35-44-male-nicoink.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-nicoalpalo22.jpg-bPAd1S83ZoBGkoJyaKZ0BSEveTVHG1.jpeg", // male-35-44-male-nicoalpalo22.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-tunacho.jpg-2wHzLphZ2mKamlOeZmIfo1F09LM6pR.jpeg", // male-35-44-male-tunacho.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-thebigitaliansub.jpg-rcFp57YB2XDXYQ1ObWSzBY0QDTVkcI.jpeg", // male-35-44-male-thebigitaliansub.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-puntogof.jpg-9b6bkanYwTL6acvIqT3AC87dvvnXFZ.jpeg", // male-35-44-male-puntogof.jpg
]

const malePhotos4554 = [
  // Espace réservé pour les images 45-54
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/3SJBR44DZ9c6pLRVDTA0Ww/public/male/45-54/male-45-54-hombrelatinoarg.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/2xC10Dbr0Yi98WJdnWWgm4/public/male/45-54/male-45-54-petemastersxxx.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/wKcNRFe1QqreA4CfjbJQ7a/public/male/45-54/male-45-54-scorcherb8.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/0TwfWC666HpVosmkj_QPc_/public/male/45-54/male-45-54-coachtennisdad.jpg",
]

const femalePhotos1824 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-bustanutters.jpg-PfzSPm0cPx7xUL939wZRvkH6X4MnMI.jpeg", // female-18-24-female-ScarletBae.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-megnut.jpg-JDM9fK1I9XwHyJHqn36CZyjwv55ycS.jpeg", // female-18-24-female-born2bscene.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-siswet.jpg-5Ovue3nSIBKAMGL74rU3Ct4qf7bpFN.jpeg", // female-18-24-female-liliafourtwenty.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ThorriandJax.jpg-CZTrwFISinAcSSvxRrAcUWtMDYTaiO.jpeg", // female-18-24-female-louprival.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-juicyjade9.jpg-nOS27Xu6KrOgaCRuu9862Hk73NegAs.jpeg", // female-18-24-female-babygirlmiza.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ruth_lee.jpg-J5flhVFgEjhvJiSFhj0ZuBY3tGwjRI.jpeg", // female-18-24-female-imjuliequeen.jpg
  "https://blobs.vusercontent.net/blob/female-25-34-female-graciebon1.jpg-kfctbLLp6OUl4Kc0OhSYyglGCLl29f.jpeg", // female-18-24-female-izzybunniesvip.jpg
]

const femalePhotos2534 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-bustanutters.jpg-PfzSPm0cPx7xUL939wZRvkH6X4MnMI.jpeg", // female-25-34-female-bustanutters.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-megnut.jpg-JDM9fK1I9XwHyJHqn36CZyjwv55ycS.jpeg", // female-25-34-female-megnut.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-siswet.jpg-5Ovue3nSIBKAMGL74rU3Ct4qf7bpFN.jpeg", // female-25-34-female-siswet.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ThorriandJax.jpg-CZTrwFISinAcSSvxRrAcUWtMDYTaiO.jpeg", // female-25-34-female-ThorriandJax.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-juicyjade9.jpg-nOS27Xu6KrOgaCRuu9862Hk73NegAs.jpeg", // female-25-34-female-juicyjade9.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ruth_lee.jpg-J5flhVFgEjhvJiSFhj0ZuBY3tGwjRI.jpeg", // female-25-34-female-ruth_lee.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-graciebon1.jpg-kfctbLLp6OUl4Kc0OhSYyglGCLl29f.jpeg", // female-25-34-female-graciebon1.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-brujita.roja.jpg-KZxlryBKf0XVbOHRNdGAMBpPQTa82Z.jpeg", // female-25-34-female-brujita.roja.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-toomanypeaches.jpg-6PDRsf3v2Nalrv9eRaku1bX8wh5kOe.jpeg", // female-25-34-female-toomanypeaches.jpg
]

const femalePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-belle_oharaxxx.jpg-Pq9aUAbtUDVI9UrrzZJlkfEC0cxuQv.jpeg", // female-35-44-female-belle_oharaxxx.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-txhotwife84_free.jpg-QV1C6Nj4fbSzTRIyGs7p4kiqtozXCx.jpeg", // female-35-44-female-txhotwife84_free.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-malmalloy.jpg-B7c4Pg36GwUFFIayybP0fiyWqkv51R.jpeg", // female-35-44-female-malmalloy.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-anialisimo.jpg-EcQ66PmaeU25fFT0xV8udt4mMqLwhC.jpeg", // female-35-44-female-anialisimo.jpg
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-syrenjaymes.jpg-N4w0IhzPmQNbX0BqZRFeTvdBdGNn3Y.jpeg", // female-35-44-female-syrenjaymes.jpg
]

const femalePhotos4554 = [
  // Espace réservé pour les images 45-54
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/AEJxds2OT7Gt-B4VLJXv4a/public/female/45-54/female-45-54-annikarose69.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/1BUA6sJloJdt-jvL9MCX_i/public/female/45-54/female-45-54-AvrilShowers.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/ZP3nTnsBf-eH5TZPmJ2Y5l/public/female/45-54/female-45-54-casey_deluxe.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/_JzuRXZpf_Z2oSrQsFwVqy/public/female/45-54/female-45-54-eroticnikki.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/fvveni81HkNN0LrqIB4JXJ/public/female/45-54/female-45-54-goldieblair.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/N2QWnE3U5cy91m0VkVFzLX/public/female/45-54/female-45-54-jemmaluv.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/FJ77Pjm_R4YXKajt4cDFr4/public/female/45-54/female-45-54-lolamaverick.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/0z6995_0sJh478H4DUzkcd/public/female/45-54/female-45-54-MissHawthorn.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/1RCbILUlOe_6Oh3C6E1a9F/public/female/45-54/female-45-54-quiet_winner_76.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/uGH4sQMZaiDPeeyCrYTD2K/public/female/45-54/female-45-54-rileysweetnsexy.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/utg8RGec_BylfuoPKcczJ0/public/female/45-54/female-45-54-rose.curvy.xxx.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/W8GGhX3aDfLrw4OPchlLIa/public/female/45-54/female-45-54-solymx2.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/NpqvlUBeE3bPdFwQAhge5Z/public/female/45-54/female-45-54-stellahere.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/fKgrGvdsa_GC0eLH-l5HTM/public/female/45-54/female-45-54-usapippa.jpg",
]

const maleNames = {
  "18-24": [
    "Léo", "Gabriel", "Raphaël", "Arthur", "Louis", "Maël", "Jules", "Adam",
    "Hugo", "Lucas", "Noah", "Tiago", "Gabin", "Sacha", "Paul", "Valentin",
    "Nathan", "Enzo", "Axel", "Théo", "Tom", "Clément", "Antoine", "Maxime", "Baptiste",
  ],
  "25-34": [
    "Alexandre", "Nicolas", "Julien", "Matthieu", "Romain", "Guillaume", "Thomas", "Pierre",
    "Vincent", "Quentin", "Maxime", "Florian", "Anthony", "Jérémy", "Benoît", "Adrien",
    "Arnaud", "Sébastien", "Aurélien", "Jonathan", "Kevin", "David", "Cédric", "Damien", "Grégoire",
  ],
  "35-44": [
    "Sébastien", "Stéphane", "Christophe", "David", "Frédéric", "Cédric", "Olivier", "Laurent",
    "Jérôme", "Emmanuel", "Fabien", "Guillaume", "Xavier", "Mickaël", "Franck", "Alexandre",
    "Philippe", "Arnaud", "Éric", "Bruno", "Pascal", "Thierry", "Didier", "Hervé", "Patrick",
  ],
  "45-54": [
    "Christophe", "Stéphane", "Olivier", "Philippe", "Laurent", "Thierry", "Éric", "Pascal",
    "Frédéric", "Patrick", "Bruno", "Didier", "Hervé", "Jean-Pierre", "Alain", "Michel",
    "Serge", "Daniel", "Gilles", "Marc", "Jean-Luc", "Dominique", "Christian", "Bernard", "Gérard",
  ],
}

const femaleNames = {
  "18-24": [
    "Jade", "Louise", "Ambre", "Alice", "Rose", "Alba", "Emma", "Lina",
    "Chloé", "Mia", "Léa", "Anna", "Julia", "Juliette", "Inès", "Lou",
    "Agathe", "Léna", "Manon", "Camille", "Eva", "Zoé", "Lucie", "Clara", "Sarah",
  ],
    "25-34": [
    "Manon", "Camille", "Léa", "Chloé", "Emma", "Inès", "Marie", "Laura", "Julie", 
    "Pauline", "Marion", "Charlotte", "Amélie", "Claire", "Audrey", "Elodie", 
    "Sophie", "Céline", "Lucie", "Mathilde", "Morgane", "Justine", "Hélène", "Anne", "Émilie"
  ],
  "35-44": [
    "Sophie", "Céline", "Stéphanie", "Virginie", "Laetitia", "Sandrine", "Aurélie", "Julie", 
    "Anne", "Christelle", "Nathalie", "Isabelle", "Valérie", "Delphine", "Karine", "Sonia", 
    "Audrey", "Hélène", "Sylvie", "Séverine", "Magali", "Coralie", "Géraldine", "Fabienne", "Carole"
  ],
  "45-54": [
    "Nathalie", "Isabelle", "Valérie", "Sylvie", "Catherine", "Christine", "Véronique", "Patricia", 
    "Martine", "Françoise", "Corinne", "Laurence", "Pascale", "Dominique", "Brigitte", "Chantal", 
    "Michèle", "Annie", "Monique", "Jacqueline", "Claudine", "Jocelyne", "Annick", "Muriel", "Fabienne"
  ],
}

export default function SigiloX() {
  const [etapeActuelle, setEtapeActuelle] = useState<AppStep>("landing")
  const [numeroDeTelephone, setNumeroDeTelephone] = useState("")
  const [genreSelectionne, setGenreSelectionne] = useState("")
  const [derniereUtilisationTinder, setDerniereUtilisationTinder] = useState("")
  const [changementDeVille, setChangementDeVille] = useState("")
  const [chargementPhotoEnCours, setChargementPhotoEnCours] = useState(false)
  const [erreurPhoto, setErreurPhoto] = useState("")
  const [photoDeProfil, setPhotoDeProfil] = useState<string | null>(null)
  const [photoEstPrivee, setPhotoEstPrivee] = useState(false)
  const [progressionVerification, setProgressionVerification] = useState(0)
  const [messageDeVerification, setMessageDeVerification] = useState("Démarrage de l'analyse...")
  const [progressionGeneration, setProgressionGeneration] = useState(0)
  const [messageDeGeneration, setMessageDeGeneration] = useState("Analyse des photos de profil...")
  const [etapeTerminee, setEtapeTerminee] = useState({
    photosDeProfil: false,
    conversations: false,
    finalisation: false,
  })
  const [tempsRestant, setTempsRestant] = useState(9 * 60 + 50) // 9:50
  const [afficherPopupVentes, setAfficherPopupVentes] = useState(false)
  const refInputFichier = useRef<HTMLInputElement>(null)
  const [afficherPreuveVentes, setAfficherPreuveVentes] = useState(false)
  const [diapositiveActuelle, setDiapositiveActuelle] = useState(0)
  const [photoTelechargee, setPhotoTelechargee] = useState<string | null>(null)
  const [trancheAge, setTrancheAge] = useState("")
  const [emailUtilisateur, setEmailUtilisateur] = useState("")
  const [envoiEmailEnCours, setEnvoiEmailEnCours] = useState(false)
  const [emailEnvoye, setEmailEnvoye] = useState(false)
  const [profilsGeneres, setProfilsGeneres] = useState<any[]>([])
  const [photoAleatoireSelectionnee, setPhotoAleatoireSelectionnee] = useState<string | null>(null)

  const [profilSelectionne, setProfilSelectionne] = useState<any>(null)
  const [modalProfilOuvert, setModalProfilOuvert] = useState(false)

  const [paysSelectionne, setPaysSelectionne] = useState({
    code: "+33",
    name: "France",
    flag: "🇫🇷",
    placeholder: "6 12 34 56 78",
  })
  const [afficherMenuPays, setAfficherMenuPays] = useState(false)
  const [recherchePays, setRecherchePays] = useState("")

  const countries = [
    { code: "+1", name: "États-Unis", flag: "🇺🇸", placeholder: "(555) 123-4567" },
    { code: "+1", name: "Canada", flag: "🇨🇦", placeholder: "(555) 123-4567" },
    { code: "+44", name: "Royaume-Uni", flag: "🇬🇧", placeholder: "7911 123456" },
    { code: "+33", name: "France", flag: "🇫🇷", placeholder: "6 12 34 56 78" },
    { code: "+49", name: "Allemagne", flag: "🇩🇪", placeholder: "1512 3456789" },
    { code: "+39", name: "Italie", flag: "🇮🇹", placeholder: "312 345 6789" },
    { code: "+34", name: "Espagne", flag: "🇪🇸", placeholder: "612 34 56 78" },
    { code: "+351", name: "Portugal", flag: "🇵🇹", placeholder: "912 345 678" },
    { code: "+52", name: "Mexique", flag: "🇲🇽", placeholder: "55 1234 5678" },
    { code: "+55", name: "Brésil", flag: "🇧🇷", placeholder: "(11) 99999-9999" },
    { code: "+54", name: "Argentine", flag: "🇦🇷", placeholder: "11 1234-5678" },
    { code: "+56", name: "Chili", flag: "🇨🇱", placeholder: "9 1234 5678" },
    { code: "+57", name: "Colombie", flag: "🇨🇴", placeholder: "300 1234567" },
    { code: "+51", name: "Pérou", flag: "🇵🇪", placeholder: "912 345 678" },
    { code: "+58", name: "Venezuela", flag: "🇻🇪", placeholder: "412-1234567" },
    { code: "+593", name: "Équateur", flag: "🇪🇨", placeholder: "99 123 4567" },
    { code: "+595", name: "Paraguay", flag: "🇵🇾", placeholder: "961 123456" },
    { code: "+598", name: "Uruguay", flag: "🇺🇾", placeholder: "94 123 456" },
    { code: "+591", name: "Bolivie", flag: "🇧🇴", placeholder: "71234567" },
    { code: "+81", name: "Japon", flag: "🇯🇵", placeholder: "90-1234-5678" },
    { code: "+82", name: "Corée du Sud", flag: "🇰🇷", placeholder: "10-1234-5678" },
    { code: "+86", name: "Chine", flag: "🇨🇳", placeholder: "138 0013 8000" },
    { code: "+91", name: "Inde", flag: "🇮🇳", placeholder: "81234 56789" },
    { code: "+61", name: "Australie", flag: "🇦🇺", placeholder: "412 345 678" },
    { code: "+64", name: "Nouvelle-Zélande", flag: "🇳🇿", placeholder: "21 123 4567" },
    { code: "+27", name: "Afrique du Sud", flag: "🇿🇦", placeholder: "71 123 4567" },
    { code: "+20", name: "Égypte", flag: "🇪🇬", placeholder: "100 123 4567" },
    { code: "+234", name: "Nigéria", flag: "🇳🇬", placeholder: "802 123 4567" },
    { code: "+254", name: "Kenya", flag: "🇰🇪", placeholder: "712 123456" },
    { code: "+971", name: "Émirats arabes unis", flag: "🇦🇪", placeholder: "50 123 4567" },
    { code: "+966", name: "Arabie saoudite", flag: "🇸🇦", placeholder: "50 123 4567" },
    { code: "+90", name: "Turquie", flag: "🇹🇷", placeholder: "501 234 56 78" },
    { code: "+7", name: "Russie", flag: "🇷🇺", placeholder: "912 345-67-89" },
    { code: "+380", name: "Ukraine", flag: "🇺🇦", placeholder: "50 123 4567" },
    { code: "+48", name: "Pologne", flag: "🇵🇱", placeholder: "512 345 678" },
    { code: "+31", name: "Pays-Bas", flag: "🇳🇱", placeholder: "6 12345678" },
    { code: "+32", name: "Belgique", flag: "🇧🇪", placeholder: "470 12 34 56" },
    { code: "+41", name: "Suisse", flag: "🇨🇭", placeholder: "78 123 45 67" },
    { code: "+43", name: "Autriche", flag: "🇦🇹", placeholder: "664 123456" },
    { code: "+45", name: "Danemark", flag: "🇩🇰", placeholder: "20 12 34 56" },
    { code: "+46", name: "Suède", flag: "🇸🇪", placeholder: "70-123 45 67" },
    { code: "+47", name: "Norvège", flag: "🇳🇴", placeholder: "406 12 345" },
    { code: "+358", name: "Finlande", flag: "🇫🇮", placeholder: "50 123 4567" },
    { code: "+65", name: "Singapour", flag: "🇸🇬", placeholder: "8123 4567" },
    { code: "+63", name: "Philippines", flag: "🇵🇭", placeholder: "912 345 6789" },
    { code: "+62", name: "Indonésie", flag: "🇮🇩", placeholder: "0812 3456 789" },
    { code: "+60", name: "Malaisie", flag: "🇲🇾", placeholder: "012-345 6789" },
    { code: "+66", name: "Thaïlande", flag: "🇹🇭", placeholder: "081 234 5678" },
    { code: "+84", name: "Viêt Nam", flag: "🇻🇳", placeholder: "091 234 56 78" },
    { code: "+92", name: "Pakistan", flag: "🇵🇰", placeholder: "0300 1234567" },
    { code: "+98", name: "Iran", flag: "🇮🇷", placeholder: "0912 345 6789" },
    { code: "+94", name: "Sri Lanka", flag: "🇱🇰", placeholder: "071 123 4567" },
    { code: "+880", name: "Bangladesh", flag: "🇧🇩", placeholder: "01712 345678" },
    { code: "+855", name: "Cambodge", flag: "🇰🇭", placeholder: "092 123 456" },
    { code: "+673", name: "Brunei", flag: "🇧🇳", placeholder: "872 1234" },
    { code: "+679", name: "Fidji", flag: "🇫🇯", placeholder: "920 1234" },
    { code: "+675", name: "Papouasie-Nouvelle-Guinée", flag: "🇵🇬", placeholder: "723 45678" },
    { code: "+677", name: "Îles Salomon", flag: "🇸🇧", placeholder: "742 1234" },
    { code: "+678", name: "Vanuatu", flag: "🇻🇺", placeholder: "778 1234" },
    { code: "+691", name: "Micronésie", flag: "🇫🇲", placeholder: "920 1234" },
    { code: "+692", name: "Îles Marshall", flag: "🇲🇭", placeholder: "692 1234" },
    { code: "+680", name: "Palaos", flag: "🇵🇼", placeholder: "620 1234" },
    { code: "+685", name: "Samoa", flag: "🇼🇸", placeholder: "722 1234" },
    { code: "+676", name: "Tonga", flag: "🇹🇴", placeholder: "771 1234" },
    { code: "+682", name: "Îles Cook", flag: "🇨🇰", placeholder: "722 1234" },
    { code: "+683", name: "Niue", flag: "🇳🇺", placeholder: "811 1234" },
    { code: "+672", name: "Île Norfolk", flag: "🇳🇫", placeholder: "512 1234" },
    { code: "+670", name: "Timor oriental", flag: "🇹🇱", placeholder: "771 1234" },
    { code: "+688", name: "Tuvalu", flag: "🇹🇻", placeholder: "771 1234" },
    { code: "+690", name: "Tokelau", flag: "🇹🇰", placeholder: "811 1234" },
    { code: "+239", name: "Sao Tomé-et-Principe", flag: "🇸🇹", placeholder: "981 1234" },
    { code: "+240", name: "Guinée équatoriale", flag: "🇬🇶", placeholder: "222 123 456" },
    { code: "+241", name: "Gabon", flag: "🇬🇦", placeholder: "06 12 34 56 78" },
    { code: "+242", "name": "République du Congo", flag: "🇨🇬", placeholder: "06 123 4567" },
    { code: "+243", "name": "République démocratique du Congo", flag: "🇨🇩", placeholder: "081 123 4567" },
    { code: "+244", name: "Angola", flag: "🇦🇴", placeholder: "923 123 456" },
    { code: "+245", name: "Guinée-Bissau", flag: "🇬🇼", placeholder: "955 123 456" },
    { code: "+246", name: "Diego Garcia", flag: "🇮🇴", placeholder: "380 1234" },
    { code: "+247", name: "Île de l'Ascension", flag: "🇦🇨", placeholder: "650 1234" },
    { code: "+248", name: "Seychelles", flag: "🇸🇨", placeholder: "2 510 123" },
    { code: "+249", name: "Soudan", flag: "🇸🇩", placeholder: "091 123 4567" },
    { code: "+250", name: "Rwanda", flag: "🇷🇼", placeholder: "072 123 4567" },
    { code: "+251", name: "Éthiopie", flag: "🇪🇹", placeholder: "091 123 4567" },
    { code: "+252", name: "Somalie", flag: "🇸🇴", placeholder: "61 123 4567" },
    { code: "+253", name: "Djibouti", flag: "🇩🇯", placeholder: "77 123 456" },
    { code: "+255", name: "Tanzanie", flag: "🇹🇿", placeholder: "071 123 4567" },
    { code: "+256", name: "Ouganda", flag: "🇺🇬", placeholder: "070 123 4567" },
    { code: "+257", name: "Burundi", flag: "🇧🇮", placeholder: "79 123 456" },
    { code: "+258", name: "Mozambique", flag: "🇲🇿", placeholder: "82 123 4567" },
    { code: "+260", name: "Zambie", flag: "🇿🇲", placeholder: "095 123 4567" },
    { code: "+261", name: "Madagascar", flag: "🇲🇬", placeholder: "032 12 345 67" },
    { code: "+262", name: "La Réunion", flag: "🇷🇪", placeholder: "0692 12 34 56" },
    { code: "+263", name: "Zimbabwe", flag: "🇿🇼", placeholder: "071 123 456" },
    { code: "+264", name: "Namibie", flag: "🇳🇦", placeholder: "081 123 4567" },
    { code: "+265", name: "Malawi", flag: "🇲🇼", placeholder: "099 123 4567" },
    { code: "+266", name: "Lesotho", flag: "🇱🇸", placeholder: "501 123 456" },
    { code: "+267", name: "Botswana", flag: "🇧🇼", placeholder: "71 123 456" },
    { code: "+268", name: "Eswatini", flag: "🇸🇿", placeholder: "761 123 456" },
    { code: "+269", name: "Comores", flag: "🇰🇲", placeholder: "321 1234" },
    { code: "+290", name: "Sainte-Hélène", flag: "🇸🇭", placeholder: "659 1234" },
    { code: "+291", name: "Érythrée", flag: "🇪🇷", placeholder: "07 123 456" },
    { code: "+297", name: "Aruba", flag: "🇦🇼", placeholder: "560 1234" },
    { code: "+298", name: "Îles Féroé", flag: "🇫🇴", placeholder: "211234" },
    { code: "+299", name: "Groenland", flag: "🇬🇱", placeholder: "221234" },
    { code: "+350", name: "Gibraltar", flag: "🇬🇮", placeholder: "571 12345" },
    { code: "+352", name: "Luxembourg", flag: "🇱🇺", placeholder: "621 123 456" },
    { code: "+353", name: "Irlande", flag: "🇮🇪", placeholder: "083 123 4567" },
    { code: "+354", name: "Islande", flag: "🇮🇸", placeholder: "611 1234" },
    { code: "+355", name: "Albanie", flag: "🇦🇱", placeholder: "067 123 4567" },
    { code: "+356", name: "Malte", flag: "🇲🇹", placeholder: "799 12345" },
    { code: "+357", name: "Chypre", flag: "🇨🇾", placeholder: "961 12345" },
    { code: "+359", name: "Bulgarie", flag: "🇧🇬", placeholder: "088 123 4567" },
    { code: "+370", name: "Lituanie", flag: "🇱🇹", placeholder: "601 12345" },
    { code: "+371", name: "Lettonie", flag: "🇱🇻", placeholder: "200 12345" },
    { code: "+372", name: "Estonie", flag: "🇪🇪", placeholder: "501 1234" },
    { code: "+373", name: "Moldavie", flag: "🇲🇩", placeholder: "068 123 456" },
    { code: "+374", name: "Arménie", flag: "🇦🇲", placeholder: "091 123 456" },
    { code: "+375", name: "Biélorussie", flag: "🇧🇾", placeholder: "029 123 4567" },
    { code: "+376", name: "Andorre", flag: "🇦🇩", placeholder: "606 123 456" },
    { code: "+377", name: "Monaco", flag: "🇲🇨", placeholder: "06 12 34 56 78" },
    { code: "+378", name: "Saint-Marin", flag: "🇸🇲", placeholder: "333 123456" },
    { code: "+379", name: "Cité du Vatican", flag: "🇻🇦", placeholder: "333 123456" },
    { code: "+381", name: "Serbie", flag: "🇷🇸", placeholder: "061 123 4567" },
    { code: "+382", name: "Monténégro", flag: "🇲🇪", placeholder: "067 123 456" },
    { code: "+383", name: "Kosovo", flag: "🇽🇰", placeholder: "049 123 456" },
    { code: "+385", name: "Croatie", flag: "🇭🇷", placeholder: "091 123 4567" },
    { code: "+386", name: "Slovénie", flag: "🇸🇮", placeholder: "031 123 456" },
    { code: "+387", name: "Bosnie-Herzégovine", flag: "🇧🇦", placeholder: "061 123 456" },
    { code: "+389", name: "Macédoine du Nord", flag: "🇲🇰", placeholder: "070 123 456" },
    { code: "+420", name: "République tchèque", flag: "🇨🇿", placeholder: "601 123 456" },
    { code: "+421", name: "Slovaquie", flag: "🇸🇰", placeholder: "0911 123 456" },
    { code: "+423", name: "Liechtenstein", flag: "🇱🇮", placeholder: "660 123 456" },
    { code: "+500", name: "Îles Malouines", flag: "🇫🇰", placeholder: "51234" },
    { code: "+501", name: "Belize", flag: "🇧🇿", placeholder: "622 1234" },
    { code: "+502", name: "Guatemala", flag: "🇬🇹", placeholder: "5512 3456" },
    { code: "+503", name: "Salvador", flag: "🇸🇻", placeholder: "7012 3456" },
    { code: "+504", name: "Honduras", flag: "🇭🇳", placeholder: "9123 4567" },
    { code: "+505", name: "Nicaragua", flag: "🇳🇮", placeholder: "8712 3456" },
    { code: "+506", name: "Costa Rica", flag: "🇨🇷", placeholder: "8312 3456" },
    { code: "+507", name: "Panama", flag: "🇵🇦", placeholder: "6712 3456" },
    { code: "+508", name: "Saint-Pierre-et-Miquelon", flag: "🇵🇲", placeholder: "551 1234" },
    { code: "+509", name: "Haïti", flag: "🇭🇹", placeholder: "3412 3456" },
    { code: "+590", name: "Guadeloupe", flag: "🇬🇵", placeholder: "0690 12 34 56" },
    { code: "+592", name: "Guyana", flag: "🇬🇾", placeholder: "612 3456" },
    { code: "+594", name: "Guyane française", flag: "🇬🇫", placeholder: "0694 12 34 56" },
    { code: "+596", name: "Martinique", flag: "🇲🇶", placeholder: "0696 12 34 56" },
    { code: "+597", name: "Suriname", flag: "🇸🇷", placeholder: "741 1234" },
    { code: "+599", name: "Curaçao", flag: "🇨🇼", placeholder: "9 561 1234" },
    { code: "+674", name: "Nauru", flag: "🇳🇷", placeholder: "555 1234" },
    { code: "+681", name: "Wallis-et-Futuna", flag: "🇼🇫", placeholder: "721 1234" },
    { code: "+686", name: "Kiribati", flag: "🇰🇮", placeholder: "720 1234" },
    { code: "+687", name: "Nouvelle-Calédonie", flag: "🇳🇨", placeholder: "750 1234" },
    { code: "+689", name: "Polynésie française", flag: "🇵🇫", placeholder: "87 12 34 56" },
    { code: "+850", name: "Corée du Nord", flag: "🇰🇵", placeholder: "191 123 4567" },
    { code: "+852", name: "Hong Kong", flag: "🇭🇰", placeholder: "6123 4567" },
    { code: "+853", name: "Macao", flag: "🇲🇴", placeholder: "6612 3456" },
    { code: "+856", name: "Laos", flag: "🇱🇦", placeholder: "020 1234 5678" },
    { code: "+886", name: "Taïwan", flag: "🇹🇼", placeholder: "0912 345 678" },
    { code: "+960", name: "Maldives", flag: "🇲🇻", placeholder: "777 1234" },
        { code: "+961", name: "Liban", flag: "🇱🇧", placeholder: "03 123 456" },
    { code: "+962", name: "Jordanie", flag: "🇯🇴", placeholder: "079 123 4567" },
    { code: "+963", name: "Syrie", flag: "🇸🇾", placeholder: "093 123 456" },
    { code: "+964", name: "Irak", flag: "🇮🇶", placeholder: "0790 123 4567" },
    { code: "+965", name: "Koweït", flag: "🇰🇼", placeholder: "600 12345" },
    { code: "+967", name: "Yémen", flag: "🇾🇪", placeholder: "711 123 456" },
    { code: "+968", name: "Oman", flag: "🇴🇲", placeholder: "921 12345" },
    { code: "+970", name: "Palestine", flag: "🇵🇸", placeholder: "0599 123 456" },
    { code: "+972", name: "Israël", flag: "🇮🇱", placeholder: "052-123-4567" },
    { code: "+973", name: "Bahreïn", flag: "🇧🇭", placeholder: "3600 1234" },
    { code: "+974", name: "Qatar", flag: "🇶🇦", placeholder: "3312 3456" },
    { code: "+975", name: "Bhoutan", flag: "🇧🇹", placeholder: "17 123 456" },
    { code: "+976", name: "Mongolie", flag: "🇲🇳", placeholder: "8812 3456" },
    { code: "+977", name: "Népal", flag: "🇳🇵", placeholder: "984 123 4567" },
    { code: "+992", name: "Tadjikistan", flag: "🇹🇯", placeholder: "917 123 456" },
    { code: "+993", name: "Turkménistan", flag: "🇹🇲", placeholder: "66 123 4567" },
    { code: "+994", name: "Azerbaïdjan", flag: "🇦🇿", placeholder: "050 123 45 67" },
    { code: "+995", name: "Géorgie", flag: "🇬🇪", placeholder: "555 12 34 56" },
    { code: "+996", name: "Kirghizistan", flag: "🇰🇬", placeholder: "0700 123 456" },
    { code: "+998", name: "Ouzbékistan", flag: "🇺🇿", placeholder: "90 123 45 67" },
  ]

  const paysFiltres = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(recherchePays.toLowerCase()) || country.code.includes(recherchePays),
  )

  // Hook de géolocalisation
  const { city: ville, loading: geoLoading, error: geoError } = useGeolocation()

  // Codes à effet Matrix
  const matrixCodes = [
    "4bda7c", "x1f801", "uSr9ub", "r31sw", "3cqvt", "ebwvi", "4qd1tu", "str5y4", "ect2So", "xfnpBj", "kqjJu",
    "2v46yn", "q619ma", "wdtqdo", "14mkee", "pbb3eu", "vbncg8", "begaSh", "7rq", "dcboeu", "keyxs", "3Qehu",
    "N8135s", "nx794n", "11aqSi", "zBcpp", "s1xcBm", "u91xnm", "1s7mec", "Y8fmf", "11masu", "ye1f2t",
  ]

  // Étapes de progression pour la barre de progression globale
  const getEtapesProgression = () => {
    const etapes = [
      {
        id: "form",
        label: "Config",
        fullLabel: "Configuration",
        mobileLabel: "Config",
        termine: ["form", "verification", "preliminary", "generating", "result", "offer"].includes(etapeActuelle),
      },
      {
        id: "verification",
        label: "Vérif",
        fullLabel: "Vérification",
        mobileLabel: "Vérif",
        termine: ["verification", "preliminary", "generating", "result", "offer"].includes(etapeActuelle),
      },
      {
        id: "preliminary",
        label: "Résult",
        fullLabel: "Résultat",
        mobileLabel: "Résultat",
        termine: ["preliminary", "generating", "result", "offer"].includes(etapeActuelle),
      },
      {
        id: "generating",
        label: "Rapp",
        fullLabel: "Rapport",
        mobileLabel: "Rapport",
        termine: ["generating", "result", "offer"].includes(etapeActuelle),
      },
      {
        id: "offer",
        label: "Déverr",
        fullLabel: "Déverrouiller",
        mobileLabel: "Accès",
        termine: etapeActuelle === "offer",
      },
    ]
    return etapes
  }

  // Compte à rebours
  useEffect(() => {
    if (etapeActuelle === "result" || etapeActuelle === "offer") {
      const timer = setInterval(() => {
        setTempsRestant((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [etapeActuelle])

  // Progression de la vérification avec messages dynamiques
  useEffect(() => {
    if (etapeActuelle === "verification") {
      const messages = [
        { progress: 0, message: "Vérification de l'activité Tinder dans votre région..." },
        { progress: 15, message: "Croisement des données de reconnaissance faciale..." },
        { progress: 30, message: "Analyse des habitudes de connexion récentes..." },
        { progress: 45, message: "Analyse de Bumble, Hinge et d'autres plateformes..." },
        { progress: 60, message: "Détection d'activité de localisation suspecte..." },
        { progress: 75, message: "Compilation de preuves confidentielles..." },
        { progress: 90, message: "Presque terminé - finalisation de votre rapport..." },
        { progress: 100, message: "Enquête terminée avec succès !" },
      ]

      const interval = setInterval(() => {
        setProgressionVerification((prev) => {
          const nouvelleProgression = prev + Math.random() * 8 + 2

          const messageActuel = messages.find((m) => nouvelleProgression >= m.progress && nouvelleProgression < m.progress + 25)
          if (messageActuel) {
            setMessageDeVerification(messageActuel.message)
          }

          if (nouvelleProgression >= 100) {
            setTimeout(() => setEtapeActuelle("preliminary"), 1000)
            return 100
          }
          return Math.min(nouvelleProgression, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [etapeActuelle])

  // Progression de la génération du rapport (30 secondes) avec intégration de la géolocalisation
  useEffect(() => {
    if (etapeActuelle === "generating") {
      const messagesDeBase = [
        { progress: 0, message: "Analyse des photos de profil..." },
        { progress: 20, message: "Traitement de l'historique des messages..." },
        { progress: 40, message: "Vérification des derniers lieux consultés..." },
        { progress: 60, message: "Compilation des données d'activité..." },
        { progress: 80, message: "Chiffrement des informations sensibles..." },
        { progress: 95, message: "Finalisation du rapport complet..." },
        { progress: 100, message: "Rapport généré avec succès !" },
      ]

      // Ajoute un message spécifique à la géolocalisation si la ville est disponible
      const messages = ville
        ? [
            ...messagesDeBase.slice(0, 2),
            { progress: 30, message: `Analyse des activités récentes dans la région de ${ville}...` },
            ...messagesDeBase.slice(2),
          ]
        : messagesDeBase

      const interval = setInterval(() => {
        setProgressionGeneration((prev) => {
          const nouvelleProgression = prev + 100 / 75

          if (nouvelleProgression >= 33 && !etapeTerminee.photosDeProfil) {
            setEtapeTerminee((prev) => ({ ...prev, photosDeProfil: true }))
          }
          if (nouvelleProgression >= 66 && !etapeTerminee.conversations) {
            setEtapeTerminee((prev) => ({ ...prev, conversations: true }))
          }
          if (nouvelleProgression >= 90 && !etapeTerminee.finalisation) {
            setEtapeTerminee((prev) => ({ ...prev, finalisation: true }))
          }

          const messageActuel = messages.find((m) => nouvelleProgression >= m.progress && nouvelleProgression < m.progress + 20)
          if (messageActuel) {
            setMessageDeGeneration(messageActuel.message)
          }

          if (nouvelleProgression >= 100) {
            setTimeout(() => {
              if (etapeTerminee.photosDeProfil && etapeTerminee.conversations && etapeTerminee.finalisation) {
                setEtapeActuelle("result")
              }
            }, 1500)
            return 100
          }
          return Math.min(nouvelleProgression, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [etapeActuelle, ville, etapeTerminee])

  // Effet de preuve de vente mis à jour - inclut maintenant l'étape de génération
  useEffect(() => {
    if (etapeActuelle === "generating" || etapeActuelle === "result" || etapeActuelle === "offer") {
      const afficherPreuve = () => {
        if (Math.random() < 0.7) {
          setAfficherPreuveVentes(true)
          setTimeout(() => setAfficherPreuveVentes(false), 6000)
        }
      }
            const delaiInitial = setTimeout(afficherPreuve, 5000)
      const interval = setInterval(afficherPreuve, 25000)

      return () => {
        clearTimeout(delaiInitial)
        clearInterval(interval)
      }
    }
  }, [etapeActuelle])

     const recupererPhotoWhatsApp = async (telephone: string) => {
    if (telephone.length < 10) return

    setChargementPhotoEnCours(true)
    setErreurPhoto("")

    try {
      const reponse = await fetch("/api/whatsapp-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: telephone }),
      })

      let donnees: any = null

      try {
        donnees = await reponse.json()
      } catch {
        donnees = {}
      }

      if (!reponse.ok || !donnees?.success) {
        setPhotoDeProfil(
          "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
        )
        setPhotoEstPrivee(true)
        setErreurPhoto("Impossible de charger la photo")
        return
      }

      setPhotoDeProfil(donnees.result)
      setPhotoEstPrivee(!!donnees.is_photo_private)
    } catch (error) {
      console.error("Erreur lors de la récupération de la photo:", error)
      setPhotoDeProfil(
        "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      )
      setPhotoEstPrivee(true)
      setErreurPhoto("Erreur lors du chargement de la photo")
    } finally {
      setChargementPhotoEnCours(false)
    }
  }

    const gererChangementTelephone = (valeur: string) => {
    let valeurFormatee = valeur
    if (!valeur.startsWith(paysSelectionne.code)) {
      if (valeur && !valeur.startsWith("+")) {
        valeurFormatee = paysSelectionne.code + " " + valeur
      } else if (valeur.startsWith("+") && !valeur.startsWith(paysSelectionne.code)) {
        valeurFormatee = valeur
      } else {
        valeurFormatee = paysSelectionne.code + " " + valeur.replace(paysSelectionne.code, "").trim()
      }
    }

    setNumeroDeTelephone(valeurFormatee)

    const telephoneNettoye = valeurFormatee.replace(/[^0-9]/g, "")
    if (telephoneNettoye.length >= 10) {
      // Chamada corrigida para usar o nome da função definida acima
      recupererPhotoWhatsApp(telephoneNettoye)
    } else {
      setPhotoDeProfil(null)
      setPhotoEstPrivee(false)
    }
  }

  useEffect(() => {
    const gererClicExterieur = (event: MouseEvent) => {
      if (afficherMenuPays) {
        const cible = event.target as Element
        if (!cible.closest(".relative")) {
          setAfficherMenuPays(false)
        }
      }
    }

    document.addEventListener("mousedown", gererClicExterieur)
    return () => document.removeEventListener("mousedown", gererClicExterieur)
  }, [afficherMenuPays])

  const formaterTemps = (secondes: number) => {
    const mins = Math.floor(secondes / 60)
    const secs = secondes % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Images bloquées mises à jour avec de nouvelles captures d'écran de chat
  const imagesBloquees = [
    "https://i.ibb.co/PZmmjcxb/CHAT1.png",
    "https://i.ibb.co/20581vtC/CHAT2.png",
    "https://i.ibb.co/LzFZdXXH/CHAT3.png",
    "https://i.ibb.co/kvWFRct/CHAT4.png",
  ]

  const diapositiveSuivante = () => {
    setDiapositiveActuelle((prev) => (prev + 1) % imagesBloquees.length)
  }

  const diapositivePrecedente = () => {
    setDiapositiveActuelle((prev) => (prev - 1 + imagesBloquees.length) % imagesBloquees.length)
  }

  // Défilement automatique du carrousel
  useEffect(() => {
    if (etapeActuelle === "result") {
      const interval = setInterval(diapositiveSuivante, 4000)
      return () => clearInterval(interval)
    }
  }, [etapeActuelle])

  const gererTelechargementPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fichier = event.target.files?.[0]
    if (fichier) {
      const lecteur = new FileReader()
      lecteur.onload = (e) => {
        setPhotoTelechargee(e.target?.result as string)
      }
      lecteur.readAsDataURL(fichier)
    }
  }

  const [utiliserPhotosPersonnaliseesNonBinaire1824, setUtiliserPhotosPersonnaliseesNonBinaire1824] = useState(false)
  const [utiliserPhotosPersonnaliseesNonBinaire2534, setUtiliserPhotosPersonnaliseesNonBinaire2534] = useState(false)
  const [utiliserPhotosPersonnaliseesNonBinaire3544, setUtiliserPhotosPersonnaliseesNonBinaire3544] = useState(false)
  const [utiliserPhotosPersonnaliseesNonBinaire4554, setUtiliserPhotosPersonnaliseesNonBinaire4554] = useState(false)
  const [utiliserPhotosPersonnalisees1824, setUtiliserPhotosPersonnalisees1824] = useState(false)
  const [utiliserPhotosPersonnalisees2534, setUtiliserPhotosPersonnalisees2534] = useState(false)
  const [utiliserPhotosPersonnalisees3544, setUtiliserPhotosPersonnalisees3544] = useState(false)
  const [utiliserPhotosPersonnalisees4554, setUtiliserPhotosPersonnalisees4554] = useState(false)
  const [utiliserPhotosPersonnaliseesHomme1824, setUtiliserPhotosPersonnaliseesHomme1824] = useState(false)
  const [utiliserPhotosPersonnaliseesHomme2534, setUtiliserPhotosPersonnaliseesHomme2534] = useState(false)
  const [utiliserPhotosPersonnaliseesHomme3544, setUtiliserPhotosPersonnaliseesHomme3544] = useState(false)
  const [utiliserPhotosPersonnaliseesHomme4554, setUtiliserPhotosPersonnaliseesHomme4554] = useState(false)

  const [indicesPhotosMelanges1824, setIndicesPhotosMelanges1824] = useState<number[]>([])
  const [indicesPhotosMelanges2534, setIndicesPhotosMelanges2534] = useState<number[]>([])
  const [indicesPhotosMelanges3544, setIndicesPhotosMelanges3544] = useState<number[]>([])
  const [indicesPhotosMelanges4554, setIndicesPhotosMelanges4554] = useState<number[]>([])
  const [indicesPhotosMelangesHomme1824, setIndicesPhotosMelangesHomme1824] = useState<number[]>([])
  const [indicesPhotosMelangesHomme2534, setIndicesPhotosMelangesHomme2534] = useState<number[]>([])
  const [indicesPhotosMelangesHomme3544, setIndicesPhotosMelangesHomme3544] = useState<number[]>([])
  const [indicesPhotosMelangesHomme4554, setIndicesPhotosMelangesHomme4554] = useState<number[]>([])

  const [photosCombinees1824, setPhotosCombinees1824] = useState<string[]>([])
  const [photosCombinees2534, setPhotosCombinees2534] = useState<string[]>([])
  const [photosCombinees3544, setPhotosCombinees3544] = useState<string[]>([])
  const [photosCombinees4554, setPhotosCombinees4554] = useState<string[]>([])

          const genererFauxProfils = useCallback(() => {
    const profils: any[] = []
    const nomsUtilises: string[] = []
    const imagesUtilisees: string[] = []

    const obtenirElementUnique = (tableauSource: string[], tableauUtilise: string[]) => {
      if (!tableauSource || tableauSource.length === 0) return "/placeholder.svg";
      const elementsDisponibles = tableauSource.filter(item => !tableauUtilise.includes(item));
      if (elementsDisponibles.length === 0) {
        return tableauSource[Math.floor(Math.random() * tableauSource.length)];
      }
      const elementSelectionne = elementsDisponibles[Math.floor(Math.random() * elementsDisponibles.length)];
      tableauUtilise.push(elementSelectionne);
      return elementSelectionne;
    }
    
    let lieuCorrespondance = "";
    if (ville) {
        lieuCorrespondance = ville;
    } else {
        const lieuxMondiauxParDefaut = ["Paris", "Marseille", "Lyon", "Bruxelles"];
        lieuCorrespondance = lieuxMondiauxParDefaut[Math.floor(Math.random() * lieuxMondiauxParDefaut.length)];
    }
        const exemplesDeBios = [
      "Je suis un mélange entre Gad Elmaleh et Omar Sy. Drôle sans le faire exprès et ma mère me trouve beau.",
      "Amateur d'aventure, de café et de chiens. Je cherche quelqu'un pour explorer la ville avec moi !",
      "Passionné de fitness le jour, accro à Netflix la nuit. On prend un smoothie et on parle de la vie ?",
      "Artiste, rêveur et philosophe à temps partiel. Je crois aux bonnes ondes et aux belles conversations.",
      "Mi-comique, mi-patate de canapé. J'apporte les rires, tu apportes les snacks, marché conclu ?",
      "Explorateur de nouveaux lieux et de vieilles pizzerias. Trouvons la meilleure part en ville.",
      "Accro à la salle le matin, fan de tacos le soir. Tu veux te joindre à moi pour l'un ou l'autre ?",
      "Rêveur avec une playlist pour chaque humeur. Partage ta chanson préférée et mettons-nous dans l'ambiance.",
      "50% aventure, 50% Netflix. Je cherche quelqu'un pour m'équilibrer.",
      "Amoureux des couchers de soleil, du sarcasme et des road trips spontanés. Une destination en tête ?",
      "Je crois au bon café, aux belles conversations et je caresse tous les chiens que je vois.",
      "Philosophe à temps partiel, connaisseur de snacks à plein temps. Débattons des garnitures de pizza.",
      "Toujours à la recherche de levers de soleil et de belles histoires. Tu en as une à partager ?",
      "Ma vie est un mélange de chaos et de détente. Tu te joins à moi pour la partie détente ?",
      "Gourmand, vagabond et penseur occasionnel. Allons manger un morceau et résoudre les mystères de la vie.",
      "Je suis 10% de joutes verbales, 90% d'essai de garder mes plantes en vie. Un coup de main ?",
      "Fou de musique et observateur d'étoiles. Trouvons un endroit pour regarder le ciel et discuter.",
      "J'apporte les jeux de mots nuls, tu lèves les yeux au ciel. Le match parfait, non ?",
      "Amoureux des livres, des plages et des burritos. Écrivons notre propre histoire.",
      "Moitié accro à l'adrénaline, moitié adepte des plaids douillets. Quelle est ton ambiance ?",
      "Toujours partant pour une randonnée ou un resto de nuit. Choisis ton aventure !",
      "Je suis l'ami qui est toujours en retard mais qui apporte les meilleures playlists. On écoute ?",
      "La vie est trop courte pour le mauvais café ou les discussions ennuyeuses. Rendons les deux épiques.",
      "Mi-rêveur, mi-fonceur, toujours pour les bonnes ondes. Prêt(e) à créer des souvenirs ?"
    ];
    const tagsPersonnalite = [
      ["Capricorne", "INTJ", "Chat"], ["Lion", "ENFP", "Chien"], ["Vierge", "ISFJ", "Café"],
      ["Gémeaux", "ENTP", "Voyage"], ["Bélier", "ESTP", "Aventure"], ["Taureau", "INFJ", "Livres"],
      ["Scorpion", "INTP", "Musique"], ["Balance", "ESFJ", "Art"], ["Verseau", "ENFJ", "Astronomie"],
      ["Poissons", "INFP", "Rêves"], ["Cancer", "ISFP", "Plage"], ["Sagittaire", "ENTJ", "Randonnée"],
      ["Capricorne", "ISTJ", "Cuisine"], ["Lion", "ESFP", "Danse"], ["Vierge", "ISTP", "Jeux vidéo"],
      ["Gémeaux", "ENFP", "Photographie"], ["Bélier", "ESTJ", "Sports"], ["Taureau", "INFP", "Nature"],
      ["Scorpion", "INTJ", "Mystère"], ["Balance", "ENFJ", "Mode"], ["Verseau", "ENTP", "Technologie"],
      ["Poissons", "ISFJ", "Cinéma"], ["Cancer", "INFJ", "Poésie"], ["Sagittaire", "ESFP", "Fêtes"]
    ];
    const tagsInterets = [
      ["Pro-choix", "Café", "Black Lives Matter", "Tatouages"], ["Yoga", "Durabilité", "Photographie", "Cuisine"],
      ["Fitness", "Méditation", "Livres", "Vin"], ["Voyage", "Musique", "Droits des animaux", "Randonnée"],
      ["Art", "Véganisme", "Cinéma", "Aventure"], ["Jeux vidéo", "Technologie", "Nature", "Artisanat"],
      ["Danse", "Justice sociale", "Podcasts", "Pâtisserie"], ["Mode", "Écologisme", "Poésie", "Camping"],
      ["Sports", "Santé mentale", "Jardinage", "Vinyles"], ["Écriture", "Action climatique", "Théâtre", "Cafés"],
      ["Course à pied", "Bénévolat", "Jeux de société", "Cuisine de rue"], ["Peinture", "Droits LGBTQ+", "Concerts", "Friperies"],
      ["Vélo", "Pleine conscience", "Science-fiction", "Brasseries"], ["Ski", "Activisme", "Documentaires", "Couchers de soleil"],
      ["Surf", "Exploration urbaine", "Bandes dessinées", "Bière artisanale"], ["Escalade", "Égalité", "Musique jazz", "Voitures anciennes"],
      ["Skateboard", "Mode durable", "Podcasts", "Food trucks"], ["Kayak", "Bien-être animal", "Livres fantastiques", "Astronomie"],
      ["Boxe", "Service communautaire", "Films indépendants", "Sushi"], ["Randonnée", "Vie écologique", "Musique live", "Poterie"],
      ["Natation", "Féminisme", "Histoire", "Barbecue"], ["Photographie", "Minimalisme", "True Crime", "Road trips"],
      ["Danse", "Œuvres caritatives", "Animation", "Cocktails"], ["Chant", "Conservation des océans", "Romans policiers", "Pique-niques"]
    ];
    const orientations = ["Hétérosexuel", "Bisexuel", "Pansexuel", "Queer"];

    for (let i = 0; i < 3; i++) {
      let genreProfil: 'masculin' | 'féminin';
      let trancheAgeProfil: keyof typeof maleNames;
      
      if (genreSelectionne === "non-binaire") {
        // --- DÉBUT : LOGIQUE CORRIGÉE POUR ASSURER LA COHÉRENCE ---
        
        // 1. Tire au sort le GENRE pour ce profil spécifique (homme ou femme)
        genreProfil = Math.random() < 0.5 ? "masculin" : "féminin";
        
        // 2. Tire au sort la TRANCHE D'ÂGE pour ce profil spécifique
        const tranchesAge: (keyof typeof maleNames)[] = ["18-24", "25-34", "35-44", "45-54"];
        trancheAgeProfil = tranchesAge[Math.floor(Math.random() * tranchesAge.length)];
        // --- FIN : LOGIQUE CORRIGÉE ---

      } else {
        // Logique originale pour masculin/féminin (affiche le genre opposé)
        genreProfil = genreSelectionne === "masculin" ? "féminin" : "masculin";
        trancheAgeProfil = trancheAge as keyof typeof maleNames;
      }

      let noms: string[];
      let tableauPhotos: string[];

      // 3. MAINTENANT, avec le genre et l'âge définis, récupère les bons noms et photos
      if (genreProfil === 'masculin') {
        noms = maleNames[trancheAgeProfil] || [];
        switch (trancheAgeProfil) {
          case "18-24": tableauPhotos = malePhotos1824; break;
          case "25-34": tableauPhotos = malePhotos2534; break;
          case "35-44": tableauPhotos = malePhotos3544; break;
          case "45-54": tableauPhotos = malePhotos4554; break;
          default: tableauPhotos = malePhotos2534;
        }
      } else { // féminin
        noms = femaleNames[trancheAgeProfil] || [];
        switch (trancheAgeProfil) {
          case "18-24": tableauPhotos = femalePhotos1824; break;
          case "25-34": tableauPhotos = femalePhotos2534; break;
          case "35-44": tableauPhotos = femalePhotos3544; break;
          case "45-54": tableauPhotos = femalePhotos4554; break;
          default: tableauPhotos = femalePhotos2534;
        }
      }
      
      const nom = obtenirElementUnique(noms, nomsUtilises);
      const imageProfil = obtenirElementUnique(tableauPhotos, imagesUtilisees);
      const age = Math.floor(Math.random() * 7) + (parseInt(trancheAgeProfil.split("-")[0]) || 25);

      profils.push({
        name: nom,
        age,
        lastSeen: `il y a ${Math.floor(Math.random() * 24)}h`,
        description: "Utilisateur actif, souvent en ligne",
        image: imageProfil,
        bio: exemplesDeBios[Math.floor(Math.random() * exemplesDeBios.length)],
        location: `Habite à ${lieuCorrespondance}`,
        distance: `${Math.floor(Math.random() * 15) + 1} km`,
        orientation: orientations[Math.floor(Math.random() * orientations.length)],
        personality: tagsPersonnalite[Math.floor(Math.random() * tagsPersonnalite.length)],
        interests: tagsInterets[Math.floor(Math.random() * tagsInterets.length)],
        verified: Math.random() > 0.5,
      });
    }

    setProfilsGeneres(profils);
    return profils;
  }, [
    genreSelectionne,
    trancheAge,
    ville,
    // Les dépendances restent correctes
    femalePhotos1824,
    femalePhotos2534,
    femalePhotos3544,
    femalePhotos4554,
    malePhotos1824,
    malePhotos2534,
    malePhotos3544,
    malePhotos4554,
  ]);

  const ouvrirModalProfil = (profil: any) => {
    setProfilSelectionne(profil)
    setModalProfilOuvert(true)
  }

  const fermerModalProfil = () => {
    setModalProfilOuvert(false)
    setProfilSelectionne(null)
  }

  useEffect(() => {
    if (etapeActuelle === "result") {
      genererFauxProfils()
    }
  }, [etapeActuelle, genererFauxProfils])

  const peutVerifier =
    numeroDeTelephone.length >= 10 &&
    genreSelectionne &&
    photoDeProfil &&
    derniereUtilisationTinder &&
    changementDeVille &&
    trancheAge &&
    emailUtilisateur.includes("@")

  // Fonction pour soumettre l'email et passer à la vérification
  const soumettreLeFormulaire = async () => {
    if (!peutVerifier) return

    setEnvoiEmailEnCours(true)
    try {
      await fetch(
        "https://get.flwg.cc/webhook/d2c61c3085be338f986b1642703aa8a97acbe2b557cf4a9599520cc621c1b49a",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tag: "tinder check fr - usuario criado",
            evento: "Usuário Criado",
            email: userEmail,
            phone: phoneNumber,
          }),
        },
      )
    } catch (error) {
      console.error("Erreur lors de la soumission de l'email :", error)
    } finally {
      setEnvoiEmailEnCours(false)
      setEtapeActuelle("verification")
    }
  }
    return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Barre de Progression Globale - Optimisée pour mobile */}
      {etapeActuelle !== "landing" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="stepper-container overflow-x-auto px-3 py-3">
            <div className="flex items-center gap-2 min-w-max">
              {getEtapesProgression().map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="stepper-step flex items-center gap-2 min-w-[80px] sm:min-w-[100px]">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${
                        step.termine
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.termine ? "✓" : index + 1}
                    </div>
                    <span
                      className={`font-medium transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap ${
                        step.termine
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <span className="block sm:hidden">{step.mobileLabel}</span>
                      <span className="hidden sm:block">{step.fullLabel}</span>
                    </span>
                  </div>
                  {index < getEtapesProgression().length - 1 && (
                    <div className="w-6 sm:w-8 h-px bg-gray-300 mx-2 sm:mx-3 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Popup Preuve de Vente - Preuve Sociale Dynamique */}
      <AnimatePresence>
        {afficherPreuveVentes && (etapeActuelle === "generating" || etapeActuelle === "result" || etapeActuelle === "offer") && (
          <SalesProofPopup show={afficherPreuveVentes} onClose={() => setAfficherPreuveVentes(false)} />
        )}
      </AnimatePresence>

      <div className={etapeActuelle !== "landing" ? "pt-16 sm:pt-20" : ""}>
        <AnimatePresence mode="wait">
          {/* Page d'Accueil - Optimisée pour mobile */}
          {etapeActuelle === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] relative overflow-hidden"
            >
              {/* Fond Matrix - Réduit pour la performance mobile */}
              <div className="absolute inset-0 opacity-10 sm:opacity-20">
                {matrixCodes.slice(0, 15).map((code, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-green-400 text-xs font-mono"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  >
                    {code}
                  </motion.div>
                ))}
              </div>

              {/* Contenu */}
              <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
                {/* En-tête */}
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
                    Arrêtez de perdre le sommeil en vous demandant s'il/elle continue de swiper. Obtenez les réponses dont vous avez besoin - de manière totalement anonyme.
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

                {/* Fonctionnalités - Optimisées pour mobile */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Voyez sa dernière connexion (même quand il/elle dit en avoir 'fini' avec les applis)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Découvrez d'où il/elle swipe réellement
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Accédez aux conversations qu'il/elle ne veut pas que vous voyiez
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" />
                    <span className="font-semibold text-sm sm:text-base">
                      ✅ Votre enquête reste entièrement confidentielle
                    </span>
                  </div>
                </motion.div>

                {/* Appel à l'action - Optimisé pour mobile avec texte de bouton fixe */}
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-center mb-12 sm:mb-16 px-4"
                >
                  <Button
                    onClick={() => setEtapeActuelle("form")}
                    className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 px-6 sm:px-8 text-sm sm:text-base md:text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 w-full max-w-md mx-auto flex items-center justify-center text-center overflow-hidden"
                  >
                    <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                      🔍 OBTENEZ LA VÉRITÉ – LANCEZ LA RECHERCHE ANONYME
                    </span>
                  </Button>
                                    <p className="text-sm text-gray-300 mt-4 font-medium">
                    Enquête 100% anonyme. Il/elle ne saura jamais que vous avez vérifié.
                  </p>
                </motion.div>
              </div>

              {/* Section du bas - Optimisée pour mobile */}
              <div className="bg-white py-12 sm:py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#333333] mb-4">
                      Vous n'êtes pas paranoïaque -
                    </h2>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] to-[#FF3333] mb-6">
                      Vous vous protégez
                    </h3>
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
                      <p className="text-xs sm:text-sm text-gray-600">Voyez quand il/elle a utilisé les applis pour la dernière fois</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">LOCALISATION EXACTE</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Où il/elle a swipé</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">PHOTOS CACHÉES</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Les photos qu'il/elle ne veut pas que vous voyiez</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                      </div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">CONVERSATIONS PRIVÉES</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Ce qu'il/elle dit vraiment aux autres</p>
                    </div>
                  </div>

                  {/* Section Témoignages - Améliorée avec un accent sur la validation */}
                  <div className="text-center mb-8 sm:mb-12">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#333333] mb-6 sm:mb-8 px-2">
                      Vous n'êtes pas seul(e) - Voyez ce que d'autres ont découvert
                    </h3>

                    <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 mb-6 sm:mb-8">
                      {/* Témoignage de Sarah */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          alt="Photo de Sarah"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Madeleine, 32 ans</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Utilisatrice vérifiée</p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              Je savais que quelque chose n'allait pas. Le rapport a confirmé mes pires craintes, mais au moins maintenant je pouvais prendre une décision éclairée au lieu de vivre dans une anxiété constante.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>

                      {/* Témoignage de Jennifer */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
                          alt="Photo de Jennifer"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Zoé, 28 ans</p>
                            <p className="text-xs sm:text-sm text-blue-600 font-medium">
                              Enquête terminée en Juin 2025
                            </p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              Les meilleurs 17 € que j'ai jamais dépensés. Ça m'a évité des mois d'interrogation et m'a apporté la conclusion dont j'avais besoin. Mon instinct avait raison depuis le début.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>

                      {/* Témoignage de Michelle */}
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
                          alt="Photo de Michelle"
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                          }}
                        />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-base sm:text-lg">Claire, 35 ans</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Utilisatrice vérifiée</p>
                          </div>
                          <div className="mb-3">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                            <p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">
                              Je me sentais coupable de vérifier, mais mon instinct avait raison. Maintenant, je peux avancer avec confiance au lieu de vivre dans le doute.
                            </p>
                          </div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bouton CTA unique - Débordement de texte corrigé */}
                    <Button
                      onClick={() => setEtapeActuelle("form")}
                      className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full max-w-sm mx-auto flex items-center justify-center text-center overflow-hidden"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔍 COMMENCER MON ENQUÊTE ANONYME
                      </span>
                    </Button>
                  </div>

                  {/* Avis de confidentialité en bas */}
                  <div className="text-center px-4">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-2 font-medium">
                      <Shield className="w-4 h-4" />
                      100% anonyme - Votre enquête reste entièrement confidentielle
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Formulaire - Optimisé pour mobile */}
          {etapeActuelle === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-[#6C63FF] relative overflow-hidden"
            >
              {/* Points flottants - Réduits pour mobile */}
              <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
                            <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 flex items-center justify-center min-h-screen">
                <div className="w-full max-w-lg">
                  {/* En-tête */}
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl">
                      <Wifi className="w-8 h-8 sm:w-10 sm:h-10 text-[#6C63FF]" />
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                      🔍 Aidez-nous à trouver ce qu'ils cachent
                    </h1>
                    <p className="text-gray-200 text-sm sm:text-base px-4 leading-relaxed">
                      Plus vous fournissez de détails, plus nous pouvons creuser. Tout reste 100% anonyme.
                    </p>
                  </div>

                  {/* Formulaire */}
                  <Card className="bg-white rounded-2xl shadow-lg border-0">
                    <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                      {/* Téléchargement de photo - Déplacé en première position */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Téléchargez leur photo pour la reconnaissance faciale
                        </label>
                        <div className="text-center">
                          {photoTelechargee ? (
                            <div className="relative inline-block">
                              <img
                                src={photoTelechargee || "/placeholder.svg"}
                                alt="Téléchargée"
                                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-blue-500 shadow-lg"
                              />
                              <button
                                onClick={() => setPhotoTelechargee(null)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <div className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mx-auto cursor-pointer hover:border-blue-500 transition-colors">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={gererTelechargementPhoto}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-3 font-medium">
                          Nous analyserons toutes les plateformes de rencontre pour trouver des profils correspondants, même ceux qu'ils pensent être cachés.
                        </p>
                      </div>

                      {/* Numéro de téléphone - Maintenant en deuxième */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-2 sm:mb-3">
                          Numéro WhatsApp qu'ils utilisent
                        </label>
                        <div className="flex gap-2 sm:gap-3">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setAfficherMenuPays(!afficherMenuPays)}
                              className="bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-gray-600 flex-shrink-0 font-medium text-sm sm:text-base flex items-center gap-2 hover:bg-gray-200 transition-colors duration-200 min-w-[80px] sm:min-w-[90px]"
                            >
                              <span className="text-lg">{paysSelectionne.flag}</span>
                              <span>{paysSelectionne.code}</span>
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {afficherMenuPays && (
                              <div className="absolute top-full left-0 mt-1 bg-white border rounded-xl shadow-lg z-50 w-80 max-h-60 overflow-y-auto">
                                <div className="p-2">
                                  <input
                                    type="text"
                                    placeholder="Rechercher un pays..."
                                    value={recherchePays}
                                    onChange={(e) => setRecherchePays(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg text-sm"
                                  />
                                </div>
                                {paysFiltres.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => {
                                      setPaysSelectionne(country)
                                      setAfficherMenuPays(false)
                                      setRecherchePays("")
                                      // Mettre à jour le numéro de téléphone avec le nouvel indicatif
                                      const numeroActuel = numeroDeTelephone.replace(/^\+\d+\s*/, "")
                                      setNumeroDeTelephone(country.code + " " + numeroActuel)
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm"
                                  >
                                    <span className="text-lg">{country.flag}</span>
                                    <span className="font-medium">{country.code}</span>
                                    <span className="text-gray-600">{country.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <Input
                            type="tel"
                            placeholder={paysSelectionne.placeholder}
                            value={numeroDeTelephone}
                            onChange={(e) => gererChangementTelephone(e.target.value)}
                            className="flex-1 py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          Cela nous aide à suivre l'activité de leur appareil et à la croiser avec les habitudes d'utilisation des applications de rencontre.
                        </p>

                        {/* Aperçu de la photo WhatsApp */}
                        {(photoDeProfil || chargementPhotoEnCours) && (
                          <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-3 sm:gap-4">
                              {chargementPhotoEnCours ? (
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-xl animate-pulse" />
                              ) : (
                                <img
                                  src={photoDeProfil || "/placeholder.svg"}
                                  alt="Profil WhatsApp"
                                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border-2 border-gray-200"
                                />
                              )}
                              <div className="flex-1">
                                <p className="font-semibold text-[#333333] text-sm sm:text-base">
                                  Profil WhatsApp trouvé
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  {photoEstPrivee ? "Photo privée détectée" : "Photo de profil chargée"}
                                </p>
                              </div>
                              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sélection du genre */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Quel est leur genre ?
                        </label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {[
                            { value: "masculino", label: "Homme", icon: "👨" },
                            { value: "feminino", label: "Femme", icon: "👩" },
                            { value: "nao-binario", label: "Non-binaire", icon: "🧑" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setGenreSelectionne(option.value)}
                              className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                                genreSelectionne === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="text-lg sm:text-xl mb-1 sm:mb-2">{option.icon}</div>
                              <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                                            {/* Tranche d'âge */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Quel âge ont-ils ?
                        </label>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          {[
                            { value: "18-24", label: "18-24 ans" },
                            { value: "25-34", label: "25-34 ans" },
                            { value: "35-44", label: "35-44 ans" },
                            { value: "45-54", label: "45+ ans" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setTrancheAge(option.value)}
                              className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                                trancheAge === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                            </button>
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          Cela nous aide à affiner les paramètres de recherche sur les plateformes de rencontre.
                        </p>
                      </div>

                      {/* Questions chronologiques */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          Quand avez-vous commencé à soupçonner ?
                        </label>
                        <div className="space-y-2 sm:space-y-3">
                          {[
                            { value: "week", label: "Au cours de la dernière semaine", desc: "(changements de comportement récents)" },
                            { value: "month", label: "Le mois dernier", desc: "(distance progressive/cache son téléphone)" },
                            { value: "longer", label: "Plus d'un mois", desc: "(intuition persistante)" },
                            { value: "sure", label: "J'ai juste besoin d'en avoir le cœur net", desc: "" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setDerniereUtilisationTinder(option.value)}
                              className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                derniereUtilisationTinder === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="font-medium text-sm sm:text-base">{option.label}</div>
                              {option.desc && (
                                <div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Questions de localisation */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">
                          A-t-il/elle "travaillé tard" ou voyagé ?
                        </label>
                        <div className="space-y-2 sm:space-y-3">
                          {[
                            { value: "yes", label: "Oui", desc: '"Nouvelles exigences professionnelles" ou voyages inexpliqués' },
                            { value: "no", label: "Non", desc: "Les changements de comportement ont eu lieu à la maison" },
                            { value: "unknown", label: "Je ne sais pas", desc: "Il/elle est secret/secrète sur son emploi du temps" },
                          ].map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setChangementDeVille(option.value)}
                              className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                changementDeVille === option.value
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="font-medium text-sm sm:text-base">{option.label}</div>
                              <div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Champ E-mail - Ajouté ici */}
                      <div>
                        <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-2 sm:mb-3">
                          Votre adresse e-mail
                        </label>
                        <Input
                          type="email"
                          placeholder="Entrez votre adresse e-mail"
                          value={emailUtilisateur}
                          onChange={(e) => setEmailUtilisateur(e.target.value)}
                          className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">
                          Nous enverrons votre rapport complet à cette adresse e-mail. 100% confidentiel.
                        </p>
                      </div>

                      {/* Bouton de soumission - Débordement de texte corrigé */}
                      <Button
                        onClick={soumettreLeFormulaire}
                        disabled={!peutVerifier || envoiEmailEnCours}
                        className={`w-full py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold rounded-xl transition-all duration-300 overflow-hidden ${
                          peutVerifier && !envoiEmailEnCours
                            ? "bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <span className="block text-center leading-tight px-2">
                          {envoiEmailEnCours ? "Traitement..." : "🔍 COMMENCER L'ENQUÊTE"}
                        </span>
                      </Button>

                      {/* Signal de confiance */}
                      <div className="text-center">
                        <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                          <Lock className="w-4 h-4" />
                          Vos données sont chiffrées et supprimées automatiquement après 24 heures
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {/* Vérification - Optimisée pour mobile */}
          {etapeActuelle === "verification" && (
            <motion.div
              key="verification"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔍 Analyse de toutes les plateformes de rencontre...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={progressionVerification} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{messageDeVerification}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Analyse de Tinder, Bumble, Hinge...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Traitement de la reconnaissance faciale...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Analyse des données de localisation...</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Connexion sécurisée et chiffrée - Aucune trace laissée
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
                    {/* Résultats Préliminaires - Optimisé pour mobile */}
          {etapeActuelle === "preliminary" && (
            <motion.div
              key="preliminary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-lg">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    {/* En-tête d'Alerte */}
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg animate-pulse">
                        <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#333333] mb-3 sm:mb-4">
                        Nous avons trouvé ce que vous cherchiez...
                      </h2>
                    </div>

                    {/* Boîte d'Alerte */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-bold text-red-700">PROFILS DE RENCONTRE ACTIFS DÉTECTÉS</h3>
                      </div>
                      <p className="text-sm sm:text-base text-red-600 font-medium leading-relaxed">
                        Notre système a découvert plusieurs profils actifs liés à cette personne sur 3 plateformes de rencontre différentes.
                      </p>
                    </div>

                    {/* Principales Découvertes */}
                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            Dernière activité : il y a 18 heures
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Malgré l'affirmation qu'il/elle a 'tout supprimé'...
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            3 applications de rencontre actuellement actives
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">Tinder, Bumble, et une plateforme premium</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            Conversations récentes détectées
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Messagerie active avec plusieurs correspondances cette semaine
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Boîte Étape Suivante */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs sm:text-sm font-bold">💡</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-blue-700">
                          Ce que vous verrez dans le rapport complet :
                        </h3>
                      </div>
                      <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-600">
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Captures d'écran de tous les profils actifs
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Conversations récentes et ce qu'ils/elles disent
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Lieux exacts où il/elle a swipé
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Chronologie de toute l'activité (vous serez choqué(e))
                        </li>
                      </ul>
                    </div>

                    {/* Bouton CTA - Débordement de texte corrigé */}
                    <Button
                      onClick={() => setEtapeActuelle("generating")}
                      className="w-full bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden flex items-center justify-center text-center"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔓 DÉVERROUILLER LES PREUVES COMPLÈTES
                      </span>
                    </Button>

                    {/* Rassurance */}
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Anonymat complet garanti - Il/elle ne saura jamais que vous avez vérifié
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Génération du Rapport - Optimisé pour mobile */}
          {etapeActuelle === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      📊 Génération du rapport complet...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={progressionGeneration} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{messageDeGeneration}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          etapeTerminee.photosDeProfil ? "bg-green-50" : "bg-blue-50"
                        }`}
                      >
                        {etapeTerminee.photosDeProfil ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        )}
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Photos de profil analysées</span>
                      </div>
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          etapeTerminee.conversations
                            ? "bg-green-50"
                            : etapeTerminee.photosDeProfil
                              ? "bg-blue-50"
                              : "bg-gray-50"
                        }`}
                      >
                        {etapeTerminee.conversations ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : etapeTerminee.photosDeProfil ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            etapeTerminee.conversations || etapeTerminee.photosDeProfil
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          Traitement des conversations...
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${
                          etapeTerminee.finalisation
                            ? "bg-green-50"
                            : etapeTerminee.conversations
                              ? "bg-blue-50"
                              : "bg-gray-50"
                        }`}
                      >
                        {etapeTerminee.finalisation ? (
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                        ) : etapeTerminee.conversations ? (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />
                        )}
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            etapeTerminee.finalisation || etapeTerminee.conversations ? "text-gray-700" : "text-gray-500"
                          }`}
                        >
                          Finalisation du rapport...
                        </span>
                      </div>
                    </div>
                                        <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Chiffrement des données sensibles pour votre confidentialité
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Résultat - Optimisé pour mobile */}
          {etapeActuelle === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] px-4 py-6 sm:py-8"
            >
              <div className="container mx-auto max-w-4xl">
                {(photoDeProfil || photoTelechargee) && (
                  <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="relative">
                      <img
                        src={photoTelechargee || photoDeProfil || ""}
                        alt="Profil"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      {photoEstPrivee && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                          <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bannières d'Alerte */}
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
                          Nous confirmons que ce numéro est lié à un profil Tinder ACTIF. Derniers enregistrements d'utilisation détectés à {" "}
                          {ville || "votre région"}.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Statistiques */}
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

                {/* Correspondances Récentes */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔥 CORRESPONDANCES RÉCENTES TROUVÉES
                    </h3>
                       <p className="text-sm text-gray-600 text-left mb-6">
                        Appuyez sur une correspondance pour voir plus d'informations
                      </p>
                    <div className="space-y-4">
                      {profilsGeneres.map((profile, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => ouvrirModalProfil(profile)}
                        >
                          <div className="relative">
                            {profile.image ? (
                              <img
                                src={profile.image || "/placeholder.svg"}
                                alt={profile.nom}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center">
                                <User className="w-6 h-6 text-pink-600" />
                              </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900">
                                {profile.name}, {profile.age}
                              </h4>
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <p className="text-sm text-gray-600">Dernière connexion : {profile.lastSeen}</p>
                            <p className="text-sm text-green-600">Chat actif : souvent en ligne</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Section Photos */}
                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">📸 PHOTOS CENSURÉES</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      Voir toutes leurs photos de profil (y compris celles que vous n'avez jamais vues)
                    </p>

                    {/* Carrousel */}
                    <div className="relative">
                      <div className="overflow-hidden rounded-xl">
                        <div
                          className="flex transition-transform duration-300 ease-in-out"
                          style={{ transform: `translateX(-${diapositiveActuelle * 100}%)` }}
                        >
                          {imagesBloquees.map((image, index) => (
                            <div key={index} className="w-full flex-shrink-0 relative">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Conversation de chat ${index + 1}`}
                                className="w-full h-48 sm:h-64 object-cover"
                                style={{ filter: "blur(8px) brightness(0.7)" }}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                <div className="text-center">
                                  <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white mx-auto mb-2 opacity-80" />
                                  <p className="text-white text-xs font-bold opacity-80">BLOQUÉ</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contrôles du Carrousel */}
                      <button
                        onClick={diapositivePrecedente}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={diapositiveSuivante}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Indicateur de points */}
                      <div className="flex justify-center gap-2 mt-4">
                        {imagesBloquees.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setDiapositiveActuelle(index)}
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                              index === diapositiveActuelle ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                                {/* Section Déverrouillage */}
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#333333] mb-3 sm:mb-4">
                        🔓 DÉVERROUILLER LE RAPPORT COMPLET
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                        Obtenez un accès instantané au rapport complet avec des photos non censurées et l'historique complet des conversations.
                      </p>
                    </div>

                    {/* Carte de Minuteur d'Urgence */}
<div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-xl shadow-lg mb-4 sm:mb-6">
  <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
    <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
    <span className="font-bold text-lg sm:text-xl">LE RAPPORT SERA SUPPRIMÉ DANS :</span>
  </div>
  <div className="text-center mb-3">
    <div className="text-3xl sm:text-4xl font-bold mb-2">{formaterTemps(tempsRestant)}</div>
  </div>
  <p className="text-sm sm:text-base text-center leading-relaxed opacity-90">
    Une fois le temps écoulé, ce rapport sera définitivement supprimé pour des raisons de confidentialité. Cette offre
    ne pourra pas être récupérée ultérieurement.
  </p>
</div>

                    {/* Bouton de Paiement Direct - En utilisant la balise <a> (Recommandé) */}
                    <a
                      href="https://pay.mundpay.com/0198e6dd-3163-7105-86fe-753d6c937c57?ref="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden"
                    >
                      <span className="block text-center leading-tight px-2"> 🔓 DÉVERROUILLER MON RAPPORT - JE SUIS PRÊT(E) POUR LA VÉRITÉ </span>
                    </a>

                    {/* Rassurance Finale */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                      <p className="text-sm sm:text-base text-blue-700 font-medium leading-relaxed">
                        Vous n'envahissez pas la vie privée - vous protégez votre bien-être émotionnel. Vous avez le droit de prendre des décisions éclairées concernant votre relation.
                      </p>
                    </div>

                    {/* Témoignage */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <img
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                          alt="Sophie M."
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                        <div className="flex-1 text-left">
                          <div className="mb-2">
                            <p className="font-bold text-[#333333] text-sm sm:text-base">Sophie M.</p>
                            <p className="text-xs sm:text-sm text-green-600 font-medium">✓ Utilisatrice vérifiée</p>
                          </div>
                          <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed">
                            "J'aurais aimé faire ça il y a des mois. Ça m'aurait évité tellement d'anxiété et de temps perdu."
                          </p>
                          <div className="flex items-center text-[#FFD700] text-sm mt-2">
                            <span>⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {modalProfilOuvert && profilSelectionne && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                      {/* En-tête avec bouton de fermeture */}
                      <div className="relative">
                        <button
                          onClick={fermerModalProfil}
                          className="absolute top-4 left-4 z-10 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <X className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Image de profil */}
                        <div className="relative h-96 bg-gray-200 rounded-t-2xl overflow-hidden">
                          <img
                            src={profilSelectionne.image || "/placeholder.svg"}
                            alt={profilSelectionne.name}
                            className="w-full h-full object-cover"
                          />

                          {/* Dégradé en superposition */}
                          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>

                          {/* Superposition du nom et des informations de base */}
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-3xl font-bold">{profilSelectionne.name}</h2>
                              {profilSelectionne.verified && (
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm opacity-90">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{profilSelectionne.orientation}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{profilSelectionne.location}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
                              <MapPin className="w-4 h-4" />
                              <span>{profilSelectionne.distance}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contenu du profil */}
                      <div className="p-6 space-y-6">
                        {/* Section À propos de moi */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">À propos de moi</h3>
                          <p className="text-gray-700 leading-relaxed">{profilSelectionne.bio}</p>
                        </div>

                        {/* Tags de personnalité */}
                        {profilSelectionne.personality && (
                          <div>
                            <div className="flex flex-wrap gap-2">
                              {profilSelectionne.personality.map((tag: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Section Mes centres d'intérêt */}
                        {profilSelectionne.interests && (
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Mes centres d'intérêt</h3>
                            <div className="flex flex-wrap gap-2">
                              {profilSelectionne.interests.map((interest: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-300"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Boutons d'action */}
                        <div className="flex gap-4 pt-4">
                          <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors">
                            Passer
                          </button>
                          <button className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 hover:to-red-600 transition-colors">
                            Liker
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
                    {/* Page d'Offre */}
          {etapeActuelle === "offer" && (
            <motion.div key="offer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] px-4 py-6 sm:py-8" >
              <div className="container mx-auto max-w-2xl">
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-6 sm:p-8 text-center">
                    {/* En-tête */}
                    <div className="mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333333] mb-3 sm:mb-4"> Vous méritez de connaître toute la vérité </h1>
                      <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed"> Arrêtez de vous poser des questions. Arrêtez de perdre le sommeil. Obtenez chaque détail - en toute confidentialité. </p>
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
                        <p className="text-sm sm:text-base text-red-700 font-semibold leading-relaxed"> Votre instinct avait raison. Maintenant, voyez exactement ce qu'ils ont caché tout en vous regardant dans les yeux et en mentant. </p>
                      </div>
                    </div>

                    {/* Section Prix */}
                    <div className="mb-6 sm:mb-8">
                      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="text-2xl sm:text-3xl text-gray-400 line-through">47,00€</div>
                        <div className="text-4xl sm:text-5xl font-bold text-[#FF0066]">17,00€</div>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold mb-4"> 🔥 -62% - OFFRE LIMITÉE </div>
                      <p className="text-sm sm:text-base text-gray-600 font-medium"> Paiement unique pour un accès à vie à votre rapport complet </p>
                    </div>

                    {/* Ce que vous débloquerez */}
                    <div className="text-left mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6 text-center"> Ce que vous débloquerez : </h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium"> Chaque photo de profil (y compris celles qu'ils pensent que vous ne verrez jamais) </span>
                        </div>
                        <div className="flex items-start gap-3 sm:gap-4">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                          <span className="text-sm sm:text-base text-gray-700 font-medium"> Historique complet des conversations (voyez exactement ce qu'ils disent aux autres) </span>
                        </div>
                      </div>
                    </div>

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
