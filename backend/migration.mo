import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Time "mo:core/Time";

module {
  type OldCourse = {
    id : Nat;
    title : Text;
    category : Text;
    description : Text;
    instructor : Text;
    videoUrl : Text;
    thumbnailUrl : Text;
  };

  type OldPDFResource = {
    id : Nat;
    title : Text;
    subject : Text;
    description : Text;
    fileName : Text;
    timestamp : Time.Time;
  };

  type OldSupportMessage = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
  };

  type OldFAQ = {
    question : Text;
    answer : Text;
  };

  type OldActor = {
    courses : Map.Map<Nat, OldCourse>;
    pdfs : Map.Map<Nat, OldPDFResource>;
    supportMessages : Map.Map<Nat, OldSupportMessage>;
    faqs : List.List<OldFAQ>;
    nextPdfId : Nat;
    nextMessageId : Nat;
    nextCourseId : Nat;
  };

  type Category = { #math; #generalStudies; #english; #computer; #logicalReasoning };
  type NewCourse = {
    id : Nat;
    title : Text;
    category : Category;
    description : Text;
    instructor : Text;
    videoUrl : Text;
    thumbnailUrl : Text;
  };

  type NewPDFResource = {
    id : Nat;
    title : Text;
    subject : Category;
    description : Text;
    fileName : Text;
    timestamp : Time.Time;
  };

  type NewSupportMessage = {
    name : Text;
    email : Text;
    subject : Text;
    message : Text;
  };

  type NewFAQ = {
    question : Text;
    answer : Text;
  };

  type NewActor = {
    courses : Map.Map<Nat, NewCourse>;
    pdfs : Map.Map<Nat, NewPDFResource>;
    supportMessages : Map.Map<Nat, NewSupportMessage>;
    faqs : List.List<NewFAQ>;
    nextPdfId : Nat;
    nextMessageId : Nat;
    nextCourseId : Nat;
  };

  func textToCategory(text : Text) : Category {
    switch (text.toLower().trim(#char ' ')) {
      case ("math") { #math };
      case ("general studies") { #generalStudies };
      case ("english") { #english };
      case ("computer") { #computer };
      case ("logical reasoning") { #logicalReasoning };
      case (_) { #generalStudies };
    };
  };

  public func run(old : OldActor) : NewActor {
    let newCourses = old.courses.map<Nat, OldCourse, NewCourse>(
      func(_id, oldCourse) {
        {
          oldCourse with category = textToCategory(oldCourse.category);
        };
      }
    );

    let newPDFs = old.pdfs.map<Nat, OldPDFResource, NewPDFResource>(
      func(_id, oldPDF) {
        {
          oldPDF with subject = textToCategory(oldPDF.subject);
        };
      }
    );

    {
      courses = newCourses;
      pdfs = newPDFs;
      supportMessages = old.supportMessages;
      faqs = old.faqs;
      nextPdfId = old.nextPdfId;
      nextMessageId = old.nextMessageId;
      nextCourseId = old.nextCourseId;
    };
  };
};
