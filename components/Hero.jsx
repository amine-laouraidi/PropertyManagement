import React from 'react'
import PropertySearchForm from './PropertySearchForm'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-orange-700 py-24 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center mb-8">
          <span className="inline-block bg-amber-600 bg-opacity-50 text-amber-100 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Find Your Next Home
          </span>
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl leading-tight">
            Find The Perfect <span className="text-amber-200">Rental</span>
          </h1>
          <p className="my-5 text-lg text-amber-100 max-w-xl mx-auto">
            Discover the perfect property that suits your needs.
          </p>
        </div>
        <PropertySearchForm />
      </div>
    </section>
  )
}
