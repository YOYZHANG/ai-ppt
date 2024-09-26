'use client'

import React, { FormEvent, ChangeEvent } from 'react';
import { Sparkles, Presentation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from './ui/textarea';

const Lint = [
  "Create a 5-slide presentation on the impact of AI in healthcare, covering key benefits, challenges, and future trends.",
  "Generate a professional PPT on the topic of climate change, with slides on causes, effects, and potential solutions.",
  "Design a creative presentation about space exploration history, including major missions, milestones, and future goals"
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
    onSubmit()
  }
  return (
    <div className="max-w-2xl mx-auto p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl mt-[150px]">
      <h1 className="text-2xl font-serif mb-8 flex items-center text-gray-100 animate-fade-in">
        <Presentation className="w-10 h-10 text-[#c5f955] mr-3 animate-pulse" />
        <div>
          <p>
              <span>
                Type the Topic for your Presentation, 
              </span>
              <span  className='relative'>
                It's Free!
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
              </span>
              
          </p>
        </div>
      </h1>
      <div>
        <form className="relative" onSubmit={onSubmit}>
          <Textarea
            className="w-full p-3 text-white bg-black border rounded-lg resize-none focus-visible:outline-none"
            rows={4}
            value={value}
            onChange={onChange}
            placeholder="Describe your topic..."
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
              className="px-4 py-2 bg-black rounded-full text-sm text-gray-500 hover:bg-gray-600 hover:text-gray-300 transition-all duration-300 hover:shadow-md text-left"
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

