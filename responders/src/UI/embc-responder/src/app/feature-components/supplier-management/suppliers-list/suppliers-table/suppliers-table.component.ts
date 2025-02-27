import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumnModel } from 'src/app/core/models/table-column.model';
import { TableFilterValueModel } from 'src/app/core/models/table-filter-value.model';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import * as globalConst from '../../../../core/services/global-constants';
import { InformationDialogComponent } from 'src/app/shared/components/dialog-components/information-dialog/information-dialog.component';
import { SupplierModel } from 'src/app/core/models/supplier.model';
import { SupplierListItem } from 'src/app/core/api/models';

@Component({
  selector: 'app-suppliers-table',
  templateUrl: './suppliers-table.component.html',
  styleUrls: ['./suppliers-table.component.scss']
})
export class SuppliersTableComponent implements AfterViewInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() displayedColumns: TableColumnModel[];
  @Input() incomingData: SupplierListItem[] = [];
  @Input() filterTerm: TableFilterValueModel;
  @Input() isLoading: boolean;
  @Input() statusLoading: boolean;
  @Input() loggedInRole: string;
  @Input() showToggle: boolean;
  @Output() toggleActive = new EventEmitter<string>();
  @Output() toggleInactive = new EventEmitter<string>();
  @Output() clickedRow = new EventEmitter<SupplierModel>();

  dataSource = new MatTableDataSource();
  columns: string[];
  color = '#169BD5';
  data: any;
  selectedIndex: number;

  constructor(private dialog: MatDialog) {}

  /**
   * Listens to input events and popluate values
   *
   * @param changes input event change object
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.incomingData) {
      this.dataSource = new MatTableDataSource(this.incomingData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    if (changes.displayedColumns) {
      this.columns = this.displayedColumns.map((column) => column.ref);
    }
    if (changes.filterTerm && this.filterTerm !== undefined) {
      this.filter(this.filterTerm);
    }
  }

  /**
   * Sets paginator and sort on tables
   */
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Filters the datatable
   *
   * @param term user selected filters
   */
  filter(term: TableFilterValueModel): void {
    this.data = this.dataSource.filteredData;
    this.dataSource.filterPredicate = this.supplierFilterPredicate;
    this.dataSource.filter = JSON.stringify(term);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * custom filter predicate for string and dropdown filters
   *
   * @param data table data
   * @param filter filter term
   * @returns true/false
   */
  supplierFilterPredicate = (data: SupplierModel, filter: string): boolean => {
    const searchString: TableFilterValueModel = JSON.parse(filter);
    if (searchString.type === 'text') {
      if (
        data.legalName
          .trim()
          .toLowerCase()
          .indexOf(searchString.value.trim().toLowerCase()) !== -1 ||
        data.name
          .trim()
          .toLowerCase()
          .indexOf(searchString.value.trim().toLowerCase()) !== -1
      ) {
        return true;
      }
      return false;
    }
  };

  /**
   * Captures the row click event
   *
   * @param row team member row
   */
  rowClicked(row): void {
    this.clickedRow.emit(row);
  }

  /**
   * Stops the entire row from being clicked if the user interacts with
   * the toggle button
   *
   * @param $event click event
   * @param columnLabel table column name
   */
  disableRowInteraction($event, columnLabel): void {
    if (columnLabel === 'status') {
      $event.stopPropagation();
    }
  }

  /**
   * Emits active/inactive events based on user interaction with the toggle
   *
   * @param $event slide toggle event
   * @param row row affected
   * @param index index of the affected row
   */
  slideToggle($event: MatSlideToggleChange, row, index): void {
    this.selectedIndex = index;
    if ($event.checked) {
      this.toggleActive.emit(row.id);
    } else {
      this.toggleInactive.emit(row.id);
    }
  }

  /**
   * Open the dialog with definition of
   * profile status
   */
  openStatusDefinition(): void {
    this.dialog.open(DialogComponent, {
      data: {
        component: InformationDialogComponent,
        content: globalConst.supplierStatusDefinition
      },
      height: '450px',
      width: '563px'
    });
  }
}
