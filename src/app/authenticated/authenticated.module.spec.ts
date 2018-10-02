import { AuthenticatedModule } from './authenticated.module';

describe('AuthenticatedModule', () => {
  let authenticatedModule: AuthenticatedModule;

  beforeEach(() => {
    authenticatedModule = new AuthenticatedModule();
  });

  it('should create an instance', () => {
    expect(authenticatedModule).toBeTruthy();
  });
});
