"use client";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { GithubShowcase } from "@/sections/GithubShowcase";
import { CollabShowcase } from "../../sections/CollabShowcase";
import { LinkedIn } from "@/sections/LinkedInSummary";
import { useEffect, useState } from "react";
// Define the interface for LinkedIn data
export interface LinkedInInfo {
  connection: number;
  data: Data;
  follower: number;
}

export interface Data {
  id: number;
  urn: string;
  username: string;
  firstName: string;
  lastName: string;
  isCreator: boolean;
  isOpenToWork: boolean;
  isHiring: boolean;
  profilePicture: string;
  backgroundImage: BackgroundImage[];
  summary: string;
  headline: string;
  geo: Geo;
  languages: any;
  educations: Education[];
  position: Position[];
  fullPositions: FullPosition[];
  skills: Skill[];
  givenRecommendation: any;
  givenRecommendationCount: number;
  receivedRecommendation: any;
  receivedRecommendationCount: number;
  courses: any;
  certifications: Certification[];
  honors: Honor[];
  projects: Projects;
  volunteering: Volunteering[];
  supportedLocales: SupportedLocale[];
  multiLocaleFirstName: MultiLocaleFirstName;
  multiLocaleLastName: MultiLocaleLastName;
  multiLocaleHeadline: MultiLocaleHeadline;
}

export interface BackgroundImage {
  width: number;
  height: number;
  url: string;
}

export interface Geo {
  country: string;
  city: string;
  full: string;
}

export interface Education {
  start: Start;
  end: End;
  fieldOfStudy: string;
  degree: string;
  grade: string;
  schoolName: string;
  description: string;
  activities: string;
  url: string;
  schoolId: string;
}

export interface Start {
  year: number;
  month: number;
  day: number;
}

export interface End {
  year: number;
  month: number;
  day: number;
}

export interface Position {
  companyId: number;
  companyName: string;
  companyUsername: string;
  companyURL: string;
  companyLogo: string;
  companyIndustry: string;
  companyStaffCountRange: string;
  title: string;
  multiLocaleTitle: MultiLocaleTitle;
  multiLocaleCompanyName: MultiLocaleCompanyName;
  location: string;
  description: string;
  employmentType: string;
  start: Start2;
  end: End2;
}

export interface MultiLocaleTitle {
  en_US: string;
}

export interface MultiLocaleCompanyName {
  en_US: string;
}

export interface Start2 {
  year: number;
  month: number;
  day: number;
}

export interface End2 {
  year: number;
  month: number;
  day: number;
}

export interface FullPosition {
  companyId: number;
  companyName: string;
  companyUsername: string;
  companyURL: string;
  companyLogo: string;
  companyIndustry: string;
  companyStaffCountRange: string;
  title: string;
  multiLocaleTitle: MultiLocaleTitle2;
  multiLocaleCompanyName: MultiLocaleCompanyName2;
  location: string;
  description: string;
  employmentType: string;
  start: Start3;
  end: End3;
}

export interface MultiLocaleTitle2 {
  en_US: string;
}

export interface MultiLocaleCompanyName2 {
  en_US: string;
}

export interface Start3 {
  year: number;
  month: number;
  day: number;
}

export interface End3 {
  year: number;
  month: number;
  day: number;
}

export interface Skill {
  name: string;
  passedSkillAssessment: boolean;
  endorsementsCount?: number;
}

export interface Certification {
  name: string;
  start: Start4;
  end: End4;
  authority: string;
  company: Company;
  timePeriod: TimePeriod;
}

export interface Start4 {
  year: number;
  month: number;
  day: number;
}

export interface End4 {
  year: number;
  month: number;
  day: number;
}

export interface Company {
  name: string;
  universalName: string;
  logo: string;
  staffCountRange: StaffCountRange;
  headquarter: Headquarter;
}

export interface StaffCountRange {}

export interface Headquarter {}

export interface TimePeriod {
  start: Start5;
  end: End5;
}

export interface Start5 {
  year: number;
  month: number;
  day: number;
}

