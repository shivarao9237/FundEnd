import React, { useState, useEffect } from 'react';
import hero from '../assets/hero.jpg';
import hero2 from '../assets/hero2.jpg';
import hero3 from '../assets/hero3.jpg';
import { PlusIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
  const images = [hero, hero2, hero3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(null);

  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImageIndex(currentImageIndex);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentImageIndex]);

  return (
    <section className="bg-white">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        {/* Left Column (Text Content) */}
        <div className="mr-auto place-self-center lg:col-span-7 space-y-4">
          <h1 className="max-w-2xl mb-4 text-4xl text-gray-900 font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl opacity-0 translate-y-4 animate-fade-in-down delay-[100ms]">
            Small steps,
          </h1>
          <h1 className="max-w-2xl mb-4 text-4xl text-gray-900 font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl opacity-0 translate-y-4 animate-fade-in-down delay-[200ms]">
            Big Dreams,
          </h1>
          <h1 className="max-w-2xl mb-4 text-4xl text-gray-900 font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl opacity-0 translate-y-4 animate-fade-in-down delay-[300ms]">
            Greater Outcomes
          </h1>
          <h3 className="max-w-2xl mb-6 font-light text-gray-700 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 opacity-0 translate-y-4 animate-fade-in-down delay-[400ms]">
            End your financial obstacles with help from good people!
          </h3>
          
          <div className="flex-grow flex justify-center opacity-0 translate-y-4 animate-fade-in-down delay-[500ms]">
            <a 
              href="/start-fund" 
              className="bg-green-500 text-white rounded-md px-4 py-2 text-sm font-medium inline-flex items-center space-x-1 hover:bg-green-600 transition-opacity duration-700"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Start Fundraiser</span>
            </a>
          </div>
        </div>

        {/* Right Column (Image Carousel with Smooth Transition) */}
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex relative animate-fade-in-down delay-[400ms]">
          {/* Previous Image */}
          {prevImageIndex !== null && (
            <img
              src={images[prevImageIndex]}
              alt="Hero Image"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg opacity-0 transition-opacity duration-1000 ease-in-out"
            />
          )}

          {/* Current Image */}
          <img
            src={images[currentImageIndex]}
            alt="Hero Image"
            className="w-full h-full object-cover rounded-lg transition-opacity duration-1000 ease-in-out animate-fade-in-down delay-[400ms] opacity-100"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
