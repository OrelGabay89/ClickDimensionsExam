import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Employee } from '@app/_models/Employee';
import { EmployeesService } from '@app/_services/employee.service';
import { DepartmentsListProviderService } from '@app/_services/department.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from '@app/_models/department';

@Component({
  selector: 'app-Employee-detail',
  templateUrl: './Employee-detail.component.html',
  styleUrls: [ './Employee-detail.component.css' ]
})
export class EmployeeDetailsComponent implements OnInit {

  @Input() 
  employee: Employee;
  public editEmployeeForm: FormGroup;

  departments: { departmentId: number; departmentName: string; }[];
  selectedDepartment: any;


  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private formBuilder: FormBuilder,
    private location: Location,
    private departmentsListProviderService:DepartmentsListProviderService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getEmployee();
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


    this.editEmployeeForm = this.formBuilder.group(formControlsGroupSchema);
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeesService.getEmployee(id)
      .subscribe(emp => {
          this.employee = emp;
          this.selectedDepartment = this.departments.find(row => row.departmentId == this.employee.departmentId)
      });

  }
  getDepartments(){
    this.departments = this.departmentsListProviderService.get();
  }
  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.employeesService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }
  
  public onStatusChange(event : any) {
    this.employee.departmentId = event.departmentId;
   
  }

}
