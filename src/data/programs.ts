import { type Program } from "@/types";

export const programs: Program[] = [
  {
    id: "1",
    slug: "mind-insight",
    title: "Mind-Insight Program",
    subtitle: "General Mental Health Services",
    description:
      "From conquering depression and anxiety to navigating schizophrenia and bipolar disorders, we stand by you. Our programs extend to adult ADHD and personality-related challenges, ensuring unwavering support as you craft resilience and courage in your everyday life.",
    conditions: [
      "Depression",
      "Anxiety Disorders",
      "Schizophrenia",
      "Bipolar Disorder",
      "Adult ADHD",
      "Personality Disorders",
    ],
    icon: "Brain",
    image: "/images/programs/mind-insight.png",
  },
  {
    id: "2",
    slug: "mind-recover",
    title: "Mind-Recover Program",
    subtitle: "Substance Use Treatment Services",
    description:
      "Take charge of your life with our MindRecover Program. We stand as pillars of strength on your journey to overcome issues related to alcohol, tobacco, cannabis, opioid medications, recreational drug use, and more. Our specialized services pave the way for a healthier, addiction-free life.",
    conditions: [
      "Alcohol Dependence",
      "Tobacco & Nicotine Addiction",
      "Cannabis Use Disorder",
      "Opioid Dependence",
      "Recreational Drug Use",
    ],
    icon: "HeartPulse",
    image: "/images/programs/mind-recover.png",
  },
  {
    id: "3",
    slug: "mind-shift",
    title: "Mind-Shift Program",
    subtitle: "Behavioral Addictions Treatment Services",
    description:
      "Join our MindShift Program to conquer modern behavioral challenges. From excessive internet use to gaming, gambling and stock trading, we stand as allies in breaking free. Your journey is rooted in understanding and guidance, ensuring a tactical shift towards a life of balance and control.",
    conditions: [
      "Internet Addiction",
      "Gaming Addiction",
      "Gambling Disorder",
      "Stock Trading Addiction",
    ],
    icon: "RefreshCw",
    image: "/images/programs/mind-shift.png",
  },
  {
    id: "4",
    slug: "mind-nurture",
    title: "Mind-Nurture Program",
    subtitle: "Children's Mental Health Treatment",
    description:
      "Experience Mindnurture — an array of support for the younger generation. From fostering language and behavioural development to addressing Autism Spectrum Disorders, ADHD, Intellectual disability and scholastic challenges, we dedicate ourselves to enhancing the well-being of our children. Every child deserves a journey filled with growth and resilience and sheer joy.",
    conditions: [
      "Autism Spectrum Disorder",
      "ADHD",
      "Intellectual Disability",
      "Language & Behavioural Development",
      "Scholastic Challenges",
    ],
    icon: "Baby",
    image: "/images/programs/mind-nurture.png",
  },
  {
    id: "5",
    slug: "tele-minds",
    title: "Tele-Minds",
    subtitle: "Tele Mental Health and Telepsychotherapy Services",
    description:
      "Embrace the future with our TeleMinds services. Aligned with telemedicine guidelines, we bring our expertise to you through virtual consultations. Choose a flexible approach that suits your unique needs, ensuring care without boundaries. Your mental well-being, personalized.",
    conditions: [
      "Follow-up Consultations",
      "Therapy Sessions",
      "Psychiatric Reviews",
      "Counseling",
    ],
    icon: "Video",
    image: "/images/programs/tele-minds.png",
  },
  {
    id: "6",
    slug: "brain-stimulation",
    title: "Brain-Stimulation Program",
    subtitle: "Neuro-modulation with repetitive Transcranial Magnetic Stimulation (rTMS)",
    description:
      "This state-of-the-art Non-Invasive Brain Stimulation method could be your next best alternative to medications in the treatment of Depression, Anxiety, OCD and more.",
    conditions: [
      "Depression",
      "Anxiety",
      "OCD",
    ],
    icon: "Zap",
    image: "/images/programs/brain-stimulation.png",
  },
];
