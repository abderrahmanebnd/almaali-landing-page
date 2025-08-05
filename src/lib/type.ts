export interface Teacher {
  id: string;
  name: string;
  phone: string;
  email: string;
  bio: string;
  education: string;
  experience: number;
  imageUrl: string;
  achievements: string[];
  subjects: Subject[];
  createdAt: string;
}

export interface TeacherQuery {
  search?: string;
  subject?: string;
  page?: number;
  limit?: number;
}
export interface Subject {
  id: string;
  name: string;
}
export interface Level {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: Level;
  subject: Subject;
  imageUrl: string;
  price: string;
  status: "ACTIVE" | "COMPLETED" | "NOT_STARTED";
  teachers: Teacher[];
  createdAt: string;
}

export interface CourseQuery {
  search?: string;
  subject?: string;
  level?: string;
  status: string;

  // teacherId: string;
  page?: number;
  limit?: number;
}

export type RegistrationStatus = "PENDING" | "APPROVED" | "REJECTED" | string;

export type Registration = {
  id: string;
  fullName: string;
  phone: string;
  courseId: string;
  levelId?: string;
  notes?: string;
  createdAt: string;
  status: RegistrationStatus;
  Course: Course;
  Level?: Level;
};

export type RegistrationQuery = {
  search?: string; // for fullName or phone maybe
  courseId?: string; // filter by course
  levelId?: string; // filter by level
  status?: RegistrationStatus; // depending on your enum
  page?: number; // for pagination
  limit?: number; // for pagination
};
