/**
 * Formata um número de likes para uma representação compacta e amigável.
 * Ex: 999 -> 999, 1500 -> 1.5k, 1200000 -> 1.2M
 * 
 * @param num O número a ser formatado
 * @returns String formatada
 */
export const formatLikes = (num: number): string => {
    if (num === 0) return '0';

    // Milhões
    if (num >= 1000000) {
        const value = num / 1000000;
        return value % 1 === 0
            ? value.toFixed(0) + 'M'
            : value.toFixed(1).replace('.', ',') + 'M';
    }

    // Milhares
    if (num >= 1000) {
        const value = num / 1000;
        return value % 1 === 0
            ? value.toFixed(0) + 'k'
            : value.toFixed(1).replace('.', ',') + 'k';
    }

    // Centenas e menos
    return num.toString();
};
