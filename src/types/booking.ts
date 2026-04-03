export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  serviceType: "standard" | "block" | "intensive" | "pass-plus" | "refresher";
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export type ServiceType = Booking["serviceType"];

export const SERVICE_LABELS: Record<ServiceType, string> = {
  standard: "Standard Lesson",
  block: "Block Booking (10 hrs)",
  intensive: "Intensive Course",
  "pass-plus": "Pass Plus",
  refresher: "Refresher Lesson",
};