"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSemesters } from "@/lib/courses";

/**
 * Primary course navigation. Reads exclusively from lib/data.json via
 * getSemesters() — no fetches, no client-side data loading. Renders one
 * expandable section per semester with its courses listed underneath.
 */
export default function Navigation() {
  const semesters = getSemesters();
  const pathname = usePathname();

  const [openSemester, setOpenSemester] = useState<string | null>(
    semesters[0]?.slug ?? null
  );

  return (
    <nav dir="rtl" className="w-full" aria-label="قائمة المواد الدراسية">
      <ul className="flex flex-col gap-2">
        {semesters.map((semester) => {
          const isOpen = openSemester === semester.slug;
          const isActiveSemester = pathname?.startsWith(`/${semester.slug}`);

          return (
            <li key={semester.slug} className="rounded-lg overflow-hidden border border-amber-200">
              <button
                type="button"
                onClick={() => setOpenSemester(isOpen ? null : semester.slug)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between px-4 py-3 text-right transition-colors ${
                  isActiveSemester
                    ? "bg-amber-500 text-white"
                    : "bg-amber-50 text-amber-900 hover:bg-amber-100"
                }`}
              >
                <span className="font-semibold" style={{ fontFamily: "'Markazi Text', serif" }}>
                  {semester.name_ar.replace(/_/g, " ")}
                </span>
                <span
                  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  ⌄
                </span>
              </button>

              {isOpen && (
                <ul className="flex flex-col bg-white">
                  {semester.courses.map((course) => {
                    const href = `/${semester.slug}/${course.slug}`;
                    const isActive = pathname === href;

                    return (
                      <li key={course.slug}>
                        <Link
                          href={href}
                          className={`block px-6 py-2.5 border-t border-amber-100 text-sm transition-colors ${
                            isActive
                              ? "bg-amber-100 text-amber-900 font-semibold"
                              : "text-gray-700 hover:bg-amber-50 hover:text-amber-800"
                          }`}
                          style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
                        >
                          {course.name_ar.replace(/_/g, " ")}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
