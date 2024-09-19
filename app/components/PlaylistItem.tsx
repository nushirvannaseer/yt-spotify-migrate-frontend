import Image from "next/image";
import React from "react";

const PlaylistItem = ({
  image,
  title,
  description,
  owner,
  onClick,
  isSpotify,
}: {
  image: string;
  title: string;
  description: string;
  owner: string;
  onClick?: () => void;
  isSpotify?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={`min-h-32 max-h-32 my-3 p-3 rounded-lg hover:cursor-pointer hover:scale-[99%] transition-all duration-300 hover:shadow-md grid grid-cols-12 gap-2 w-full ${
        isSpotify
          ? "hover:shadow-green-950 hover:bg-green-900/5"
          : "hover:shadow-red-950 hover:bg-red-500/5"
      }`}
    >
      <div className="col-span-3 m-auto">
        <Image
          src={image}
          alt={title}
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 col-span-9">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-gray-500 text-ellipsis line-clamp-2">
          {description}
        </p>
        <p className="text-sm text-gray-500">{owner}</p>
      </div>
    </div>
  );
};

export default PlaylistItem;
