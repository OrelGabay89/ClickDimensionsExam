import { ShellModule } from '@app/shell/shell.module';

describe('ShellModule', () => {
  let shellModule: ShellModule;

  beforeEach(() => {
    shellModule = new ShellModule();
  });

  it('should create an instance', () => {
    expect(shellModule).toBeTruthy();
  });
});
