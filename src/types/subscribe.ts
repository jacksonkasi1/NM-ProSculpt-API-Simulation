export interface SubscribeRequest {
  user_id: string;
  course_id: string;
  student_name?: string;
  college_code?: string;
  college_name?: string;
  branch_name?: string;
  district?: string;
  university?: string;
}
