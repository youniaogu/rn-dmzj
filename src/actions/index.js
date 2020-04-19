export function loadMangaList() {
  return {
    type: 'LOAD_MANGA_LIST',
  };
}

export function loadMangaListCompletion(listData = []) {
  return {
    type: 'LOAD_MANGA_LIST_COMPLETION',
    list: listData,
  };
}

export function loadMangaInfo(id) {
  return {
    type: 'LOAD_MANGA_INFO',
    id,
  };
}

export function loadMangaInfoCompletion() {
  return {
    type: 'LOAD_MANGA_INFO_COMPLETION',
  };
}

export function loadMangaChapter(id, name) {
  return {
    type: 'LOAD_MANGA_CHAPTER',
    id,
    name,
  };
}

export function loadMangaChapterCompletion(id, data) {
  return {
    type: 'LOAD_MANGA_CHAPTER_COMPLETION',
    id,
    data,
  };
}

export function loadMangaPage(id, cid) {
  return {
    type: 'LOAD_MANGA_PAGE',
    id,
    cid,
  };
}

export function loadMangaPageCompletion(error, data) {
  return {
    type: 'LOAD_MANGA_PAGE_COMPLETION',
    error,
    data,
  };
}
