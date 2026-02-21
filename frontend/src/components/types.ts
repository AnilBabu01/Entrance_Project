export type Question = {
  q: string;
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
  currect: string;
  checked: boolean;
};

export type QuizDataItem = {
  item: {
    id: number;
    title: string;
    category_id: string;
    course_id: string;
    marksPerQuestion: string;
    time: string;
    physics_question: string;
    math_question: string;
    chemistry_question: string;
    english_question: string;
    computer_question: string;
    createdAt: string;
    updatedAt: string;
    firstLevel: string;
    secondLevel: string;
    thirdLevel: string;
    category_name: string;
    course_name: string;
  };
};

export type QuizData = {
  id: number;
  title: string;
  category_id: string;
  course_id: string;
  marksPerQuestion: string;
  time: string;
  physics_question: string;
  math_question: string;
  chemistry_question: string;
  english_question: string;
  computer_question: string;
  createdAt: string;
  updatedAt: string;
  firstLevel: string;
  secondLevel: string;
  thirdLevel: string;
  category_name: string;
  course_name: string;
};

export type BookType = {
  id: number;
  course_id: string;
  sem_id: string;
  subject_id: string;
  pdf_book: string;
  block: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CourseType = {
  id: number;
  course_name: string;
  block: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NotesType = {
  id: number;
  course_id: string;
  sem_id: string;
  subject_id: string;
  unit: string;
  block: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PracticalType = {
  id: number;
  course_id: string;
  sem_id: string;
  subject_id: string;
  pdf_book: string;
  block: boolean;
  createdAt: string;
  updatedAt: string;
};
