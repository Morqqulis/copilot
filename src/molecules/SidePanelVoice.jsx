'use client';

import VoiceTrackingContext from '@/contexts/VoiceTrackingContext';
import { useContext, useState } from 'react';

export default function SidePanelNewsWeather() {
  const [previous, setPrevious] = useState({ title: '', artist: '' });
  const [follow, setFollow] = useState({ title: '', artist: '' });
  const { update } = useContext(VoiceTrackingContext);

  update('previous', previous);
  update('follow', follow);

  return (
    <div className="w-full">
      <ul className="flex flex-col gap-2 text-center">
        <TextInput
          label="Type in previous song - title"
          value={previous.title}
          onChange={(e) =>
            setPrevious((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <TextInput
          label="Type in previous song - artist"
          value={previous.artist}
          onChange={(e) =>
            setPrevious((prev) => ({ ...prev, artist: e.target.value }))
          }
        />
        <li className="py-2 border border-red-600 rounded-md text-red-600 uppercase">
          {'<radio copilot>'}
        </li>
        <TextInput
          label="Type in following song - title"
          value={follow.title}
          onChange={(e) =>
            setFollow((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <TextInput
          label="Type in following song - artist"
          value={follow.artist}
          onChange={(e) =>
            setFollow((prev) => ({ ...prev, artist: e.target.value }))
          }
        />
      </ul>
    </div>
  );
}

function TextInput({ label, value, onChange }) {
  return (
    <input
      className="bg-bigBg px-5 py-2 border-0 rounded-md ring-inset"
      type="text"
      placeholder={label}
      value={value}
      onChange={onChange}
    />
  );
}
