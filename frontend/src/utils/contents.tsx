import { StaticImageData } from "next/image";

import arrow1 from "../../public/assets/1row.svg";
import arrow2 from "../../public/assets/2row.svg";
import arrow3 from "../../public/assets/3row.svg";
import AIcon1 from "../../public/assets/AIcon1.svg";
import AIcon2 from "../../public/assets/AIcon2.svg";
import AIcon3 from "../../public/assets/AIcon3.svg";
import AIcon4 from "../../public/assets/AIcon4.svg";

///why us images
import whyIcon1 from "../../public/assets/now1.svg";
import whyIcon2 from "../../public/assets/now2.svg";
import whyIcon3 from "../../public/assets/now3.svg";
import whyIcon4 from "../../public/assets/now4.svg";
import whyIcon5 from "../../public/assets/now5.svg";

/// what out client say
import user1 from "../../public/assets/user1.png";
import user2 from "../../public/assets/user2.png";

/// Article Latest
import Article1 from "../../public/assets/Article1.svg";
import Article2 from "../../public/assets/Article2.svg";
import Article3 from "../../public/assets/Article3.svg";

///blog images
import Blob1 from "../../public/assets/blog1.png";
import Blob2 from "../../public/assets/blog2.png";
import Blob3 from "../../public/assets/blog3.png";
import Blob4 from "../../public/assets/blog4.png";
import Blob5 from "../../public/assets/blog5.png";
import Blob6 from "../../public/assets/blog6.png";
import Blob7 from "../../public/assets/blog7.png";

import TestImage from "../../public/assets/testImage.png";

export const howAidata = [
  {
    br: "#9848FF",
    arrow: arrow1,
    icon: AIcon1,
    title: "Enter Information",
    desc: "Provide your basic details, such as education level, interests, and career goals",
  },
  {
    br: "#A7CE4A",
    arrow: arrow2,
    icon: AIcon2,
    title: "Answer Questions",
    desc: "Answer questions to help our AI assess your skills and preferences",
  },
  {
    br: "#4D93DF",
    arrow: arrow3,
    icon: AIcon3,
    title: "Get Suggestions",
    desc: "Receive personalized suggestions based on your responses",
  },
  {
    br: "#F66742",
    arrow: null,
    icon: AIcon4,
    title: "Make Decision",
    desc: "Decide on your preferred career path",
  },
];


export const whyUsdata = [
  {
    br: "#007BB380",
    icon: whyIcon1,
    title: "AI Counseling",
  },
  {
    br: "#007BB380",
    icon: whyIcon2,
    title: "Course Finder",
  },
  {
    br: "#007BB380",
    icon: whyIcon3,
    title: "Entrance Prep",
  },
  {
    br: "#007BB380",
    icon: whyIcon4,
    title: "Notes",
  },
  {
    br: "#007BB380",
    icon: whyIcon5,
    title: "College Recommendation",
  },
];

export const ClientSay = [
  {
    name: "Black Smith",
    course: "IT Student",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie, libero eu ullamcorper mattis, ex diam posuere orci, eget laoreet justo orci et est. Morbi cursus faucibus lorem, non varius orci cursus vel. Fusce quis ante malesuada, cursus ligula eget, lacinia enim. Donec eget malesuada nulla. ",
    profile: user1,
  },
  {
    name: "Anna Paul",
    course: "IT Student",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie, libero eu ullamcorper mattis, ex diam posuere orci, eget laoreet justo orci et est. Morbi cursus faucibus lorem, non varius orci cursus vel. Fusce quis ante malesuada, cursus ligula eget, lacinia enim. Donec eget malesuada nulla. ",
    profile: user2,
  },
];

