export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  tag: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    location: "Surrey, BC",
    rating: 5,
    text: "I booked my first session online late at night and got confirmation instantly. The automatic reminders meant I never forgot a lesson. After each session, the progress dashboard showed exactly where I was improving. Passed my Class 7 on the first try. Everything worked seamlessly.",
    tag: "First-Try Pass",
  },
  {
    name: "James Thompson",
    location: "Surrey, BC",
    rating: 5,
    text: "I had zero experience and passed my test in just a few weeks. The online booking was straightforward, and the AI chat answered all my questions instantly. Paying online, getting reminders before each lesson, and seeing my progress after every session made the whole process stress-free.",
    tag: "Accelerator Graduate",
  },
  {
    name: "Emma Richardson",
    location: "Delta, BC",
    rating: 5,
    text: "I failed my road test twice with other schools. DRIIV identified my weak spots and fixed them in just three sessions. Being able to book online, pay by card, and see my progress after each lesson took all the uncertainty out of the process. I finally passed with confidence.",
    tag: "Test Mastery",
  },
  {
    name: "David Clarke",
    location: "Richmond, BC",
    rating: 5,
    text: "Everything was online — booking, payment, tracking — all from my phone. I never had to write a cheque or wait on hold. The AI assistant answered my questions at midnight. This is how driving school should work when it's designed around the student's convenience.",
    tag: "Seamless Experience",
  },
  {
    name: "Lisa Watson",
    location: "Burnaby, BC",
    rating: 5,
    text: "The best part was not having to make phone calls. Everything was online — booking, payment, reminders. The progress tracking after each session was surprisingly detailed. I watched my scores improve from 60% to 95% over eight lessons and passed my test with ease.",
    tag: "Class 5 Pass",
  },
  {
    name: "Michael Brown",
    location: "New Westminster, BC",
    rating: 5,
    text: "I looked at a few driving schools before choosing DRIIV and I'm glad I did. The online system handles everything — booking, payments, reminders — and the instruction quality is excellent. The most professional driving school I've experienced in Metro Vancouver.",
    tag: "Gold Standard",
  },
];
