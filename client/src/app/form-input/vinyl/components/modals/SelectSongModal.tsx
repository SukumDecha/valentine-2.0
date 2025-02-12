import React, { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { searchTrack } from '@/services/song.service'
import { Track } from '@/types/service/main'
import Image from 'next/image';
import { useVinylFormStore } from '@/stores/vinyl-form.store';

interface RenderSongListProps {
  tracks: Track[] | null;
}

const RenderSongItem = ({trackId, artistName, trackImage, trackName}: Track) => {
  const {form, setForm} = useVinylFormStore()

  useEffect(() => {
    console.log(form)
  }, [form])
  
  const onClickHandler = () => {
    const selectedTrack: Track = {
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
      }) || <div>No songs found</div>}
    </div>
  )
}

const SelectSongModal = () => {

  const [searchQuery, setSearchQuery] = useState<string>("")
  const [foundTracks, setFoundTracks] = useState<Track[] | null>(null)
  
  const handleSearch = useCallback(
    _.debounce((query: string) => {
      searchTrack(query).then(res => {
        if (res.success) {
          setFoundTracks(res.tracks || null)
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
      <RenderSongList tracks={foundTracks} />
    </div>
  )
}

export default SelectSongModal