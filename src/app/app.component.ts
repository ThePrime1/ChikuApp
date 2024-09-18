import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DataService, IData } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private _dataService = inject(DataService);
  public data = signal<IData[]>([]);
  public searchTerm = signal<string>('');

  public filteredData = computed<IData[]>(() => {
    if (this.searchTerm().trim().length === 0) {
      return this.data();
    }

    return this.data().filter((d) =>
      d.PATH.toLowerCase().includes(this.searchTerm())
    );
  });

  ngOnInit() {
    this.parseData();
  }

  parseData(): void {
    this._dataService.all().subscribe({
      next: (response) => {
        this.data.set(response);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  onSearch(searchText: string): void {
    this.searchTerm.set(searchText);
  }
}
