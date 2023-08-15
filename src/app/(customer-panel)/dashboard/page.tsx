import Button from "@/common/Buttons/Button";
import FIcon from "@/common/FIcon";
import Input from "@/common/Forms/Input";
import ClientFooter from "@/components/client/footer/ClientFooter";
import ClientHeader from "@/components/client/header/ClientHeader";
import React from "react";

export default function Dashboard() {
  return (
    <>
      <ClientHeader />
      <div className="container py-20">
        <div className="grid grid-cols-12">
          <div className="col-span-4 h-[700px] p-8 bg-gray-100 dark:bg-gray-950 space-y-6">
            <h2 className="text-xl">SMS Verifications</h2>
            <p>
              Rent a phone for 7 minutes. Credits are only used if you receive
              the SMS code.
            </p>

            <div className="flex">
              <Input placeholder="Search" type="search" />
              <div className="w-fit">
                <button
                  title="search"
                  className="h-full px-4 bg-blue-600 rounded-r text-white focus:ring"
                >
                  <FIcon icon="search" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-8 h-[700px] bg-white dark:bg-gray-800">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
              <thead className="bg-white dark:bg-gray-700">
                <tr>
                  <th scope="col" className="p-4 flex justify-start">
                    <small>SL/ID</small>
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    date
                  </th>

                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    SERVICE
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    PHONE
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    CODE
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    COST
                  </th>
                  <th
                    scope="col"
                    className="p-4 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
                  >
                    TTL
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td colSpan={50}>
                    <div className="p-4 pt-8 text-lg text-yellow-700 text-center">
                      Table is empty!
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ClientFooter />
    </>
  );
}
