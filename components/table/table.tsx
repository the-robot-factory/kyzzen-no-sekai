'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState, useCallback, JSX} from 'react';
// import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import styles from './table.module.css';

interface TableHeader {
  name?: React.ReactNode;
  accessor?: string;
  colspan?: number;
  rowspan?: number;
  className?: string;
}

interface TableProps {
  body: any[];
  head?: React.ReactNode[];
  header?: TableHeader[];
  subHeader?: TableHeader[];
  accessor?: string[];
  isLoading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  offset?: number;
  refetch?: () => void;
  isRow?: boolean;
  Row?: any;
  rowProps?: any;
  setOffset?: React.Dispatch<React.SetStateAction<number>>;
  renderSkeletonLoader?: () => JSX.Element;
  parentHeight?: number | null;
}

type SortOrder = 'asc' | 'desc';

const Table: React.FC<TableProps> = ({
  body,
  className,
  isLoading,
  refetch,
  style,
  isRow,
  subHeader,
  Row,
  rowProps,
  header,
  setOffset,
  renderSkeletonLoader,
  parentHeight,
}) => {
  const [isEnd, setIsEnd] = useState(false);
  const [sortedData, setSortedData] = useState(body);
  const [limit, setLimit] = useState(30);
  const [sortConfig, setSortConfig] = useState<{
    accessor: string;
    direction: SortOrder;
  }>({
    accessor: 'marketCap',
    direction: 'desc',
  });

  useEffect(() => setSortedData(body), [body]);

  const handleScroll = useCallback(
    async (e: React.UIEvent<HTMLDivElement>) => {
      const {scrollTop, clientHeight, scrollHeight} = e.currentTarget;
      const bottom = Math.abs(scrollHeight - (scrollTop + clientHeight)) < 1;

      if (bottom && setOffset) {
        setOffset((prev: number) => prev + 100);
        if (!isEnd && refetch) {
          if (body.length === sortedData.length) setIsEnd(true);
        }
      }

      if (bottom && !refetch) setLimit(prev => prev + 30);
    },
    [isEnd, refetch, setOffset, body.length, sortedData.length],
  );

  const requestSort = useCallback(
    (accessor: string) => {
      const direction: SortOrder = sortConfig.accessor === accessor && sortConfig.direction === 'desc' ? 'asc' : 'desc';
      setSortConfig({accessor, direction});

      const sorted = [...body].sort((a, b) => {
        const valA = typeof a[accessor] === 'string' ? a[accessor].toLowerCase() : +a[accessor];
        const valB = typeof b[accessor] === 'string' ? b[accessor].toLowerCase() : +b[accessor];
        return direction === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
      });

      setSortedData(sorted);
    },
    [body, sortConfig],
  );

  const tableHeight = `calc(100vh - ${parentHeight ? parentHeight + 175 : 175}px)`;

  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <div className={styles.tableWrapper} style={{height: tableHeight, ...style}} onScroll={!isEnd ? handleScroll : undefined}>
        <table className={styles.table}>
          {header && (
            <thead className={styles.header}>
              <tr>
                {header.map((item, idx) => (
                  <th
                    key={`head-${idx}`}
                    className={`${styles.headerCell} ${item.className || ''}`}
                    colSpan={item.colspan}
                    rowSpan={item.rowspan}
                    onClick={() => item.accessor && requestSort(item.accessor)}
                  >
                    {item.accessor ? (
                      <div className={styles.sortableHeader}>
                        {item.name}
                        {/* {sortConfig.accessor === item.accessor ? (
                            sortConfig.direction === "asc" ? (
                              <FaSortUp className={styles.sortIcon} />
                            ) : (
                              <FaSortDown className={styles.sortIcon} />
                            )
                          ) : (
                            <FaSort className={styles.sortIconInactive} />
                          )} */}
                      </div>
                    ) : (
                      item.name
                    )}
                  </th>
                ))}
              </tr>
              {subHeader && (
                <tr className={styles.subHeader}>
                  {subHeader.map((item, idx) => (
                    <th key={`subhead-${idx}`} className={styles.subHeaderCell} colSpan={item.colspan}>
                      {item.name}
                    </th>
                  ))}
                </tr>
              )}
            </thead>
          )}
          <tbody className={styles.body}>
            {!isLoading ? (
              <>
                {isRow &&
                  (refetch ? sortedData : sortedData.slice(0, limit)).map((item, idx) => (
                    <Row key={`row-${idx}`} data={item} idx={idx} {...rowProps} />
                  ))}
                {!isRow &&
                  (refetch ? body : body.slice(0, limit)).map((item, idx) => (
                    <tr key={`row-${idx}`} className={styles.row}>
                      {Object.entries(item).map(([key, value], index) => (
                        <td key={`cell-${index}`} className={styles.cell}>
                          {value as React.ReactNode}
                        </td>
                      ))}
                    </tr>
                  ))}
              </>
            ) : (
              renderSkeletonLoader?.()
            )}
          </tbody>
        </table>
        {!isLoading && body.length === 0 && <div className={styles.emptyState}>No Data</div>}
      </div>
    </div>
  );
};

export default React.memo(Table);
