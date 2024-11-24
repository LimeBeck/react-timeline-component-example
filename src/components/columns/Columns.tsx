import React from "react";
import "./Columns.css";

interface Column {
  content: React.ReactNode; // Содержимое колонки
  proportion?: number; // Пропорция ширины (опционально)
}

interface ColumnsProps {
  columns: Column[]; // Массив колонок
  gap?: number; // Отступ между колонками в пикселях
}

export const Columns: React.FC<ColumnsProps> = ({ columns, gap = 10 }) => {
  // Рассчитаем пропорции
  const totalProportion = columns.reduce((sum, col) => sum + (col.proportion || 1), 0);
  const columnStyles = columns.map(
    (col) => `${((col.proportion || 1) / totalProportion) * 100}%`
  );

  return (
    <div
      className="columns-container"
      style={{
        gridTemplateColumns: columnStyles.join(" "),
        gap: `${gap}px`,
      }}
    >
      {columns.map((col, index) => (
        <div key={index} className="column">
          {col.content}
        </div>
      ))}
    </div>
  );
};
