
import { Pipe, PipeTransform } from '@angular/core';
import { DepartmentsListProviderService } from '@app/_services/department.service';
import { thisExpression } from 'babel-types';

@Pipe({
  name: 'getDepartmentName'
})
export class GetDepartmentNamePipe implements PipeTransform {
  
  constructor(private departmentsListProviderService:DepartmentsListProviderService) {

  }

  transform(id: number) {
      return this.departmentsListProviderService.get().filter(x=>x.departmentId==id).map(x=>x.departmentName);
  }

}
