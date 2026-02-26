import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useGetAllPDFs, useAddPDF, useDeletePDF } from '../../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Plus, Trash2, AlertCircle, BookOpen } from 'lucide-react';
import { Category } from '../../backend';
import type { PDFResource } from '../../backend';

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

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function AdminPDFsPage() {
  const { data: pdfs, isLoading, isError } = useGetAllPDFs();
  const addPDF = useAddPDF();
  const deletePDF = useDeletePDF();

  const [form, setForm] = useState({
    title: '',
    subject: '' as Category | '',
    description: '',
    fileName: '',
  });
  const [formError, setFormError] = useState('');
  const [deletingId, setDeletingId] = useState<bigint | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.subject || !form.fileName.trim()) {
      setFormError('Title, category, and file name are required.');
      return;
    }
    try {
      await addPDF.mutateAsync({
        title: form.title.trim(),
        subject: form.subject,
        description: form.description.trim(),
        fileName: form.fileName.trim(),
      });
      setForm({ title: '', subject: '', description: '', fileName: '' });
      setFormError('');
    } catch {
      setFormError('Failed to add PDF. Please try again.');
    }
  }

  async function handleDelete(id: bigint) {
    setDeletingId(id);
    try {
      await deletePDF.mutateAsync(id);
    } catch {
      // silently fail — query will re-sync
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold font-serif text-foreground">PDF Management</h1>
          <p className="text-muted-foreground mt-1">Add and manage PDF study materials for students.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Add PDF Form */}
          <div className="lg:col-span-2">
            <Card className="border-border shadow-card sticky top-24">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  <CardTitle>Add New PDF</CardTitle>
                </div>
                <CardDescription>Fill in the details for the new PDF resource.</CardDescription>
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
                      placeholder="e.g., History of Odisha Notes"
                      value={form.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Category <span className="text-destructive">*</span></Label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
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
                    <Label htmlFor="fileName">File Name <span className="text-destructive">*</span></Label>
                    <Input
                      id="fileName"
                      name="fileName"
                      placeholder="e.g., odisha-history-notes.pdf"
                      value={form.fileName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Brief description of the PDF content…"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={addPDF.isPending}
                  >
                    {addPDF.isPending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Adding…
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Add PDF
                      </>
                    )}
                  </Button>

                  {addPDF.isSuccess && (
                    <p className="text-sm text-center text-green-600 font-medium">✓ PDF added successfully!</p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* PDF List */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                All PDFs
                {pdfs && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">({pdfs.length})</span>
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
                <AlertDescription>Failed to load PDFs. Please refresh the page.</AlertDescription>
              </Alert>
            )}

            {!isLoading && !isError && pdfs?.length === 0 && (
              <Card className="border-border border-dashed">
                <CardContent className="pt-8 pb-8 text-center">
                  <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground font-medium">No PDFs yet</p>
                  <p className="text-sm text-muted-foreground mt-1">Add your first PDF using the form on the left.</p>
                </CardContent>
              </Card>
            )}

            {!isLoading && pdfs && pdfs.length > 0 && (
              <div className="space-y-3">
                {[...pdfs].reverse().map((pdf: PDFResource) => (
                  <Card key={pdf.id.toString()} className="border-border hover:shadow-md transition-shadow">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{pdf.title}</h3>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <Badge variant="secondary" className="text-xs">
                                {CATEGORY_LABELS[pdf.subject as string] || pdf.subject}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{pdf.fileName}</span>
                              <span className="text-xs text-muted-foreground">{formatDate(pdf.timestamp)}</span>
                            </div>
                            {pdf.description && (
                              <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{pdf.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                            title="Delete PDF"
                            disabled={deletingId === pdf.id}
                            onClick={() => handleDelete(pdf.id)}
                          >
                            {deletingId === pdf.id ? (
                              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
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
