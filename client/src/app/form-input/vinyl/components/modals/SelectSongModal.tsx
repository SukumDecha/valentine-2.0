import React, { useCallback, useState } from 'react';
import _ from 'lodash';
import { Typography, Input, Button, Tooltip } from 'antd';
import SongService from '@/services/song.service';
import Image from 'next/image';
import { useVinylFormStore } from '@/stores/vinyl-form.store';
import { ITrack } from '@/types/track';
import { PlusOutlined } from '@ant-design/icons'

const { Search } = Input;

const RenderSongItem = ({ trackId, artistName, trackImage, trackName }: ITrack) => {
  const { setForm } = useVinylFormStore();
  const [isSelected, setIsSelected] = useState(false);

  const onClickHandler = () => {
    const selectedTrack: ITrack = { trackId, trackImage, trackName, artistName };
    setForm('track', selectedTrack);
    setIsSelected(true);
  };

  return (
    <div className="flex items-center bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 space-x-4 mb-4 cursor-pointer" onClick={onClickHandler}>
      {/* Thumbnail */}
      <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={trackImage || '/placeholder.svg'}
          alt={trackName}
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-white font-semibold text-base truncate">
          {trackName}
        </div>
        <div className="text-sm text-gray-400 truncate">{artistName}</div>
      </div>

      {/* Select Button */}
      <Tooltip title={isSelected ? 'Already selected' : 'Select track'}>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          className="flex-shrink-0"
        />
      </Tooltip>
    </div>
  );
};


const RenderSongList = ({ tracks }: { tracks: ITrack[] | null }) => (
  <div className="flex flex-col gap-2">
    {tracks?.map(track => (
      <RenderSongItem key={track.trackId} {...track} />
    ))}
  </div>
);

const RenderNoSongFound = () => (
  <div className="text-center text-gray-500 py-4">No song found</div>
);

const SelectSongModal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundTracks, setFoundTracks] = useState<ITrack[]>([]);
  const [isError, setIsError] = useState(false);

  const handleSearch = useCallback(
    _.debounce(async (query: string) => {
      try {
        const res = await SongService.searchTrack(query);
        if (res.success && res.tracks) {
          setFoundTracks(res.tracks);
          setIsError(false);
        } else {
          setIsError(true);
        }
      } catch {
        setIsError(true);
      }
    }, 1000),
    []
  );

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <Search
        placeholder="ค้นหาเพลง..."
        style={{ fontFamily: 'Prompt' }}
        onChange={onChangeHandler}
      />
      {isError ? <RenderNoSongFound /> : <RenderSongList tracks={foundTracks} />}
    </div>
  );
};

export default SelectSongModal;