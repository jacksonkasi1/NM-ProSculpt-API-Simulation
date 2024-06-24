import { Hono } from "hono";

// ** import third-party libraries
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

// ** import validators
import { CoursesQuerySchema, CoursesQuery } from "@/validation/courses";

// ** import middleware
import { authMiddleware } from "@/middleware/auth";

export const courses_api = new Hono();

// courses_api.use("/*", authMiddleware);

// courses_api.get("/", async (c) => {
//   return c.json({
//     message: "Welcome to the naan mudhalvan course API.",
//   });
// });

// Mock data
const mockCourses = [
  // Active and approved courses
  { name: "Python Training", course_id: "TEST123", course_status: true, approval_status: true },
  { name: "Flutter-Training", course_id: "TEST124", course_status: true, approval_status: true },
  { name: "Elixir Bootcamp", course_id: "ElixirPhoenix01A", course_status: true, approval_status: true },

  // Active but not approved courses
  { name: "Java Basics", course_id: "TEST125", course_status: true, approval_status: false },
  { name: "Kotlin for Beginners", course_id: "TEST126", course_status: true, approval_status: false },

  // Inactive and approved courses
  { name: "Flutter Advanced", course_id: "TEST1212", course_status: false, approval_status: true },
  { name: "Django Mastery", course_id: "TEST1213", course_status: false, approval_status: true },

  // Inactive and not approved courses
  { name: "Swift Programming", course_id: "TEST0001", course_status: false, approval_status: false },
  { name: "Ruby on Rails", course_id: "TEST0002", course_status: false, approval_status: false },
  
  // Mixed cases
  { name: "React Native", course_id: "TEST0003", course_status: true, approval_status: true },
  { name: "Angular Development", course_id: "TEST0004", course_status: false, approval_status: false },
  { name: "Vue.js Essentials", course_id: "TEST0010", course_status: true, approval_status: true },
  { name: "Data Science with Python", course_id: "TEST0011", course_status: false, approval_status: false },
];

courses_api.get(
  "/",
  zValidator("query", CoursesQuerySchema),
  async (c) => {
    try {
      const query: CoursesQuery = c.req.valid("query");

      let filteredCourses = mockCourses;

      if (query.course_unique_code) {
        filteredCourses = filteredCourses.filter(course =>
          course.course_id === query.course_unique_code
        );
      }

      if (query.is_active !== undefined) {
        filteredCourses = filteredCourses.filter(course =>
          course.course_status === query.is_active
        );
      }

      if (query.approval_status !== undefined) {
        filteredCourses = filteredCourses.filter(course =>
          course.approval_status === query.approval_status
        );
      }

      return c.json({
        courses_list: filteredCourses,
        page: 0,
        limit: 20,
        total_count: filteredCourses.length
      });

    } catch (error: any) {
      console.error(`Error in - GET /lms/client/courses API: ${error}`);
      if (error instanceof z.ZodError) {
        return c.json(
          {
            success: false,
            message: "Validation error.",
            errors: error.errors,
          },
          400
        );
      }

      return c.json(
        {
          success: false,
          message: "Error while fetching courses.",
          data: error?.message || error,
        },
        500
      );
    }
  }
);
