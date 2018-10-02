import { TalentModule } from './talent.module';

describe('TalentModule', () => {
  let talentModule: TalentModule;

  beforeEach(() => {
    talentModule = new TalentModule();
  });

  it('should create an instance', () => {
    expect(talentModule).toBeTruthy();
  });
});
