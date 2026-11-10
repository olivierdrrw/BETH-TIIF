import {
    collection,
    getCountFromServer,
    getDocs,
  } from "firebase/firestore";
  
  import {
    db,
  } from "@/lib/firebase/firestore";
  
  import {
    COLLECTIONS,
  } from "@/lib/firebase/collections";
  
  export interface DashboardCounts {
    totalUsers: number;
    aiSessions: number;
    totalHumanTwins: number;
    totalSchools: number;
    totalInstitutions: number;
  }
  
  export async function
  getDashboardCounts():
  Promise<DashboardCounts> {
    try {
      const [
        usersSnapshot,
        sessionsSnapshot,
        twinsSnapshot,
        schoolsSnapshot,
        institutionsSnapshot,
      ] = await Promise.all([
        getCountFromServer(
          collection(
            db,
            COLLECTIONS.USERS
          )
        ),
  
        getCountFromServer(
          collection(
            db,
            COLLECTIONS.AI_SESSIONS
          )
        ),
  
        getCountFromServer(
          collection(
            db,
            COLLECTIONS.HUMAN_TWINS
          )
        ),
  
        getCountFromServer(
          collection(
            db,
            COLLECTIONS.SCHOOLS
          )
        ),
  
        getCountFromServer(
          collection(
            db,
            COLLECTIONS.INSTITUTIONS
          )
        ),
      ]);
  
      return {
        totalUsers:
          usersSnapshot
            .data()
            .count,
  
        aiSessions:
          sessionsSnapshot
            .data()
            .count,
  
        totalHumanTwins:
          twinsSnapshot
            .data()
            .count,
  
        totalSchools:
          schoolsSnapshot
            .data()
            .count,
  
        totalInstitutions:
          institutionsSnapshot
            .data()
            .count,
      };
    } catch (error) {
      console.error(
        "Failed to load dashboard counts:",
        error
      );
  
      return {
        totalUsers: 0,
        aiSessions: 0,
        totalHumanTwins: 0,
        totalSchools: 0,
        totalInstitutions: 0,
      };
    }
  }

  export interface WellnessAggregates {
    averageWellnessScore: number;
    riskAlerts: number;
    highRiskUsers: number;
    dominantEmotion: string;
  }

  const RISK_THRESHOLD = 40;

  // Reads every Human Twin document to compute real, live aggregates.
  // Fine at TIIF's current scale; a larger user base would want a
  // scheduled aggregation job instead of reading the full collection
  // on every dashboard load.
  export async function
  getWellnessAggregates():
  Promise<WellnessAggregates> {
    try {
      const snapshot = await getDocs(
        collection(db, COLLECTIONS.HUMAN_TWINS)
      );

      if (snapshot.empty) {
        return {
          averageWellnessScore: 0,
          riskAlerts: 0,
          highRiskUsers: 0,
          dominantEmotion: "—",
        };
      }

      let wellnessTotal = 0;
      let highRiskCount = 0;
      const emotionCounts: Record<string, number> = {};

      snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        const wellbeing = data.wellbeingScore ?? 0;
        const resilience = data.resilienceScore ?? 0;

        wellnessTotal += wellbeing;

        if (wellbeing < RISK_THRESHOLD || resilience < RISK_THRESHOLD) {
          highRiskCount += 1;
        }

        const emotion = data.emotionalState ?? "Calm";
        emotionCounts[emotion] = (emotionCounts[emotion] ?? 0) + 1;
      });

      const dominantEmotion = Object.entries(emotionCounts).sort(
        (a, b) => b[1] - a[1]
      )[0][0];

      return {
        averageWellnessScore: Math.round(wellnessTotal / snapshot.size),
        riskAlerts: highRiskCount,
        highRiskUsers: highRiskCount,
        dominantEmotion,
      };
    } catch (error) {
      console.error("Failed to load wellness aggregates:", error);

      return {
        averageWellnessScore: 0,
        riskAlerts: 0,
        highRiskUsers: 0,
        dominantEmotion: "—",
      };
    }
  }