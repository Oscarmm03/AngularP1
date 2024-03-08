import { Component, Input, OnInit } from '@angular/core';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { HeadService, HeaderData } from '../../sevices/head.service';
import { PostPreview } from '../../types/post-preview.type';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import matter from 'gray-matter-browser';

type HomeData = {
  posts: Array<string>
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostPreviewComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private uiData: HeaderData = {
    title: 'BMW',
    subtitle: 'motorroad',
    thumbnail: 'https://www.xtrafondos.com/wallpapers/bmw-s1000-11426.jpg'
  }

  posts: Array<PostPreview> = [
    {
      title: 'El Motor',
      subtitle: 'bmw motorroad',
      slug: 'how-to-create-a-static-file-blog-with-angular-v17',
      author: 'Oscar Molina',
      publicationDate: '01-03-2014'
    }

  ]

  constructor(private headerService: HeadService, private http: HttpClient) { }
  ngOnInit(): void {
    const pathHomeData = 'assets/home/home-data.json'
    this.headerService.uiData.set(this.uiData)
    this.http.get<HomeData>(pathHomeData).subscribe({
      //creamos una fucnion tiplo felcha MAPEAMOS EL JSON DE ASSET DENTRO DE HOME Y RECORREMOS LOS SLUGS
      next: data => {
        const requests = data.posts.map(slug => 
          this.http.get(
            `assets/posts/${slug}/post.md`, {responseType: 'text'}
            ))//VAMOS A DINAMIZAR LOS SLUGS y acceder a las carpetas pasamos todo a tipo texto
            forkJoin(requests).subscribe({
              next: allPostDetails => {
                this.posts = allPostDetails.map(markdownFile =>{
                  const { title = '', subtitle = '', slug = '', author = '', publicationDate = '' 
                } = matter(markdownFile).data; return {
                            title,
                            subtitle,
                            slug,
                            author,
                            publicationDate
                            } 
                })
              },
              error: error => console.error(error)
            })
      },
      error: error => console.error(error)
      //concatenar llamadas http para renderizarlas usamos FORKJOIN para controlar elobservable de arrays como paametro de entrada
    })
  }
}
