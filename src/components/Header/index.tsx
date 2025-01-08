import Link from "next/link";
import Image from "next/image";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";

const SidebarToggleButton = ({ toggleSidebar, sidebarOpen }: { toggleSidebar: () => void; sidebarOpen: boolean }) => (
  <button
    aria-controls="sidebar"
    onClick={toggleSidebar}
    className="z-99999 block rounded-sm border bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
  >
    <span className="relative block h-5.5 w-5.5 cursor-pointer">
      <span className="absolute right-0 h-full w-full">
        {[0, 150, 200].map((delay, index) => (
          <span
            key={index}
            className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
              !sidebarOpen && `!w-full delay-${delay + 300}`
            }`}
          ></span>
        ))}
      </span>
      <span className="absolute right-0 h-full w-full rotate-45">
        <span
          className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
            !sidebarOpen && "!h-0"
          }`}
        ></span>
        <span
          className={`absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
            !sidebarOpen && "!h-0"
          }`}
        ></span>
      </span>
    </span>
  </button>
);

const SearchForm = () => (
  <form action="https://formbold.com/s/unique_form_id" method="POST">
    <div className="relative">
      <button className="absolute left-0 top-1/2 -translate-y-1/2">
        <svg
          className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
            fill=""
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
            fill=""
          />
        </svg>
      </button>
      <input
        type="text"
        placeholder="Type to search..."
        className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
      />
    </div>
  </form>
);

const Header = ({ sidebarOpen, setSidebarOpen }: { sidebarOpen: boolean; setSidebarOpen: (open: boolean) => void }) => {
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <header className="sticky top-[-10px] z-999 flex w-full bg-white shadow-md dark:bg-boxdark h-[40px] rounded-md">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <SidebarToggleButton toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          <Link href="/" className="block flex-shrink-0 lg:hidden">
            <Image width={32} height={32} src="/images/logo/logo-icon.svg" alt="Logo" />
          </Link>
        </div>

        <div className="hidden sm:block">
          <SearchForm />
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
            <DropdownNotification />
            <DropdownMessage />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;