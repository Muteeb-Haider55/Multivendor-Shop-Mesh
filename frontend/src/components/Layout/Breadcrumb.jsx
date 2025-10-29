import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Breadcrumb component
 * - Builds a breadcrumb from the current location.pathname
 * - Each segment is a link back to the accumulated path
 * - Small and responsive by using tailwind classes
 *
 * Why added:
 * - Improve navigation so the user always knows where they are (Home / Products / Item)
 * - Lightweight and automatic; no changes required in routes/pages
 */
const Breadcrumb = () => {
  const location = useLocation();

  // Split the pathname into parts and filter out empty segments
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Helper to prettify segment names (e.g. 'best-selling' -> 'Best Selling')
  const prettify = (s) =>
    s
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <nav aria-label="Breadcrumb" className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-4 py-2 text-sm text-gray-600">
        <ol className="list-none p-0 inline-flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          {pathnames.map((name, idx) => {
            const to = `/${pathnames.slice(0, idx + 1).join("/")}`;
            const isLast = idx === pathnames.length - 1;
            return (
              <li key={to} className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                {isLast ? (
                  <span className="text-gray-800">{prettify(name)}</span>
                ) : (
                  <Link to={to} className="hover:underline">
                    {prettify(name)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
