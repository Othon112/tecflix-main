export interface Movie {
  cover: string;
  categories: [
    {
      name: string;
    }
  ];
  title: string;
  rating: string;
  votes: number;
}
