import { trackType, userType } from "@/types";
import { json } from "stream/consumers";

const apiUrl = "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/";
const apiUrPlaylist = "https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/";

export async function getTracks() {
  const res = await fetch(apiUrl);

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }

  const tracksResponse = await res.json()
  return tracksResponse.data; 
}

export async function getPlaylistTracks(id: string) {
  const res = await fetch(apiUrPlaylist + id, {next:{revalidate:1}});

  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await res.json();
  return data.items;
}

export async function getFavoritesTracks(token:string) {
  const res = await fetch(
    "https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(JSON.stringify(res.status));
  }
  const data = await res.json();
  return data;
}

export async function getToken({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const res = await fetch("https://webdev-music-003b5b991590.herokuapp.com/user/token/", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await res.json();
  return data;
}

export async function setLike(token: string, id:number) {
  const res = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await res.json();
  return data;
}

export async function setDislike(token: string, id:number) {
  const res = await fetch(`https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await res.json();
  return data;
}