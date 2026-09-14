import curriculum from "./data.json";

/**
 * T-REX LEARN ULTRA — static curriculum data layer.
 *
 * Single source of truth: lib/data.json
 * No database, no API routes — everything here is resolved at build time
 * so the site can be fully Static Site Generated (SSG).
 */

export interface File {
  id: string;
  title: string;
  coverImage: string;
  downloadUrl: string;
}

export interface Course {
  slug: string;
  name_en: string;
  name_ar: string;
  display_title: string;
  files: File[];
}

export interface Semester {
  slug: string;
  order: number;
  name_en: string;
  name_ar: string;
  courses: Course[];
}

export interface Curriculum {
  semesters: Semester[];
}

const data = curriculum as Curriculum;

/** All semesters, in curriculum order. */
export function getSemesters(): Semester[] {
  return [...data.semesters].sort((a, b) => a.order - b.order);
}

/** A single semester by its route slug, or undefined if it doesn't exist. */
export function getSemesterBySlug(semesterSlug: string): Semester | undefined {
  return data.semesters.find((s) => s.slug === semesterSlug);
}

/** A single course, scoped to its semester, by both route slugs. */
export function getCourse(
  semesterSlug: string,
  courseSlug: string
): { semester: Semester; course: Course } | undefined {
  const semester = getSemesterBySlug(semesterSlug);
  if (!semester) return undefined;

  const course = semester.courses.find((c) => c.slug === courseSlug);
  if (!course) return undefined;

  return { semester, course };
}

/** Flat list of every course across every semester, with its parent semester attached. */
export function getAllCourses(): Array<{ semester: Semester; course: Course }> {
  return getSemesters().flatMap((semester) =>
    semester.courses.map((course) => ({ semester, course }))
  );
}

/** Total course count, e.g. for dashboard summary stats. */
export function getCourseCount(): number {
  return getAllCourses().length;
}

/**
 * Every valid [semester]/[subject] param pair, for
 * generateStaticParams() in app/[semester]/[subject]/page.tsx.
 */
export function getAllCourseParams(): Array<{ semester: string; subject: string }> {
  return getAllCourses().map(({ semester, course }) => ({
    semester: semester.slug,
    subject: course.slug,
  }));
}

/**
 * Every valid semester param, for
 * generateStaticParams() in app/[semester]/page.tsx.
 */
export function getAllSemesterParams(): Array<{ semester: string }> {
  return getSemesters().map((s) => ({ semester: s.slug }));
}
