import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-tambah-dialog',
  templateUrl: './tambah-dialog.component.html',
  styleUrl: './tambah-dialog.component.scss'
})
export class TambahDialogComponent {
  newData: any = {};

  constructor(
    public dialogRef: MatDialogRef<TambahDialogComponent>,
    private apiService: AuthService
  ) { }

  addData(): void {
    this.apiService.inputItem(this.newData).subscribe(() => {
      this.dialogRef.close(true); // Menutup dialog dengan status berhasil
    });
  }

  closeDialog(): void {
    this.dialogRef.close(false); // Menutup dialog tanpa melakukan penambahan data
  }
}