export const Article = [
  {
    cardtitle: "Choosing the Right IT Career",
    description:
      "Nam cursus non nisl et pulvinar. Duis mi at quam tristique accumsan. Nam auctor tincidunt arcu sit amet tempus ...",
    cardImg: Article1,
  },
  {
    cardtitle: "Entrance Exam Tips",
    description:
      "Nam cursus non nisl et pulvinar. Duis mi at quam tristique accumsan. Nam auctor tincidunt arcu sit amet tempus ...",
    cardImg: Article2,
  },
  {
    cardtitle: "Lates Tech Trends",
    description:
      "Nam cursus non nisl et pulvinar. Duis mi at quam tristique accumsan. Nam auctor tincidunt arcu sit amet tempus ...",
    cardImg: Article3,
  },
];

export const BlogsList = [
  {
    title: "How to study IT in Nepal? A Complete Guide",
    description:
      "Curabitur at felis quam. Sed vel lacus sit amet risus cursus sagittis sed a massa. Cras tincidunt ultrices nulla, faucibus congue enim. Ut vestibulum ut efficitur.",
    cardImg: Blob1,
    date: "23 Jan 2024",
  },
  {
    title: "5 Essential Elements of a Sales-Optimized Website",
    description:
      "Curabitur at felis quam. Sed vel lacus sit amet risus cursus sagittis sed a massa. Cras tincidunt ultrices nulla, faucibus congue enim. Ut vestibulum ut efficitur.",
    cardImg: Blob2,
    date: "23 Jan 2024",
  },
  {
    title: "The Importance of Branding for Small Businesses",
    description:
      "Curabitur at felis quam. Sed vel lacus sit amet risus cursus sagittis sed a massa. Cras tincidunt ultrices nulla, faucibus congue enim. Ut vestibulum ut efficitur.",
    cardImg: Blob3,
    date: "23 Jan 2024",
  },
  {
    title: "Top SEO Strategies for Improving Website Visibility",
    description:
      "Curabitur at felis quam. Sed vel lacus sit amet risus cursus sagittis sed a massa. Cras tincidunt ultrices nulla, faucibus congue enim. Ut vestibulum ut efficitur.",
    cardImg: Blob4,
    date: "23 Jan 2024",
  },
  {
    title: "5 Essential Elements of a Sales-Optimized Website",
    description:
      "Curabitur at felis quam. Sed vel lacus sit amet risus cursus sagittis sed a massa. Cras tincidunt ultrices nulla, faucibus congue enim. Ut vestibulum ut efficitur.",
    cardImg: Blob5,
    date: "23 Jan 2024",
  },
  {
    title: "The Importance of Branding for Small Businesses",
    description:
      "Curabitur at felis quam. Sed vel lacus sit amet risus cursus sagittis sed a massa. Cras tincidunt ultrices nulla, faucibus congue enim. Ut vestibulum ut efficitur.",
    cardImg: Blob6,
    date: "23 Jan 2024",
  },
  {
    title: "Top SEO Strategies for Improving Website Visibility",
    description:
      "Curabitur at felis quam. Sed vel lacus sit amet risus cursus sagittis sed a massa. Cras tincidunt ultrices nulla, faucibus congue enim. Ut vestibulum ut efficitur.",
    cardImg: Blob7,
    date: "23 Jan 2024",
  },
];

export const faqList = [
  {
    q: "What is StudyITNEPAL",
    ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a lectus imperdiet, sagittis libero vitae, ultrices leo. Maecenas laoreet nisi et mollis cursus. Pellentesque sollicitudin cursus libero non pretium.",
  },
  {
    q: "How it works?",
    ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a lectus imperdiet, sagittis libero vitae, ultrices leo. Maecenas laoreet nisi et mollis cursus. Pellentesque sollicitudin cursus libero non pretium.",
  },
  {
    q: "Do i need to do anything?",
    ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a lectus imperdiet, sagittis libero vitae, ultrices leo. Maecenas laoreet nisi et mollis cursus. Pellentesque sollicitudin cursus libero non pretium.",
  },
  {
    q: "Suspendisse quis malesuada erat?",
    ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a lectus imperdiet, sagittis libero vitae, ultrices leo. Maecenas laoreet nisi et mollis cursus. Pellentesque sollicitudin cursus libero non pretium.",
  },
  {
    q: "Proin vulputate non nisi at viverra?",
    ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a lectus imperdiet, sagittis libero vitae, ultrices leo. Maecenas laoreet nisi et mollis cursus. Pellentesque sollicitudin cursus libero non pretium.",
  },
  {
    q: "Vestibulum venenatis lacinia tellus non dictum? ",
    ans: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a lectus imperdiet, sagittis libero vitae, ultrices leo. Maecenas laoreet nisi et mollis cursus. Pellentesque sollicitudin cursus libero non pretium.",
  },
];

