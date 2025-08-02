import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinBulletinComponent } from './join-bulletin.component';

describe('JoinBulletinComponent', () => {
  let component: JoinBulletinComponent;
  let fixture: ComponentFixture<JoinBulletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinBulletinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
