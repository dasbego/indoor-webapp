/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import Link from "next/link";
import { useAuth } from "../contexts/Auth";

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <div className="relative bg-white">
      <div className="mx-auto px-4 max-w-7xl sm:px-6">
        <div className="flex items-center justify-between py-6 border-b-2 border-gray-100 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:flex-1 lg:w-0">
            <a href="#">
              <span className="sr-only">Workflow</span>
              <img
                className="w-auto h-8 sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
            </a>
          </div>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            {!user && (
              <>
                <Link href="/login">
                  <a className="text-gray-500 hover:text-gray-900 whitespace-nowrap text-base font-medium">
                    Log in
                  </a>
                </Link>
                <Link href="/signup">
                  <a className="inline-flex items-center justify-center ml-8 px-4 py-2 text-white whitespace-nowrap text-base font-medium bg-indigo-500 hover:bg-indigo-700 border border-transparent rounded-md shadow-sm">
                    Sign up
                  </a>
                </Link>
              </>
            )}
            {user && (
              <button
                onClick={() => logout()}
                className="inline-flex items-center justify-center ml-8 px-4 py-2 text-white whitespace-nowrap text-base font-medium bg-indigo-500 hover:bg-indigo-700 border border-transparent rounded-md shadow-sm"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
