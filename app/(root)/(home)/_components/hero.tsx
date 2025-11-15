'use client'
import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import Image from 'next/image'
import 'react-alice-carousel/lib/alice-carousel.css'

function Hero() {
  const slides = [
    {
      img: '/one-page.jpg',
      title: 'Title One',
      desc: 'This is description one',
    },
    {
      img: '/one-page.jpg',
      title: 'Title Two',
      desc: 'This is description two',
    },
    {
      img: '/one-page.jpg',
      title: 'Title Three',
      desc: 'This is description three',
    },
  ]

  const items = slides.map((item, i) => (
    <div key={i} className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[900px]">
      {/* Image */}
      <Image
        src={item.img}
        alt={item.title}
        fill
        priority={i === 0}
        className="object-cover brightness-[0.6]"
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            {item.title}
          </h2>
          <p className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed">
            {item.desc}
          </p>
          <button className="px-8 py-3 bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white rounded-xl font-semibold transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-105 transform">
            Learn More
          </button>
        </div>
      </div>
    </div>
  ))

  return (
    <section className="w-full relative">
      <AliceCarousel
        items={items}
        autoPlay
        autoPlayInterval={4000}
        infinite
        disableButtonsControls={false}
        disableDotsControls={false}
        animationDuration={500}
        animationType="fadeout"
        mouseTracking
        touchTracking
     
      />
    </section>
  )
}

export default Hero