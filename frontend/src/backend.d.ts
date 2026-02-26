import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PDFResource {
    id: bigint;
    title: string;
    subject: Category;
    description: string;
    fileName: string;
    timestamp: Time;
}
export interface FAQ {
    question: string;
    answer: string;
}
export type Time = bigint;
export interface SupportMessage {
    subject: string;
    name: string;
    email: string;
    message: string;
}
export interface Course {
    id: bigint;
    title: string;
    thumbnailUrl: string;
    instructor: string;
    description: string;
    category: Category;
    videoUrl: string;
}
export enum Category {
    logicalReasoning = "logicalReasoning",
    generalStudies = "generalStudies",
    math = "math",
    computer = "computer",
    english = "english"
}
export interface backendInterface {
    addCourse(title: string, category: Category, description: string, instructor: string, videoUrl: string, thumbnailUrl: string): Promise<bigint>;
    addFAQ(question: string, answer: string): Promise<void>;
    addPDF(title: string, subject: Category, description: string, fileName: string): Promise<void>;
    deletePDF(id: bigint): Promise<boolean>;
    getAllCourses(): Promise<Array<Course>>;
    getAllPDFs(): Promise<Array<PDFResource>>;
    getCourse(id: bigint): Promise<Course | null>;
    getCoursesByCategory(category: Category): Promise<Array<Course>>;
    getCoursesByInstructor(instructor: string): Promise<Array<Course>>;
    getCoursesByTitle(title: string): Promise<Array<Course>>;
    getFAQs(): Promise<Array<FAQ>>;
    getPDFsBySubject(subject: Category): Promise<Array<PDFResource>>;
    getSupportMessages(): Promise<Array<SupportMessage>>;
    submitSupportMessage(name: string, email: string, subject: string, message: string): Promise<void>;
}
