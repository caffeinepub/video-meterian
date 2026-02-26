import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useGetAllCourses, useAddCourse } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, AlertCircle, Video, PlayCircle, ExternalLink } from 'lucide-react';
import { Category } from '../../backend';
import type { Course } from '../../backend';

const CATEGORIES: { label: string; value: Category }[] = [
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

export default function AdminVideosPage() {
  const { data: courses, isLoading, isError } = useGetAllCourses();
  const addCourse = useAddCourse();

  const [form, setForm] = useState({
    title: '',
    category: '' as Category | '',
    instructor: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
  });
  const [formError, setFormError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      setFormError('Title is required.');
      return;
    }
    if (!form.category) {
      setFormError('Category is required.');
      return;
    }
    if (!form.videoUrl.trim()) {
      setFormError('Video URL is required.');
      return;
    }
    if (!form.instructor.trim()) {
      setFormError('Instructor name is required.');
      return;
    }

    try {
      await addCourse.mutateAsync({
        title: form.title.trim(),
        category: form.category,
        description: form.description.trim(),
        instructor: form.instructor.trim(),
        videoUrl: form.videoUrl.trim(),
        thumbnailUrl: form.thumbnailUrl.trim(),
      });
      setForm({ title: '', category: '', instructor: '', description: '', videoUrl: '', thumbnailUrl: '' });
      setFormError('');
    } catch {
      setFormError('Failed to add course. Please try again.');
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold font-serif text-foreground">Video Management</h1>
          <p className="text-muted-foreground mt-1">Add and manage video courses with YouTube or external links.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Add Video Form */}
          <div className="lg:col-span-2">
            <Card className="border-border shadow-card sticky top-24">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-600" />
                  <CardTitle>Add New Course</CardTitle>
                </div>
                <CardDescription>Paste a YouTube embed URL or any external video link.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="e.g., History of Odisha - Part 1"
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category <span className="text-destructive">*</span></Label>
                    <select
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                    >
                      <option value="">Select a category…</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor <span className="text-destructive">*</span></Label>
                    <Input
                      id="instructor"
                      name="instructor"
                      placeholder="e.g., Dr. Ramesh Panda"
                      value={form.instructor}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">
                      Video URL <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="videoUrl"
                      name="videoUrl"
                      type="url"
                      placeholder="https://www.youtube.com/embed/…"
                      value={form.videoUrl}
                      onChange={handleChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Use YouTube embed format: <code className="bg-muted px-1 rounded">youtube.com/embed/VIDEO_ID</code>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnailUrl">Thumbnail URL <span className="text-muted-foreground text-xs">(optional)</span></Label>
                    <Input
                      id="thumbnailUrl"
                      name="thumbnailUrl"
                      type="url"
                      placeholder="https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg"
                      value={form.thumbnailUrl}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Brief description of the course content…"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2 bg-amber-500 hover:bg-amber-600 text-white border-0"
                    disabled={addCourse.isPending}
                  >
                    {addCourse.isPending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Adding…
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add Course
                      </>
                    )}
                  </Button>

                  {addCourse.isSuccess && (
                    <p className="text-sm text-center text-green-600 font-medium">✓ Course added successfully!</p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Course List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                All Courses
                {courses && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">({courses.length})</span>
                )}
              </h2>
            </div>

            {isLoading && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border-border">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/3" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Failed to load courses. Please refresh the page.</AlertDescription>
              </Alert>
            )}

            {!isLoading && !isError && courses?.length === 0 && (
              <Card className="border-border border-dashed">
                <CardContent className="pt-8 pb-8 text-center">
                  <Video className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">No courses yet</p>
                  <p className="text-sm text-muted-foreground mt-1">Add your first course using the form on the left.</p>
                </CardContent>
              </Card>
            )}

            {!isLoading && courses && courses.length > 0 && (
              <div className="space-y-3">
                {[...courses].reverse().map((course: Course) => (
                  <Card key={course.id.toString()} className="border-border hover:shadow-md transition-shadow">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          {/* Thumbnail or placeholder */}
                          <div className="flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                            {course.thumbnailUrl ? (
                              <img
                                src={course.thumbnailUrl}
                                alt={course.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <PlayCircle className="w-6 h-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{course.title}</h3>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <Badge variant="secondary" className="text-xs">
                                {CATEGORY_LABELS[course.category as string] || course.category}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{course.instructor}</span>
                            </div>
                            {course.description && (
                              <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{course.description}</p>
                            )}
                            {course.videoUrl && (
                              <a
                                href={course.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-3 h-3" />
                                View video
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            title="Delete course"
                            disabled
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
