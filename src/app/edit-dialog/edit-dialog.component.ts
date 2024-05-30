import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.editForm = this.fb.group({
      nama_product: [data.nama_product, Validators.required],
      qty_product: [data.qty_product, Validators.required]
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedData = {
        ...this.data,
        ...this.editForm.value
      };
      this.authService.updateItem(updatedData).subscribe(
        response => {
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error updating item', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
