import { useState, useMemo, useCallback } from "react";

import {
  TBaseTableData,
  TSortColumn,
  TTableColumn,
  TTableProps,
} from "./types";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faChevronLeft,
  faChevronRight,
  faEllipsisV,
  faSortAmountDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Table<T extends TBaseTableData>({
  title,
  data,
  columns,
  pageSizeOptions = [2, 10, 20, 50, 100],
  defaultPageSize = 2,
  actions = [],
}: TTableProps<T>): JSX.Element {
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [pageNumber, setPageNumber] = useState(0);
  const [selections, setSelections] = useState<T[]>([]);
  const [sortColumn, setSortColumn] = useState<TSortColumn<T> | null>(null);

  const visibleIndex = useMemo(() => {
    return [
      pageSize * pageNumber,
      Math.min(pageSize * (pageNumber + 1) - 1, data.length - 1),
    ];
  }, [pageSize, pageNumber, data]);

  const visibleData = useMemo(() => {
    return data
      .slice()
      .sort((item1, item2) => {
        if (sortColumn) {
          return sortColumn.getter(item1) > sortColumn.getter(item2)
            ? sortColumn.direction === "asc"
              ? 1
              : -1
            : sortColumn.getter(item1) < sortColumn.getter(item2)
            ? sortColumn.direction === "asc"
              ? -1
              : 1
            : 0;
        } else {
          return 1;
        }
      })
      .slice(visibleIndex[0], visibleIndex[1] + 1);
  }, [visibleIndex, sortColumn, data]);

  const onPrevPage = useCallback(() => {
    setSelections([]);
    setPageNumber((pageNumber) => (pageNumber > 0 ? pageNumber - 1 : 0));
  }, []);
  const onNextPage = useCallback(() => {
    setSelections([]);
    setPageNumber((pageNumber) =>
      (pageNumber + 1) * pageSize >= data.length ? pageNumber : pageNumber + 1
    );
  }, [pageSize, data]);
  const onChangePageSize = useCallback(
    (newPageSize: number) => {
      const newPageNumber = Math.floor(visibleIndex[0] / newPageSize);
      setPageSize(newPageSize);
      setPageNumber(newPageNumber);
      setSelections([]);
    },
    [visibleIndex]
  );
  const onHeaderClick = useCallback(
    (column: TTableColumn<T>) => {
      setSelections([]);
      if (sortColumn === null || column.caption !== sortColumn.caption) {
        setSortColumn({
          ...column,
          direction: "asc",
        });
      } else if (column.caption === sortColumn.caption) {
        if (sortColumn.direction === "asc") {
          setSortColumn({ ...column, direction: "desc" });
        } else {
          setSortColumn(null);
        }
      }
    },
    [sortColumn]
  );

  return (
    <div className="app-table app-table__container">
      <div className="app-table__header">
        <span className="app-table__title">{title}</span>
        <div className="app-table__toolbar">
          <button className="app-table__button" onClick={() => alert("To do!")}>
            <FontAwesomeIcon icon={faSortAmountDown} />
          </button>
          <button className="app-table__button" onClick={() => alert("To do!")}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>
      </div>

      <table className="app-table__content">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  visibleData
                    .map((data) => selections.includes(data.id))
                    .every((x) => x === true)
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelections(visibleData.map((data) => data.id));
                  } else {
                    setSelections([]);
                  }
                }}
              />
            </th>
            {columns.map((column, colIndex) => {
              return (
                <th
                  key={`th-$${colIndex}`}
                  className={
                    column.caption === sortColumn?.caption ? "sort" : ""
                  }
                  onClick={() => onHeaderClick(column)}
                >
                  {sortColumn && column.caption === sortColumn.caption && (
                    <FontAwesomeIcon
                      icon={
                        sortColumn.direction === "asc" ? faArrowUp : faArrowDown
                      }
                    />
                  )}
                  {column.caption}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item, rowIndex) => {
            return (
              <tr
                role="row"
                data-testid={`row-${rowIndex}`}
                key={`tr-${item.id}`}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selections.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelections((prevSelections) => [
                          ...prevSelections,
                          item.id,
                        ]);
                      } else {
                        setSelections((prevSelections) =>
                          prevSelections.filter((id) => id !== item.id)
                        );
                      }
                    }}
                  />
                </td>
                {columns.map((column, colIndex) => {
                  return (
                    <td
                      data-testid={`col-${column.caption}`}
                      key={`td-${item.id}-$${colIndex}`}
                    >
                      {column.format
                        ? column.format(column.getter(item), item)
                        : column.getter(item)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="app-table__footer">
        <div className="app-table__footer__pagination">
          <label className="label">Rows per page:</label>
          <select
            className="control"
            value={pageSize}
            onChange={(e) => onChangePageSize(+e.target.value)}
          >
            {pageSizeOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>

          <span className="pagination-range">
            {visibleIndex[0] + 1}-{visibleIndex[1] + 1} of {data.length}
          </span>

          <button
            className="app-table__button"
            disabled={pageNumber === 0}
            onClick={onPrevPage}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            className="app-table__button"
            disabled={(pageNumber + 1) * pageSize >= data.length}
            onClick={onNextPage}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
}
