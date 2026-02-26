import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { Category } from '../backend';
import type { Course, FAQ, PDFResource } from '../backend';

// ── Courses ──────────────────────────────────────────────────────────────────

export function useGetAllCourses() {
  const { actor, isFetching } = useActor();

  return useQuery<Course[]>({
    queryKey: ['courses'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCourse(id: bigint | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Course | null>({
    queryKey: ['course', id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getCourse(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useGetCoursesByCategory(category: Category | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Course[]>({
    queryKey: ['courses', 'category', category],
    queryFn: async () => {
      if (!actor || !category) return [];
      return actor.getCoursesByCategory(category);
    },
    enabled: !!actor && !isFetching && category !== null,
  });
}

export function useAddCourse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      category,
      description,
      instructor,
      videoUrl,
      thumbnailUrl,
    }: {
      title: string;
      category: Category;
      description: string;
      instructor: string;
      videoUrl: string;
      thumbnailUrl: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addCourse(title, category, description, instructor, videoUrl, thumbnailUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

// ── FAQs ─────────────────────────────────────────────────────────────────────

export function useGetFAQs() {
  const { actor, isFetching } = useActor();

  return useQuery<FAQ[]>({
    queryKey: ['faqs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFAQs();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── Support Messages ──────────────────────────────────────────────────────────

export function useSubmitSupportMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      subject,
      message,
    }: {
      name: string;
      email: string;
      subject: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitSupportMessage(name, email, subject, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['supportMessages'] });
    },
  });
}

// ── PDFs ──────────────────────────────────────────────────────────────────────

export function useGetAllPDFs() {
  const { actor, isFetching } = useActor();

  return useQuery<PDFResource[]>({
    queryKey: ['pdfs'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPDFs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddPDF() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      subject,
      description,
      fileName,
    }: {
      title: string;
      subject: Category;
      description: string;
      fileName: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addPDF(title, subject, description, fileName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pdfs'] });
    },
  });
}

export function useDeletePDF() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.deletePDF(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pdfs'] });
    },
  });
}
