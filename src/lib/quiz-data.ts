import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

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
}

const humanBioQuestions: Question[] = [
  {
    question: 'What is "space anemia," a condition observed in astronauts?',
    options: [
      'A rapid increase in red blood cells',
      'A loss of red blood cells due to fluid shifts',
      'An allergic reaction to spacecraft materials',
      'A vitamin D deficiency',
    ],
    correctAnswerIndex: 1,
    explanation: 'Space anemia is the loss of red blood cells that occurs when astronauts are in space, primarily due to the body adapting to fluid shifts in microgravity.',
  },
  {
    question: 'Which part of the human body is most affected by bone density loss during long-duration spaceflight?',
    options: ['Skull', 'Ribs', 'Weight-bearing bones like the hips and spine', 'Hands and feet'],
    correctAnswerIndex: 2,
    explanation: 'In microgravity, weight-bearing bones like the hips, legs, and spine lose density at a much higher rate than other parts of the skeleton because they are no longer supporting the body\'s weight.',
  },
  {
    question: 'What is a key countermeasure used by astronauts on the ISS to combat muscle atrophy?',
    options: ['Eating high-protein food', 'Regularly performing resistance and aerobic exercises', 'Taking sleeping pills', 'Wearing compression socks'],
    correctAnswerIndex: 1,
    explanation: 'Astronauts spend about two hours per day exercising on devices like the ARED (Advanced Resistive Exercise Device) to provide mechanical loading to their muscles and bones, which helps mitigate muscle and bone loss.',
  },
];

const plantScienceQuestions: Question[] = [
  {
    question: 'What was one of the first plants successfully grown and eaten by astronauts in space?',
    options: ['Potatoes', 'Tomatoes', 'Red romaine lettuce', 'Corn'],
    correctAnswerIndex: 2,
    explanation: 'In 2015, astronauts on the ISS harvested and ate "Outredgeous" red romaine lettuce grown in the Veggie plant growth system, a major step for in-space agriculture.',
  },
  {
    question: 'What is "gravitropism" in plants, and how is it affected by space?',
    options: [
      'The growth of plants towards water, which is enhanced in space',
      'The growth of plants in response to gravity (roots down, shoots up), which is disrupted in space',
      'A plant disease common on spacecraft',
      'The process of photosynthesis in microgravity',
    ],
    correctAnswerIndex: 1,
    explanation: 'Gravitropism is a plant\'s directional growth in response to gravity. In the microgravity of space, this cue is absent, and researchers study how plants orient themselves using other cues like light.',
  },
   {
    question: 'Which light source is most commonly used for growing plants on the ISS?',
    options: ['Sunlight from windows', 'Incandescent bulbs', 'LEDs (Light Emitting Diodes)', 'Candles'],
    correctAnswerIndex: 2,
    explanation: 'LEDs are used because they are energy-efficient, long-lasting, and can be tuned to specific light wavelengths (like red and blue) that are optimal for photosynthesis and plant growth.',
  },
];

const microbiologyQuestions: Question[] = [
  {
    question: 'Why is studying microbes on the ISS important for long-duration missions?',
    options: [
      'To see if they can be used as a food source',
      'Because some microbes can become more virulent or antibiotic-resistant in space',
      'They are only studied for entertainment',
      'To create new types of fuel',
    ],
    correctAnswerIndex: 1,
    explanation: 'Understanding how microbes behave in a closed environment like the ISS is critical for astronaut health. Research has shown that some bacteria may become more aggressive or resistant to antibiotics in space.',
  },
  {
    question: 'What is a "biofilm" and why is it a concern on a spacecraft?',
    options: [
      'A type of thin, protective film used on space suits',
      'A community of microorganisms that can stick to surfaces and potentially damage equipment or pose a health risk',
      'A movie about biology in space',
      'A nutrient solution for growing microbes',
    ],
    correctAnswerIndex: 1,
    explanation: 'Biofilms are structured communities of microbes that can form on surfaces. On the ISS, they can corrode equipment, clog water filters, and present a potential risk to crew health, making them a key area of study.',
  },
  {
    question: 'How might extremophiles (microbes that thrive in extreme conditions) be useful for space exploration?',
    options: [
      'They can be used to make coffee',
      'They have no use in space exploration',
      'They can be trained as pets',
      'Their unique biological processes could be harnessed for life support systems, biomining, or producing materials',
    ],
    correctAnswerIndex: 3,
    explanation: 'Extremophiles are masters of survival. Scientists are studying them for applications like breaking down waste, extracting useful minerals from asteroids (biomining), and creating closed-loop life support systems.',
  },
];


