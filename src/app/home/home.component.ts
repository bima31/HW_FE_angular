// src/app/home/home.component.ts
import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {EditDialogComponent} from "../edit-dialog/edit-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import {TambahDialogComponent} from "../tambah-dialog/tambah-dialog.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any[] = [];
  filteredData: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  filterText: string = '';
  items: { nama_product: string, qty_product: number }[] = [];

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.authService.getData().subscribe(
      data => {
        this.items = data?.data;
        this.data = this.items;
        this.filteredData = this.items;
      },
      error => {
        console.error('Error fetching data', error);
        // Optionally redirect to login if token is invalid
        this.router.navigate(['/login']);
      }
    );
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get paginatedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  onFilterChange(): void {
    this.filteredData = this.data.filter(item => item.nama_product.toLowerCase().includes(this.filterText.toLowerCase()));
    this.currentPage = 1; // Reset to first page after filtering
  }
  totalPages(): number[] {
    const totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }
  openAddDataDialog(): void {
    const dialogRef = this.dialog.open(TambahDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert(result.message);
        // Jika dialog ditutup dengan status berhasil, refresh data atau lakukan operasi lain yang diperlukan
        this.loadItems();
      }
    });
  }

  openEditDialog(item: any): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { ...item }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        alert('Product registered successfully!');
        this.loadItems();
      }
    });
  }

  deleteItem(item: any): void {
    if (confirm('Are you sure you want to delete this item?')) {
      const index = this.data.indexOf(item);
      this.authService.deleteItem(item.id).subscribe(
        (value) => {
          alert(value.message);
          this.loadItems();
        },
        (error) => {
          console.error('Error deleting item', error);
        }
      );
    }
  }
}
