/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoardClientsAffairesComponent } from './board-clients-affaires.component';

describe('BoardClientsAffairesComponent', () => {
  let component: BoardClientsAffairesComponent;
  let fixture: ComponentFixture<BoardClientsAffairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardClientsAffairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardClientsAffairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
