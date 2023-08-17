import Pagination, {
  ResponsivePaginationProps,
} from "react-responsive-pagination";

interface Props extends ResponsivePaginationProps {}

export default function ResponsivePagination({ ...all }: Props) {
  return <Pagination {...all} />;
}
