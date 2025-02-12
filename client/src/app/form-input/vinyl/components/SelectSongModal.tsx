import React, { useCallback, useState } from 'react'
import _ from 'lodash'
import { searchTrack } from '@/services/song.service'

const SelectSongModal = () => {

  const [searchQuery, setSearchQuery] = useState<string>("")
  
  const handleSearch = useCallback(
    _.debounce((query: string) => {
      searchTrack(query).then(res => console.log(res))
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