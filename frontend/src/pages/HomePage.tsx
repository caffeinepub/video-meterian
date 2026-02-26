import { Link } from '@tanstack/react-router';
import { PlayCircle, BookOpen, Users, ArrowRight, Globe, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetAllCourses } from '@/hooks/useQueries';
import { Category } from '@/backend';
import type { Course } from '@/backend';

const features = [
  {
    icon: PlayCircle,
    title: 'High-Quality Videos',
    description:
      'Professionally produced educational content covering a wide range of subjects, designed for deep understanding.',
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description:
      'Learn from seasoned educators and industry professionals who bring real-world experience to every lesson.',
  },
  {
    icon: Globe,
    title: 'Accessible Learning',
    description:
      'Study at your own pace, anytime and anywhere. Our platform is designed to fit your schedule.',
  },
  {
    icon: Award,
    title: 'Structured Curriculum',
    description:
      'Carefully curated courses organized by subject and difficulty to guide your learning journey.',
  },
];

const subjects = [
  {
    name: 'General Studies',
    emoji: '🏛️',
    category: Category.generalStudies,
    subTopics: [
      'History of Odisha',
      'Geography of Odisha',
      'History of India',
      'Indian Geography',
      'Indian Polity',
    ],
  },
  {
    name: 'Mathematics',
    emoji: '📐',
    category: Category.math,
    subTopics: [],
  },
  {
    name: 'English',
    emoji: '📝',
    category: Category.english,
    subTopics: [],
  },
  {
    name: 'Computer',
    emoji: '💻',
    category: Category.computer,
    subTopics: [],
  },
  {
    name: 'Logical Reasoning',
    emoji: '🧠',
    category: Category.logicalReasoning,
    subTopics: [],
  },
];

const CATEGORY_THUMBNAILS: Record<string, string> = {
  math: '/assets/generated/thumb-math.dim_400x250.png',
  generalStudies: '/assets/generated/thumb-history.dim_400x250.png',
  english: '/assets/generated/thumb-history.dim_400x250.png',
  computer: '/assets/generated/thumb-technology.dim_400x250.png',
  logicalReasoning: '/assets/generated/thumb-science.dim_400x250.png',
};

function getThumbnail(course: Course): string {
  if (course.thumbnailUrl) return course.thumbnailUrl;
  return CATEGORY_THUMBNAILS[course.category as string] || '/assets/generated/thumb-math.dim_400x250.png';
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    math: 'Mathematics',
    generalStudies: 'General Studies',
    english: 'English',
    computer: 'Computer',
    logicalReasoning: 'Logical Reasoning',
  };
  return labels[category] || category;
}

export default function HomePage() {
  const { data: courses = [] } = useGetAllCourses();

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-charcoal min-h-[480px] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <Badge className="mb-5 bg-amber/20 text-amber border-amber/30 font-medium px-3 py-1">
              🎓 Education Reimagined
            </Badge>
            <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-3">
              Odisha <span className="text-amber">Exam</span>
            </h1>
            <p className="font-serif text-xl text-amber/80 font-semibold mb-5 tracking-wide">
              Video Materials and PDFs
            </p>
            <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
              Your complete preparation hub for Odisha competitive exams. Expert-led video lessons
              and comprehensive PDF study materials — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses">
                <Button
                  size="lg"
                  className="bg-amber text-charcoal hover:bg-amber-light font-bold gap-2 shadow-amber text-base px-8"
                >
                  <PlayCircle className="h-5 w-5" />
                  Explore Courses
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 hover:border-white/60 font-semibold gap-2 text-base px-8"
                >
                  Our Mission
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-charcoal mb-4">
              Why Choose Odisha Exam?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
              We combine expert knowledge with engaging video formats and detailed PDFs to make
              exam preparation effective, enjoyable, and accessible for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border"
                >
                  <div className="w-12 h-12 rounded-lg bg-amber/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-amber" />
                  </div>
                  <h3 className="font-serif font-bold text-charcoal text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Subject Categories ────────────────────────────────────────────── */}
      <section className="py-16 bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif font-bold text-3xl text-charcoal mb-3">
              Explore by Subject
            </h2>
            <p className="text-muted-foreground">
              Dive into a subject that sparks your curiosity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {subjects.map((subject) => (
              <Link key={subject.name} to="/courses">
                <div className="bg-card rounded-xl p-5 text-center shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border cursor-pointer group h-full">
                  <span className="text-4xl mb-3 block">{subject.emoji}</span>
                  <h3 className="font-serif font-bold text-charcoal group-hover:text-amber transition-colors mb-2">
                    {subject.name}
                  </h3>
                  {subject.subTopics.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {subject.subTopics.map((topic) => (
                        <li
                          key={topic}
                          className="text-xs text-muted-foreground leading-snug"
                        >
                          • {topic}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Courses ─────────────────────────────────────────────── */}
      {courses.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="font-serif font-bold text-3xl text-charcoal mb-2">
                  Featured Courses
                </h2>
                <p className="text-muted-foreground">Start your learning journey today.</p>
              </div>
              <Link to="/courses">
                <Button variant="outline" className="gap-2 border-amber text-amber hover:bg-amber/5">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.slice(0, 6).map((course) => {
                const courseIdStr = course.id.toString();
                return (
                  <Link key={courseIdStr} to="/video/$id" params={{ id: courseIdStr }}>
                    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                      <div className="relative overflow-hidden">
                        <img
                          src={getThumbnail(course)}
                          alt={course.title}
                          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-amber/90 flex items-center justify-center shadow-amber">
                            <PlayCircle className="h-6 w-6 text-charcoal" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <Badge className="mb-2 bg-amber/10 text-amber border-amber/20 text-xs">
                          {getCategoryLabel(course.category as string)}
                        </Badge>
                        <h3 className="font-serif font-bold text-charcoal text-base mb-1 line-clamp-2 group-hover:text-amber transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-muted-foreground text-xs">{course.instructor}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-charcoal">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BookOpen className="h-10 w-10 text-amber mx-auto mb-4" />
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-white mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-white/65 max-w-md mx-auto mb-8 text-base leading-relaxed">
            Join thousands of students already preparing with Odisha Exam.
            Your next breakthrough is just one video away.
          </p>
          <Link to="/courses">
            <Button
              size="lg"
              className="bg-amber text-charcoal hover:bg-amber-light font-bold gap-2 shadow-amber text-base px-8"
            >
              <PlayCircle className="h-5 w-5" />
              Browse All Courses
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
