import FIcon from "@/common/FIcon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Props {
  title: string;
  value?: number | string;
  currency?: string;
  sub_title?: string;
  bg?: string;
  href: string;
  icon: IconProp;
}

export default function DashboardCard({
  href,
  bg,
  value,
  title,
  sub_title,
  icon,
  currency,
}: Props) {
  return (
    <a href={href}>
      <div className="dashboard-card group relative h-40 w-full overflow-hidden rounded-lg bg-cover bg-center shadow-lg transition duration-300 ease-in-out">
        <div
          className={`${bg} absolute inset-0 bg-opacity-90 transition duration-300 ease-in-out`}
        ></div>
        <div className="relative flex h-full w-full items-center px-4 sm:px-6 lg:px-4">
          <div>
            <div className="flex items-center space-x-2 text-lg text-white">
              <div className="flex items-center rounded-md bg-white p-2">
                <i className="fas fa-toggle-off fa-sm text-yellow-300"></i>
              </div>
              <p>{title}</p>
            </div>
            <h3 className="mt-2 text-3xl font-bold text-white">
              {currency} {(value || 0)?.toString()}
            </h3>
            <h3 className="mt-2 text-lg text-yellow-100 ">{sub_title}</h3>
          </div>

          <div
            className={`absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white bg-opacity-10 text-white text-opacity-75 shadow sm:top-4 sm:right-4`}
          >
            <FIcon icon={icon} />
          </div>
        </div>
      </div>
    </a>
  );
}
