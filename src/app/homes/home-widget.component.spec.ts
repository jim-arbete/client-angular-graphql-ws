import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatTableModule
} from '@angular/material';
import { HomeWidgetComponent } from './home-widget.component';

describe('HomeWidgetComponent', () => {
  let component: HomeWidgetComponent;
  let fixture: ComponentFixture<HomeWidgetComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatTableModule,
      ],
      declarations: [ HomeWidgetComponent ],
      schemas: [ NO_ERRORS_SCHEMA ] // render nested components as empty tags and ignore them
    })
    .compileComponents(); // not required with "ng test"-command
  }));

  beforeEach(() => {
    // Scaffold the component
    fixture = TestBed.createComponent(HomeWidgetComponent); // creates instance of component in the test-runner DOM
    component = fixture.componentInstance; // allows interaction with created component and its elements
    el = fixture.nativeElement; // => example usage => fixture.nativeElement.querySelector('h3');

    // 1. PRE => ngOnInit() => Initialize all pre-data => @Input() and pre-set data.
    // mock the "@Input() home: Home;" supplied by the parent component
    const homeMock = {
      id: 1, name: 'Test Home 1', rooms: [
        { name: 'Kitchen', temperature: 21, humidity: 0.79 },
        { name: 'Bedroom', temperature: 20, humidity: 0.81 }
      ]
    };
    component.home = homeMock;

    // 2. POST => ngOnInit() => Initialize all post-data
    fixture.detectChanges(); // Trigger change detection => onInit() => Angular lifecycle hooks
    component.rooms = homeMock.rooms;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display {{home.name}} name in mat-card-header', () => {
    expect(el.querySelector('.mat-card-title').textContent).toContain(component.home.name);
  });

  it('should display FIRST room-item {{home.name.rooms[0].name}} inside Material-table => <table mat-table />', () => {
    expect(el.querySelector('.mat-table').textContent).toContain(component.home.rooms[0].name);
  });
});