export interface End5 {
  year: number;
  month: number;
  day: number;
}

export interface Honor {
  title: string;
  description: string;
  issuer: string;
  issuerLogo: string;
  issuedOn: IssuedOn;
}

export interface IssuedOn {
  year: number;
  month: number;
  day: number;
}

export interface Projects {
  total: number;
  items: Item[];
}

export interface Item {
  title: string;
  description: string;
  start: Start6;
  end: End6;
  contributors: Contributor[];
}

export interface Start6 {
  year: number;
  month: number;
  day: number;
}

export interface End6 {
  year: number;
  month: number;
  day: number;
}

export interface Contributor {
  urn: string;
  username: string;
  fullName: string;
  firstName: string;
  lastName: string;
  profilePicture: ProfilePicture[];
  headline: string;
  url: string;
}

export interface ProfilePicture {
  width: number;
  height: number;
  url: string;
}

export interface Volunteering {
  title: string;
  start: Start7;
  end: End7;
  companyName: string;
  CompanyId: string;
  companyUrl: string;
  companyLogo: string;
}

export interface Start7 {
  year: number;
  month: number;
  day: number;
}

export interface End7 {
  year: number;
  month: number;
  day: number;
}

export interface SupportedLocale {
  country: string;
  language: string;
}

export interface MultiLocaleFirstName {
  en: string;
}

export interface MultiLocaleLastName {
  en: string;
}

