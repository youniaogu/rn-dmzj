export function loadManga() {
  return {
    type: 'LOAD_MANGA',
  };
}

export function loadMangaCompletion(listData = []) {
  return {
    type: 'LOAD_MANGA_COMPLETION',
    list: listData,
  };
}
