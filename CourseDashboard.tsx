import Link from "next/link";
import { getSemesters, getCourseCount } from "@/lib/courses";

/**
 * Dashboard overview: one section per semester, one card per course.
 * Pure server component — data is resolved at build/request time straight
 * from lib/data.json, no client fetch and no loading state needed.
 */
export default function CourseDashboard() {
  const semesters = getSemesters();
  const totalCourses = getCourseCount();

  return (
    <div dir="rtl" className="w-full max-w-5xl mx-auto px-4 py-10">
      <header className="mb-10 text-center">
        <h1
          className="text-3xl font-bold text-amber-900 mb-2"
          style={{ fontFamily: "'Markazi Text', serif" }}
        >
          المواد الدراسية
        </h1>
        <p className="text-gray-600" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
          {totalCourses} مادة موزعة على {semesters.length} فصلين دراسيين
        </p>
      </header>

      {semesters.map((semester) => (
        <section key={semester.slug} className="mb-12">
          <h2
            className="text-xl font-semibold text-amber-800 mb-4 border-b border-amber-200 pb-2"
            style={{ fontFamily: "'Markazi Text', serif" }}
          >
            {semester.name_ar.replace(/_/g, " ")}
            <span className="text-sm text-gray-400 ms-2">({semester.name_en})</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {semester.courses.map((course) => (
              <Link
                key={course.slug}
                href={`/${semester.slug}/${course.slug}`}
                className="group rounded-xl border border-amber-200 bg-white p-5 shadow-sm transition-all hover:border-amber-400 hover:shadow-md"
              >
                <p
                  className="text-lg font-semibold text-amber-900 group-hover:text-amber-700"
                  style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
                >
                  {course.name_ar.replace(/_/g, " ")}
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  {course.name_en.replace(/_/g, " ")}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
