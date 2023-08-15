interface props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ ...rest }: props) => {
  return (
    <textarea
      {...rest}
      className={`bg-white focus:outline-none text-gray-800 dark:bg-gray-900 dark:border-gray-600  dark:text-gray-100 sm:text-sm focus:ring-1 rounded focus:ring-blue-600 block w-full p-2.5 border min-h-[120px] ${rest.className}

  `}
    ></textarea>
  );
};

export default Textarea;
