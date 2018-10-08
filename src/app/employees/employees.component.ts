import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '@app/_models/Employee';
import { EmployeesService } from '@app/_services/employee.service';
import { Department } from '@app/_models/department';
import { DepartmentsListProviderService } from '@app/_services/department.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public addEmployeeForm: FormGroup;
  defaultSelectedDepartment: any;

  @Input() showSubmitBtn: boolean = true;

  employees: Employee[];
  departments : any;
  cols: any[];
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeesService,
    private departmentsListProviderService:DepartmentsListProviderService) { }

  ngOnInit() {
    this.createForm();
    this.getEmployees();
    this.getDepartments();
  }

  private createForm() {
    let formControlsGroupSchema = {
      firstName: new FormControl('', [Validators.pattern("[a-zA-Z][a-zA-Z ]+"), Validators.required]),
      lastName: new FormControl('', [Validators.pattern("[a-zA-Z][a-zA-Z ]+"), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phone: new FormControl('',  [Validators.pattern("[0-9]*"), Validators.required]),
      birthdate: new FormControl('', []),
      remarks: new FormControl('', []),
      departmentId: new FormControl('', []),  
    };

   
    this.addEmployeeForm = this.formBuilder.group(formControlsGroupSchema);
  }
  
  getEmployees(): void {
    this.employeeService.getEmployees()
    .subscribe(employees => this.employees = employees);
  }

  getDepartments(){
    this.departments = this.departmentsListProviderService.get();
    this.defaultSelectedDepartment = this.departments[0].departmentId;

    console.log(this.defaultSelectedDepartment);
  }

  
  public add(): Promise<Employee> {
    if (this.addEmployeeForm.invalid) {
      return Promise.reject("Form invalid");
    }
    this.employeeService.addEmployee(this.addEmployeeForm.value)
    .subscribe(Employee => {
      this.employees.push(Employee);
    });

  }
  addEmployee(employee: Employee): void {
    this.employeeService.addEmployee(employee)
      .subscribe(Employee => {
        this.employees.push(Employee);
      });
  }


  delete(employee: Employee): void {
    this.employees = this.employees.filter(h => h !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }

}

