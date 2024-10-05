import React, { useState } from 'react'
import { Calendar, DollarSign, ChevronDown, ChevronUp, Leaf, Image as ImageIcon, ThumbsUp, ThumbsDown, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AIChatbot from '../components/AIChatbot'

// ... (keep all existing interfaces and imports)

const DonationHistory: React.FC<DonationHistoryProps> = ({ donations }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  // ... (keep all other existing state and functions)

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  // Hardcoded donations
  const dummyDonations: Donation[] = [
    // ... (keep the existing hardcoded donations)
  ]

  // Combine dummy donations with user donations
  const allDonations = [...dummyDonations, ...donations]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-green-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Green Impact Journey
      </motion.h1>
      {allDonations.length === 0 ? (
        <motion.p 
          className="text-center text-gray-500 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You haven't made any donations yet. Start your journey to make a difference!
        </motion.p>
      ) : (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {allDonations.map((donation) => (
            <motion.div 
              key={donation.id} 
              className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* ... (keep the existing donation rendering logic) */}
            </motion.div>
          ))}
        </motion.div>
      )}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeImageModal}>
          <div className="max-w-3xl max-h-3xl">
            <img src={selectedImage} alt="Proof of donation utilization" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  )
}

export default DonationHistory