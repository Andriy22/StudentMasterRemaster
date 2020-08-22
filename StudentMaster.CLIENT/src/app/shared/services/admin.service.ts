import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '@shared/config';
import { ClassModel } from '@shared/models/classes-model';
import { SubjectModel } from '@shared/models/subject-model';
import { TeacherModel } from '@shared/models/teacher-model';
import { Pagination } from '@shared/models/pagination.model';
import { StudentModel } from '@shared/models/student-model';
import { StudentClass } from '@shared/models/student-class.model';
import { RegisterModel } from '@shared/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  public getAllClasses() {
    return this.http.get<ClassModel[]>(API + '/api/Admin/get-all-classes');
  }

  // this method will be removed
  public inviteUser(email, classId) {
    return this.http.get(API + '/api/Admin/invite-user/' + email + '/' + classId);
  }

  public registerUser(user: RegisterModel) {
    return this.http.post(API + '/api/Account/create-account', user);
  }

  public removeStudentFromClass(studentId) {
    return this.http.get(API + '/api/Admin/remove-student-from-class/' + studentId);
  }
  public getClassSubjects(classId) {
    return this.http.get<SubjectModel[]>(API + '/api/Admin/get-class-subjects/' + classId);
  }
  public getAllSubjects() {
    return this.http.get<SubjectModel[]>(API + '/api/Admin/get-all-subjects');
  }
  public getTeacherSubjects(teacherId) {
    return this.http.get<SubjectModel[]>(API + '/api/Admin/get-teacher-subjects/' + teacherId);
  }
  public editSubjectsInClass(classId, subjectId) {
    return this.http.get<SubjectModel[]>(
      API + `/api/Admin/edit-subjects-in-class/${classId}/${subjectId}`
    );
  }
  public editSubjectsInTeacher(teacherId, subjectId) {
    return this.http.get<SubjectModel[]>(
      API + `/api/Admin/edit-subjects-in-teacher/${subjectId}/${teacherId}`
    );
  }
  public getClassTeachers(classId) {
    return this.http.get<TeacherModel[]>(API + '/api/Admin/get-class-teachers/' + classId);
  }
  public getAllTeachers() {
    return this.http.get<TeacherModel[]>(API + '/api/Admin/get-all-teachers');
  }
  public editTeachersInClass(classId, teacherId) {
    return this.http.get(API + `/api/Admin/edit-teachers-in-class/${classId}/${teacherId}`);
  }
  public getAllUsers(page: number, count: number) {
    return this.http.get<Pagination<StudentModel>>(
      API + '/api/Admin/get-all-users/' + page + '/' + count
    );
  }
  public getAllRoles() {
    return this.http.get<string[]>(API + '/api/Admin/get-all-roles');
  }
  public getStudentClasses(uid) {
    return this.http.get<StudentClass[]>(API + '/api/Admin/get-student-classes/' + uid);
  }
  public getRolesByUID(uid) {
    return this.http.get<string[]>(API + '/api/Admin/get-user-roles/' + uid);
  }
  public changeRolesInUser(uid, role) {
    return this.http.get<string[]>(API + '/api/Admin/edit-roles-in-user/' + uid + '/' + role);
  }
  public changeClassInStudent(classId, studentId) {
    return this.http.get<string[]>(
      API + '/api/Admin/edit-class-in-student/' + classId + '/' + studentId
    );
  }
  public removeNew(id) {
    return this.http.get(API + '/api/Admin/remove-new/' + id);
  }
  public addNew(title: string, text: string) {
    return this.http.post(API + '/api/Admin/add-new/', { Title: title, Text: text });
  }

  public createClass(name) {
    return this.http.get(API + '/api/Admin/create-class/' + name);
  }
  public changeClassName(oldName, newName) {
    return this.http.get(API + '/api/Admin/change-class-name/' + oldName + '/' + newName);
  }
  public deleteClass(name) {
    return this.http.get(API + '/api/Admin/delete-class/' + name);
  }
}
