/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Arrow from "@/icon/arrow";

interface CollapseProps {
  isExpanded: boolean;
  id: number;
  avatarUrl: string;
  loginGit: string;
  tabIndex: number;
  children: React.ReactNode;
  toggleUser: any;
  handleKeyDown: (e: any) => Promise<void>;
}

export default function Collapse({
  isExpanded,
  avatarUrl,
  id,
  loginGit,
  tabIndex,
  children,
  toggleUser,
  handleKeyDown,
}: CollapseProps) {
  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow my-4"
      role="button"
      tabIndex={tabIndex}
    >
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-blue-50"
        onClick={toggleUser}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={`user-details-${id}`}
      >
        <div className="flex items-center space-x-4">
          <img
            src={avatarUrl}
            alt={`${loginGit} avatar`}
            className="w-12 h-12 rounded-full"
          />
          <span className="font-semibold">{loginGit}</span>
        </div>
        <Arrow isExpanded={isExpanded} />
      </div>
      <div
        id={`user-details-${id}`}
        className={`overflow-hidden px-3 transition-all duration-300 ${
          isExpanded ? "py-5" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
