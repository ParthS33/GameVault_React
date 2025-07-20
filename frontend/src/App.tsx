// src/App.tsx
import React, { useState, useMemo } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import GameGrid from './components/GameGrid'
import Modal from './components/Modal'
import { mockGames } from './data/mockGames'
import type { Game, GamePlatform } from './data/mockGames'
import useSync from './hooks/useSync'
import type { SyncTimestamps } from './hooks/useSync'


export type SyncPlatform = 'epic' | 'steam' | 'all'


export interface DisplayGame {
  id: number
  title: string
  coverUrl: string
  dateAdded: string
  platforms: GamePlatform[]
}

const App: React.FC = () => {
  
  const [view, setView] = useState<'library' | 'recent'>('library')
  const [search, setSearch] = useState('')

  
  const [modal, setModal] = useState<{
    open: boolean
    action: SyncPlatform
  }>({ open: false, action: 'epic' })

  
  const [timestamps, doSync]: [
    SyncTimestamps,
    (p: SyncPlatform) => Promise<void>
  ] = useSync()

  
  const [syncing, setSyncing] = useState<Record<SyncPlatform, boolean>>({
    epic: false,
    steam: false,
    all: false,
  })

 
  const [enabledPlatforms, setEnabledPlatforms] = useState<
    Record<GamePlatform, boolean>
  >({
    epic: true,
    steam: true,
  })

  const togglePlatform = (platform: GamePlatform) => {
    setEnabledPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }))
  }

  
  const gamesToShow: Game[] =
    view === 'recent'
      ? [...mockGames]
          .sort(
            (a, b) =>
              new Date(b.dateAdded).getTime() -
              new Date(a.dateAdded).getTime()
          )
          .slice(0, 5)
      : mockGames

 
  const filtered = gamesToShow
    .filter((g) =>
      g.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((g) =>
      enabledPlatforms[g.platform as GamePlatform]
    )

  
  const groupedGames: DisplayGame[] = useMemo(() => {
    const map = new Map<string, DisplayGame>()
    filtered.forEach((g) => {
      const key = g.title.toLowerCase()
      if (!map.has(key)) {
        map.set(key, {
          id: g.id,
          title: g.title,
          coverUrl: g.coverUrl,
          dateAdded: g.dateAdded,
          platforms: [g.platform as GamePlatform],
        })
      } else {
        const existing = map.get(key)!
        const p = g.platform as GamePlatform
        if (!existing.platforms.includes(p)) {
          existing.platforms.push(p)
        }
      }
    })
    return Array.from(map.values())
  }, [filtered])

  
  const handleConfirm = (platform: SyncPlatform) => {
    setModal({ open: false, action: platform })

    if (platform === 'all') {
      setSyncing({ epic: true, steam: true, all: true })
      Promise.all([doSync('epic'), doSync('steam')]).then(() => {
        setSyncing({ epic: false, steam: false, all: false })
      })
    } else {
      setSyncing((s) => ({ ...s, [platform]: true }))
      doSync(platform).then(() => {
        setSyncing((s) => ({ ...s, [platform]: false }))
      })
    }
  }

  return (
    <>
      <div className="flex h-screen">
        <Sidebar
          activeView={view}
          onViewChange={(v) => {
            setView(v)
            setSearch('')
          }}
          timestamps={timestamps}
          syncing={syncing}
          enabledPlatforms={enabledPlatforms}
          onPlatformToggle={togglePlatform}
          onSync={(platform) =>
            setModal({ open: true, action: platform })
          }
        />

        <main className="ml-64 flex-1 flex flex-col h-screen min-h-0">
          <Header search={search} onSearch={setSearch} />
          <div className="flex-1 overflow-y-auto overscroll-none touch-pan-y">
            <GameGrid games={groupedGames} />
          </div>
        </main>
      </div>

      <Modal
        isOpen={modal.open}
        title={`Sync ${modal.action}`}
        message="Are you sure you want to sync?"
        onCancel={() =>
          setModal({ open: false, action: modal.action })
        }
        onConfirm={() => handleConfirm(modal.action)}
      />
    </>
  )
}

export default App
