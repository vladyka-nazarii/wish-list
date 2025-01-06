import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { WishItem } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private corsProxy = 'https://corsproxy.io';

  constructor(private http: HttpClient) {}

  fetchMetaTags(url: string): Observable<WishItem> {
    const fullUrl = `${this.corsProxy}/?key=${
      environment.corsProxyApiKey
    }&url=${encodeURIComponent(url)}`;

    return this.http.get(fullUrl, { responseType: 'text' }).pipe(
      map((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const title =
          doc
            .querySelector('meta[property="og:title"]')
            ?.getAttribute('content') || '';
        const image =
          doc
            .querySelector('meta[property="og:image"]')
            ?.getAttribute('content') || '';

        return { id: '', url, title, image, price: 0 };
      })
    );
  }
}
