import { ProfileLayout } from "@/app/authentication/profile/page";
import React from "react"; 

export default function page() {
  return (
    <ProfileLayout>
      <div className="overflow-auto relative min-h-[200px] w-full">
        <table className="w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
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
    </ProfileLayout>
  );
}
