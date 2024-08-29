"use client"

import React from 'react'
import { useState, useEffect, useRef } from 'react'

export default function Component() {
  const [conversation, setConversation] = useState<Array<{ text: string; isUser: boolean }>>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [typingText, setTypingText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const questions = [
    "\nAre you looking for an internship?",
    "\nDo you want daily or weekly updates?",
    "\nWhat is your email address?",
    "\n\nThank you for completing the questions!",
    "We found 5 internships open this week",
    "We found 100 internships total"
  ]

  const errorMessages = [
    "Please answer 'yes' or 'no'.",
    "Please choose 'daily' or 'weekly'.",
    "Please enter a valid email address."
  ]

  useEffect(() => {
    if (currentQuestion < questions.length) {
      const text = questions[currentQuestion]
      let i = 0
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setTypingText((prev) => prev + text.charAt(i))
          i++
        } else {
          clearInterval(typingInterval)
          setConversation((prev) => [...prev, { text, isUser: false }])
          setTypingText('')
          if (currentQuestion < 3) {
            setShowInput(true)
          } else {
            setTimeout(() => setCurrentQuestion((prev) => prev + 1), 1000)
          }
        }
      }, 30)
      return () => clearInterval(typingInterval)
    }
  }, [currentQuestion])

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInput])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userInput.trim() === '') return

    let isValid = false
    switch (currentQuestion) {
      case 0:
        isValid = ['yes', 'no'].includes(userInput.toLowerCase())
        break
      case 1:
        isValid = ['daily', 'weekly'].includes(userInput.toLowerCase())
        break
      case 2:
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInput)
        break
    }

    if (isValid) {
      setConversation((prev) => [...prev, { text: userInput, isUser: true }])
      setUserInput('')
      setShowInput(false)
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setConversation((prev) => [
        ...prev,
        { text: userInput, isUser: true },
        { text: `\n${errorMessages[currentQuestion]}`, isUser: false }
      ])
      setUserInput('')
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4" style={{ fontFamily: 'Roboto Mono, monospace' }}>
      <div className="bg-[#1d1f1d] p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <div className="text-[#01a624] whitespace-pre-wrap">
          {conversation.map((item, index) => (
            <div key={index} className={item.isUser ? 'text-white' : 'text-[#01a624]'}>
              {item.text}
            </div>
          ))}
          <div className="text-[#01a624]">{typingText}</div>
          {showInput && (
            <form onSubmit={handleSubmit} className="mt-2">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full"
              />
            </form>
          )}
          <span className="animate-pulse">▋</span>
        </div>
      </div>
    </div>
  )
}