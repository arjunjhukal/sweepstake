import React from 'react'
import LotifyLoading from '../atom/LotifyLoading'

export default function GlobalLoading() {
  return (
      <div className="flex items-center justify-center h-[80vh]">
          <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40">
                  <LotifyLoading />
              </div>
              <p className="mt-6 text-gray-700 dark:text-gray-300 font-semibold text-lg animate-pulse tracking-wide">
                  Loading<span className="text-primary">...</span>
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Please wait while we prepare your content
              </p>
          </div>
      </div>
  )
}
