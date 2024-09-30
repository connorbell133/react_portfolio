"use client";
import Image from "next/image";
import React from "react";

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

interface LinkedInProps {
  linkedinInfo: LinkedInInfo;
}
export const LinkedIn: React.FC<LinkedInProps> = ({ linkedinInfo }) => {
  const {
    profilePicture,
    firstName,
    lastName,
    headline,
    summary,
    educations,
    position,
    skills,
    certifications,
    projects,
    volunteering,
    geo,
  } = linkedinInfo.data;

  return (
    <div className="container mx-auto px-0 m:px-6 py-8 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-6">
        <div className="w-36 h-36 relative overflow-hidden rounded-full ">
          <Image
            src={profilePicture}
            alt={`${firstName} ${lastName} profile picture`}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">
            {firstName} {lastName}
          </h1>
          <p className="text-xl text-gray-600 mt-2">{headline}</p>
          <p className="text-lg text-gray-500 mt-1">{geo.full}</p>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="  p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Me</h2>
        <p className="text-lg text-gray-700 leading-relaxed">{summary}</p>
      </div>

      {/* My Theory */}
      <div className="  p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          My Vision for AI
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          <span>
            In today's rapidly evolving AI landscape, as leading companies like
            OpenAI, Amazon, and Google continue to train cutting-edge models,
            the true differentiators will be twofold: the ability to leverage
            Agentic Systems that autonomously execute workflows, and the mastery
            of Retrieval-Augmented Generation (RAG) paired with advanced data
            engineering.
          </span>
          <br />
          <br />
          <span>
            <strong>Agentic Systems</strong>, which allow models to act
            independently on tasks, will enable businesses to scale automation
            and decision-making in ways that static systems cannot.
            <br />
            <br />
            The integration of real-time{" "}
            <strong>Retrieval-Augmented Generation (RAG)</strong>—enabling AI to
            connect with and retrieve up-to-date, domain-specific
            information—will ensure that models are not only powerful but also
            contextually aware and accurate.
            <br />
            <br />
            Finally, seamless <strong>data pipelines</strong> combined with
            robust
            <strong>data exploration</strong> capabilities will become
            essential. These will allow organizations to extract meaningful
            insights from their data while ensuring systems can act on that
            information efficiently and dynamically.
          </span>
        </p>
      </div>

      {/* Experience Section */}
      <div className="  p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Experience
        </h2>
        <div className="space-y-6">
          {position.map((pos, index) => (
            <div
              key={index}
              className="transition-transform duration-200 hover:transform hover:translate-x-2"
            >
              <h3 className="text-xl font-medium text-gray-800">{pos.title}</h3>
              <p className="text-md text-gray-600 mt-2">
                {pos.companyName} - {pos.location}
              </p>
              <p className="text-gray-600 mt-1">{pos.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="  p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Education</h2>
        <div className="space-y-6">
          {educations.map((edu, index) => (
            <div
              key={index}
              className="transition-transform duration-200 hover:transform hover:translate-x-2"
            >
              <h3 className="text-xl font-medium text-gray-800">
                {edu.fieldOfStudy}
              </h3>
              <p className="text-md text-gray-600 mt-2">
                {edu.degree} - {edu.schoolName}
              </p>
              <p className="text-gray-600 mt-1">{`${edu.start.year} - ${edu.end.year}`}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="  p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Certifications
        </h2>
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="transition-transform duration-200 hover:transform hover:translate-x-2"
            >
              <h3 className="text-xl font-medium text-gray-800">{cert.name}</h3>
              <p className="text-md text-gray-600 mt-2">{cert.authority}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section
      <div className="  p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Projects</h2>
        <div className="space-y-6">
          {projects.items.map((project, index) => (
            <div
              key={index}
              className="transition-transform duration-200 hover:transform hover:translate-x-2"
            >
              <h3 className="text-xl font-medium text-gray-800">
                {project.title}
              </h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* Volunteering Section */}
      <div className="  p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Volunteering
        </h2>
        <div className="space-y-6">
          {volunteering.map((vol, index) => (
            <div
              key={index}
              className="transition-transform duration-200 hover:transform hover:translate-x-2"
            >
              <h3 className="text-xl font-medium text-gray-800">{vol.title}</h3>
              <p className="text-md text-gray-600 mt-2">{vol.companyName}</p>
              <p className="text-gray-600 mt-1">{`${vol.start.year} - ${vol.end.year}`}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="  p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 10).map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
