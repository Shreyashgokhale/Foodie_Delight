import { Component, ViewChild } from '@angular/core';
import { AddDetailsModalComponent } from '../add-details-modal/add-details-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FoodieApiService } from 'src/app/services/foodie-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'description', 'location', 'contact', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();

  constructor(private matDialog: MatDialog, private foodieApi: FoodieApiService) { }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.foodieApi.getData().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => console.error('Error while getting data:', error)
    );
  }

  openDialogToAddRestaurant(): void {
    const dialogRef = this.matDialog.open(AddDetailsModalComponent, {
      width: '500px',
      maxHeight: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        setTimeout(() => {
          this.getData();
        }, 1000);
      }
    });
  }

  editRestaurantData(element: number): void {
    const dialogRef = this.matDialog.open(AddDetailsModalComponent, {
      width: '500px',
      data: { id: element }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
      }
    });
  }

  deleteRestaurantData(element: number): void {
    console.log(element)
    this.foodieApi.deleteData(element).subscribe(
      response => {
        console.log('Item deleted successfully:', response);
        this.getData();
      },
      error => console.error('Error deleting item:', error)
    );
  }
}

export interface PeriodicElement {
  name: string;
  description: string;
  location: string;
  contact: number;
}
