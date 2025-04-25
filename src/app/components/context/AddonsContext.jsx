'use client'
import { createContext, useContext, useState } from 'react'

const AddonsContext = createContext()

export const AddonsProvider = ({ children }) => {
  const [selectedAddons, setSelectedAddons] = useState([])

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) => {
      const exists = prev.find((a) => a.id === addon.id)
      return exists
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    })
  }

  return (
    <AddonsContext.Provider value={{ selectedAddons, toggleAddon }}>
      {children}
    </AddonsContext.Provider>
  )
}

export const useAddons = () => useContext(AddonsContext)
