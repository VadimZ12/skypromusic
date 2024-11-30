"use client";

import { getFavoritesTracks, getPlaylistTracks, getToken } from "@/api/tracks";
import Playlist from "@/components/Playlist/Playlist";
import { useUser } from "@/hooks/useUser";
import { getValueFromLocalStorage } from "@/lib/getValueFromLS";
import { trackType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const [tracksData, setTracksData] = useState<trackType[]>([]);
  const { logout } = useUser();
  const router = useRouter();
  useEffect(() => {
    const token = getValueFromLocalStorage("token");
    getFavoritesTracks(token?.access)
      .then((data) => {
        setTracksData(data);
      })
      .catch((error) => {
        if (error.message === "401") {
          logout();
          router.push("/signin");
        } else {
          alert(error.message);
        }
      });
  }, []);
  return (
    <>
      <Playlist tracks={tracksData} playlist={tracksData} isFavorite={true} />
    </>
  );
}