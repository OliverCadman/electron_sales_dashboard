import React from 'react'
import George from '../../assets/images/george_hills.jpg'
import { AnimatePresence, motion } from 'framer-motion'

interface ModalProps {
  handleClick: () => void
}

const Modal: React.FC<ModalProps> = ({ handleClick }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal animate-bg-slow"
      >
        <div className="modal__wrapper">
          <div className="modal__header">
            <h2 className="font-secondary bold italic">Nailed it</h2>
          </div>
          <img src={George} alt="A headshot of George Hills" width="200px" height="200px" />
          <button className="btn font-primary white bold" onClick={() => handleClick()}>
            Close
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Modal
