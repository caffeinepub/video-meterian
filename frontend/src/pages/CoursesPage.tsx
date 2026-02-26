import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { PlayCircle, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAllCourses } from '@/hooks/useQueries';
import { Category } from '@/backend';
import type { Course } from '@/backend';

interface CategoryOption {
  label: string;
  value: string; // 'All' or Category enum value
}

const CATEGORIES: CategoryOption[] = [
  { label: 'All', value: 'All' },
  { label: 'General Studies', value: Category.generalStudies },
  { label: 'Mathematics', value: Category.math },
  { label: 'English', value: Category.english },
  { label: 'Computer', value: Category.computer },
  { label: 'Logical Reasoning', value: Category.logicalReasoning },
];

const CATEGORY_LABELS: Record<string, string> = {
  [Category.math]: 'Mathematics',
  [Category.generalStudies]: 'General Studies',
  [Category.english]: 'English',
  [Category.computer]: 'Computer',
  [Category.logicalReasoning]: 'Logical Reasoning',
};

const CATEGORY_THUMBNAILS: Record<string, string> = {
  [Category.math]: '/assets/generated/thumb-math.dim_400x250.png',
  [Category.generalStudies]: '/assets/generated/thumb-history.dim_400x250.png',
  [Category.english]: '/assets/generated/thumb-history.dim_400x250.png',
  [Category.computer]: '/assets/generated/thumb-technology.dim_400x250.png',
  [Category.logicalReasoning]: '/assets/generated/thumb-science.dim_400x250.png',
};

function getThumbnail(course: Course): string {
  if (course.thumbnailUrl) return course.thumbnailUrl;
  return CATEGORY_THUMBNAILS[course.category as string] || '/assets/generated/thumb-math.dim_400x250.png';
}

function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category;
}

function CourseCardSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-card">
      <Skeleton className="h-44 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-9 w-full mt-2" />
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { data: courses = [], isLoading } = useGetAllCourses();

  const filtered = courses.filter((course) => {
    const matchesCategory =
      activeCategory === 'All' || (course.category as string) === activeCategory;
    const matchesSearch =
      !searchQuery ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCategoryLabel =
    CATEGORIES.find((c) => c.value === activeCategory)?.label || activeCategory;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-charcoal py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif font-black text-4xl sm:text-5xl text-white mb-4">
            Course <span className="text-amber">Catalog</span>
          </h1>
          <p className="text-white/65 max-w-lg mx-auto text-base">
            Browse our library of expert-led educational videos and PDFs across multiple subjects.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-b border-border sticky top-16 z-30 shadow-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                    activeCategory === cat.value
                      ? 'bg-amber text-charcoal border-amber shadow-amber'
                      : 'bg-background text-muted-foreground border-border hover:border-amber hover:text-amber'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-serif font-bold text-xl text-charcoal mb-2">
                No courses found
              </h3>
              <p className="text-muted-foreground mb-6">
                {courses.length === 0
                  ? 'No courses have been added yet. Check back soon!'
                  : 'Try adjusting your filters or search query.'}
              </p>
              {courses.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="border-amber text-amber hover:bg-amber/5"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">
                Showing <span className="font-semibold text-charcoal">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'course' : 'courses'}
                {activeCategory !== 'All' && (
                  <> in <span className="font-semibold text-amber">{activeCategoryLabel}</span></>
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((course) => {
                  const courseIdStr = course.id.toString();
                  return (
                    <div
                      key={courseIdStr}
                      className="bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group flex flex-col cursor-pointer"
                    >
                      <div className="relative overflow-hidden h-44 flex-shrink-0">
                        <img
                          src={getThumbnail(course)}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              '/assets/generated/thumb-math.dim_400x250.png';
                          }}
                        />
                        <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-amber/90 flex items-center justify-center shadow-amber">
                            <PlayCircle className="h-6 w-6 text-charcoal" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <Badge className="mb-2 bg-amber/10 text-amber border-amber/20 text-xs w-fit">
                          {getCategoryLabel(course.category as string)}
                        </Badge>
                        <h3 className="font-serif font-bold text-charcoal text-base mb-1 line-clamp-2 group-hover:text-amber transition-colors flex-1">
                          {course.title}
                        </h3>
                        <p className="text-muted-foreground text-xs mb-1">{course.instructor}</p>
                        {course.description && (
                          <p className="text-muted-foreground text-xs line-clamp-2 mb-3">
                            {course.description}
                          </p>
                        )}
                        <Link to="/video/$id" params={{ id: courseIdStr }} className="mt-auto">
                          <Button
                            size="sm"
                            className="w-full bg-amber text-charcoal hover:bg-amber-light font-semibold gap-2 shadow-amber"
                          >
                            <PlayCircle className="h-4 w-4" />
                            Watch Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
