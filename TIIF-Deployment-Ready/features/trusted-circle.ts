export interface TrustedCircleInvite {
  id: string;

  senderId: string;

  email: string;

  status:
    | "pending"
    | "accepted"
    | "declined";

  createdAt: string;
}