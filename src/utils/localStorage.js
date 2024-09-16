// utils/localStorage.js

export const getSavedFeeds = () => {
    const savedFeeds = localStorage.getItem('savedFeeds');
    return savedFeeds ? JSON.parse(savedFeeds) : [];
  };
  
  export const saveFeed = (feedId) => {
    const savedFeeds = getSavedFeeds();
    if (!savedFeeds.includes(feedId)) {
      savedFeeds.push(feedId);
      localStorage.setItem('savedFeeds', JSON.stringify(savedFeeds));
    }
  };
  
  export const removeSavedFeed = (feedId) => {
    let savedFeeds = getSavedFeeds();
    savedFeeds = savedFeeds.filter(id => id !== feedId);
    localStorage.setItem('savedFeeds', JSON.stringify(savedFeeds));
  };
  
  export const isFeedSaved = (feedId) => {
    const savedFeeds = getSavedFeeds();
    return savedFeeds.includes(feedId);
  };
  