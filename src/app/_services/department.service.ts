import { Injectable } from '@angular/core';

@Injectable()
export class DepartmentsListProviderService {
  constructor() {}

  public get(): Array<{ departmentId: number; departmentName: string }> {
    return [{ departmentId: 1, departmentName: 'Department A' }, { departmentId: 2, departmentName: 'Department B' }];
  }
}
