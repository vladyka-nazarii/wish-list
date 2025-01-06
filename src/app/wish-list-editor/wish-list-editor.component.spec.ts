import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListEditorComponent } from './wish-list-editor.component';

describe('WishListEditorComponent', () => {
  let component: WishListEditorComponent;
  let fixture: ComponentFixture<WishListEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishListEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
