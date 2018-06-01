import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[fpaUpload]'
})
export class UploadDirective {

  @Output()
  hovering = new EventEmitter<boolean>();

  @Output()
  dropped = new EventEmitter<FileList>();

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
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event) {
    event.preventDefault();
    this.hovering.emit(true);
  }

  @HostListener('drop', ['$event'])
  onDragDrop($event) {
    event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
  }
}
