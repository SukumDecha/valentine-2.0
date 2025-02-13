import React, { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import SongService from '@/services/song.service';
import Image from 'next/image';
import { useVinylFormStore } from '@/stores/vinyl-form.store';
import { ITrack } from '@/types/track';
import { motion } from 'framer-motion';
import Search from 'antd/es/input/Search';

interface RenderSongListProps {
  tracks: ITrack[] | null;
}

const RenderSongItem = ({ trackId, artistName, trackImage, trackName }: ITrack) => {
  const { form, setForm } = useVinylFormStore()
  const [isSelected, setIsSelected] = useState(false)

  const onClickHandler = () => {
    const selectedTrack: ITrack = {
      trackId,
      trackImage,
      trackName,
      artistName,
    }
    setForm("track", selectedTrack)
    setIsSelected(true)
  }

  return (
    <motion.div
      className={`flex gap-2 h-[64px] p-1 rounded-md cursor-pointer ${isSelected ? "bg-primary/10" : ""}`}
      onClick={onClickHandler}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: isSelected
          ? ["0 0 0 0px rgba(59, 130, 246, 0)", "0 0 0 4px rgba(59, 130, 246, 0.5)", "0 0 0 0px rgba(59, 130, 246, 0)"]
          : "none",
      }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src={trackImage || "/placeholder.svg"}
        alt="track-image"
        width={64}
        height={64}
        className="rounded-[4px]"
      />
      <div>
        <div className="font-bold">{trackName}</div>
        <div>{artistName}</div>
      </div>
    </motion.div>
  )
}

const RenderSongList = ({tracks}: RenderSongListProps) => {
  
  return (
    <div className='flex flex-col gap-2'>
      {tracks?.map(({trackId, artistName, trackImage, trackName}) => {
        return <RenderSongItem key={trackId} trackId={trackId} artistName={artistName} trackImage={trackImage} trackName={trackName}/>
      })}
    </div>
  )
}

const RenderNoSongFound = () => {
  return <div>No song found</div>
}

const SelectSongModal = () => {

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [foundTracks, setFoundTracks] = useState<ITrack[]>([])
  const [isError, setIsError] = useState<boolean>(false)
  
  const handleSearch = useCallback(
    _.debounce((query: string) => {
      SongService.searchTrack(query).then(res => {
        if (res.success && res.tracks) {
          setFoundTracks(res.tracks)
        } else {
          setIsError(true)
        }
      })
    }, 1000)
    , [])
  
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
    handleSearch(searchQuery)
  }
    
  return (
    <div className='flex flex-col'>
      <Search placeholder="ค้นหาเพลง..." style={{
        fontFamily: 'Prompt'
      }} onChange={onChangeHandler} />
      {
        ((isError ? <RenderNoSongFound /> : false) || (<RenderSongList tracks={foundTracks} />))
      }
    </div>
  )
}

export default SelectSongModal