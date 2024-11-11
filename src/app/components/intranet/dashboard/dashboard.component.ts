import { Component } from '@angular/core';

interface MediaItem {
  title: string;
  description: string;
  url: string;
  type: 'image' | 'video';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  mediaItems: MediaItem[] = [];

  // Método para agregar un nuevo contenido
  addItem(title: string, description: string, url: string, type: 'image' | 'video') {
    if (!title || !description || !url || !type) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Verificar si la URL es válida
    if (!this.isValidUrl(url)) {
      alert("URL inválida. Debe ser una URL de imagen o video.");
      return;
    }

    const newItem: MediaItem = { title, description, url, type };
    this.mediaItems.push(newItem);
  }

  // Método para editar un contenido existente
  editItem(item: MediaItem) {
    // Aquí iría la lógica para editar el contenido
    console.log('Editando:', item);
  }

  // Método para eliminar un contenido existente
  deleteItem(item: MediaItem) {
    const index = this.mediaItems.indexOf(item);
    if (index > -1) {
      this.mediaItems.splice(index, 1);
    }
  }

  // Validación para URL de imagen o video
  isValidUrl(url: string): boolean {
    const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|mp4|webm))$/;
    return regex.test(url);
  }
}
