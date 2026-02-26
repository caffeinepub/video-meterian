import { Link } from '@tanstack/react-router';
import { Target, Eye, Heart, Users, BookOpen, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const values = [
  {
    icon: Target,
    title: 'Purpose-Driven Learning',
    description:
      'Every course is designed with clear learning objectives, ensuring students gain practical knowledge they can apply immediately.',
  },
  {
    icon: Eye,
    title: 'Clarity & Accessibility',
    description:
      'We believe education should be clear, engaging, and accessible to everyone — regardless of background or prior knowledge.',
  },
  {
    icon: Heart,
    title: 'Passion for Education',
    description:
      'Our instructors are passionate educators who genuinely care about student success and go beyond the textbook.',
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description:
      'We bring diverse viewpoints and international expertise to create a truly global learning experience.',
  },
];

const team = [
  {
    name: 'Dr. Elena Vasquez',
    role: 'Founder & Chief Education Officer',
    subject: 'Science & Research',
    bio: 'Former MIT professor with 20+ years in educational technology and curriculum design.',
    initials: 'EV',
  },
  {
    name: 'Prof. James Okafor',
    role: 'Head of Mathematics',
    subject: 'Mathematics',
    bio: 'Award-winning mathematics educator known for making complex concepts beautifully simple.',
    initials: 'JO',
  },
  {
    name: 'Dr. Amara Singh',
    role: 'Director of Technology',
    subject: 'Technology & CS',
    bio: 'Software engineer turned educator, passionate about bridging the gap between industry and academia.',
    initials: 'AS',
  },
  {
    name: 'Prof. Claire Dubois',
    role: 'Head of Humanities',
    subject: 'History & Culture',
    bio: 'Historian and storyteller who brings the past to life through compelling narrative-driven lessons.',
    initials: 'CD',
  },
];

const milestones = [
  { year: '2019', event: 'Video Materials and PDFs founded with a vision to democratize quality education.' },
  { year: '2020', event: 'Launched first 50 courses across Science and Mathematics.' },
  { year: '2021', event: 'Expanded to History and Technology; reached 5,000 students.' },
  { year: '2023', event: 'Surpassed 20,000 enrolled learners across 40+ countries.' },
  { year: '2025', event: 'Launched interactive learning features and expert instructor network.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-charcoal py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h1 className="font-serif font-black text-4xl sm:text-5xl text-white mb-5">
            Our <span className="text-amber">Mission</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            Video Materials and PDFs exists to make world-class education accessible to every curious
            mind on the planet — through the power of expertly crafted video content.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="w-12 h-1 bg-amber rounded-full mb-5" />
                <h2 className="font-serif font-bold text-3xl text-charcoal mb-5">
                  Why We Exist
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Education is the most powerful tool for transforming lives. Yet for too long,
                  access to truly great teaching has been limited by geography, cost, and
                  circumstance.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Video Materials and PDFs was founded on the belief that every learner deserves access
                  to the same quality of instruction as students at the world's top institutions
                  — delivered through engaging, beautifully produced video lessons.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We partner with expert educators to create content that doesn't just inform,
                  but inspires — turning passive viewers into active, lifelong learners.
                </p>
              </div>
              <div className="bg-secondary/50 rounded-2xl p-8 border border-border">
                <blockquote className="font-serif text-xl text-charcoal italic leading-relaxed mb-4">
                  "The goal of education is not to fill a bucket, but to light a fire."
                </blockquote>
                <p className="text-sm text-muted-foreground font-medium">
                  — William Butler Yeats
                </p>
                <Separator className="my-5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This philosophy guides every course, every lesson, and every video we
                  produce at Video Materials and PDFs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl text-charcoal mb-3">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              The principles that guide everything we do at Video Materials and PDFs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-11 h-11 rounded-lg bg-amber/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-amber" />
                  </div>
                  <h3 className="font-serif font-bold text-charcoal text-base mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl text-charcoal mb-3">Our Story</h2>
            <p className="text-muted-foreground">
              From a small idea to a global learning platform.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 relative">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber flex items-center justify-center z-10 shadow-amber">
                    <span className="text-charcoal font-bold text-xs">{milestone.year}</span>
                  </div>
                  <div className="bg-card rounded-xl p-4 border border-border flex-1 shadow-xs">
                    <p className="font-serif font-bold text-charcoal text-sm mb-1">
                      {milestone.year}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {milestone.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif font-bold text-3xl text-charcoal mb-3">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Passionate educators and experts dedicated to transforming how the world learns.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-card rounded-xl p-6 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-amber flex items-center justify-center mx-auto mb-4 shadow-amber">
                  <span className="font-serif font-black text-charcoal text-lg">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-charcoal text-base mb-0.5">
                  {member.name}
                </h3>
                <p className="text-amber text-xs font-semibold mb-1">{member.role}</p>
                <p className="text-muted-foreground text-xs mb-3">{member.subject}</p>
                <Separator className="mb-3" />
                <p className="text-muted-foreground text-xs leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-10 w-10 text-amber mx-auto mb-4" />
          <h2 className="font-serif font-black text-3xl text-white mb-4">
            Join Our Learning Community
          </h2>
          <p className="text-white/65 max-w-md mx-auto mb-8">
            Explore hundreds of expert-led courses and start your educational journey today.
          </p>
          <Link to="/courses">
            <Button
              size="lg"
              className="bg-amber text-charcoal hover:bg-amber-light font-bold gap-2 shadow-amber"
            >
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
