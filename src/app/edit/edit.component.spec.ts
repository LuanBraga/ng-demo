import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Address, Person, SearchService } from '../shared';
import { MockActivatedRoute, MockRouter } from '../shared/search/mocks/routes';

import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  let mockSearchService: SearchService;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(() => {
    mockActivatedRoute = new MockActivatedRoute( {id:1} );
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [EditComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter}
      ],
      imports: [FormsModule, HttpClientTestingModule, MatInputModule, NoopAnimationsModule]
    }).compileComponents();

    mockSearchService = TestBed.inject(SearchService);
  });

  it('should fetch a single record', () => {
    const fixture =  TestBed.createComponent(EditComponent);

    const person = new Person({id:1, name: 'Michael Porter Jr.'});
    person.address = new Address({city: 'Denver'});

    //mock response
    spyOn(mockSearchService, 'get').and.returnValue(of(person));

    //initialize component
    fixture.detectChanges();

    //verify service was called
    expect(mockSearchService.get).toHaveBeenCalledWith(1);

    //verify data was set on component when initialized
    const editComponent = fixture.componentInstance;
    expect(editComponent.person.address.city).toBe('Denver');

    //verify HTML renders as expected
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').innerHTML).toBe('Michael Porter Jr.');
  });
});
