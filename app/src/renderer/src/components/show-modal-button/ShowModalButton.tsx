import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ShowModalIcon from './icons/ShowModalIcon'
import HideModalIcon from './icons/HideModalIcon'

interface ShowModalButtonProps {
  showModal: boolean
  handleClick: () => void
}

const ShowModalButton: React.FC<ShowModalButtonProps> = ({ showModal, handleClick }) => {
  return (
    <AnimatePresence>
      <motion.button
        onClick={handleClick}
        className={`show-modal-btn ${!showModal ? 'subdued' : ''}`}
        aria-label="Hide Sidebar"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{
          duration: 0.3,
          ease: [0, 0.71, 0.2, 1.01],
          type: 'spring'
        }}
      >
        {showModal ? <ShowModalIcon /> : <HideModalIcon />}
      </motion.button>
    </AnimatePresence>
  )
}

export default ShowModalButton
