export function crearEnlaceCompartirCancion(cancion) {
    const { titulo, artista, formato } = cancion;
    const parametros = new URLSearchParams({
      titulo: titulo,
      artista: artista,
      formato: formato
    });
    return `https://ejemplo.com/compartir?${parametros.toString()}`;
}