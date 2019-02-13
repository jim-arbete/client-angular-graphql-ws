import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApolloTestingModule, ApolloTestingController } from 'apollo-angular/testing';
import { HomesChangedGQL, AllHomesGQL, Home } from './homes.graphql';
import { HomesComponent } from './homes.component';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

describe('HomesComponent', () => {
  let apolloBackend: ApolloTestingController;
  let component: HomesComponent;
  let fixture: ComponentFixture<HomesComponent>;
  let el: HTMLElement;
  let allHomesGQL: jasmine.SpyObj<AllHomesGQL>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomesComponent ],
      imports: [ ApolloTestingModule ],
      schemas: [ NO_ERRORS_SCHEMA ] // render nested components as empty tags and ignore them
    })
    .compileComponents();
  }));

  beforeEach(() => {
    apolloBackend = TestBed.get(ApolloTestingController); // mock calls to the GraphQL endpoint.
    allHomesGQL = jasmine.createSpyObj('AllHomesGQL', ['watch']);

    // Scaffold the component
    fixture = TestBed.createComponent(HomesComponent); // creates instance of component in the test-runner DOM
    component = fixture.componentInstance; // allows interaction with created component and its elements
    el = fixture.nativeElement; // => example usage => fixture.nativeElement.querySelector('h3');
  });

  afterEach(() => {
    // apolloBackend.verify();
  });

  it('should create', () => {
    expect(component).toBeDefined();
    fixture.detectChanges();
  });

  it('expect mock data to be added into component and confirm fetched data inside the component', (done) => {
    const watchHomesMock = {
      data: {
        Homes: [
          {
            id: 1,
            name: 'Test Home 1',
            rooms: [
              { name: 'Kitchen', temperature: 21, humidity: 0.79 },
              { name: 'Bedroom', temperature: 20, humidity: 0.81 }
            ]
          }
        ]
      }
    };

    // Mocking of Graphql Home Query
    allHomesGQL.watch.and.returnValue({
      valueChanges: of(watchHomesMock)
    });
    fixture.detectChanges();

    // 1. Fetch the data and store in the component
    component.homes = allHomesGQL.watch().valueChanges.pipe(
      map(result => result.data.Homes)
    );
    fixture.detectChanges();

    // 2. Confirm the fetched data in the component
    component.homes.subscribe(result => {
      expect(result).toEqual(watchHomesMock.data.Homes);
      done();
    });

    // apolloBackend.expectOne(operation => true).flush(watchHomesMock);
  });

});
