import { Role } from "@prisma/client";
import bcryptjs from "bcryptjs";

export type TechCategory =
  | "Frontend"
  | "Backend"
  | "DevOps"
  | "Testing"
  | "Database"
  | "Design"
  | "Mobile"
  | "CMS"
  | "Others";

export const languajes = ["Spanish", "English", "French", "German"];

export const techCategories: TechCategory[] = [
  "Frontend",
  "Backend",
  "DevOps",
  "Testing",
  "Database",
  "Design",
  "Mobile",
  "CMS",
  "Others",
];

export const technologies: { name: string; category: TechCategory }[] = [
  // Frontend
  { name: "React", category: "Frontend" },
  { name: "Vue.js", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: "Svelte", category: "Frontend" },
  { name: "Ember.js", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Nuxt.js", category: "Frontend" },
  { name: "Redux", category: "Frontend" },
  { name: "MobX", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Sass", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Bootstrap", category: "Frontend" },
  { name: "Material UI", category: "Frontend" },
  { name: "Webpack", category: "Frontend" },
  { name: "Babel", category: "Frontend" },
  { name: "Parcel", category: "Frontend" },
  { name: "JQuery", category: "Frontend" },

  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "NestJS", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "Flask", category: "Backend" },
  { name: "Django", category: "Backend" },
  { name: "Ruby on Rails", category: "Backend" },
  { name: "Java", category: "Backend" },
  { name: "Spring Boot", category: "Backend" },
  { name: "PHP", category: "Backend" },
  { name: "Laravel", category: "Backend" },
  { name: "Go", category: "Backend" },
  { name: "Rust", category: "Backend" },
  { name: "C#", category: "Backend" },
  { name: "ASP.NET", category: "Backend" },
  { name: "GraphQL", category: "Backend" },
  { name: "Apollo Server", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "FastAPI", category: "Backend" },

  // DevOps
  { name: "Docker", category: "DevOps" },
  { name: "Kubernetes", category: "DevOps" },
  { name: "Terraform", category: "DevOps" },
  { name: "Ansible", category: "DevOps" },
  { name: "Jenkins", category: "DevOps" },
  { name: "CircleCI", category: "DevOps" },
  { name: "Travis CI", category: "DevOps" },
  { name: "GitLab CI", category: "DevOps" },
  { name: "AWS", category: "DevOps" },
  { name: "Azure", category: "DevOps" },
  { name: "Google Cloud", category: "DevOps" },
  { name: "Heroku", category: "DevOps" },
  { name: "Vagrant", category: "DevOps" },
  { name: "Chef", category: "DevOps" },
  { name: "Puppet", category: "DevOps" },
  { name: "Nagios", category: "DevOps" },
  { name: "Prometheus", category: "DevOps" },
  { name: "Grafana", category: "DevOps" },

  // Testing
  { name: "Jest", category: "Testing" },
  { name: "Chai", category: "Testing" },
  { name: "Cypress", category: "Testing" },
  { name: "JUnit", category: "Testing" },
  { name: "Selenium", category: "Testing" },
  { name: "Karma", category: "Testing" },
  { name: "TestCafe", category: "Testing" },
  { name: "Puppeteer", category: "Testing" },
  { name: "Appium", category: "Testing" },
  { name: "Enzyme", category: "Testing" },
  { name: "Mocha", category: "Testing" },
  { name: "Sinon", category: "Testing" },
  { name: "Supertest", category: "Testing" },
  { name: "QUnit", category: "Testing" },
  { name: "Cucumber", category: "Testing" },

  // Database
  { name: "MySQL", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "SQLite", category: "Database" },
  { name: "Redis", category: "Database" },
  { name: "Cassandra", category: "Database" },
  { name: "MariaDB", category: "Database" },
  { name: "Elasticsearch", category: "Database" },
  { name: "Firebase", category: "Database" },
  { name: "Supabase", category: "Database" },
  { name: "Prisma", category: "Database" },
  { name: "Moongose", category: "Database" },
  { name: "CouchDB", category: "Database" },
  { name: "DynamoDB", category: "Database" },
  { name: "Neo4j", category: "Database" },
  { name: "MSSQL", category: "Database" },
  { name: "InfluxDB", category: "Database" },
  { name: "Apache HBase", category: "Database" },

  // Design
  { name: "Figma", category: "Design" },
  { name: "Sketch", category: "Design" },
  { name: "Adobe XD", category: "Design" },
  { name: "InVision", category: "Design" },
  { name: "Framer", category: "Design" },
  { name: "Balsamiq", category: "Design" },
  { name: "Marvel", category: "Design" },
  { name: "Affinity Designer", category: "Design" },
  { name: "Canva", category: "Design" },
  { name: "Zeplin", category: "Design" },

  // Mobile
  { name: "Flutter", category: "Mobile" },
  { name: "React Native", category: "Mobile" },
  { name: "Swift", category: "Mobile" },
  { name: "Kotlin", category: "Mobile" },
  { name: "Xamarin", category: "Mobile" },
  { name: "Ionic", category: "Mobile" },
  { name: "Cordova", category: "Mobile" },
  { name: "Android SDK", category: "Mobile" },
  { name: "Xcode", category: "Mobile" },
  { name: "Appcelerator", category: "Mobile" },
  { name: "PhoneGap", category: "Mobile" },
  { name: "Jetpack Compose", category: "Mobile" },

  // CMS

  { name: "WordPress", category: "CMS" },
  { name: "Drupal", category: "CMS" },
  { name: "Joomla", category: "CMS" },
  { name: "Contentful", category: "CMS" },
  { name: "Strapi", category: "CMS" },
  { name: "Webflow", category: "CMS" },
  { name: "Wix", category: "CMS" },
  { name: "Squarespace", category: "CMS" },

  // Others

  { name: "Zustand", category: "Others" },
  { name: "Linux", category: "Others" },
];

const roles1: Role[] = ["admin"];
const roles2: Role[] = ["talent"];

export const users = [
  {
    firstName: "Miguel Angel",
    lastName: "Fernandez",
    email: "miguelangelfb19@utp.edu.co",
    roles: roles1,
    birthDate: new Date("1995-01-19"),
    password: bcryptjs.hashSync("miguel123"),
    country: "Colombia",
    isVerified: true,
  },
  {
    firstName: "Johan David",
    lastName: "Bedoya",
    email: "johan.bedoya12@gmail.com",
    roles: roles2,
    birthDate: new Date("1998-02-11"),
    password: bcryptjs.hashSync("johan123"),
    country: "Colombia",
    isVerified: true,
  },
];
