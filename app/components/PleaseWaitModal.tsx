"use client";

import Sync from "@/components/svg/sync.svg";
import { Button } from "@/components/ui/button";
import React from "react";

const PleaseWaitModal = ({
  isOpen,
  setIsOpen,
  migrateTo,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  migrateTo: "Spotify" | "YouTube Music";
}) => {
  console.log(migrateTo);
  return (
    <div className="flex justify-center items-center h-screen">
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className={`bg-black shadow-xl   rounded-2xl py-5 px-8 flex flex-col justify-center max-w-xl w-full ${
              migrateTo === "YouTube Music"
                ? "shadow-green-500/20"
                : "shadow-red-500/20"
            }`}
          >
            {/* Modal content */}
            <h2 className="text-2xl font-semibold mb-4">
              {"We're working on it!"}
            </h2>
            <p className="text-zinc-300 mb-6">
              Please wait while we process your request. Migrating a playlist
              can take a while depending on the size of the playlist.
            </p>
            <p className="text-zinc-300 mb-6">
              Once migrated, you should see your playlist appear in {migrateTo}.
              <br />
              The{" "}
              <Sync
                className={`stroke-green-500 m-2 ${
                  migrateTo === "YouTube Music"
                    ? "fill-green-500"
                    : "fill-red-500"
                } inline-block h-4 w-4 `}
              />{" "}
              icon will stop spinning too.
            </p>

            {/* Confirmation Button */}
            <div className="flex justify-end">
              <Button
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 ${
                  migrateTo === "YouTube Music"
                    ? "bg-green-500 text-black hover:bg-green-600"
                    : "bg-red-500 text-white hover:bg-red-600"
                } font-semibold rounded-md `}
              >
                Okay
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PleaseWaitModal;
