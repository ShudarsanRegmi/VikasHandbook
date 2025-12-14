import React from 'react';
import { PageContent, PageType } from './types';

export const BOOK_PAGES: PageContent[] = [
  {
    id: 'cover',
    type: PageType.COVER,
    title: 'The Vikas Handbook',
    subtitle: 'Traits, Habits & Hidden Talents',
    body: (
      <>
        <div className="text-center mt-4 text-stone-600 text-sm tracking-widest uppercase">Volume 1</div>
        <div className="text-center mt-1 text-stone-500 text-xs italic">Version History: Friendship since 2023</div>
      </>
    )
  },
  {
    id: 'toc',
    type: PageType.TOC,
    title: 'Contents',
    listItems: [
        'Acknowledgement',
        'Core Personality',
        'Social & Friendship Traits',
        'Campus Legends & Special Skills',
        'Discipline, Learning & Growth',
        'Calm Strengths & Inner Nature',
        'Love, Relationships & Maturity',
        'Sense of Humor',
        'Future Aspirations',
        'Gallery',
        'A Quiet Afterthought'
    ]
  },
  {
    id: 'acknowledgement',
    type: PageType.TEXT,
    title: 'Acknowledgement',
    body: (
      <>
        <p className="mb-4 first-letter:text-4xl first-letter:font-heading first-letter:mr-1 first-letter:float-left">
          I acknowledge Vikas not just as a close friend, but as someone who has consistently been there whenever it truly mattered.
        </p>
        <p className="mb-4">
          Through simple actions and quiet support, he has shown what dependable friendship looks like. Whether it was help when needed, encouragement when things felt heavy, or just being present without questions, he never hesitated.
        </p>
        <p>
          This acknowledgement exists because some people don’t ask for appreciation — and yet deserve it the most.
        </p>
      </>
    )
  },
  {
    id: 'core-personality',
    type: PageType.TEXT,
    title: 'Core Personality',
    listItems: [
      'Simple and honest by nature',
      'Open-minded and understanding',
      'Very friendly and approachable',
      'Calm, gentle, and grounded',
      'A bit shy, but deeply genuine'
    ],
    quote: 'Minimal drama, maximum sincerity.'
  },
  {
    id: 'social-traits',
    type: PageType.TEXT,
    title: 'Social & Friendship Traits',
    listItems: [
      'Gets along well with almost everyone',
      'Never offensive; always respectful',
      'Defensive rather than aggressive',
      'Has never been involved in fights',
      'Brings positive energy without seeking attention'
    ]
  },
  {
    id: 'campus-legends',
    type: PageType.TEXT,
    title: 'Campus Legends & Special Skills',
    listItems: [
      'Brings lunch box from home and feeds half the class',
      'Day scholar with legendary “smuggling skills” (Anything from outside somehow makes it inside)',
      'Handles college life smartly and responsibly',
      'Known for sharing, not showing off'
    ],
    warning: 'If Vikas is around, food scarcity is unlikely.'
  },
  {
    id: 'discipline',
    type: PageType.TEXT,
    title: 'Discipline, Learning & Growth',
    listItems: [
      'Class rank holder',
      'RHCSA exam topper',
      'Slow and steady learner — but very consistent',
      'Disciplined, focused, and hardworking',
      'Possesses quiet, inbuilt talents that show over time'
    ],
    quote: 'Proof that consistency beats noise.'
  },
  {
    id: 'calm-strengths',
    type: PageType.TEXT,
    title: 'Calm Strengths & Inner Nature',
    listItems: [
      'Extremely calm and patient',
      'Gentle in behavior and words',
      'Emotionally balanced',
      'Silent yet beautiful singer',
      'Brings peace rather than chaos'
    ]
  },
  {
    id: 'relationships',
    type: PageType.TEXT,
    title: 'Love, Relationships & Maturity',
    listItems: [
      'Fell in love with a junior girl',
      'Manages relationships with maturity and care',
      'Understands boundaries and responsibilities',
      'Knows when to be serious and when to be light'
    ]
  },
  {
    id: 'humor',
    type: PageType.TEXT,
    title: 'Sense of Humor (Handle Carefully)',
    listItems: [
      'Dirty words, dirty memes, dirty videos — everything works 😄',
      'But always within comfort zones',
      'Never crosses lines intentionally',
      'Humor stays friendly, not harmful'
    ]
  },
  {
    id: 'aspirations',
    type: PageType.TEXT,
    title: 'Future Aspirations',
    subtitle: 'Career Goals:',
    listItems: [
      'Aspiring System Administrator',
      'Interested in Network Administration',
      'Strong foundation in Linux and systems',
      'Likely to grow into a reliable professional'
    ],
    quote: 'The kind of admin you trust with both servers and secrets.'
  },
  {
    id: 'gallery-1',
    type: PageType.GALLERY,
    title: 'Gallery',
    subtitle: 'Because some things are better shown than explained.',
    images: [
      '/6.jpeg'
    ]
  },
  {
    id: 'gallery-2',
    type: PageType.GALLERY,
    images: [
      '/2.jpeg',
      '/3.jpeg'
    ]
  },
  {
    id: 'gallery-3',
    type: PageType.GALLERY,
    images: [
      '/4.jpeg',
      '/5.jpeg'
    ]
  },
  {
    id: 'gallery-4',
    type: PageType.GALLERY,
    images: [
      '/7.jpeg'
    ],
    listItems: [
      'Campus moments',
      'Simple smiles',
      'Unfiltered memories'
    ]
  },
  {
    id: 'afterthought',
    type: PageType.BACK_COVER,
    title: 'A Quiet Afterthought',
    body: (
      <div className="space-y-6">
        <blockquote className="border-l-2 border-stone-300 pl-4 italic text-stone-600">
          "After all the pictures, traits, and stories, what remains is something harder to document."
        </blockquote>
        <p>
          Vikas is not the kind of person who demands attention or announces his value. His presence is felt slowly — through consistency, calmness, and quiet support.
        </p>
        <p>
          In a world that celebrates noise, he chooses steadiness. In moments that need strength, he offers patience.
        </p>
        <p>
          This book captures habits and memories, but it cannot fully capture the trust he builds or the comfort he gives simply by being himself.
        </p>
        <div className="pt-8 text-center font-heading text-lg">
          <p>Some people don’t change your life loudly.</p>
          <p className="mt-2 text-xl font-bold italic">They change it reliably.</p>
        </div>
      </div>
    )
  },
  {
    id: 'closing',
    type: PageType.CLOSING,
    title: 'Vikas',
    subtitle: 'The Handbook'
  }
];