// src/components/GameGrid.tsx
// import React from 'react'
import type { DisplayGame } from '../App'
import GameCard from './GameCard'

interface Props {
  games: DisplayGame[]
}

export default function GameGrid({ games }: Props) {
  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {games.length === 0 ? (
        <p className="text-gray-400 col-span-full text-center mt-8">
          No games found.
        </p>
      ) : (
        games.map((g) => <GameCard key={g.id} game={g} />)
      )}
    </div>
  )
}
