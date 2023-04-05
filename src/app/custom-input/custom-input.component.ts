import {ChangeDetectorRef, Component, forwardRef, Self} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
})
export class CustomInputComponent implements ControlValueAccessor{
  public value= '';
  public onChange!: (value:string) => void;

  constructor(
    @Self() private readonly ngControl: NgControl,
    private changeDetector: ChangeDetectorRef) {
    this.ngControl.valueAccessor = this;
  }

  public onInputValueChange(event: Event){
    const elem = event.target as HTMLInputElement;
    const value = elem.value;
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {

  }

  writeValue(value: string): void {
    this.value = value;
    this.changeDetector.detectChanges()
  }

}
