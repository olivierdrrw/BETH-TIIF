import {
    collection,
    getDocs,
  } from "firebase/firestore";
  
  import {
    db,
  } from "@/lib/firebase/firestore";
  
  import {
    COLLECTIONS,
  } from "@/lib/firebase/collections";
  
  export async function
  getRiskAnalytics() {
  
    const snapshot =
      await getDocs(
        collection(
          db,
          COLLECTIONS.RISK_ALERTS
        )
      );
  
    const alerts =
      snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        })
      );
  
    const highRiskUsers =
      alerts.filter(
        (alert: any) =>
          alert.severity ===
          "high"
      ).length;
  
    return {
      totalAlerts:
        alerts.length,
  
      highRiskUsers,
    };
  }