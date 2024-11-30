"use client";

import { trackType } from "@/types";
import styles from "./Track.module.css";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setCurrentTrack,
  toggleIsPlaying,
} from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { FormatSeconds } from "@/lib/FormatSeconds";
import { setDislike, setLike } from "@/api/tracks";
import { getValueFromLocalStorage } from "@/lib/getValueFromLS";

type TrackType = {
  track: trackType;
  tracksData: trackType[];
  isFavorite?: boolean;
};

export default function Track({ track, tracksData, isFavorite }: TrackType) {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const { name, author, album, duration_in_seconds, _id } = track;
  const isTrackSelected = currentTrack ? currentTrack._id === track._id : false; // для инициализации играющего трека в плейлисте
  const { isPlaying } = useAppSelector((store) => store.playlist);
  const { user } = useUser();
  const token = getValueFromLocalStorage("token");
  const isLikedByUser =
    isFavorite || track.staredUser.find((userId) => userId === user?.id);
  const dispatch = useAppDispatch();
  const [isLiked, setIsLiked] = useState(!!isLikedByUser);
  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track: { ...track, isFavorite }, tracksData }));
    dispatch(toggleIsPlaying(true));
  };

  const handleLikeClick = () => {
    if (!token.access) {
      return alert("Авторизуйтесь, чтобы ставить лайк!");
    }
    isLiked ? setDislike(token.access, _id) : setLike(token.access, _id);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const isLikedByUser =
    isFavorite || track.staredUser.find((userId) => userId === user?.id);
    setIsLiked(!isLikedByUser);
  },[isFavorite, track, user?.id]);

  return (
    <div className={styles.playlistItem}>
      <div className={classNames(styles.playlistTrack)}>
        <div onClick={handleTrackClick} className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {currentTrack?._id === track._id && (
              <div
                className={`${
                  isTrackSelected && isPlaying ? styles.playingDot : styles.stoppedDot
                }`}
              ></div>
            )}
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <a className={styles.trackTitleLink}>
              {name} <span className={styles.trackTitleSpan} />
            </a>
          </div>
        </div>
        <div onClick={handleTrackClick} className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink}>{author}</a>
        </div>
        <div onClick={handleTrackClick} className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink}>{album}</a>
        </div>
        <div onClick={handleLikeClick}>
          <svg className={styles.trackTimeSvg}>
            <use
              xlinkHref={`/img/icon/sprite.svg#${
                isLiked ? "icon-like" : "icon-dislike"
              }`}
            />
          </svg>
        </div>
        <div className={styles.trackTime}>
          <span className={styles.trackTimeText}>
            {FormatSeconds(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}