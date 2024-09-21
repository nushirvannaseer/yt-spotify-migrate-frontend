import React from "react";
import Image from "next/image";

const SongItem = ({
  title,
  artist,
  album,
  image,
  isSelected = false,
  isSpotify = true,
}: {
  title: string;
  artist: string;
  album: string;
  image: string;
  isSelected?: boolean;
  isSpotify?: boolean;
}) => {
  return (
    <div
      className={`flex flex-row gap-4 rounded-lg p-2 cursor-pointer ${
        isSpotify
          ? `hover:shadow-md hover:shadow-green-500/20  ${
              isSelected
                ? " bg-green-500/20 hover:shadow-none hover:bg-green-600/10"
                : ""
            }`
          : `hover:shadow-md hover:shadow-red-500/20 ${
              isSelected
                ? " bg-red-500/20 hover:shadow-none  hover:bg-red-600/10"
                : ""
            }`
      }`}
    >
      <Image
        src={image}
        alt={title}
        width={100}
        height={50}
        className="h-20 w-20 object-cover"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold text-ellipsis line-clamp-1">
          {title}
        </h1>
        <p className="text-sm text-gray-500 text-ellipsis line-clamp-1">
          {artist}
        </p>
        <p className="text-sm text-gray-500 text-ellipsis line-clamp-1">
          {album}
        </p>
      </div>
    </div>
  );
};

export default SongItem;
