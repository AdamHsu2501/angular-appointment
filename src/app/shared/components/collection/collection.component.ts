import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ContentChild,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit, OnDestroy {
  @Input() docs$!: Observable<any[]>;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

  filter$ = new BehaviorSubject<string>('');
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  subscription!: Subscription;

  constructor() {}

  get items(): any[] {
    return this.dataSource._pageData(this.dataSource.data);
  }

  ngOnInit(): void {
    this.subscription = combineLatest([this.docs$, this.filter$])
      .pipe(
        map((arr) => ({
          docs: arr[0],
          filter: arr[1],
        }))
      )
      .subscribe(({ docs, filter }) => {
        const datas = filter.length
          ? docs.filter((doc) => this.filterPredicate(doc, filter))
          : docs;
        this.dataSource = new MatTableDataSource(datas);
        this.dataSource.paginator = this.paginator;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  filterPredicate(data: any, filter: string): boolean {
    if (data) {
      if (Array.isArray(data)) {
        return data.some((item) => this.filterPredicate(item, filter));
      } else if (typeof data === 'object') {
        return Object.keys(data)
          .filter((key) => key !== 'id')
          .some((key) => this.filterPredicate(data[key], filter));
      } else {
        const reg = new RegExp(filter, 'i');
        return reg.test(data);
      }
    }

    return false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter$.next(filterValue.trim().toLowerCase());

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