export interface MultiLocaleHeadline {
  en: string;
}
export default function About() {
  const [linkedinInfo, setLinkedinInfo] = useState<LinkedInInfo | null>(null);

  useEffect(() => {
    const fetchLinkedInInfo = async () => {
      // Simulate fetching data
      return {
        connection: 874,
        data: {
          id: 687711749,
          urn: "ACoAACj9pgUB64wxXdAONEJ24lQv2UqpYbV4s-A",
          username: "connorbell13",
          firstName: "Connor",
          lastName: "Bell",
          isCreator: false,
          isOpenToWork: false,
          isHiring: false,
          profilePicture:
            "https://media.licdn.com/dms/image/v2/D5603AQFjH6yM6Sitbw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710816026941?e=1733356800\u0026v=beta\u0026t=VJ_8sjPoI5RAPPPsWTw_ULvmNVzUf1p2fzAsiKNDRAY",
          backgroundImage: [
            {
              width: 798,
              height: 200,
              url: "https://media.licdn.com/dms/image/v2/D5616AQFcv89xZHckCw/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1721582880218?e=1733356800\u0026v=beta\u0026t=rnLYXvRBvSEu4WGJjUWslr-MNIB-U_IHYwloNHPhmWU",
            },
            {
              width: 798,
              height: 200,
              url: "https://media.licdn.com/dms/image/v2/D5616AQFcv89xZHckCw/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1721582880218?e=1733356800\u0026v=beta\u0026t=A568oEb3V2i6UHRunl9xddlQyrgJOKziIY8lkXRtK1c",
            },
          ],
          summary:
            "AI Solutions Engineer with a passion for building scalable, AI-driven platforms that drive innovation and enhance security. I specialize in Agentic Systems, RAG, Cloud Applications, and Multi-Model Systems.",
          headline: "AI @ Accenture Security",
          geo: {
            country: "United States",
            city: "Seattle, Washington",
            full: "Agentic Systems, RAG, Generative AI",
          },
          languages: null,
          educations: [
            {
              start: { year: 2019, month: 9, day: 0 },
              end: { year: 2023, month: 5, day: 0 },
              fieldOfStudy: "Computer Science",
              degree: "Bachelor's degree",
              grade: "",
              schoolName: "Arizona State University",
              description: "",
              activities: "Deans List\nSigma Nu Fraternity",
              url: "https://www.linkedin.com/school/arizona-state-university/",
              schoolId: "4292",
            },
          ],
          position: [
            {
              companyId: 1033,
              companyName: "Accenture",
              companyUsername: "accenture",
              companyURL: "https://www.linkedin.com/company/accenture/",
              companyLogo:
                "https://media.licdn.com/dms/image/v2/D4E0BAQHDbmrSIZ2UdA/company-logo_400_400/company-logo_400_400/0/1723130689960/accenture_logo?e=1735776000\u0026v=beta\u0026t=pWIRKSDTRH-Y-a33gix6deSHpIHsjv2dh-Djh-A23Dk",
              companyIndustry: "Management Consulting",
              companyStaffCountRange: "10001 - 0",
              title: "AI Engineer",
              multiLocaleTitle: { en_US: "AI Engineer" },
              multiLocaleCompanyName: { en_US: "Accenture" },
              location: "United States",
              description: "Accenture Security - Global AI Engineering Team",
              employmentType: "Full-time",
              start: { year: 2024, month: 5, day: 0 },
              end: { year: 0, month: 0, day: 0 },
            },
            {
              companyId: 3033,
              companyName: "Avanade",
              companyUsername: "avanade",
              companyURL: "https://www.linkedin.com/company/avanade/",
              companyLogo:
                "https://media.licdn.com/dms/image/v2/D560BAQGmlDR0g_2XIg/company-logo_400_400/company-logo_400_400/0/1688575032847/avanade_logo?e=1735776000\u0026v=beta\u0026t=5sLkyijDso1WJhsdN24zIQyW6kMA9pBEZqNrBqEXdSg",
              companyIndustry: "Information Technology \u0026 Services",
              companyStaffCountRange: "10001 - 0",
              title: "Backend Developer",
              multiLocaleTitle: { en_US: "Back End Developer" },
              multiLocaleCompanyName: { en_US: "Avanade" },
              location: "Seattle, Washington, United States",
              description:
                "Backend Developer focusing on Data Loss Prevention and Generative AI Security Applications",
              employmentType: "Full-time",
              start: { year: 2023, month: 10, day: 0 },
              end: { year: 2024, month: 5, day: 0 },
            },
            {
              companyId: 3033,
              companyName: "Avanade",
              companyUsername: "avanade",
              companyURL: "https://www.linkedin.com/company/avanade/",
              companyLogo:
                "https://media.licdn.com/dms/image/v2/D560BAQGmlDR0g_2XIg/company-logo_400_400/company-logo_400_400/0/1688575032847/avanade_logo?e=1735776000\u0026v=beta\u0026t=5sLkyijDso1WJhsdN24zIQyW6kMA9pBEZqNrBqEXdSg",
              companyIndustry: "Information Technology \u0026 Services",
              companyStaffCountRange: "10001 - 0",
              title: "SWE Intern",
              multiLocaleTitle: { en_US: "Software Engineering Intern" },
              multiLocaleCompanyName: { en_US: "Avanade" },
              location: "Seattle, Washington, United States",
              description: "Summer 2022",
              employmentType: "Internship",
              start: { year: 2022, month: 2, day: 0 },
              end: { year: 2023, month: 10, day: 0 },
            },
          ],
          fullPositions: [
            {
              companyId: 1033,
              companyName: "Accenture",
              companyUsername: "accenture",
              companyURL: "https://www.linkedin.com/company/accenture/",
              companyLogo:
                "https://media.licdn.com/dms/image/v2/D4E0BAQHDbmrSIZ2UdA/company-logo_400_400/company-logo_400_400/0/1723130689960/accenture_logo?e=1735776000\u0026v=beta\u0026t=pWIRKSDTRH-Y-a33gix6deSHpIHsjv2dh-Djh-A23Dk",
              companyIndustry: "Management Consulting",
              companyStaffCountRange: "10001 - 0",
              title: "AI Engineer",
              multiLocaleTitle: { en_US: "AI Engineer" },
              multiLocaleCompanyName: { en_US: "Accenture" },
              location: "United States",
              description: "Accenture Security - Global AI Engineering Team",
              employmentType: "Full-time",
              start: { year: 2024, month: 5, day: 0 },
              end: { year: 0, month: 0, day: 0 },
            },
            {
              companyId: 3033,
              companyName: "Avanade",
              companyUsername: "avanade",
              companyURL: "https://www.linkedin.com/company/avanade/",
              companyLogo:
                "https://media.licdn.com/dms/image/v2/D560BAQGmlDR0g_2XIg/company-logo_400_400/company-logo_400_400/0/1688575032847/avanade_logo?e=1735776000\u0026v=beta\u0026t=5sLkyijDso1WJhsdN24zIQyW6kMA9pBEZqNrBqEXdSg",
              companyIndustry: "Information Technology \u0026 Services",
              companyStaffCountRange: "10001 - 0",
              title: "Back End Developer",
              multiLocaleTitle: { en_US: "Back End Developer" },
              multiLocaleCompanyName: { en_US: "Avanade" },
              location: "Seattle, Washington, United States",
              description:
                "Data Loss Prevention Platform - Fortune 50 Company\n     • Built an Azure Databricks application to integrate log data from multiple sources, enhancing data exploration.\n     • Engineered an ETL platform to unify log data into a feature store, enabling future machine learning.\n     • Created dashboards to monitor high-risk users and detect data exfiltration.\n\nGenerative AI Security Application - Fortune 100 Company\n     • Developed a security platform using RAG applications to interpret cyber threats and provide actionable insights for Security Analysts.\n     • Led the project from concept to production.",
              employmentType: "Full-time",
              start: { year: 2023, month: 10, day: 0 },
              end: { year: 2024, month: 5, day: 0 },
            },
            {
              companyId: 3033,
              companyName: "Avanade",
              companyUsername: "avanade",
              companyURL: "https://www.linkedin.com/company/avanade/",
              companyLogo:
                "https://media.licdn.com/dms/image/v2/D560BAQGmlDR0g_2XIg/company-logo_400_400/company-logo_400_400/0/1688575032847/avanade_logo?e=1735776000\u0026v=beta\u0026t=5sLkyijDso1WJhsdN24zIQyW6kMA9pBEZqNrBqEXdSg",
              companyIndustry: "Information Technology \u0026 Services",
              companyStaffCountRange: "10001 - 0",
              title: "Software Engineering Intern",
              multiLocaleTitle: { en_US: "Software Engineering Intern" },
              multiLocaleCompanyName: { en_US: "Avanade" },
              location: "Seattle, Washington, United States",
              description: "Summer 2022",
              employmentType: "Internship",
              start: { year: 2022, month: 2, day: 0 },
              end: { year: 2023, month: 10, day: 0 },
            },
          ],
          skills: [
            {
              name: "Artificial Intelligence (AI)",
              passedSkillAssessment: false,
            },
            {
              name: "Large Language Models (LLM)",
              passedSkillAssessment: false,
            },
            {
              name: "Google Kubernetes Engine (GKE)",
              passedSkillAssessment: false,
            },
            {
              name: "Google Cloud Platform (GCP)",
              passedSkillAssessment: false,
            },
            { name: "FastAPI", passedSkillAssessment: false },
            { name: "React Native", passedSkillAssessment: false },
            { name: "REST APIs", passedSkillAssessment: false },
            {
              name: "Natural Language Processing (NLP)",
              passedSkillAssessment: false,
            },
            {
              name: "Database Management System (DBMS)",
              passedSkillAssessment: false,
            },
            { name: "Algorithm Development", passedSkillAssessment: false },
            { name: "SQL", passedSkillAssessment: false },
            { name: "Corporate Security", passedSkillAssessment: false },
            { name: "Cloud Applications", passedSkillAssessment: false },
            {
              name: "Agile Application Development",
              passedSkillAssessment: false,
            },
            { name: "Azure Databricks", passedSkillAssessment: false },
            { name: "Information Security", passedSkillAssessment: false },
            { name: "Cybersecurity", passedSkillAssessment: false },
            { name: "Data Engineering", passedSkillAssessment: false },
            { name: "Data Analysis", passedSkillAssessment: false },
            { name: "Microsoft Azure", passedSkillAssessment: false },
            { name: "Azure DevOps Server", passedSkillAssessment: false },
            { name: "Azure SQL", passedSkillAssessment: false },
            { name: "Azure DevOps Services", passedSkillAssessment: false },
            { name: "Azure Functions", passedSkillAssessment: false },
            { name: "Azure", passedSkillAssessment: false },
            { name: "Git", passedSkillAssessment: false },
            {
              name: "Python (Programming Language)",
              passedSkillAssessment: true,
            },
            {
              name: "Software as a Service (SaaS)",
              passedSkillAssessment: false,
            },
            { name: "Web Applications", passedSkillAssessment: false },
            { name: "Instructor-led Training", passedSkillAssessment: false },
            { name: "Training", passedSkillAssessment: false },
            { name: "Educational Technology", passedSkillAssessment: false },
            {
              name: "AngularJS",
              passedSkillAssessment: false,
              endorsementsCount: 3,
            },
            {
              name: "JavaScript",
              passedSkillAssessment: false,
              endorsementsCount: 3,
            },
            { name: "TypeScript", passedSkillAssessment: false },
            {
              name: "Bootstrap",
              passedSkillAssessment: false,
              endorsementsCount: 2,
            },
            {
              name: "Cascading Style Sheets (CSS)",
              passedSkillAssessment: false,
              endorsementsCount: 2,
            },
            {
              name: "HTML",
              passedSkillAssessment: false,
              endorsementsCount: 2,
            },
            { name: "MongoDB", passedSkillAssessment: false },
            {
              name: "Node.js",
              passedSkillAssessment: false,
              endorsementsCount: 2,
            },
            {
              name: "Project Management",
              passedSkillAssessment: false,
              endorsementsCount: 7,
            },
            {
              name: "Agile Methodologies",
              passedSkillAssessment: false,
              endorsementsCount: 2,
            },
            {
              name: "Leadership",
              passedSkillAssessment: false,
              endorsementsCount: 7,
            },
            {
              name: "Computer Science",
              passedSkillAssessment: false,
              endorsementsCount: 6,
            },
            { name: "Social Media", passedSkillAssessment: false },
            { name: "eCommerce", passedSkillAssessment: false },
            {
              name: "Object-Oriented Programming (OOP)",
              passedSkillAssessment: false,
              endorsementsCount: 4,
            },
            {
              name: "Data Structures",
              passedSkillAssessment: false,
              endorsementsCount: 3,
            },
            {
              name: "Scrum",
              passedSkillAssessment: false,
              endorsementsCount: 3,
            },
            { name: "Engineering", passedSkillAssessment: false },
          ],
          givenRecommendation: null,
          givenRecommendationCount: 0,
          receivedRecommendation: null,
          receivedRecommendationCount: 0,
          courses: null,
          certifications: [
            {
              name: "Microsoft Certified: Azure Data Fundamentals",
              start: { year: 2023, month: 10, day: 0 },
              end: { year: 0, month: 0, day: 0 },
              authority: "Microsoft",
              company: {
                name: "Microsoft",
                universalName: "microsoft",
                logo: "https://media.licdn.com/dms/image/v2/C560BAQE88xCsONDULQ/company-logo_200_200/company-logo_200_200/0/1630652622688/microsoft_logo?e=1735776000\u0026v=beta\u0026t=4kKdLJSs6CiFBEq8l9buKUVAW6tAmsExbkKtweNKCaQ",
                staffCountRange: {},
                headquarter: {},
              },
              timePeriod: {
                start: { year: 0, month: 0, day: 0 },
                end: { year: 0, month: 0, day: 0 },
              },
            },
            {
              name: "Microsoft Certified: Azure Fundamentals",
              start: { year: 2023, month: 9, day: 0 },
              end: { year: 0, month: 0, day: 0 },
              authority: "Microsoft",
              company: {
                name: "Microsoft",
                universalName: "microsoft",
                logo: "https://media.licdn.com/dms/image/v2/C560BAQE88xCsONDULQ/company-logo_200_200/company-logo_200_200/0/1630652622688/microsoft_logo?e=1735776000\u0026v=beta\u0026t=4kKdLJSs6CiFBEq8l9buKUVAW6tAmsExbkKtweNKCaQ",
                staffCountRange: {},
                headquarter: {},
              },
              timePeriod: {
                start: { year: 0, month: 0, day: 0 },
                end: { year: 0, month: 0, day: 0 },
              },
            },
          ],
          honors: [
            {
              title: "Deans List",
              description: "Fall ‘19, Spring ‘21, Fall ‘21, spring ‘22",
              issuer: "Ira Fulton School Of Engineering",
              issuerLogo: "",
              issuedOn: { year: 0, month: 0, day: 0 },
            },
          ],
          projects: {
            total: 2,
            items: [
              {
                title: "Personal Assistant Chatbot",
                description:
                  "• React Native Integration: Delivered a responsive mobile interface through seamless React Native integration.\n• NLP Query System: Enabled advanced natural language queries across 34 services, including automated Yelp recommendations and reservations.\n• Travel Planning: Developed a flight search and booking feature, allowing flexible itinerary scheduling.\n• Automated Communication: Built an automated email system via Gmail to enhance productivity.\n• Calendar Management: Implemented API integration for real-time calendar updates and management.\n• AI-Enhanced Decisions: Leveraged OpenAI 3.5 for sophisticated natural language processing and decision-making.\n• Serverless Architecture: Deployed on Google Cloud Platform using Cloud Run for scalability and cost efficiency.",
                start: { year: 2024, month: 7, day: 0 },
                end: { year: 2024, month: 7, day: 0 },
                contributors: [
                  {
                    urn: "ACoAACj9pgUB64wxXdAONEJ24lQv2UqpYbV4s-A",
                    username: "connorbell13",
                    fullName: "Connor Bell",
                    firstName: "Connor",
                    lastName: "Bell",
                    profilePicture: [
                      {
                        width: 100,
                        height: 100,
                        url: "https://media.licdn.com/dms/image/v2/D5603AQFjH6yM6Sitbw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1710816026941?e=1733356800\u0026v=beta\u0026t=gi2oqglC-omBB7nfHA0kOU2p2Y7hQiLc7vdrEo7LQOo",
                      },
                      {
                        width: 200,
                        height: 200,
                        url: "https://media.licdn.com/dms/image/v2/D5603AQFjH6yM6Sitbw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710816026941?e=1733356800\u0026v=beta\u0026t=LP9sWsXwyu-ISzV53d-ewhvKC1JOnKGrl1O-Tm6VRRI",
                      },
                      {
                        width: 400,
                        height: 400,
                        url: "https://media.licdn.com/dms/image/v2/D5603AQFjH6yM6Sitbw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710816026941?e=1733356800\u0026v=beta\u0026t=nWs8Jl1jGXKLYNONani4u4l9T4XQ_jSzthQDWqpSLKM",
                      },
                      {
                        width: 800,
                        height: 800,
                        url: "https://media.licdn.com/dms/image/v2/D5603AQFjH6yM6Sitbw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710816026941?e=1733356800\u0026v=beta\u0026t=VJ_8sjPoI5RAPPPsWTw_ULvmNVzUf1p2fzAsiKNDRAY",
                      },
                    ],
                    headline:
                      "AI @ Accenture Security\n| Generative AI, Cloud Engineering, Cybersecurity",
                    url: "https://www.linkedin.com/in/connorbell13",
                  },
                ],
              },
              {
                title: "ASU Class Ratings Finder",
                description:
                  "Azure Web app created using HTML, CSS, SQL, Flask, and Python with the purpose of taking a class that Arizona State offers ex. CSE 240 and finding all available courses while cross-referencing ratemyprofessor.com to instantaneously retrieve all the rating data for the course.\n\nLists: Semester Number, Class Number, Subject, Catalog Number, Description, Professor Name, Rating, Difficulty, Number of Ratings, would take again percentage, Link to professor RMP Profile, Link to class on MyASU.\n\nAdditional Information:\n• Used MyAsu Network data to locate and access public API \n• Used RateMyProfessor Network data to locate and access Public API\n• Works with ratemyprofessor.com and MyASU to also offer links to the professor's page as well as the MyAsu link to said class.\n• Flask Application Published to an Azure Web Service\n• Server Containing RMP Data stored on Azure SQL Database\n\nGithub Link: https://github.com/connorbell133/classFinderApp.git",
                start: { year: 2022, month: 12, day: 0 },
                end: { year: 2022, month: 12, day: 0 },
                contributors: [
                  {
                    urn: "ACoAACj9pgUB64wxXdAONEJ24lQv2UqpYbV4s-A",
                    username: "connorbell13",
                    fullName: "Connor Bell",
                    firstName: "Connor",
                    lastName: "Bell",
                    profilePicture: [
                      {
                        width: 100,
                        height: 100,
                        url: "https://media.licdn.com/dms/image/v2/D5603AQFjH6yM6Sitbw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1710816026941?e=1733356800\u0026v=beta\u0026t=gi2oqglC-omBB7nfHA0kOU2p2Y7hQiLc7vdrEo7LQOo",
                      },
                      {
                        width: 200,
                        height: 200,
                        url: "https://media.licdn.com/dms/image/v2/D5603AQFjH6yM6Sitbw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1710816026941?e=1733356800\u0026v=beta\u0026t=LP9sWsXwyu-ISzV53d-ewhvKC1JOnKGrl1O-Tm6VRRI",
                      },
                      {
                        width: 400,
                        height: 400,
                        url: "https://media.licdn.com/dms/image/v2/D5603AQFjH6yM6Sitbw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1710816026941?e=1733356800\u0026v=beta\u0026t=nWs8Jl1jGXKLYNONani4u4l9T4XQ_jSzthQDWqpSLKM",
                      },
                      {
                        width: 800,
                        height: 800,
                        url: "https://media.licdn.com/dms/image/v2/D5603AQFjH6yM6Sitbw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710816026941?e=1733356800\u0026v=beta\u0026t=VJ_8sjPoI5RAPPPsWTw_ULvmNVzUf1p2fzAsiKNDRAY",
                      },
                    ],
                    headline:
                      "AI @ Accenture Security\n| Generative AI, Cloud Engineering, Cybersecurity",
                    url: "https://www.linkedin.com/in/connorbell13",
                  },
                ],
              },
            ],
          },
          volunteering: [
            {
              title: "Peer Mentor",
              start: { year: 2015, month: 4, day: 0 },
              end: { year: 2019, month: 8, day: 0 },
              companyName: "Athletes For Kids Youth Mentoring",
              CompanyId: "218603",
              companyUrl: "https://www.linkedin.com/company/218603",
              companyLogo:
                "https://media.licdn.com/dms/image/v2/D560BAQHIU77zXbIM0g/company-logo_400_400/company-logo_400_400/0/1715971163634/athletes_for_kids_logo?e=1735776000\u0026v=beta\u0026t=_ysk1gSeZQImztg89sXzDRp5eH4jPCDMLUp_OTMLwwQ",
            },
            {
              title: "Assistant Coach",
              start: { year: 2015, month: 1, day: 0 },
              end: { year: 2019, month: 9, day: 0 },
              companyName: "JUANITA LACROSSE CLUB",
              CompanyId: "15287904",
              companyUrl: "https://www.linkedin.com/company/15287904",
              companyLogo: "",
            },
          ],
          supportedLocales: [{ country: "US", language: "en" }],
          multiLocaleFirstName: { en: "Connor" },
          multiLocaleLastName: { en: "Bell" },
          multiLocaleHeadline: {
            en: "AI @ Accenture Security\n| Generative AI, Cloud Engineering, Cybersecurity",
          },
        },
        follower: 891,
      };
    };

    fetchLinkedInInfo()
      .then((data) => {
        console.log("Fetched LinkedIn info:", data);
        setLinkedinInfo(data);
      })
      .catch((error) => console.error("Error fetching LinkedIn info:", error));
  }, []);

  return (
    <div>
      <Header />
      <main>
        {linkedinInfo ? (
          <LinkedIn linkedinInfo={linkedinInfo} />
        ) : (
          <p>Loading...</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
