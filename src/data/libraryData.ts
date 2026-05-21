export interface LibraryItemData {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    category: string;
    readingTime: number;
    author: string;
    imageUrl?: string;
}

export const libraryData: LibraryItemData[] = [
    // --- CATEGORY GIT ---
    {
        id: 1,
        slug: 'introducao-git',
        title: 'Git Fundamentals',
        excerpt: 'The core of versioning every developer needs to master.',
        date: '2026-04-11',
        category: 'GIT',
        readingTime: 5,
        author: 'André Vitor',
        imageUrl: '/thumbnails/git-mastery.png'
    },
    {
        id: 2,
        slug: 'branches',
        title: 'Managing Branches',
        excerpt: 'Efficient workflows for team collaboration.',
        date: '2026-04-11',
        category: 'GIT',
        readingTime: 8,
        author: 'André Vitor'
    },
    
    // --- CATEGORY JAVASCRIPT ---
    {
        id: 3,
        slug: 'async-await',
        title: 'Promises & Async/Await',
        excerpt: 'Mastering asynchronous JavaScript logic.',
        date: '2026-04-11',
        category: 'JAVASCRIPT',
        readingTime: 10,
        author: 'André Vitor'
    },
    {
        id: 4,
        slug: 'destructuring',
        title: 'ES6+ Destructuring',
        excerpt: 'Powerful syntax for object and array manipulation.',
        date: '2026-04-11',
        category: 'JAVASCRIPT',
        readingTime: 4,
        author: 'André Vitor'
    },

    // --- CATEGORY CSS ---
    {
        id: 5,
        slug: 'grid',
        title: 'CSS Grid Layout',
        excerpt: 'Create complex layouts intuitively.',
        date: '2026-04-11',
        category: 'CSS',
        readingTime: 15,
        author: 'André Vitor'
    }
];
