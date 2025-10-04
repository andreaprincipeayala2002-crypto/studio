import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';
import data from './quiz-data.json';

export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Topic {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  publicationDate: string;
  sourceUrl: string;
  image: ImagePlaceholder | undefined;
  questions: Question[];
  relatedTopics: string[];
  reflectionQuestions: string[];
  imageId: string;
}


const topicData: Omit<Topic, 'image'>[] = data.topics;

export const topics: Topic[] = topicData.map(topic => ({
  ...topic,
  image: PlaceHolderImages.find(img => img.id === topic.imageId),
}));
