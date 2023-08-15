interface propTypes extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...rest }: propTypes) => {
  return (
    <input
      {...rest}
      className={`bg-white focus:outline-none text-gray-800 dark:bg-gray-900 dark:text-gray-100 sm:text-sm focus:ring-1 rounded focus:ring-blue-600 block w-full p-2.5 pr-6 border dark:border-gray-600 focus:border-blue-600 ${rest.className}
        `}
    />
  );
};

export default Input;
