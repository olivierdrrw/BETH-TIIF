import {
    UserRole,
  } from "@/types/role";
  
  export function
  hasPermission(
    role: UserRole,
    permission: string
  ) {
    const permissions = {
      super_admin: [
        "*",
      ],
  
      tenant_admin: [
        "dashboard:view",
        "users:view",
        "users:manage",
        "reports:view",
      ],
  
      therapist: [
        "dashboard:view",
        "patients:view",
      ],
  
      researcher: [
        "dashboard:view",
        "research:view",
      ],
  
      institution_admin: [
        "dashboard:view",
        "institution:view",
      ],
  
      member: [
        "dashboard:view",
      ],
    };
  
    return (
      permissions[
        role
      ]?.includes("*") ||
      permissions[
        role
      ]?.includes(
        permission
      )
    );
  }