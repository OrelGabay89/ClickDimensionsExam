import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from '@app/_models/Employee';
import { Department } from '@app/_models/department';


export class InMemEmployeesService implements InMemoryDbService {
  createDb() {
    let employees = [
      { id: 1, firstName: 'Orel', lastName: 'Gabay' ,email:"orelgabay89@gmail.com",phone:"0542559101",birthdate : "23.03.1989",remarks:"No Remarks",
        departmentId:"1"
      },
      { id: 2, firstName: 'Eran', lastName: 'Nachum' ,email:"EranNachum@gmail.com",phone:"0123456789",birthdate : "20.03.1985",remarks:"My Remarks",
        departmentId:"2"
    },
    ];
    return {employees};
  }

  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 11;
  }
}