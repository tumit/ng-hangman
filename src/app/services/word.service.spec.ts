import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WordService } from './word.service';
import { environment } from '../../environments/environment.prod';

describe('WordService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([WordService], (service: WordService) => {
    expect(service).toBeTruthy();
  }));

  it('should call word generator url', inject([WordService], (service: WordService) => {
    const sub$ = service.get().subscribe(_ => { });

    const req = httpTestingController.expectOne(environment.wordUrl);
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpTestingController.verify();
    sub$.unsubscribe();
  }));
});
