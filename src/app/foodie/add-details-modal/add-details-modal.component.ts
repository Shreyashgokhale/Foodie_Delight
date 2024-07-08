import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { concat } from 'rxjs';
import { FoodieApiService } from 'src/app/services/foodie-api.service';

@Component({
  selector: 'app-add-details-modal',
  templateUrl: './add-details-modal.component.html',
  styleUrls: ['./add-details-modal.component.scss']
})
export class AddDetailsModalComponent {
  form!: FormGroup;
  formData: any = [];
  isUpdate = false;

  constructor(private fb: FormBuilder, private foodieApi: FoodieApiService, private dialogRef: MatDialogRef<AddDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm()
    if (this.data.id) {
      this.isUpdate = true;
      this.patchForm();
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      contact: ['', Validators.required],
    })
  }

  patchForm() {
    this.foodieApi.getDatabyId(this.data.id).subscribe(
      (res: any) => {
        this.form.patchValue({
          name: res.name,
          description: res.description,
          location: res.location,
          contact: res.contact
        });
      },
      (error: any) => console.error('Error loading item details:', error)
    );
  }

  onSubmit() {
    this.formData.push(this.form.getRawValue())
    if (this.data) {
      this.foodieApi.updateData(this.data.id, this.formData[0]).subscribe(
        (res: any) => {
          console.log('Item updated successfully:', res);
          this.dialogRef.close(true);
        },
        (error: any) => console.error('Error updating item:', error)
      );
    }
    else {
      console.log('formData', this.formData);
      this.foodieApi.addData(this.formData[0]).subscribe(
        response => {
          console.log('Item added successfully:', response);
        },
        error => console.error('Error adding item:', error)
      );
      this.dialogRef.close(true);
    }
    this.form.reset();
  }

  onCancel() {
    this.dialogRef.close();
  }

}
