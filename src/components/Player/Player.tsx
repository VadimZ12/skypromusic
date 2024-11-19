"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "./Player.module.css";
import classNames from "classnames";
import ProgressBar from "../ProgressBar/ProgressBar";
import VolumeBar from "../VolumeBar/VolumeBar";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  setInitialTracks,
  setNextTrack,
  setPrevtrack,
  toggleIsPlaying,
  toggleShuffle,
} from "@/store/features/playlistSlice";
import { FormatSeconds } from "@/lib/FormatSeconds";
import { useUser } from "@/hooks/useUser";
import { getTracks, setDislike, setLike } from "@/api/tracks";
import { getValueFromLocalStorage } from "@/lib/getValueFromLS";

export default function Player() {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);
  const dispatch = useAppDispatch();
  const audioRef = useRef<null | HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  const [isLooped, setIsLooped] = useState<boolean>(false);
  const { isShuffle } = useAppSelector((store) => store.playlist);
  const { isPlaying } = useAppSelector((store) => store.playlist);
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState<any>();
  const token = getValueFromLocalStorage("token");

  const duration = audioRef.current?.duration;
  useEffect(() => {
    setIsLiked(() => {
      const isLikedByUser =
        currentTrack?.isFavorite ||
        currentTrack?.staredUser.find((userId) => userId === user?.id);
      setIsLiked(isLikedByUser);
    });
  }, [currentTrack, user?.id]);
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      dispatch(toggleIsPlaying(!isPlaying));
    }
  };

  const toggleRepeat = () => {
    setIsLooped(!isLooped);
  };

  useEffect(() => {
    if (audioRef.current) {
      if (!isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isLooped) {
        audioRef.current.loop = true;
      } else {
        audioRef.current.loop = false;
      }
    }
  }, [isLooped]);

  useEffect(() => {
    audioRef.current?.addEventListener("timeupdate", () =>
      setCurrentTime(audioRef.current!.currentTime)
    );
  }, []);

  // useEffect(() => {
  //   if (duration) {
  //     if (currentTime >= duration) {
  //       dispatch(setNextTrack());
  //     }
  //   }
  // }, [dispatch, currentTime]);

  const handleSeek = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      setCurrentTime(Number(event.target.value));
      audioRef.current.currentTime = Number(event.target.value);
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const changeVolume = (e: any) => {
    setVolume(e.target.value);
  };

  const handleLikeClick = () => {
    if (currentTrack) {
      isLiked
        ? setDislike(token.access, currentTrack?._id).then(() => {
            getTracks(). then((data) => {
              dispatch(setInitialTracks({ initialTracks: data }));
            });
          })
        : setLike(token.access, currentTrack?._id).then(() => {
          getTracks(). then((data) => {
            dispatch(setInitialTracks({ initialTracks: data }));
          });
        });
      setIsLiked(!isLiked);
    }
  };

  return (
    <>
      {currentTrack && (
        <div className={styles.bar}>
          <div className={styles.barContent}>
            <audio
              ref={audioRef}
              src={currentTrack.track_file}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onEnded={() => dispatch(setNextTrack())}
            ></audio>
            <div className={styles.timeLine}>
              {FormatSeconds(currentTime)} / {FormatSeconds(duration)}
            </div>
            <ProgressBar
              max={duration || 0}
              value={currentTime}
              step={0.01}
              onChange={handleSeek}
            />
            <div className={styles.barPlayerBlock}>
              <div className={styles.barPlayer}>
                <div className={styles.playerControls}>
                  <div
                    onClick={() => dispatch(setPrevtrack())}
                    className={styles.playerBtnPrev}
                  >
                    <svg className={styles.playerBtnPrevSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
                    </svg>
                  </div>
                  <div
                    onClick={togglePlay}
                    className={classNames(styles.playerBtnPlay, styles.btn)}
                  >
                    <svg className={styles.playerBtnPlaySvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isPlaying ? "icon-pause" : "icon-play"
                        }`}
                      />
                    </svg>
                  </div>
                  <div
                    onClick={() => dispatch(setNextTrack())}
                    className={styles.playerBtnNext}
                  >
                    <svg className={styles.playerBtnNextSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-next" />
                    </svg>
                  </div>
                  <div
                    onClick={toggleRepeat}
                    className={classNames(
                      styles.playerBtnRepeat,
                      styles.BtnIcon
                    )}
                  >
                    <svg className={styles.playerBtnRepeatSvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isLooped ? "icon-repeat-active" : "icon-repeat"
                        }`}
                      />
                    </svg>
                  </div>
                  <div
                    className={classNames(
                      styles.playerBtnShuffle,
                      styles.BtnIcon
                    )}
                    onClick={() => dispatch(toggleShuffle())}
                  >
                    <svg className={styles.playerBtnShuffleSvg}>
                      <use
                        xlinkHref={`/img/icon/sprite.svg#${
                          isShuffle ? "icon-shuffle-active" : "icon-shuffle"
                        }`}
                      />
                    </svg>
                  </div>
                </div>
                <div className={styles.playerTrackPlay}>
                  <div className={styles.trackPlayContain}>
                    <div className={styles.trackPlayImage}>
                      <svg className={styles.trackPlaySvg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-note" />
                      </svg>
                    </div>
                    <div className={styles.trackPlayAuthor}>
                      <a className={styles.trackPlayAuthorLink} href="http://">
                        {currentTrack.name}
                      </a>
                    </div>
                    <div className={styles.trackPlayAlbum}>
                      <a className={styles.trackPlayAlbumLink} href="http://">
                        {currentTrack.author}
                      </a>
                    </div>
                  </div>
                  <div className={styles.trackPlayLikeDis}>
                    <div
                      onClick={handleLikeClick}
                      className={classNames(
                        styles.trackPlayLike,
                        styles.BtnIcon
                      )}
                    >
                      <svg className={styles.trackPlayLikeSvg}>
                        <use
                          xlinkHref={`/img/icon/sprite.svg#${
                            isLiked ? "icon-dislike" : "icon-like"
                          }`}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.barVolumeBlock}>
                <div className={styles.volumeContent}>
                  <div className={styles.volumeImage}>
                    <svg className={styles.volumeSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
                    </svg>
                  </div>
                  <div
                    className={classNames(styles.volumeProgress, styles.btn)}
                  >
                    <VolumeBar
                      step={0.01}
                      volume={volume}
                      onChange={changeVolume}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}