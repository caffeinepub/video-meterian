import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, PlayCircle, User, Tag, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useGetCourse, useGetCoursesByCategory } from '@/hooks/useQueries';
import type { Course } from '@/backend';

const CATEGORY_THUMBNAILS: Record<string, string> = {
  math: '/assets/generated/thumb-math.dim_400x250.png',
  generalStudies: '/assets/generated/thumb-history.dim_400x250.png',
  english: '/assets/generated/thumb-history.dim_400x250.png',
  computer: '/assets/generated/thumb-technology.dim_400x250.png',
  logicalReasoning: '/assets/generated/thumb-science.dim_400x250.png',
};

const CATEGORY_LABELS: Record<string, string> = {
  math: 'Mathematics',
  generalStudies: 'General Studies',
  english: 'English',
  computer: 'Computer',
  logicalReasoning: 'Logical Reasoning',
};

function getThumbnail(course: Course): string {
  if (course.thumbnailUrl) return course.thumbnailUrl;
  return CATEGORY_THUMBNAILS[course.category as string] || '/assets/generated/thumb-math.dim_400x250.png';
}

function RelatedCourseCard({ course, currentId }: { course: Course; currentId: string }) {
  const courseIdStr = course.id.toString();
  if (courseIdStr === currentId) return null;
  return (
    <Link to="/video/$id" params={{ id: courseIdStr }}>
      <div className="flex gap-3 p-3 rounded-lg hover:bg-secondary/60 transition-colors group cursor-pointer">
        <div className="flex-shrink-0 w-24 h-16 rounded-md overflow-hidden">
          <img
            src={getThumbnail(course)}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                '/assets/generated/thumb-math.dim_400x250.png';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-serif font-bold text-charcoal text-sm line-clamp-2 group-hover:text-amber transition-colors">
            {course.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">{course.instructor}</p>
        </div>
      </div>
    </Link>
  );
}

export default function VideoPlayerPage() {
  const { id } = useParams({ from: '/video/$id' });
  const courseId = BigInt(id);

  const { data: course, isLoading: courseLoading } = useGetCourse(courseId);
  const { data: relatedCourses = [] } = useGetCoursesByCategory(course?.category ?? null);

  const categoryLabel = course ? (CATEGORY_LABELS[course.category as string] || course.category) : '';

  if (courseLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-6 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="w-full aspect-video rounded-xl" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-24 h-16 rounded-md" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-serif font-bold text-2xl text-charcoal mb-2">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/courses">
            <Button className="bg-amber text-charcoal hover:bg-amber-light font-semibold gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Build embed URL — support YouTube, Vimeo, or fallback iframe
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    // YouTube
    const ytMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    // Return as-is (assume already an embed URL)
    return url;
  };

  const embedUrl = getEmbedUrl(course.videoUrl);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link to="/courses">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6 gap-2 text-muted-foreground hover:text-charcoal"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="w-full aspect-video bg-charcoal rounded-xl overflow-hidden shadow-card-hover mb-6">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={course.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
                  <PlayCircle className="h-16 w-16 mb-3 text-amber" />
                  <p className="text-sm">Video player — embed URL not configured</p>
                </div>
              )}
            </div>

            {/* Course Info */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-card">
              <div className="flex flex-wrap items-start gap-3 mb-4">
                <Badge className="bg-amber text-charcoal font-semibold">
                  {categoryLabel}
                </Badge>
              </div>
              <h1 className="font-serif font-black text-2xl sm:text-3xl text-charcoal mb-4 leading-tight">
                {course.title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-amber" />
                  <span className="font-medium text-charcoal">{course.instructor}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Tag className="h-4 w-4 text-amber" />
                  {categoryLabel}
                </span>
              </div>

              <Separator className="mb-5" />

              <div>
                <h2 className="font-serif font-bold text-charcoal text-lg mb-3">
                  About This Lesson
                </h2>
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>
              </div>
            </div>
          </div>

          {/* Sidebar — Related Videos */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border shadow-card sticky top-24">
              <div className="p-4 border-b border-border">
                <h3 className="font-serif font-bold text-charcoal text-lg">
                  Related Videos
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  More in {categoryLabel}
                </p>
              </div>
              <ScrollArea className="h-[480px]">
                <div className="p-3 space-y-1">
                  {relatedCourses.length <= 1 ? (
                    <div className="text-center py-10 text-muted-foreground text-sm">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-40" />
                      No related videos yet.
                    </div>
                  ) : (
                    relatedCourses.map((related) => (
                      <RelatedCourseCard
                        key={related.id.toString()}
                        course={related}
                        currentId={id}
                      />
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
