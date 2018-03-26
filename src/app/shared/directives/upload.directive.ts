import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[fpaUpload]'
})
export class UploadDirective {

  @Output()
  hovering = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('dragenter', ['$event'])
  onDragEnter($event) {
    event.preventDefault();
    this.hovering.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event) {
    event.preventDefault();
    this.hovering.emit(false);
    console.log('Leave event; ', $event);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    event.preventDefault();
    this.hovering.emit(true);
  }

  @HostListener('drop', ['$event'])
  onDragDrop($event) {
    event.preventDefault();
    console.log('Drop event; ', $event);
  }
}
