import { useEffect, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import { FetchDataParams } from '../../../hooks/redux/useFetchWithPagination';
import FIcon from '../../Icons/FIcon';

interface Props {
  children?: React.ReactNode;
  changePage?: ({}: FetchDataParams) => any;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export default function AppPagination({
  currentPage,
  totalPages,
  changePage,
  totalItems,
  limit,
}: Props) {
  const [customLimit, setCustomLimit] = useState(limit);

  function handleLimitSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (customLimit < 1 || customLimit === limit) return;

    const PagesAccordingToCustomLimit = Math.ceil(totalItems / customLimit);
    const page =
      currentPage > PagesAccordingToCustomLimit
        ? PagesAccordingToCustomLimit
        : currentPage;

    changePage &&
      changePage({
        page,
        limit: customLimit || limit,
      });
  }

  function handleChangeButton(page: number) {
    changePage &&
      changePage({
        page,
        limit: customLimit || limit,
      });
  }

  useEffect(() => {
    setCustomLimit(limit);
  }, [limit]);

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <form onSubmit={handleLimitSubmit} className="flex flex-col gap-1">
        <p className="mr-2 text-sm">Show Per Page</p>
        <div className="flex items-center">
          <input
            type="number"
            className="h-8 w-20 border px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:border-transparent dark:bg-graydark"
            placeholder="Limit"
            value={customLimit}
            onChange={(e) =>
              setCustomLimit(
                Number(e.target.value) > 0 ? Number(e.target.value) : 1
              )
            }
          />
          <button
            title="submit"
            className="h-8 w-8 bg-blue-600 text-white focus:ring"
          >
            <FIcon icon="check" />
          </button>
        </div>
      </form>

      <div className="max-w-[600px]">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={handleChangeButton}
        />
      </div>
    </div>
  );
}
