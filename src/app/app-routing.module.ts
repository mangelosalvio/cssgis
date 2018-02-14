import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { BookComponent } from './book/book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { makeDecorator } from '@angular/core/src/util/decorators';
import { MapsComponent } from './maps/maps.component';
import { CreateClosedPathComponent } from './create-closed-path/create-closed-path.component';

const appRoutes: Routes = [
    {
      path: 'maps',
      component: MapsComponent,
      data: { title: 'Maps' },
      children : [
        {
          path : 'create-closed-path',
          component : CreateClosedPathComponent
        }
      ]
    },
    {
      path: 'books',
      component: BookComponent,
      data: { title: 'Book List' }
    },
    {
      path: 'books/create',
      component: BookCreateComponent,
      data: { title: 'Create Book' }
    },
    {
      path: 'books/:id',
      component: BookDetailComponent,
      data: { title: 'Book Details' }
    },
    {
      path: 'books/:id/edit',
      component: BookEditComponent,
      data: { title: 'Edit Book' }
    },
    
    { path: '',
      redirectTo: '/maps/create-closed-path',
      pathMatch: 'full'
    }
];

  @NgModule({
      imports : [
          RouterModule.forRoot(
              appRoutes
          )
      ],
      exports : [
          RouterModule
      ]
})

export class AppRoutingModule {}