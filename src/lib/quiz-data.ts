export interface Question {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizData {
  [key: string]: Question[];
}

export const quizData: QuizData = {
  'human-biology': [
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
      question: 'What is the primary purpose of the Visual Impairment Intracranial Pressure (VIIP) syndrome research on the ISS?',
      options: [
        'To study how space food affects vision',
        'To understand why some astronauts experience changes in vision and eye structure',
        'To test new types of glasses for space',
        'To improve spacecraft window technology',
      ],
      correctAnswerIndex: 1,
      explanation: 'VIIP syndrome research investigates the vision changes and anatomical alterations to the eye that some astronauts experience, which are thought to be related to shifts in intracranial pressure during spaceflight.',
    },
    {
      question: 'How does microgravity affect the human cardiovascular system?',
      options: [
        'It makes the heart stronger',
        'It causes fluids to shift upwards, making the heart work less to pump blood',
        'It has no effect on the heart',
        'It increases blood pressure significantly',
      ],
      correctAnswerIndex: 1,
      explanation: 'In space, fluids shift from the lower body to the upper body and head. This means the heart doesn\'t have to work as hard to pump blood against gravity, which can lead to a decrease in cardiac muscle mass over time.',
    },
    {
      question: 'What is a key countermeasure used by astronauts on the ISS to combat muscle atrophy?',
      options: ['Eating high-protein food', 'Regularly performing resistance and aerobic exercises', 'Taking sleeping pills', 'Wearing compression socks'],
      correctAnswerIndex: 1,
      explanation: 'Astronauts spend about two hours per day exercising on devices like the ARED (Advanced Resistive Exercise Device) to provide mechanical loading to their muscles and bones, which helps mitigate muscle and bone loss.',
    },
  ],
  'plant-science': [
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
      question: 'What is the primary function of the "Veggie" plant growth system on the ISS?',
      options: [
        'To produce oxygen for the crew',
        'To serve as a decorative garden',
        'To grow fresh food for astronauts and conduct plant research',
        'To filter water using plant roots',
      ],
      correctAnswerIndex: 2,
      explanation: 'The Veggie system is a space garden used to grow leafy greens and other vegetables to supplement astronaut diets with fresh food and to study plant growth in space.',
    },
    {
      question: 'Why is it challenging to water plants in space?',
      options: [
        'Water is scarce on the ISS',
        'Water floats away in droplets and doesn\'t soak into soil evenly',
        'The water freezes instantly',
        'Plants in space do not need water',
      ],
      correctAnswerIndex: 1,
      explanation: 'Due to surface tension and the lack of gravity, water behaves differently in space. It can form floating blobs or fail to distribute evenly in the soil, making it hard to deliver the right amount to plant roots.',
    },
     {
      question: 'Which light source is most commonly used for growing plants on the ISS?',
      options: ['Sunlight from windows', 'Incandescent bulbs', 'LEDs (Light Emitting Diodes)', 'Candles'],
      correctAnswerIndex: 2,
      explanation: 'LEDs are used because they are energy-efficient, long-lasting, and can be tuned to specific light wavelengths (like red and blue) that are optimal for photosynthesis and plant growth.',
    },
  ],
  'microbiology': [
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
      question: 'The "Microbial Tracking" studies on the ISS involve:',
      options: [
        'Training microbes to perform tasks',
        'Collecting samples from surfaces and the air to create a census of all microorganisms on the station',
        'Following a single bacterium with a microscope',
        'Testing new cleaning supplies',
      ],
      correctAnswerIndex: 1,
      explanation: 'Microbial Tracking projects involve systematically sampling different areas of the ISS to catalog the microbial population, monitor changes over time, and assess any potential risks to crew health or system integrity.',
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
    {
      question: 'What surprising discovery was made about the fungus Aspergillus fumigatus on the ISS?',
      options: [
        'It learned to communicate with astronauts',
        'It grew larger and more aggressively in microgravity compared to on Earth',
        'It could not survive in space',
        'It turned bright green',
      ],
      correctAnswerIndex: 1,
      explanation: 'Studies have shown that some fungi, like Aspergillus fumigatus, can grow more aggressively and may have altered virulence in the spaceflight environment, posing a potential health risk that needs to be understood.',
    },
  ],
};
