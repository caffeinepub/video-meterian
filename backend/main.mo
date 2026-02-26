import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Migration "migration";

(with migration = Migration.run)
actor {
  public type Category = {
    #math;
    #generalStudies;
    #english;
    #computer;
    #logicalReasoning;
  };

  type Course = {
    id : Nat;
    title : Text;
    category : Category;
    description : Text;
    instructor : Text;
    videoUrl : Text;
    thumbnailUrl : Text;
  };

  type PDFResource = {
    id : Nat;
    title : Text;
    subject : Category;
    description : Text;
    fileName : Text;
    timestamp : Time.Time;
  };

  type SupportMessage = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
  };

  type FAQ = {
    question : Text;
    answer : Text;
  };

  let courses = Map.empty<Nat, Course>();
  let pdfs = Map.empty<Nat, PDFResource>();
  let supportMessages = Map.empty<Nat, SupportMessage>();
  let faqs = List.empty<FAQ>();
  var nextPdfId = 0;
  var nextMessageId = 0;
  var nextCourseId = 0;

  // Course Management
  public shared ({ caller }) func addCourse(
    title : Text,
    category : Category,
    description : Text,
    instructor : Text,
    videoUrl : Text,
    thumbnailUrl : Text,
  ) : async Nat {
    let course : Course = {
      id = nextCourseId;
      title;
      category;
      description;
      instructor;
      videoUrl;
      thumbnailUrl;
    };
    courses.add(nextCourseId, course);
    nextCourseId += 1;
    courses.size();
  };

  public query ({ caller }) func getCourse(id : Nat) : async ?Course {
    courses.get(id);
  };

  public query ({ caller }) func getCoursesByCategory(category : Category) : async [Course] {
    let filtered = courses.values().toArray().filter(func(c) { c.category == category });
    filtered;
  };

  public query ({ caller }) func getAllCourses() : async [Course] {
    courses.values().toArray();
  };

  public query ({ caller }) func getCoursesByInstructor(instructor : Text) : async [Course] {
    let filtered = courses.values().toArray().filter(func(c) { c.instructor.contains(#text instructor) });
    filtered;
  };

  public query ({ caller }) func getCoursesByTitle(title : Text) : async [Course] {
    let filtered = courses.values().toArray().filter(func(c) { c.title.contains(#text title) });
    filtered;
  };

  // PDF Resource Management
  public shared ({ caller }) func addPDF(
    title : Text,
    subject : Category,
    description : Text,
    fileName : Text,
  ) : async () {
    let pdf : PDFResource = {
      id = nextPdfId;
      title;
      subject;
      description;
      fileName;
      timestamp = Time.now();
    };
    pdfs.add(nextPdfId, pdf);
    nextPdfId += 1;
  };

  public query ({ caller }) func getPDFsBySubject(subject : Category) : async [PDFResource] {
    let filtered = pdfs.values().toArray().filter(func(p) { p.subject == subject });
    filtered;
  };

  public query ({ caller }) func getAllPDFs() : async [PDFResource] {
    pdfs.values().toArray();
  };

  public shared ({ caller }) func deletePDF(id : Nat) : async Bool {
    if (pdfs.containsKey(id)) {
      pdfs.remove(id);
      true;
    } else {
      false;
    };
  };

  // Support Messages
  public shared ({ caller }) func submitSupportMessage(
    name : Text,
    email : Text,
    subject : Text,
    message : Text,
  ) : async () {
    let supportMessage : SupportMessage = {
      name;
      email;
      subject;
      message;
    };
    supportMessages.add(nextMessageId, supportMessage);
    nextMessageId += 1;
  };

  public query ({ caller }) func getSupportMessages() : async [SupportMessage] {
    supportMessages.values().toArray();
  };

  // FAQ Management
  public shared ({ caller }) func addFAQ(question : Text, answer : Text) : async () {
    let newFAQ : FAQ = {
      question;
      answer;
    };
    faqs.add(newFAQ);
  };

  public query ({ caller }) func getFAQs() : async [FAQ] {
    faqs.toArray();
  };
};
