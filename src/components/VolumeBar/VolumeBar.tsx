import { ChangeEvent } from "react";
import styles from "./VolumeBar.module.css";

type VolumeBarType = {
  volume: number;
  step: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function VolumeBar({ volume, step, onChange }: VolumeBarType) {
  return (
    <input
      className={styles.styledProgressInput} // Применение стилей к ползунку
      type="range" // Тип элемента - ползунок
      min="0" // Минимальное значение ползунка
      max="1" // Максимальное значение, зависит от длительности аудио
      value={volume} // Текущее значение ползунка
      step={step} // Шаг изменения значения
      onChange={onChange} // Обработчик события изменения
    />
  );
}