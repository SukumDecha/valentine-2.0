import React, { useCallback, useState } from 'react'
import _ from 'lodash'
import { searchTrack } from '@/services/song.service'
import { Track } from '@/types/service/main'

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
    <div>
      <input type="text" placeholder='ค้นหาเพลง...'  onChange={onChangeHandler}/>
    </div>
  )
}

export default SelectSongModal