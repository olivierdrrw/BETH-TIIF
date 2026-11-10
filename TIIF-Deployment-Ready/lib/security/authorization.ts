import {
    UserRole,
  } from "@/types/role";
  
  export function
  canPerformAction(
    role: UserRole,
    permission: string
  ) {
    const map = {
      super_admin: ["*"],
  
      tenant_admin: [
        "dashboard:view",
        "users:manage",
        "reports:view",
      ],
  
      therapist: [
        "dashboard:view",
        "patients:view",
      ],
  
      researcher: [
        "research:view",
      ],
  
      institution_admin: [
        "institution:view",
      ],
  
      member: [
        "dashboard:view",
      ],
    };
  
    return (
      map[role]?.includes("*") ||
      map[role]?.includes(
        permission
      )
    );
  }