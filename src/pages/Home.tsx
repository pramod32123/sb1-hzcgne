import React, { useState } from 'react'
import { Wallet, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { charities } from '../data/charities'
import DonationModal from '../components/DonationModal'
import { Donation } from '../types'

interface HomeProps {
  addDonation: (donation: Donation) => void
}

const Home: React.FC<HomeProps> = ({ addDonation }) => {
  const [walletBalance, setWalletBalance] = useState(1000)
  const [loadAmount, setLoadAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [showDonationModal, setShowDonationModal] = useState(false)
  const [selectedCharity, setSelectedCharity] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleLoadWallet = () => {
    const amount = parseFloat(loadAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.')
      return
    }
    setWalletBalance(prevBalance => prevBalance + amount)
    setLoadAmount('')
  }

  const filterCharities = () => {
    return charities.filter(charity => 
      charity.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'ALL' || charity.category === selectedCategory)
    )
  }

  const handleDonateClick = (charity) => {
    setSelectedCharity(charity)
    setShowDonationModal(true)
  }

  const handleDonationComplete = (amount: number) => {
    if (selectedCharity) {
      const newDonation: Donation = {
        id: Date.now(),
        projectId: selectedCharity.id,
        projectTitle: selectedCharity.title,
        amount,
        date: new Date().toISOString(),
        status: 'Completed',
        utilization: [
          {
            date: new Date().toISOString(),
            description: `Initial donation to ${selectedCharity.title}`,
            amount,
            percentage: 100,
            proofImage: selectedCharity.image
          }
        ]
      }
      addDonation(newDonation)
      setWalletBalance(prevBalance => prevBalance - amount)
      setShowDonationModal(false)
      setSelectedCharity(null)
      navigate('/donation-history')
    }
  }

  // ... rest of the component remains unchanged

  return (
    // ... rest of the JSX remains unchanged
  )
}

export default Home