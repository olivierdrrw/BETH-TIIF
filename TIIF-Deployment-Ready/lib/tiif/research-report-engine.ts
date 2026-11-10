interface ReportInput {
    title: string;
    totalStudies: number;
    activeStudies: number;
  }
  
  export function
  generateResearchReport(
    input:
      ReportInput
  ) {
    return `
  Research Report
  
  Title:
  ${input.title}
  
  Total Studies:
  ${input.totalStudies}
  
  Active Studies:
  ${input.activeStudies}
  `;
  }