export const topics: Topic[] = [
  {
    slug: 'human-biology',
    title: 'Human Biology in Space',
    description: 'Explore the effects of space on the human body.',
    longDescription: "Long-duration spaceflight has profound effects on the human body. Without the constant pull of Earth's gravity, astronauts experience a range of physiological changes. Muscles atrophy, bone density decreases, and fluids shift towards the head, which can affect vision and cardiovascular function. NASA's Human Research Program is dedicated to studying these challenges and developing countermeasures, such as specialized exercise regimens and nutritional strategies, to ensure astronauts remain healthy on missions to the Moon, Mars, and beyond.",
    publicationDate: 'October 26, 2023',
    sourceUrl: 'https://www.nasa.gov/hrp/elements/human-factors-and-behavioral-performance/',
    image: PlaceHolderImages.find(img => img.id === 'human-bio-planet'),
    questions: humanBioQuestions,
    relatedTopics: ['plant-science', 'microbiology'],
    reflectionQuestions: [
      'What do you think is the single biggest challenge for the human body in space?',
      'If you were designing a habitat for Mars, what features would you include to support human health?',
    ],
  },
  {
    slug: 'plant-science',
    title: 'Plant Science in Microgravity',
    description: 'Learn how plants adapt and grow in microgravity.',
    longDescription: "Growing plants in space is crucial for future long-duration missions, providing a source of fresh food, oxygen, and psychological comfort for astronauts. However, plants evolved in Earth's gravity, which they use as a cue for growth. In space, scientists study how plants adapt to microgravity, how they respond to other cues like light, and how to effectively deliver water and nutrients to their roots. Experiments on the ISS, using systems like 'Veggie', have successfully grown lettuce, radishes, and even chili peppers.",
    publicationDate: 'September 15, 2023',
    sourceUrl: 'https://www.nasa.gov/mission/space-station/research-explorer/search-results/?topic=20',
    image: PlaceHolderImages.find(img => img.id === 'plant-sci-planet'),
    questions: plantScienceQuestions,
    relatedTopics: ['human-biology', 'microbiology'],
    reflectionQuestions: [
      'Besides food, what other roles could plants play on a long mission to Mars?',
      'What kind of plants would you choose to grow on a space station and why?',
    ],
  },
  {
    slug: 'microbiology',
    title: 'Microbiology in Space',
    description: 'Discover the world of microorganisms in space.',
    longDescription: "Microbes are everywhere, even on the International Space Station. Understanding how these tiny organisms behave in a closed, microgravity environment is vital for crew health and equipment maintenance. Some microbes can become more resilient or aggressive in space, forming biofilms that can damage systems. NASA scientists catalog the station's microbiome, study how microbes adapt to spaceflight, and develop strategies to mitigate any potential risks, ensuring the ISS remains a safe home and laboratory in orbit.",
    publicationDate: 'August 08, 2023',
    sourceUrl: 'https://www.nasa.gov/mission/space-station/research-explorer/search-results/?topic=14',
    image: PlaceHolderImages.find(img => img.id === 'micro-bio-planet'),
    questions: microbiologyQuestions,
    relatedTopics: ['human-biology', 'plant-science'],
    reflectionQuestions: [
      'How could understanding microbes on the ISS help us design better hospitals on Earth?',
      'Could microbes from Earth be helpful in terraforming another planet? What are the risks?',
    ],
  },
];
