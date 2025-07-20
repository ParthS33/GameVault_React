// src/components/Sidebar.tsx
// import React from 'react'
import type { SyncTimestamps } from '../hooks/useSync'
import { formatRelativeTime } from '../utils/formatRelativeTime'
import type { SyncPlatform} from '../App'
import type { GamePlatform } from '../data/mockGames'

interface Props {
  activeView: 'library' | 'recent'
  onViewChange: (v: 'library' | 'recent') => void
  timestamps: SyncTimestamps
  syncing: Record<SyncPlatform, boolean>
  enabledPlatforms: Record<GamePlatform, boolean>
  onPlatformToggle: (platform: GamePlatform) => void
  onSync: (platform: SyncPlatform) => void
}

export default function Sidebar({
  activeView,
  onViewChange,
  timestamps,
  syncing,
  enabledPlatforms,
  onPlatformToggle,
  onSync,
}: Props) {
  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-700/50 flex flex-col p-4 fixed h-full">
      <div className="flex items-center gap-3 mb-8">
        <i className="fas fa-dice-d20 text-indigo-400 text-2xl" />
        <h1 className="text-xl font-bold text-white">GameVault</h1>
      </div>

      <nav className="flex flex-col space-y-2">
        <a
          href="#"
          onClick={e => { e.preventDefault(); onViewChange('library') }}
          className={`nav-link flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${
            activeView === 'library'
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
          }`}
        >
          <i className="fas fa-gamepad w-5 text-center" />
          <span>Library</span>
        </a>
        <a
          href="#"
          onClick={e => { e.preventDefault(); onViewChange('recent') }}
          className={`nav-link flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md ${
            activeView === 'recent'
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
          }`}
        >
          <i className="fas fa-history w-5 text-center" />
          <span>Recently Added</span>
        </a>
        <a
          href="#"
          className="nav-link flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-400 opacity-50 cursor-not-allowed"
        >
          <i className="fas fa-store w-5 text-center" />
          <span>
            Store <span className="text-xs text-gray-500">(Planned)</span>
          </span>
        </a>
      </nav>

      <div className="mt-8 flex-grow">
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Platforms
        </h3>
        <div className="space-y-3 px-3">
          {/* Epic Games */}
          <div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-indigo-500 focus:ring-indigo-600"
                  checked={enabledPlatforms.epic}
                  onChange={() => onPlatformToggle('epic')}
                />
                <span className="text-sm">Epic Games</span>
              </label>
              <button
                onClick={() => onSync('epic')}
                disabled={syncing.epic}
                className="individual-sync-btn text-gray-500 hover:text-white transition-colors duration-200"
                title="Sync Epic Games"
              >
                <i
                  className={`fas fa-sync-alt text-xs ${
                    syncing.epic ? 'animate-spin text-green-500' : ''
                  }`}
                />
              </button>
            </div>
            <div className="pl-7 text-xs text-gray-500 mt-1">
              Last synced: {formatRelativeTime(timestamps.epic)}
            </div>
          </div>

          {/* Steam */}
          <div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-indigo-500 focus:ring-indigo-600"
                  checked={enabledPlatforms.steam}
                  onChange={() => onPlatformToggle('steam')}
                />
                <span className="text-sm">Steam</span>
              </label>
              <button
                onClick={() => onSync('steam')}
                disabled={syncing.steam}
                className="individual-sync-btn text-gray-500 hover:text-white transition-colors duration-200"
                title="Sync Steam"
              >
                <i
                  className={`fas fa-sync-alt text-xs ${
                    syncing.steam ? 'animate-spin text-green-500' : ''
                  }`}
                />
              </button>
            </div>
            <div className="pl-7 text-xs text-gray-500 mt-1">
              Last synced: {formatRelativeTime(timestamps.steam)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto px-3">
        <button
          onClick={() => onSync('all')}
          disabled={syncing.all}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <i
            className={`fas fa-sync-alt ${
              syncing.all ? 'animate-spin text-green-500' : ''
            }`}
          />
          <span>{syncing.all ? 'Syncing...' : 'Sync All Platforms'}</span>
        </button>
      </div>
    </aside>
  )
}
