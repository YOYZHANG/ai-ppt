'use client'

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from './ui/textarea';

const Lint = [
  "introduce langchainjs",
  "introduce chatgpt",
  "work summary about AI"
]

interface Props {
  onSubmit: (e?: FormEvent<HTMLFormElement>) => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  setChatInput: (input: string) => void
  value: string
}
export default function Welcome({onSubmit, onChange, value, setChatInput}: Props) {
  const handleClick = (lint: string) => {
    setChatInput(lint)
    // onSubmit()
  }
  return (
    <div className="max-w-2xl mx-auto p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <h1 className="text-4xl font-serif mb-8 flex items-center text-gray-100 animate-fade-in">
        <Star className="w-8 h-8 text-yellow-400 mr-3 animate-pulse" />
        <span>Good morning</span>
      </h1>
      <div>
        <form className="relative" onSubmit={onSubmit}>
          <Textarea
            className="w-full p-3 text-white bg-black border rounded-lg resize-none focus-visible:outline-none"
            rows={4}
            value={value}
            onChange={onChange}
            placeholder="How can I help you today?"
          />
          {value && 
          <Button variant="secondary" size="icon" className='absolute right-3 top-3 text-white p-2 rounded-full'>
            <Sparkles className="h-5 w-5 text-[#c5f955]" />
          </Button>}
          <div className="absolute left-3 bottom-3 right-3 flex justify-between items-center text-sm text-gray-600">
            <span>Gemini Flash</span>
          </div>
        </form>
      </div>
      <div className="mt-6">
        <p className="text-sm text-gray-400 mb-3 font-medium">Get started with an example:</p>
        <div className="flex flex-wrap gap-2">
          {Lint.map((example, index) => (
            <button 
              key={index} 
              className="px-4 py-2 bg-black rounded-full text-sm text-gray-300 hover:bg-gray-600 transition-all duration-300 hover:shadow-md"
              onClick={() => handleClick(example)}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

