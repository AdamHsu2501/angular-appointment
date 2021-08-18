import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import moment from 'moment-timezone';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Fields } from 'src/app/shared/components/form/fieldType';
import { IEvent } from 'src/app/shared/IConfig';
import { FormService } from 'src/app/shared/services/form.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css'],
})
export class EventItemComponent implements OnInit {
  form!: FormGroup;
  fields = [
    Fields.hidden({ key: 'id', value: this.events.createId() }),
    Fields.card({
      value: [
        Fields.textbox({
          key: 'displayName',
          label: 'displayName',
          required: true,
        }),
        Fields.textarea({ key: 'text', label: 'description' }),
      ],
    }),
    Fields.card({
      value: [
        Fields.boolean({
          key: 'display',
        }),
        Fields.autocomplete({
          key: 'timeZone',
          required: true,
          options: of(moment.tz.names()),
          displayFn: (opt: string) =>
            !opt ? '' : ' (GMT' + moment.tz(opt).format('Z') + ') ' + opt,
          filterFn: (reg: RegExp, opt: string) => reg.test(opt),
        }),
        Fields.number({
          key: 'max',
          label: 'openDays',
          suffix: 'days',
          value: 60,
        }),
        Fields.number({ key: 'duration', suffix: 'min' }),
        Fields.number({ key: 'interval', suffix: 'min' }),
        Fields.textbox({ key: 'location' }),
      ],
    }),
    Fields.card({
      value: [
        Fields.group({
          key: 'weekly',
          value: [...new Array(7)].map((v, i) =>
            Fields.array({
              key: i.toString(),
              label: moment().set('day', i).format('ddd'),
              children: [
                Fields.time({
                  key: 'begin',
                  value: '09:00',
                }),
                Fields.time({
                  key: 'end',
                  value: '17:00',
                }),
              ],
            })
          ),
        }),
      ],
    }),
    Fields.card({
      value: [
        Fields.dynamic({
          key: 'dates',
          value: [],
          multiple: true,
          children: [
            Fields.time({
              key: 'begin',
              value: '09:00',
            }),
            Fields.time({
              key: 'end',
              value: '17:00',
            }),
          ],
        }),
      ],
    }),
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formService: FormService,
    private events: EventsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          return this.events.getDoc(params.get('id')!);
        })
      )
      .subscribe((data) => {
        console.log('data', data);
        this.form = this.formService.createGroup(
          this.formService.flat(this.fields),
          false,
          data
        );
      });
  }

  update(data: IEvent): void {
    this.events.update(data);
    this.router.navigate(['../', data.id], { relativeTo: this.route });
  }

  backToParent(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
