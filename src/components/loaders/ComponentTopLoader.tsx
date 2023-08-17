import CustomTopProgressBar from './CustomTopProgressBar';

export default function ComponentTopLoader({ loading }: { loading?: boolean }) {
  return (
    <div className="absolute top-0 left-0 z-[9999] w-full">
      <CustomTopProgressBar loading={loading} />
    </div>
  );
}