export type DataType = {
  id: number;
  title: string;
  course: string;
  type: string;
  Time: string;
  Questions: number;
  image: StaticImageData;
  Physics: Array<{
    id: number;
    q: string;
    ans1: string;
    ans2: string;
    ans3: string;
    ans4: string;
    checked: boolean;
  }>;

  Math: Array<{
    id: number;
    q: string;
    ans1: string;
    ans2: string;
    ans3: string;
    ans4: string;
    checked: boolean;
  }>;

  Chemistry: Array<{
    id: number;
    q: string;
    ans1: string;
    ans2: string;
    ans3: string;
    ans4: string;
    checked: boolean;
  }>;

  English: Array<{
    id: number;
    q: string;
    ans1: string;
    ans2: string;
    ans3: string;
    ans4: string;
    checked: boolean;
  }>;

  Computer: Array<{
    id: number;
    q: string;
    ans1: string;
    ans2: string;
    ans3: string;
    ans4: string;
    checked: boolean;
  }>;
};

export const TestList: DataType[] = [
  {
    id: 1,
    title: "Model Questions",
    course: "Bsc. CS IT",
    type: "Model",
    image: TestImage,
    Time: "2 hrs",
    Questions: 100,
    Physics: [
      {
        id: 1,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Laws",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 2,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Lawf",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: true,
      },
      {
        id: 3,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Lawdd",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 4,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Lawdf",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 5,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Lawddf",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 6,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Lawddf",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 7,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Lawddf",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: true,
      },
      {
        id: 8,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 9,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 10,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
    ],
    Math: [
      {
        id: 1,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 2,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 3,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 4,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 5,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 6,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 7,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 8,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: true,
      },
      {
        id: 9,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 10,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
    ],
    Chemistry: [
      {
        id: 1,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 2,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 3,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 4,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 5,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 6,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 7,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 8,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 9,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 10,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
    ],
    English: [
      {
        id: 1,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 2,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 3,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 4,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 5,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 6,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 7,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 8,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 9,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 10,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
    ],
    Computer: [
      {
        id: 1,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 2,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 3,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 4,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 5,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 6,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 7,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 8,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 9,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
      {
        id: 10,
        q: " Which law stattes that the total pressure exerted by a mixture of non-reacting gases is the sum of the partial pressures of individual gases?",
        ans1: "Boyle’s Law",
        ans2: "Avogadro’s Law",
        ans3: "Dalton’s Law",
        ans4: "Charles’s Law",
        checked: false,
      },
    ],
  },
  {
    id: 2,
    title: "Model Questions",
    course: "Bsc. CS IT",
    type: "Model",
    Time: "2 hrs",
    Questions: 100,
    image: TestImage,
    Physics: [],
    Math: [],
    Chemistry: [],
    English: [],
    Computer: [],
  },
  {
    id: 3,
    title: "Model Questions",
    course: "Bsc. CS IT",
    type: "Model",
    Time: "2 hrs",
    Questions: 100,
    image: TestImage,
    Physics: [],
    Math: [],
    Chemistry: [],
    English: [],
    Computer: [],
  },
  {
    id: 4,
    title: "Model Questions",
    course: "Bsc. CS IT",
    type: "Model",
    Time: "2 hrs",
    Questions: 100,
    image: TestImage,
    Physics: [],
    Math: [],
    Chemistry: [],
    English: [],
    Computer: [],
  },
  {
    id: 5,
    title: "Model Questions",
    course: "Bsc. CS IT",
    type: "Model",
    Time: "2 hrs",
    Questions: 100,
    image: TestImage,
    Physics: [],
    Math: [],
    Chemistry: [],
    English: [],
    Computer: [],
  },
  {
    id: 6,
    title: "Model Questions",
    course: "Bsc. CS IT",
    type: "Model",
    Time: "2 hrs",
    Questions: 100,
    image: TestImage,
    Physics: [],
    Math: [],
    Chemistry: [],
    English: [],
    Computer: [],
  },
  {
    id: 7,
    title: "Model Questions",
    course: "Bsc. CS IT",
    type: "Model",
    Time: "2 hrs",
    Questions: 100,
    image: TestImage,
    Physics: [],
    Math: [],
    Chemistry: [],
    English: [],
    Computer: [],
  },
  {
    id: 8,
    title: "Model Questions",
    course: "Bsc. CS IT",
    type: "Model",
    Time: "2 hrs",
    Questions: 100,
    image: TestImage,
    Physics: [],
    Math: [],
    Chemistry: [],
    English: [],
    Computer: [],
  },
  {
    id: 9,
    title: "Model Questions",
    course: "Bsc. CS IT",
    type: "Model",
    Time: "2 hrs",
    Questions: 100,
    image: TestImage,
    Physics: [],
    Math: [],
    Chemistry: [],
    English: [],
    Computer: [],
  },
];

export const semters = [
  {
    id: 1,
    title: "First Semester",
    subjects: [
      { id: 1, name: "Physics" },
      { id: 2, name: "Math" },
      { id: 3, name: "Chemistry" },
      { id: 4, name: "Statistics" },
      { id: 5, name: "ITI" },
    ],
  },
  {
    id: 2,
    title: "Second Semester",
    subjects: [
      { id: 1, name: "Physics" },
      { id: 2, name: "Math" },
      { id: 3, name: "Chemistry" },
      { id: 4, name: "Statistics" },
      { id: 5, name: "ITI" },
    ],
  },
  {
    id: 3,
    title: "Third Semester",
    subjects: [
      { id: 1, name: "Physics" },
      { id: 2, name: "Math" },
      { id: 3, name: "Chemistry" },
      { id: 4, name: "Statistics" },
      { id: 5, name: "ITI" },
    ],
  },
  {
    id: 4,
    title: "Fourth Semester",
    subjects: [
      { id: 1, name: "Physics" },
      { id: 2, name: "Math" },
      { id: 3, name: "Chemistry" },
      { id: 4, name: "Statistics" },
      { id: 5, name: "ITI" },
    ],
  },
  {
    id: 5,
    title: "Fifth Semester",
    subjects: [
      { id: 1, name: "Physics" },
      { id: 2, name: "Math" },
      { id: 3, name: "Chemistry" },
      { id: 4, name: "Statistics" },
      { id: 5, name: "ITI" },
    ],
  },
  {
    id: 6,
    title: "sixth Semester",
    subjects: [
      { id: 1, name: "Physics" },
      { id: 2, name: "Math" },
      { id: 3, name: "Chemistry" },
      { id: 4, name: "Statistics" },
      { id: 5, name: "ITI" },
    ],
  },
  {
    id: 7,
    title: "Seventh Semester",
    subjects: [
      { id: 1, name: "Physics" },
      { id: 2, name: "Math" },
      { id: 3, name: "Chemistry" },
      { id: 4, name: "Statistics" },
      { id: 5, name: "ITI" },
    ],
  },
  {
    id: 8,
    title: "Eight Semester",
    subjects: [
      { id: 1, name: "Physics" },
      { id: 2, name: "Math" },
      { id: 3, name: "Chemistry" },
      { id: 4, name: "Statistics" },
      { id: 5, name: "ITI" },
    ],
  },
];
