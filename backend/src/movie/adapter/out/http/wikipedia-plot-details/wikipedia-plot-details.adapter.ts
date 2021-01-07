import { HttpService, Injectable } from '@nestjs/common';
import { catchError, map, mergeMap } from 'rxjs/operators';
import cheerio from 'cheerio';
import { of } from 'rxjs';
import { GetPlotDetailsPort } from '../../../../application/port/out/get-plot-details.port';

@Injectable()
export class WikipediaPlotDetailsAdapter implements GetPlotDetailsPort {
  constructor(private readonly httpClient: HttpService) {}

  private getWikiPage(imdbId: string) {
    const query = `
    SELECT ?sitelink WHERE {
    VALUES ?imdbId { "${imdbId}"  }
    ?item wdt:P31 wd:Q11424 .
    ?item wdt:P345 ?imdbId .
    ?sitelink schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> .
  }
    `;
    return this.httpClient
      .get('https://query.wikidata.org/sparql', {
        headers: { Accept: 'application/sparql-results+json' },
        params: { query },
      })
      .pipe(map((res) => res.data.results.bindings[0].sitelink.value));
  }

  public getPlotDetails(imdbId: string, title: string) {
    return this.getWikiPage(imdbId).pipe(
      catchError(() => of(`https://en.wikipedia.org/wiki/${title}`)),
      mergeMap((link) => this.httpClient.get(link)),
      map((res) => this.extractPlot(res.data)),
    );
  }

  private extractPlot(html: string): string {
    const $ = cheerio.load(html);

    let text = '';
    let first = $('.mw-parser-output').children('h2:contains("Plot")').next();

    while (first.prop('tagName') != 'H2' && first.next().length !== 0) {
      text += first.text();
      first = first.next();
    }
    return text;
  }
}
