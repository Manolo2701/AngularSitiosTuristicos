import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SitiosService, Sitio } from './sitios.service';

describe('SitiosService', () => {
  let service: SitiosService;
  let httpMock: HttpTestingController;

  // Mock de sitios
  const mockSitios: Sitio[] = [
    {
      id: '1',
      name: 'Sitio 1',
      description: 'Descripción 1',
      parrafo1: 'Parrafo 1',
      parrafo2: 'Parrafo 2',
      imageUrl: 'http://example.com/image1.jpg',
      imageGallery: ['http://example.com/image1.jpg', 'http://example.com/image2.jpg'],
      rating: [5, 4, 4],
      comments: ['Comentario 1', 'Comentario 2'],
      commentUser: ['Usuario 1', 'Usuario 2'],
    },
    {
      id: '2',
      name: 'Sitio 2',
      description: 'Descripción 2',
      parrafo1: 'Parrafo 1',
      parrafo2: 'Parrafo 2',
      imageUrl: 'http://example.com/image2.jpg',
      imageGallery: ['http://example.com/image2.jpg', 'http://example.com/image3.jpg'],
      rating: [4, 4, 4],
      comments: ['Comentario 3', 'Comentario 4'],
      commentUser: ['Usuario 3', 'Usuario 4'],
    },
  ];

  const newSitio: Sitio = {
    id: '3',
    name: 'Sitio 3',
    description: 'Descripción 3',
    parrafo1: 'Parrafo 3',
    parrafo2: 'Parrafo 3',
    imageUrl: 'http://example.com/image3.jpg',
    imageGallery: ['http://example.com/image3.jpg'],
    rating: [5],
    comments: ['Comentario 5'],
    commentUser: ['Usuario 5'],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa el módulo de pruebas HTTP
      providers: [SitiosService], // Proveedor para el servicio
    });

    service = TestBed.inject(SitiosService);
    httpMock = TestBed.inject(HttpTestingController); // Controlador de peticiones HTTP
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch sitios data', () => {
    service.getSitios().subscribe((sitios) => {
      expect(sitios.length).toBe(2); // Verifica que haya 2 sitios
      expect(sitios).toEqual(mockSitios); // Verifica que los sitios sean iguales a los mockeados
    });

    const req = httpMock.expectOne('http://localhost:3000/sitios');
    expect(req.request.method).toBe('GET');
    req.flush(mockSitios); // Envía la respuesta mockeada
  });

  it('should add a new site', () => {
    service.addNewSite(newSitio).subscribe((response) => {
      expect(response).toEqual(newSitio); // Verifica que el sitio agregado sea el correcto
    });

    const req = httpMock.expectOne('http://localhost:3000/sitios');
    expect(req.request.method).toBe('POST');
    req.flush(newSitio); // Envía la respuesta mockeada
  });

  it('should add a comment to a site', () => {
    const comment = 'Nuevo comentario';
    const rating = 5;
    const user = 'Usuario 5';

    service.addCommentToSite('1', comment, rating, user).subscribe((updatedSitio) => {
      expect(updatedSitio.comments.length).toBe(3); // Verifica que el número de comentarios aumentó
      expect(updatedSitio.comments).toContain(comment); // Verifica que el comentario agregado esté presente
      expect(updatedSitio.rating).toContain(rating); // Verifica que el rating agregado esté presente
      expect(updatedSitio.commentUser).toContain(user); // Verifica que el usuario esté presente
    });

    const req = httpMock.expectOne('http://localhost:3000/sitios/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockSitios[0]); // Responde con el primer sitio mockeado

    const putReq = httpMock.expectOne('http://localhost:3000/sitios/1');
    expect(putReq.request.method).toBe('PUT');
    putReq.flush({
      ...mockSitios[0],
      comments: [...mockSitios[0].comments, comment],
      rating: [...mockSitios[0].rating, rating],
      commentUser: [...mockSitios[0].commentUser, user],
    }); // Responde con el sitio actualizado
  });

  it('should get random comments', () => {
    service.getRandomComments(3).subscribe((comments) => {
      expect(comments.length).toBe(3); // Verifica que se obtienen 3 comentarios
    });

    const req = httpMock.expectOne('http://localhost:3000/sitios');
    req.flush(mockSitios); // Responde con los sitios mockeados
  });
});
