import { useNavigate } from '@tanstack/react-router';
import AdminLayout from '../../components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Video, ArrowRight, BookOpen } from 'lucide-react';
import { useGetAllPDFs } from '../../hooks/useQueries';
import { useGetAllCourses } from '../../hooks/useQueries';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { data: pdfs } = useGetAllPDFs();
  const { data: courses } = useGetAllCourses();

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold font-serif text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your educational content from one place.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{pdfs?.length ?? '—'}</p>
                  <p className="text-sm text-muted-foreground">PDF Resources</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10">
                  <Video className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{courses?.length ?? '—'}</p>
                  <p className="text-sm text-muted-foreground">Video Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PDF Management Card */}
          <Card
            className="border-border shadow-card hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => navigate({ to: '/admin/pdfs' })}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <CardTitle className="text-xl mt-4">PDF Management</CardTitle>
              <CardDescription>
                Upload and manage PDF study materials, textbooks, and reference documents for students.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                onClick={(e) => { e.stopPropagation(); navigate({ to: '/admin/pdfs' }); }}
              >
                <FileText className="w-4 h-4" />
                Manage PDFs
              </Button>
            </CardContent>
          </Card>

          {/* Video Management Card */}
          <Card
            className="border-border shadow-card hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => navigate({ to: '/admin/videos' })}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
                  <Video className="w-6 h-6 text-amber-600" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </div>
              <CardTitle className="text-xl mt-4">Video Management</CardTitle>
              <CardDescription>
                Add video courses with YouTube or external links, manage instructors, categories, and descriptions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full gap-2 group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-colors"
                onClick={(e) => { e.stopPropagation(); navigate({ to: '/admin/videos' }); }}
              >
                <Video className="w-4 h-4" />
                Manage Videos
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tips */}
        <Card className="border-border bg-muted/30">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <CardTitle className="text-sm font-semibold">Quick Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                For videos, paste a YouTube embed URL (e.g., <code className="text-xs bg-muted px-1 py-0.5 rounded">https://www.youtube.com/embed/VIDEO_ID</code>)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                PDF entries store metadata only — use the file name to reference the actual document.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">•</span>
                Use consistent category names (e.g., "Mathematics", "Science") for proper filtering on the public site.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
