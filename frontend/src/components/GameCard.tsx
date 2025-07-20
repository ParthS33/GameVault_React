// src/components/GameCard.tsx
import { type ReactNode } from 'react'
import type { DisplayGame } from '../App'
import type { GamePlatform } from '../data/mockGames'
import { faSteam } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  game: DisplayGame
}

export default function GameCard({ game }: Props) {
  // map platform keys to icons
  const iconFor: Record<GamePlatform, ReactNode> = {
    epic: <p className="text-white font-bold text-xs">E</p>,
    steam: <FontAwesomeIcon icon={faSteam} className="text-white text-xs" />,
  }

  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
      <img
        src={game.coverUrl}
        alt={game.title}
        className="w-full h-auto object-cover aspect-[2/3] group-hover:opacity-75 transition-opacity duration-300"
      />

      {/* render one badge for each platform, offset them slightly from the right */}
      {game.platforms.map((platform, idx) => (
        <div
          key={platform}
          style={{ top: 8, right: 8 + idx * 28 }}
          className="absolute w-6 h-6 bg-black rounded-full flex items-center justify-center border-2 border-gray-700"
        >
          {iconFor[platform]}
        </div>
      ))}

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-sm font-semibold text-white truncate">
          {game.title}
        </h3>
      </div>
    </div>
  )
}
