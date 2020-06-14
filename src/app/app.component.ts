import { Component } from "@angular/core";
import { AppState } from "./app.state";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  formGroup: FormGroup;
  constructor(public state: AppState, private formBuilder: FormBuilder) {
    this.setupForm();
  }

  setupForm() {
    this.formGroup = this.formBuilder.group({
      description: ["", [Validators.required]],
    });
  }

  onSubmit() {
    this.state.addToDo({
      description: this.formGroup.value.description,
      createdAt: Date.now()
    });
    this.formGroup.setValue({ description: "" });
  }
}
