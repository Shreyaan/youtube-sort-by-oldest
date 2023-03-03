// have to declare this module because the railway.app isnt able to find the module uhhh

export interface Video {
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: {
      standard: any;
      maxres: any;
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
