import React, { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import SongService from '@/services/song.service';
import Image from 'next/image';
import { useVinylFormStore } from '@/stores/vinyl-form.store';
import { ITrack } from '@/types/track';

interface RenderSongListProps {
  tracks: ITrack[] | null;
}

const RenderSongItem = ({trackId, artistName, trackImage, trackName}: ITrack) => {
  const {form, setForm} = useVinylFormStore()
  
  const onClickHandler = () => {
    const selectedTrack: ITrack = {
      trackId: trackId,
      trackImage: trackImage,
      trackName: trackName,
      artistName: artistName
    }
    setForm('track', selectedTrack)
  }
  
  return (
    <div className='flex gap-2 h-[64px]' onClick={onClickHandler}>
      <Image src={trackImage} alt='track-image' width={64} height={64} className='rounded-[4px]' />
      <div>
        <div className='font-bold'>{trackName}</div>
        <div>{artistName}</div>
      </div>
    </div>
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
      <input type="text" placeholder='ค้นหาเพลง...'  onChange={onChangeHandler}/>
      {
        ((isError ? <RenderNoSongFound /> : false) || (<RenderSongList tracks={foundTracks} />))
      }
    </div>
  )
}

export default SelectSongModal