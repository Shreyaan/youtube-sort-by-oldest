export interface Video {
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: {
      default: {
        url: string;
      };
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
    };
    description: string;
  };
  contentDetails: {
    videoId: string;
  };
}
