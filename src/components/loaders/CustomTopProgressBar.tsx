import React from 'react';

interface Props {
  loading?: boolean;
}

export default function CustomTopProgressBar({ loading }: Props) {
  const progressbar = React.useRef<HTMLDivElement>(null);
  const [progressing, setProgressing] = React.useState(false);

  React.useEffect(() => {
    loading
      ? setProgressing(true)
      : setTimeout(() => {
          setProgressing(false);
        }, 1100);
  }, [loading]);

  React.useEffect(() => {
    if (!progressbar.current) return;

    if (progressing) {
      progressbar.current.classList.add('animate-progressWidth');
      progressbar.current.classList.add('opacity-100');
    } else {
      progressbar.current.classList.remove('opacity-100');
      progressbar.current.classList.add('opacity-0');
      progressbar.current.style.width = '0';
      setTimeout(() => {
        progressbar.current &&
          progressbar.current.classList.remove('animate-progressWidth');
      }, 2000);
    }
  }, [loading, progressing]);

  return (
    <div className="w-full transition-all">
      <div
        ref={progressbar}
        className="h-1 w-0 rounded-r bg-blue-600 transition-all"
      ></div>
    </div>
  );
}
