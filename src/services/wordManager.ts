import { words as localWords } from '../data/words';
import { listWords, Word } from './api';

export type WordFilter = 'sistema' | 'todas' | 'usuarios';

/**
 * Obtiene las palabras según el filtro seleccionado
 * - 'sistema': Solo palabras locales del archivo words.ts
 * - 'todas': Palabras locales + palabras de usuarios en la BD
 * - 'usuarios': Solo palabras creadas por usuarios en la BD
 */
export const getWordsByFilter = async (filtro: WordFilter): Promise<string[]> => {
  if (filtro === 'sistema') {
    // Solo palabras locales
    return localWords;
  }

  if (filtro === 'usuarios') {
    // Solo palabras de usuarios desde la BD
    try {
      const result = await listWords('todas', 'activa');
      return result.palabras.map((p: Word) => p.palabra);
    } catch (error) {
      console.error('Error al obtener palabras de usuarios:', error);
      return [];
    }
  }

  if (filtro === 'todas') {
    // Palabras locales + palabras de usuarios
    try {
      const result = await listWords('todas', 'activa');
      const userWords = result.palabras.map((p: Word) => p.palabra);
      // Combinar y eliminar duplicados
      const combined = [...new Set([...localWords, ...userWords])];
      return combined;
    } catch (error) {
      console.error('Error al obtener palabras de usuarios:', error);
      // Fallback a solo palabras locales si hay error
      return localWords;
    }
  }

  return localWords;
};

/**
 * Selecciona una palabra aleatoria del array dado
 */
export const getRandomWord = (words: string[]): string => {
  if (words.length === 0) return '';
  return words[Math.floor(Math.random() * words.length)];
};
