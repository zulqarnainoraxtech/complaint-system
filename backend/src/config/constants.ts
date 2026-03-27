export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  WORKER: "worker",
  DEPARTMENT_HEAD: "department_head",
} as const;

export const COMPLAINT_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
  REJECTED: "rejected",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;
