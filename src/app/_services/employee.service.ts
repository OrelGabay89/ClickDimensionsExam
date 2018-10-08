import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { MessageService } from '@app/_services/message.service';
import { Employee } from '@app/_models/Employee';
import { Department } from '@app/_models/department';
import { DepartmentsListProviderService } from '@app/_services/department.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class EmployeesService {

  private EmployeesUrl = '/employees';  // URL to web api
  private DepartmentsUrl = '/departments'; 

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private departmentsListProviderService:DepartmentsListProviderService) { }

  /** GET Employees from the server */
  getEmployees (): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.EmployeesUrl)
      .pipe(
        tap(Employees => this.log('fetched Employees')),
        catchError(this.handleError('getEmployees', []))
      );
  }

  getDepartments (): Observable<Department[]> {
    return this.http.get<Department[]>(this.DepartmentsUrl)
      .pipe(
        tap(Employees => this.log('fetched Department')),
        catchError(this.handleError('getDepartments', []))
      );
  }

  /** GET Employee by id. Return `undefined` when id not found */
  getEmployeeNo404<Data>(id: number): Observable<Employee> {
    const url = `${this.EmployeesUrl}/?id=${id}`;
    return this.http.get<Employee[]>(url)
      .pipe(
        map(Employees => Employees[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Employee id=${id}`);
        }),
        catchError(this.handleError<Employee>(`getEmployee id=${id}`))
      );
  }

  /** GET Employee by id. Will 404 if id not found */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.EmployeesUrl}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(_ => this.log(`fetched Employee id=${id}`)),
      catchError(this.handleError<Employee>(`getEmployee id=${id}`))
    );
  }

  /* GET Employees whose name contains search term */
  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty Employee array.
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.EmployeesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found Employees matching "${term}"`)),
      catchError(this.handleError<Employee[]>('searchEmployees', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Employee to the server */
  addEmployee (employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.EmployeesUrl, employee, httpOptions).pipe(
      tap((employee: Employee) => this.log(`added Employee w/ id=${employee.id}`)),
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  /** DELETE: delete the Employee from the server */
  deleteEmployee (employee: Employee | number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.EmployeesUrl}/${id}`;

    return this.http.delete<Employee>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  /** PUT: update the Employee on the server */
  updateEmployee (employee: Employee): Observable<any> {
    return this.http.put(this.EmployeesUrl, employee, httpOptions).pipe(
      tap(_ => this.log(`updated Employee id=${employee.id}`)),
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a EmployeeService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EmployeeService: ${message}`);
  }
}
